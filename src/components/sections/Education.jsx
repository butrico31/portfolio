import styled from 'styled-components'
import { Wrap, Mono, Section, KV, Cols2 } from '../../styles/primitives'
import { SecHead } from './SecHead'
import { cv } from '../../data/cv'

const Inner = styled(Wrap)`
  display: grid;
  gap: var(--space-7);
`

const Entry = styled.div`
  display: grid;
  gap: 6px;
  padding: var(--space-5) 0;
  border-top: 1px solid var(--bt-hairline-soft);
`

const Course = styled.h3`
  font: var(--weight-medium) var(--text-subtitle) / 1.2 var(--font-display);
  letter-spacing: -0.015em;
`

const School = styled.span`
  font: var(--type-body);
  color: var(--bt-text-muted);
`

const Value = styled.span`
  font: var(--type-body);
`

// §04 — formação e idiomas.
export function Education() {
  return (
    <Section id="formacao">
      <Inner>
        <SecHead n="§04" label="Formação" title="Estudo e idiomas" />
        <Cols2 $template="minmax(0, 1.4fr) minmax(0, 1fr)" $gap="var(--space-7)">
          <div>
            {cv.formacao.map((e) => (
              <Entry key={e.curso}>
                <Mono $dim>
                  {e.periodo}
                  {e.nota ? ` · ${e.nota}` : ''}
                </Mono>
                <Course>{e.curso}</Course>
                <School>{e.escola}</School>
              </Entry>
            ))}
          </div>
          <div>
            {cv.idiomas.map(([l, n]) => (
              <KV key={l}>
                <Mono $dim>{l}</Mono>
                <Value>{n}</Value>
              </KV>
            ))}
          </div>
        </Cols2>
      </Inner>
    </Section>
  )
}
