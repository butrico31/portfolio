import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

// Scroll suave via Lenis (duration 1.1 / lerp .085), emitindo ScrollTrigger.update,
// mais âncoras `#id` que deslizam suave até a seção (compensando a barra fixa).
export function useSmoothScroll() {
  useEffect(() => {
    let lenis = null

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ duration: 1.1, lerp: 0.085, smoothWheel: true, autoRaf: true })
      lenis.on('scroll', ScrollTrigger.update)
      window.lenis = lenis
    }

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (!el) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(el, { offset: -56 })
      else window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      document.removeEventListener('click', onClick)
      clearTimeout(refresh)
      if (lenis) {
        lenis.destroy()
        delete window.lenis
      }
    }
  }, [])
}
