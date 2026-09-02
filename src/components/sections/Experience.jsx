import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { Wrap, Mono, Section } from '../../styles/primitives'
import { SecHead } from './SecHead'
import { cv } from '../../data/cv'

const Inner = styled(Wrap)`
  display: grid;
  gap: var(--space-7);
`

const List = styled.div`
  display: grid;
  gap: var(--space-6);
`

const Job = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 2fr);
  gap: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--bt-hairline-soft);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
`

const JobHead = styled.div`
  display: grid;
  gap: 6px;
  align-content: start;
`

const Role = styled.h3`
  font: var(--weight-medium) var(--text-title) / 1.15 var(--font-display);
  letter-spacing: -0.015em;
`

const Bullets = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
`

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 8px;
  font: var(--type-body);
  color: var(--bt-text-2);
`

const Arrow = styled(Mono)`
  color: var(--bt-accent-1);
`

const Detail = styled.div`
  display: grid;
  gap: var(--space-4);
`

// §01 — timeline de empregos. Entra com stagger no scroll.
export function Experience() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('[data-job]'),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          immediateRender: false,
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="experiencia">
      <Inner>
        <SecHead n="§01" label="Experiência" title="Onde eu escrevi código que alguém usa" />
        <List ref={ref}>
          {cv.experiencia.map((j) => (
            <Job data-job key={j.empresa}>
              <JobHead>
                <Mono>{j.periodo}</Mono>
                <Mono $dim>{j.empresa}</Mono>
              </JobHead>
              <Detail>
                <Role>{j.cargo}</Role>
                <Bullets>
                  {j.bullets.map((b) => (
                    <Bullet key={b}>
                      <Arrow as="span">›</Arrow>
                      {b}
                    </Bullet>
                  ))}
                </Bullets>
              </Detail>
            </Job>
          ))}
        </List>
      </Inner>
    </Section>
  )
}
