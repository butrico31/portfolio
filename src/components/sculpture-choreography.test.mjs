import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sculpturePose } from './sculpture-choreography.mjs'
import { PerspectiveCamera, Triangle, Vector3 } from 'three'
import {
  createCyberCore,
  applyCorePose,
  disposeCore,
  fitCoreCamera,
} from './tech-geometry.mjs'

test('scroll opens and reconstructs the core within the hero', () => {
  assert.deepEqual(sculpturePose(-1), sculpturePose(0))
  assert.deepEqual(sculpturePose(2), sculpturePose(1))
  assert.ok(sculpturePose(0.5).spread >= 1.9, 'faces keep the broad opening')
  assert.equal(sculpturePose(0.4).opening, 1)
  assert.equal(sculpturePose(0.6).opening, 1)
  assert.equal(sculpturePose(1).spread, sculpturePose(0).spread)
  assert.ok(Math.abs(sculpturePose(1).twist) < 1e-10)
  assert.ok(sculpturePose(1).rotationY > sculpturePose(0).rotationY)
})

test('the idle cycle opens, reconstructs and returns every facet home', () => {
  const core = createCyberCore()
  assert.ok(sculpturePose(0, 12).opening > 0.99)
  assert.equal(sculpturePose(0, 24).opening, 0)
  for (const [progress, elapsed] of [
    [0, 24],
    [1, 12],
  ]) {
    applyCorePose(core, sculpturePose(progress, elapsed), elapsed)
    core.pieces.forEach((piece) => {
      assert.ok(piece.position.distanceTo(piece.userData.home) < 1e-10)
      assert.ok(Math.abs(piece.quaternion.w - 1) < 1e-10)
    })
  }
  disposeCore(core.sculpture)
})

test('reduced motion has one stable pose regardless of time and scroll', () => {
  assert.deepEqual(sculpturePose(0, 0, true), sculpturePose(1, 100, true))
})

test('all twenty facets face outward and shared resources are disposed once', () => {
  const { sculpture, pieces, rings } = createCyberCore()
  assert.equal(pieces.length, 20)
  assert.equal(
    new Set(pieces.map((piece) => piece.position.toArray().join(','))).size,
    20,
  )
  pieces.forEach((piece) => {
    const vertices = piece.children[0].geometry.attributes.position
    const a = new Vector3().fromBufferAttribute(vertices, 0)
    const b = new Vector3().fromBufferAttribute(vertices, 1)
    const c = new Vector3().fromBufferAttribute(vertices, 2)
    const normal = b.sub(a).cross(c.sub(a))
    assert.ok(normal.dot(piece.userData.home) > 0, 'outer faces point outward')
  })
  assert.equal(rings.length, 3)
  const resources = new Set()
  sculpture.traverse((object) => {
    if (object.geometry) resources.add(object.geometry)
    if (object.material) resources.add(object.material)
  })
  let disposals = 0
  resources.forEach((resource) =>
    resource.addEventListener('dispose', () => {
      disposals++
    }),
  )
  disposeCore(sculpture)
  assert.equal(disposals, resources.size)
})

test('facets keep clearance inside every orbit throughout opening and rebuilding', () => {
  const core = createCyberCore()
  const center = new Vector3()
  const point = new Vector3()
  const triangle = new Triangle()
  for (let step = 0; step <= 20; step++) {
    const progress = step / 20
    for (const elapsed of [0, 6, 12, 18, 24]) {
      applyCorePose(core, sculpturePose(progress, elapsed), elapsed)
      core.sculpture.updateMatrixWorld(true)
      core.sculpture.getWorldPosition(center)
      let outerRadius = 0
      core.assembly.traverse((object) => {
        const positions = object.geometry?.attributes.position
        if (!positions) return
        for (let i = 0; i < positions.count; i++) {
          point
            .fromBufferAttribute(positions, i)
            .applyMatrix4(object.matrixWorld)
          outerRadius = Math.max(outerRadius, point.distanceTo(center))
        }
      })
      for (const ring of core.rings) {
        let innerRadius = Infinity
        ring.traverse((object) => {
          if (!object.isMesh) return
          const {
            attributes: { position },
            index,
          } = object.geometry
          const count = index ? index.count : position.count
          for (let i = 0; i < count; i += 3) {
            for (const [vertex, offset] of [
              [triangle.a, 0],
              [triangle.b, 1],
              [triangle.c, 2],
            ]) {
              vertex
                .fromBufferAttribute(
                  position,
                  index ? index.getX(i + offset) : i + offset,
                )
                .applyMatrix4(object.matrixWorld)
            }
            triangle.closestPointToPoint(center, point)
            innerRadius = Math.min(innerRadius, point.distanceTo(center))
          }
        })
        assert.ok(
          innerRadius - outerRadius >= 0.1,
          `orbit clears the facets at progress ${progress}, time ${elapsed}: ${innerRadius - outerRadius}`,
        )
      }
    }
  }
  disposeCore(core.sculpture)
})

test('closed, open and rebuilding poses fit narrow and wide frames', () => {
  const core = createCyberCore()
  const { sculpture } = core
  for (const [progress, elapsed] of [
    [0, 0],
    [0, 12],
    [0.25, 4],
    [0.5, 0],
    [0.5, 6],
    [0.5, 18],
    [0.75, 10],
    [1, 14],
  ]) {
    applyCorePose(core, sculpturePose(progress, elapsed), elapsed)
    sculpture.updateMatrixWorld(true)
    for (const aspect of [0.6, 0.85, 1.2, 2.4]) {
      const camera = new PerspectiveCamera(33, 1, 0.1, 40)
      camera.position.y = 0.1
      fitCoreCamera(camera, aspect)
      camera.updateMatrixWorld()
      const point = new Vector3()
      let extent = 0
      sculpture.traverse((object) => {
        const positions = object.geometry?.attributes.position
        if (!positions) return
        for (let i = 0; i < positions.count; i++) {
          point
            .fromBufferAttribute(positions, i)
            .applyMatrix4(object.matrixWorld)
            .project(camera)
          extent = Math.max(
            extent,
            Math.abs(point.x),
            Math.abs(point.y),
            Math.abs(point.z),
          )
        }
      })
      assert.ok(
        extent <= 1,
        `core stays in frame at progress ${progress}, aspect ${aspect}`,
      )
    }
  }
  disposeCore(sculpture)
})
