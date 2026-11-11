import styled from 'styled-components'
import { Mono } from '../../styles/primitives'
import { DecodeText } from '../motion/DecodeText'

const Header = styled.header`
  display: grid;
  gap: var(--space-4);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--bt-hairline);
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
`

const Title = styled.h2`
  font: var(--weight-medium) var(--text-display-2) / 0.96 var(--font-display);
  letter-spacing: -0.03em;
  max-width: 22ch;
`

const Note = styled.p`
  font: var(--type-body);
  color: var(--bt-text-muted);
  max-width: 52ch;
`

// Cabeçalho de seção: rótulo à esquerda, número §NN em roxo à direita, régua fina.
export function SecHead({ n, label, title, note }) {
  return (
    <Header>
      <Row>
        <Mono $dim>{label}</Mono>
        <Mono $accent>{n}</Mono>
      </Row>
      <Title>
        <DecodeText text={title} />
      </Title>
      {note && <Note>{note}</Note>}
    </Header>
  )
}
