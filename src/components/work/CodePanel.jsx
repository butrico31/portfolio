import styled from 'styled-components'
import { SNIPPETS, SYN } from '../../data/snippets'

const Panel = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--bt-code-bg);
  border-left: 1px solid var(--bt-code-border);

  @media (max-width: 900px) {
    position: relative;
    inset: auto;
  }
`

const HeadBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bt-code-header);
  border-bottom: 1px solid var(--bt-code-border);
`

const FileName = styled.span`
  font: 500 11px / 1 var(--font-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--bt-code-muted);
`

const Bar = styled.span`
  width: 26px;
  height: 2px;
  background: var(--bt-accent-border);
`

const Pre = styled.pre`
  margin: 0;
  padding: clamp(16px, 2vw, 28px);
  overflow: hidden;
  font: 500 clamp(10px, 1vw, 13px) / 1.75 var(--font-mono);
  color: var(--bt-code-text);
  white-space: pre-wrap;
  word-break: break-word;
`

// A "mídia" do card de projeto: um log de código com realce por token (Dracula).
export function CodePanel({ index }) {
  const parts = SNIPPETS[index] || []
  return (
    <Panel>
      <HeadBar>
        <FileName>{index}.log</FileName>
        <Bar />
      </HeadBar>
      <Pre>
        {parts.map(([txt, kind], i) => (
          <span key={i} style={kind ? { color: SYN[kind] } : undefined}>
            {txt}
          </span>
        ))}
      </Pre>
    </Panel>
  )
}
