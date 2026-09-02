import styled from 'styled-components'
import { Wrap, Mono } from '../../styles/primitives'

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
`

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Item = styled(Mono)`
  display: flex;
  align-items: center;
  gap: 8px;

  ${(p) => p.$hideSm && '@media (max-width: 600px) { display: none; }'}
`

const Dot = styled.span`
  color: var(--bt-accent-1);
  animation: blink 1.6s steps(1) infinite;
`

const Cursor = styled.span`
  color: var(--bt-accent-1);
  animation: blink 1s steps(1) infinite;
`

// Barra de status fixa no rodapé — vocabulário de IDE: ponto piscando,
// marcador de branch e indicadores de encoding. Decorativa, sem texto pessoal.
export function StatusBar() {
  return (
    <Foot>
      <Bar>
        <Group>
          <Item as="span" $dim>
            <Dot>●</Dot>main
          </Item>
          <Item as="span" $dim $hideSm>
            §01—§05
          </Item>
        </Group>
        <Group>
          <Item as="span" $dim $hideSm>
            UTF-8
          </Item>
          <Item as="span" $dim $hideSm>
            LF
          </Item>
          <Item as="span" $dim>
            <Cursor>_</Cursor>
          </Item>
        </Group>
      </Bar>
    </Foot>
  )
}
