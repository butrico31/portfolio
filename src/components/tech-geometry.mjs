import * as THREE from 'three'
export {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PMREMGenerator,
  HemisphereLight,
  DirectionalLight,
  PointLight,
  ACESFilmicToneMapping,
} from 'three'

export function fitCoreCamera(camera, aspect) {
  camera.aspect = aspect
  camera.position.z = 10.8 / Math.min(1, aspect)
  camera.updateProjectionMatrix()
}

export function createCyberCore() {
  const sculpture = new THREE.Group()
  const assembly = new THREE.Group()
  sculpture.add(assembly)
  const shell = new THREE.MeshStandardMaterial({
    color: '#859a9e',
    metalness: 0.9,
    roughness: 0.28,
    flatShading: true,
  })
  const dark = new THREE.MeshStandardMaterial({
    color: '#20383f',
    metalness: 0.85,
    roughness: 0.3,
    flatShading: true,
  })
  const lime = new THREE.MeshStandardMaterial({
    color: '#e5ff59',
    emissive: '#b2e82c',
    emissiveIntensity: 0.8,
    metalness: 0.25,
    roughness: 0.22,
  })
  const cyan = new THREE.MeshStandardMaterial({
    color: '#73e9e1',
    emissive: '#24bdbb',
    emissiveIntensity: 1.1,
    metalness: 0.5,
    roughness: 0.25,
  })
  const edge = new THREE.LineBasicMaterial({
    color: '#9af4ed',
    transparent: true,
    opacity: 0.65,
  })
  const pieces = []
  const surface = new THREE.IcosahedronGeometry(1.5, 0)
  const positions = surface.attributes.position
  for (let i = 0; i < positions.count; i += 3) {
    const piece = new THREE.Group()
    const triangle = [0, 1, 2].map((corner) =>
      new THREE.Vector3().fromBufferAttribute(positions, i + corner),
    )
    const home = triangle
      .reduce((center, vertex) => center.add(vertex), new THREE.Vector3())
      .multiplyScalar(1 / 3)
    const corners = triangle.map((vertex) =>
      vertex.clone().lerp(home, 0.1).sub(home),
    )
    const vertices = [...corners, home.clone().multiplyScalar(-0.68)]
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        vertices.flatMap((v) => v.toArray()),
        3,
      ),
    )
    const faces = [0, 1, 2, 0, 3, 1, 1, 3, 2, 2, 3, 0]
    geometry.setIndex(faces)
    geometry.computeVertexNormals()
    piece.add(new THREE.Mesh(geometry, pieces.length % 3 ? shell : dark))
    piece.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edge))
    const inlay = corners.map((vertex) =>
      vertex
        .clone()
        .multiplyScalar(0.76)
        .add(home.clone().normalize().multiplyScalar(0.012)),
    )
    inlay.push(inlay[0])
    piece.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(inlay), edge),
    )
    piece.position.copy(home)
    piece.userData.home = home
    piece.userData.axis = home.clone().normalize()
    pieces.push(piece)
    assembly.add(piece)
  }
  surface.dispose()
  const nucleus = new THREE.Group()
  const crystal = new THREE.IcosahedronGeometry(0.46, 0)
  nucleus.add(new THREE.Mesh(crystal, cyan))
  nucleus.add(new THREE.LineSegments(new THREE.EdgesGeometry(crystal), edge))
  const innerHalo = new THREE.Mesh(
    new THREE.TorusGeometry(0.68, 0.014, 6, 80),
    lime,
  )
  innerHalo.rotation.x = Math.PI / 2
  nucleus.add(innerHalo)
  assembly.add(nucleus)
  const rings = []
  const nodeGeometry = new THREE.OctahedronGeometry(0.065, 0)
  for (let i = 0; i < 3; i++) {
    const orbit = new THREE.Group()
    const radius = 1.92 + i * 0.27
    orbit.add(
      new THREE.Mesh(new THREE.TorusGeometry(radius, 0.022, 6, 128), shell),
    )
    const trace = new THREE.Mesh(
      new THREE.TorusGeometry(radius - 0.055, 0.009, 6, 128, Math.PI * 1.35),
      i === 1 ? lime : cyan,
    )
    trace.rotation.z = i * 1.6
    orbit.add(trace)
    const ticks = []
    for (let j = 0; j < 32; j++) {
      const angle = (j / 32) * Math.PI * 2
      for (const r of [radius + 0.04, radius + (j % 4 ? 0.075 : 0.12)])
        ticks.push(
          new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0),
        )
    }
    orbit.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(ticks),
        edge,
      ),
    )
    const haloGeometry = new THREE.TorusGeometry(0.16 + i * 0.015, 0.012, 6, 40)
    for (let j = 0; j < 3; j++) {
      const angle = i * 0.65 + j * ((Math.PI * 2) / 3)
      const node = new THREE.Group()
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
      node.add(new THREE.Mesh(haloGeometry, j === 0 ? lime : cyan))
      const moon = new THREE.Mesh(haloGeometry, shell)
      moon.scale.setScalar(0.72)
      moon.rotation.y = Math.PI / 2
      node.add(moon)
      node.add(new THREE.Mesh(nodeGeometry, j === 0 ? lime : cyan))
      orbit.add(node)
    }
    orbit.rotation.set(0.85 + i * 0.58, 0.3 + i * 0.72, i * 1.1)
    orbit.userData.home = orbit.rotation.clone()
    rings.push(orbit)
    sculpture.add(orbit)
  }
  return { sculpture, assembly, pieces, rings, nucleus }
}

export function applyCorePose(core, pose, elapsed = 0, still = false) {
  const { sculpture, assembly, pieces, rings, nucleus } = core
  assembly.rotation.set(pose.rotationX, pose.rotationY, pose.rotationZ)
  sculpture.position.y = pose.y
  sculpture.scale.setScalar(1 / (1 + pose.opening * 0.12))
  pieces.forEach((piece, i) => {
    piece.position.copy(piece.userData.home).multiplyScalar(pose.spread)
    piece.quaternion.setFromAxisAngle(
      piece.userData.axis,
      pose.twist * (i % 2 ? -1 : 1),
    )
  })
  nucleus.scale.setScalar(1 + pose.opening * 0.15)
  rings.forEach((ring, i) => {
    ring.scale.setScalar(1 + pose.opening * (0.52 - i * 0.12))
    ring.rotation.copy(ring.userData.home)
    ring.rotation.x += pose.opening * (i % 2 ? -0.12 : 0.12)
    ring.rotation.z += still ? 0 : elapsed * (i % 2 ? -0.045 : 0.032)
  })
}

export function disposeCore(sculpture) {
  const resources = new Set()
  sculpture.traverse((object) => {
    if (object.geometry) resources.add(object.geometry)
    if (object.material) resources.add(object.material)
  })
  resources.forEach((resource) => resource.dispose())
}
