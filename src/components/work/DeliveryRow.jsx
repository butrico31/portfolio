import styled from 'styled-components'
import { Mono } from '../../styles/primitives'

const Row = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) auto;
  align-items: baseline;
  gap: var(--space-5);
  padding: var(--space-5) 0;
  border: 0;
  border-bottom: 1px solid var(--bt-hairline-soft);
  color: var(--bt-text);
  transition: var(--transition-hover);

  &:hover {
    color: var(--bt-accent-1);
    border-bottom-color: var(--bt-hairline-soft);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`

const Title = styled.span`
  font: var(--weight-medium) var(--text-title) / 1.1 var(--font-display);
  letter-spacing: var(--tracking-title);
  transition: transform var(--dur-base) var(--ease-out-expo);

  ${Row}:hover & {
    transform: translateX(10px);
  }
`

// Linha de "outras entregas": título desliza 10px e vira roxo no hover.
export function DeliveryRow({ title, meta, year }) {
  return (
    <Row href="#projetos">
      <Title>{title}</Title>
      <Mono $dim>{meta}</Mono>
      <Mono $dim>{year}</Mono>
    </Row>
  )
}
