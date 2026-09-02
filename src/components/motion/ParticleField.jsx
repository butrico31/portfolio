import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  z-index: ${(p) => p.$zIndex ?? 0};
`

/**
 * Campo de partículas: pontos com halo roxo, ligados por linhas quando a menos
 * de `link`px, espalhados pela ALTURA INTEIRA do documento (spread="document")
 * e rolando com a página. Fogem do cursor num raio de `repel`px.
 * O canvas cobre só a viewport — os pontos são desenhados com o offset do scroll.
 */
export function ParticleField({
  density = 0.00012,
  link = 150,
  repel = 130,
  color = 'rgba(246,243,238,',
  dotOpacity = 0.85,
  lineOpacity = 0.22,
  speed = 0.14,
  dotSize = 2.4,
  glow = 0,
  spread = 'viewport',
  maxCount = 520,
  zIndex = 0,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = spread === 'document'
    let w = 0
    let h = 0
    let fieldH = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let pts = []
    let raf = 0
    let alive = true
    let scroll = 0
    const mouse = { x: -9999, y: -9999 }

    const docHeight = () =>
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight,
      )

    function build() {
      w = window.innerWidth
      h = window.innerHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fieldH = doc ? docHeight() : h
      const n = Math.round(
        Math.min(maxCount, Math.max(28, w * fieldH * density)),
      )
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * fieldH,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const vis = []
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > fieldH) p.vy *= -1
        }
        const sy = p.y - scroll
        if (sy < -link || sy > h + link) continue
        if (!reduce) {
          const dx = p.x - mouse.x
          const dy = sy - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < repel && d > 0.01) {
            const fo = ((repel - d) / repel) * 1.9
            p.x += (dx / d) * fo
            p.y += (dy / d) * fo
          }
        }
        vis.push({ x: p.x, y: p.y - scroll })
      }
      ctx.fillStyle = color + dotOpacity + ')'
      if (glow) {
        ctx.shadowBlur = glow
        ctx.shadowColor = color + '0.9)'
      }
      for (const v of vis) {
        ctx.beginPath()
        ctx.arc(v.x, v.y, dotSize / 2, 0, 6.2832)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      for (let i = 0; i < vis.length; i++) {
        for (let j = i + 1; j < vis.length; j++) {
          const a = vis[i]
          const b = vis[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < link) {
            ctx.strokeStyle =
              color + (lineOpacity * (1 - d / link)).toFixed(3) + ')'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    function frame() {
      if (!alive) return
      draw()
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onScroll = () => {
      scroll = doc ? window.scrollY || window.pageYOffset || 0 : 0
      if (reduce) draw()
    }
    const onResize = () => {
      build()
      onScroll()
      draw()
    }

    build()
    onScroll()
    draw()

    if (!reduce) {
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(frame)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const ro =
      doc && window.ResizeObserver
        ? new ResizeObserver(() => {
            const nh = docHeight()
            if (Math.abs(nh - fieldH) > 200) build()
          })
        : null
    if (ro) ro.observe(document.body)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (ro) ro.disconnect()
    }
  }, [
    density,
    link,
    repel,
    color,
    dotOpacity,
    lineOpacity,
    speed,
    dotSize,
    glow,
    spread,
    maxCount,
  ])

  return <Canvas ref={ref} aria-hidden="true" $zIndex={zIndex} />
}
