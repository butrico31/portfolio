import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { Wrap, Mono, Section } from '../../styles/primitives'
import { SecHead } from './SecHead'
import { StackCard } from '../work/StackCard'
import { CodePanel } from '../work/CodePanel'
import { DeliveryRow } from '../work/DeliveryRow'
import { cv } from '../../data/cv'

const Inner = styled(Wrap)`
  display: grid;
  gap: var(--space-7);
`

const Deck = styled.div`
  display: grid;
  gap: var(--space-6);
`

const Others = styled.div`
  margin-top: var(--space-6);
`

const OthersLabel = styled(Mono)`
  display: block;
  margin-bottom: var(--space-4);
`

// §02 — cards que empilham no scroll (sticky + escala 0.94 → 1 em scrub) e
// lista de outras entregas com stagger.
export function Projects() {
  const deck = useRef(null)
  const list = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const cards = deck.current
        ? gsap.utils.toArray(deck.current.querySelectorAll('article'))
        : []
      cards.forEach((card, i) => {
        if (!i) return
        gsap.fromTo(
          card,
          { scale: 0.94 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'top center',
              scrub: true,
            },
          },
        )
      })
      if (list.current) {
        gsap.fromTo(
          list.current.querySelectorAll('a'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: 'power3.out',
            immediateRender: false,
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: list.current, start: 'top 88%', once: true },
          },
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="projetos">
      <Inner>
        <SecHead
          n="§02"
          label="Projetos"
          title="Quatro coisas que eu construí de ponta a ponta"
          note="Role para empilhar. Dois acadêmicos, dois em produção na Imersa."
        />
        <Deck ref={deck}>
          {cv.projetos.map((p, i) => (
            <StackCard
              key={p.index}
              {...p}
              media={<CodePanel index={p.index} />}
              style={{ top: `calc(var(--stack-top) + ${i * 16}px)`, zIndex: i + 1 }}
            />
          ))}
        </Deck>
        <Others ref={list}>
          <OthersLabel $dim>outras entregas</OthersLabel>
          {cv.entregas.map((e) => (
            <DeliveryRow key={e.title} {...e} />
          ))}
        </Others>
      </Inner>
    </Section>
  )
}
