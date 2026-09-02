import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Wrap, Mono } from '../../styles/primitives'

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: rgba(15, 17, 19, 0.82);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bt-accent-border);
`

const Bar = styled(Wrap)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  height: 52px;
`

const Brand = styled.a`
  border-bottom: none;
  color: var(--bt-text);
`

const Nav = styled.nav`
  display: flex;
  gap: 22px;

  @media (max-width: 600px) {
    display: none;
  }
`

const NavLink = styled.a`
  border-bottom: none;
`

const Clock = styled(Mono)`
  font-variant-numeric: tabular-nums;
`

const NAV = [
  ['§01', '#experiencia'],
  ['§02', '#projetos'],
  ['§03', '#stack'],
  ['§04', '#formacao'],
  ['§05', '#contato'],
]

const nowInSaoPaulo = () =>
  new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

// Relógio de São Paulo, tabular-nums, atualiza a cada segundo.
export function TopBar() {
  const [time, setTime] = useState(nowInSaoPaulo)

  useEffect(() => {
    const id = setInterval(() => setTime(nowInSaoPaulo()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Header>
      <Bar>
        <Brand href="#topo">
          <Mono as="span">
            vinicius
            <Mono as="span" $dim>
              .butrico
            </Mono>
          </Mono>
        </Brand>
        <Nav>
          {NAV.map(([label, href]) => (
            <NavLink key={href} href={href}>
              <Mono as="span" $dim>
                {label}
              </Mono>
            </NavLink>
          ))}
        </Nav>
        <Clock as="span" $dim>
          SP {time}
        </Clock>
      </Bar>
    </Header>
  )
}
