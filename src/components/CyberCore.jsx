import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { sculpturePose } from './sculpture-choreography.mjs'

export function CyberCore({ paused }) {
  const hostRef = useRef(null)
  const pauseRef = useRef(paused)
  useEffect(() => {
    pauseRef.current = paused
  }, [paused])

  useEffect(() => {
    const host = hostRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false
    let cleanup

    async function mount() {
      const [THREE, { RoomEnvironment }] = await Promise.all([
        import('./tech-geometry.mjs'),
        import('three/addons/environments/RoomEnvironment.js'),
      ])
      if (disposed) return
      delete host.dataset.fallback
      const canvas = document.createElement('canvas')
      let renderer
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        })
      } catch {
        host.dataset.fallback = 'webgl-unavailable'
        return
      }
      renderer.debug.onShaderError = () => {
        host.dataset.fallback = 'shader-error'
        host.dataset.ready = 'false'
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
      renderer.setClearColor(0x080c0e, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40)
      camera.position.set(0, 0.1, 9.1)
      const environment = new RoomEnvironment()
      const pmrem = new THREE.PMREMGenerator(renderer)
      const environmentTarget = pmrem.fromScene(environment, 0.04)
      scene.environment = environmentTarget.texture
      environment.dispose()
      pmrem.dispose()
      scene.add(new THREE.HemisphereLight(0xc4eee0, 0x1e343f, 2.5))
      const key = new THREE.DirectionalLight(0xe8fff5, 7)
      key.position.set(-3, 5, 4)
      const rim = new THREE.DirectionalLight(0x56e4e3, 8)
      rim.position.set(4, 1, -3)
      const warm = new THREE.PointLight(0xe5ff59, 12, 10)
      warm.position.set(-2, -2, 2)
      scene.add(key, rim, warm)
      const core = THREE.createCyberCore()
      scene.add(core.sculpture)
      const state = { progress: 0 }
      const media = gsap.matchMedia()
      const resize = () => {
        const { width, height } = host.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height, false)
        THREE.fitCoreCamera(camera, width / height)
        render()
      }
      let visible = true
      let frame = 0
      let lastFrame = 0
      let elapsed = 0
      function render() {
        if (host.dataset.fallback) return
        const still = reduced.matches
        const pose = sculpturePose(state.progress, elapsed, still)
        THREE.applyCorePose(core, pose, elapsed, still)
        renderer.render(scene, camera)
      }
      function tick(time) {
        frame = requestAnimationFrame(tick)
        if (time - lastFrame < 1000 / 30) return
        const delta = Math.min((time - lastFrame) / 1000, 0.1)
        lastFrame = time
        if (!visible || document.hidden || pauseRef.current || reduced.matches)
          return
        elapsed += delta
        render()
      }
      const onContextLost = (event) => {
        event.preventDefault()
        host.dataset.ready = 'false'
        host.dataset.fallback = 'context-lost'
      }
      const onContextRestored = () => {
        delete host.dataset.fallback
        render()
        host.dataset.ready = String(!host.dataset.fallback)
      }
      canvas.addEventListener('webglcontextlost', onContextLost)
      canvas.addEventListener('webglcontextrestored', onContextRestored)
      reduced.addEventListener('change', render)
      const observer = new ResizeObserver(resize)
      observer.observe(host)
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      visibility.observe(host)
      host.append(canvas)
      resize()
      host.dataset.ready = String(!host.dataset.fallback)
      media.add(
        {
          motionAllowed: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 1024px) and (min-height: 700px)',
        },
        ({ conditions }) => {
          if (!conditions.motionAllowed) return
          const hero = host.closest('.hero')
          const pin = conditions.desktop
          hero.classList.toggle('has-pin', pin)
          gsap.to(state, {
            progress: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: pin
                ? () => `+=${hero.offsetHeight - window.innerHeight}`
                : 'bottom top',
              pin: pin ? hero.querySelector('.wrap') : false,
              pinSpacing: false,
              anticipatePin: 1,
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          })
          return () => {
            hero.classList.remove('has-pin')
            state.progress = 0
            render()
          }
        },
        host,
      )
      frame = requestAnimationFrame(tick)
      ScrollTrigger.refresh()
      cleanup = () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        visibility.disconnect()
        reduced.removeEventListener('change', render)
        canvas.removeEventListener('webglcontextlost', onContextLost)
        canvas.removeEventListener('webglcontextrestored', onContextRestored)
        media.revert()
        THREE.disposeCore(core.sculpture)
        environmentTarget.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
        canvas.remove()
        host.dataset.ready = 'false'
      }
    }
    mount().catch(() => {
      host.dataset.fallback = 'load-failed'
    })
    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div
      className="cyber-core"
      ref={hostRef}
      role="img"
      aria-label="Astrolábio tridimensional com um icosaedro metálico de vinte faces e anéis orbitais ciano e amarelos que se abre e se reconstrói"
    >
      <img
        className="core-fallback"
        src="/cyber-core.svg"
        alt=""
        width="500"
        height="500"
        fetchPriority="high"
      />
    </div>
  )
}
