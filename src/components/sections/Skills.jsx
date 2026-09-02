import styled from 'styled-components'
import { Wrap, Mono, Section } from '../../styles/primitives'
import { SecHead } from './SecHead'
import { Tag } from '../core/Tag'
import { cv } from '../../data/cv'

const Inner = styled(Wrap)`
  display: grid;
  gap: var(--space-7);
`

const Group = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.55fr) minmax(0, 2fr);
  gap: var(--space-5);
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--bt-hairline-soft);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

// §03 — stack por categoria.
export function Skills() {
  return (
    <Section id="stack">
      <Inner>
        <SecHead
          n="§03"
          label="Stack"
          title="Ferramentas que eu uso sem consultar a documentação"
        />
        <div>
          {cv.stack.map(([grupo, itens]) => (
            <Group key={grupo}>
              <Mono $dim>{grupo}</Mono>
              <Chips>
                {itens.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </Chips>
            </Group>
          ))}
        </div>
      </Inner>
    </Section>
  )
}
