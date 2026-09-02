import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { Wrap, Mono, KV, Cols2 } from '../../styles/primitives'
import { GlitchText } from '../motion/GlitchText'
import { Button } from '../core/Button'
import { Typewriter } from './Typewriter'
import { cv } from '../../data/cv'

const Sec = styled.section`
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 112px 0 88px;
`

const Stack = styled.div`
  display: grid;
  gap: var(--space-6);
  width: 100%;
`

const Name = styled.h1`
  margin: 0;
  display: grid;
  gap: 0.06em;
  justify-items: start;
`

const Titles = styled.p`
  font: 300 clamp(1.25rem, 2.4vw, 2rem) / 1.25 var(--bt-font-tech);
  color: var(--bt-text);
  min-height: 1.3em;
`

const Summary = styled.p`
  font: var(--weight-regular) var(--text-body-lg) / 1.55 var(--font-body);
  color: var(--bt-text-2);
  max-width: 54ch;
`

const Value = styled.span`
  font: var(--type-body);
  word-break: break-word;
`

const Actions = styled.div`
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-4);
`

const NAME_FONT = '400 clamp(2.5rem,7.6vw,7rem)/1.02 var(--bt-font-name)'

const SPEC = [
  ['função', cv.funcao],
  ['stack principal', 'Node.js · Spring Boot · Vue · React'],
  ['formação', 'Sistemas de Informação — 8º sem.'],
  ['desde', '2023 em produção'],
]
const LINKS = [
  ['github', cv.github],
  ['linkedin', 'vinicius-butrico-de-freitas'],
  ['site', cv.site],
  ['telefone', cv.telefone],
]

// Ficha técnica de abertura: nome + tabela chave/valor. Anima no load.
export function Intro() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.15,
          clearProps: 'opacity,transform',
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Sec id="topo">
      <Wrap>
        <Stack ref={ref}>
          <Mono $dim>
            {cv.funcao} · {cv.local}
          </Mono>
          <Name>
            <GlitchText font={NAME_FONT} text="Vinicius">
              Vinicius
            </GlitchText>
            <GlitchText font={NAME_FONT} text="Butrico">
              Butrico
            </GlitchText>
          </Name>
          <Titles>
            <Typewriter items={cv.titulos} />
          </Titles>
          <Summary>{cv.resumo}</Summary>
          <Cols2 $gap="var(--space-7)">
            <div>
              {SPEC.map(([k, v]) => (
                <KV key={k}>
                  <Mono $dim>{k}</Mono>
                  <Value>{v}</Value>
                </KV>
              ))}
            </div>
            <div>
              {LINKS.map(([k, v]) => (
                <KV key={k}>
                  <Mono $dim>{k}</Mono>
                  <Value>{v}</Value>
                </KV>
              ))}
            </div>
          </Cols2>
          <Actions>
            <Button size="lg" href={`https://${cv.github}`}>
              Ver GitHub
            </Button>
            <Button size="lg" variant="secondary" href="#projetos">
              Ver projetos
            </Button>
            <Button size="lg" variant="secondary" onClick={() => window.open(`https://wa.me/${cv.telefone.replace(/\D/g, '')}`, '_blank')}>
              Falar comigo
            </Button>
          </Actions>
        </Stack>
      </Wrap>
    </Sec>
  )
}
