import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        root.querySelectorAll('.nav__links a[href^="#"]').forEach((link) => {
          const section = root.querySelector(link.getAttribute('href'))
          if (!section) return
          ScrollTrigger.create({
            trigger: section,
            start: 'top 45%',
            end: 'bottom 45%',
            onToggle: ({ isActive }) => {
              if (isActive) link.setAttribute('aria-current', 'location')
              else link.removeAttribute('aria-current')
            },
          })
        })
      },
      root,
    )
    let disposed = false
    window.dispatchEvent(new Event('portfolio:mount'))
    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh()
    })
    return () => {
      disposed = true
      window.dispatchEvent(new Event('portfolio:unmount'))
      media.revert()
    }
  }, [rootRef])
}
