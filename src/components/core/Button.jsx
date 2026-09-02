import styled, { css } from 'styled-components'

const PAD = { sm: '9px 16px', md: '13px 24px', lg: '18px 34px' }
const FS = { sm: 'var(--text-caption)', md: 'var(--text-label)', lg: 'var(--text-body-sm)' }

const variants = {
  // CTA principal: gradiente roxo da marca.
  primary: css`
    background: var(--bt-gradient);
    color: #fff;
    box-shadow: 0 4px 15px var(--bt-accent-shadow);
    &:hover {
      box-shadow: 0 6px 20px var(--bt-accent-shadow-hover);
      color: #fff;
    }
  `,
  // Secundária: contorno roxo a 30%.
  secondary: css`
    background: transparent;
    color: var(--bt-text);
    border-color: var(--bt-accent-border);
    &:hover {
      border-color: var(--bt-accent-border-hover);
      color: var(--bt-text);
    }
  `,
  // Ghost: só texto com sublinhado fino (ex.: "copiar telefone").
  ghost: css`
    background: transparent;
    color: var(--bt-text-2);
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--bt-accent-border);
    padding: 6px 0;
    min-height: auto;
    &:hover {
      color: var(--bt-accent-1);
      border-bottom-color: var(--bt-accent-1);
    }
  `,
}

const StyledButton = styled.button.attrs((p) => ({
  as: p.href ? 'a' : p.as,
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: ${(p) => PAD[p.$size]};
  min-height: 44px;
  width: ${(p) => (p.$full ? '100%' : 'auto')};
  font: var(--weight-medium) ${(p) => FS[p.$size]} / 1 var(--font-mono);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: var(--bt-radius);
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-hover), transform var(--dur-fast) var(--ease-out-soft);
  ${(p) => variants[p.$variant]}

  &:active {
    transform: translateY(1px);
  }
`

// Botão pill. `variant`: primary | secondary | ghost. `size`: sm | md | lg.
// Vira <a> automaticamente quando recebe href.
export function Button({ variant = 'primary', size = 'md', full = false, ...rest }) {
  return <StyledButton $variant={variant} $size={size} $full={full} {...rest} />
}
