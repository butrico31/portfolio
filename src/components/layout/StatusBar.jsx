import styled from 'styled-components'
import { Wrap, Mono } from '../../styles/primitives'
import { cv } from '../../data/cv'

const Foot = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: var(--bt-bg-footer);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--bt-accent-border);
`

const Bar = styled(Wrap)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  height: 44px;
  flex-wrap: wrap;
`

const Status = styled(Mono)`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Dot = styled.span`
  color: var(--bt-accent-1);
  animation: blink 1.6s steps(1) infinite;
`

const Mail = styled.a`
  border-bottom: none;
`

// Barra de status fixa no rodapé — vocabulário de IDE: ponto piscando + disponibilidade.
export function StatusBar() {
  return (
    <Foot>
      <Bar>
        <Status as="span" $dim>
          <Dot>●</Dot>
          {cv.status}
        </Status>
        <Mail href={`mailto:${cv.email}`}>
          <Mono as="span">{cv.email}</Mono>
        </Mail>
      </Bar>
    </Foot>
  )
}
