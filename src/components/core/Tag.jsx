import styled from 'styled-components'

// Metadado curto (tecnologia, ano). Pill com borda roxa a 30%.
export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px 5px;
  border-radius: 999px;
  border: 1px solid var(--bt-accent-border);
  color: var(--bt-text);
  font: var(--type-label);
  font-size: var(--text-caption);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  white-space: nowrap;
`
