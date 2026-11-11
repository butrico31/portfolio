import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Each matchMedia context owns its tweens, listeners and ScrollTriggers.
// Reverting restores the readable, static page when effects are disabled.
export function usePortfolioMotion(rootRef, enabled) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !enabled) return

    const media = gsap.matchMedia()
    const removeListeners = []
    let disposed = false

    media.add(
      {
        motionAllowed: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 761px)',
        pointer: '(hover: hover) and (pointer: fine)',
      },
      ({ conditions }) => {
        if (!conditions.motionAllowed) return
        const select = gsap.utils.selector(root)
        gsap.set(root, { '--star-stretch': 0 })
        const stretchStars = gsap.quickSetter(root, '--star-stretch')
        const settleStars = gsap
          .delayedCall(0.1, () => {
            stretchStars(0)
          })
          .pause()
        const updateStars = (self) => {
          // Stretch the dot itself into a rounded capsule, with a fixed pixel cap.
          const speed = gsap.utils.clamp(
            0,
            1,
            Math.abs(self.getVelocity()) / 2400,
          )
          stretchStars(speed)
          settleStars.restart(true)
        }
        // Different depths rise at different speeds, driven only by scrolling.
        select('.star-layer').forEach((layer, i) => {
          gsap.fromTo(
            layer,
            { yPercent: 0 },
            {
              yPercent: [-44, -55, -66][i],
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: i === 0 ? updateStars : undefined,
              },
            },
          )
        })

        select('.section-circuit').forEach((circuit) => {
          const section = circuit.parentElement
          gsap.fromTo(
            circuit.querySelectorAll('.section-circuit-wires path'),
            {
              strokeDasharray: (_, path) => path.getTotalLength(),
              strokeDashoffset: (_, path) => path.getTotalLength(),
            },
            {
              strokeDashoffset: 0,
              stagger: 0.08,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 92%',
                end: 'top 25%',
                scrub: 0.6,
              },
            },
          )

          circuit
            .querySelectorAll('.section-circuit-signals path')
            .forEach((path) => {
              const length = path.getTotalLength()
              gsap.fromTo(
                path,
                {
                  strokeDasharray: `12 ${length}`,
                  strokeDashoffset: length,
                  opacity: 0.9,
                },
                {
                  strokeDashoffset: -length,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                  },
                },
              )
            })
        })

        const entrance = gsap.timeline({
          defaults: { duration: 0.8, ease: 'power3.out' },
        })

        entrance
          .fromTo(
            select('.topbar, .hero-topline'),
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, stagger: 0.1, clearProps: 'opacity,transform' },
          )
          .fromTo(
            select('.hero-copy > .eyebrow, .hero h1 > .glitch-text'),
            { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              stagger: 0.12,
              clearProps: 'opacity,transform,clipPath',
            },
            0.15,
          )
          .fromTo(
            select('.hero-statement, .hero-description, .hero-actions'),
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, stagger: 0.1, clearProps: 'opacity,transform' },
            0.5,
          )
          .fromTo(
            select('.hero-visual'),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, clearProps: 'opacity,transform' },
            0.4,
          )

        select('.circuit-traces path').forEach((path, i) => {
          const length = path.getTotalLength()
          entrance.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 1.4,
              ease: 'power2.inOut',
              clearProps: 'strokeDasharray,strokeDashoffset',
            },
            0.45 + i * 0.035,
          )
        })

        select('.circuit-signals path').forEach((path, i) => {
          const length = path.getTotalLength()
          gsap.fromTo(
            path,
            {
              strokeDasharray: `9 ${length}`,
              strokeDashoffset: length,
              opacity: 0.8,
            },
            {
              strokeDashoffset: -length,
              duration: 4 + i * 0.35,
              delay: 1.4 + i * 0.3,
              repeat: -1,
              repeatDelay: 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: select('.hero-visual')[0],
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play pause resume pause',
              },
            },
          )
        })

        select(
          '.work > .section-label, .section-heading, .neuro-intro, .neuro-preview, .neuro-details > div, .about > .section-label, .about-grid > div, .contact > .section-label, .contact-layout, .contact-bottom',
        ).forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: conditions.desktop ? 36 : 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              immediateRender: false,
              clearProps: 'opacity,transform',
              scrollTrigger: { trigger: element, start: 'top 92%', once: true },
            },
          )
        })

        for (const group of ['.other-projects', '.toolchain', '.trajectory']) {
          const container = select(group)[0]
          const targets = container.querySelectorAll(
            '.project-row, .toolchain-row, .trajectory-item',
          )
          gsap.fromTo(
            targets,
            { opacity: 0, x: -18 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              stagger: 0.09,
              ease: 'power2.out',
              immediateRender: false,
              clearProps: 'opacity,transform',
              scrollTrigger: {
                trigger: container,
                start: 'top 88%',
                once: true,
              },
            },
          )
        }

        if (conditions.desktop) {
          gsap.fromTo(
            select('.circuit-art'),
            { yPercent: 0 },
            {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: select('.hero')[0],
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }

        if (conditions.pointer) {
          select('.text-link, .header-github, .contact-arrow').forEach(
            (link) => {
              const arrow = link.querySelector(':scope > span:last-child')
              if (!arrow) return
              const hover = gsap.to(arrow, {
                x: 3,
                y: -3,
                duration: 0.25,
                ease: 'power2.out',
                paused: true,
              })
              const enter = () => hover.play()
              const leave = () => hover.reverse()
              link.addEventListener('pointerenter', enter)
              link.addEventListener('pointerleave', leave)
              link.addEventListener('focus', enter)
              link.addEventListener('blur', leave)
              removeListeners.push(() => {
                link.removeEventListener('pointerenter', enter)
                link.removeEventListener('pointerleave', leave)
                link.removeEventListener('focus', enter)
                link.removeEventListener('blur', leave)
              })
            },
          )
        }

        return () => removeListeners.splice(0).forEach((remove) => remove())
      },
      root,
    )

    // Font loading can change text height after the first ScrollTrigger pass.
    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh()
    })

    // Expanded project details and preview tabs can change the page height.
    let refreshFrame
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh()
      })
    })
    resizeObserver.observe(root)

    return () => {
      disposed = true
      resizeObserver.disconnect()
      cancelAnimationFrame(refreshFrame)
      media.revert()
    }
  }, [rootRef, enabled])
}
