import styled, { css } from 'styled-components'

// Container central do site — 1240px, gutter fluido.
export const Wrap = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4.2vw, 56px);
  width: 100%;
`

// Rótulo mono em caixa alta — navegação, metadados, números de seção.
export const Mono = styled.span`
  font: 500 var(--text-label) / 1.4 var(--font-mono);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  ${(p) =>
    p.$dim &&
    css`
      color: var(--bt-text-muted);
    `}
  ${(p) =>
    p.$accent &&
    css`
      color: var(--bt-accent-1);
    `}
`

// Bloco de seção com respiro vertical clamp(72px, 9vw, 132px).
export const Section = styled.section`
  padding: clamp(72px, 9vw, 132px) 0;
`

// Régua fina de 1px.
export const Rule = styled.div`
  height: 1px;
  background: var(--bt-hairline);
`

// Linha chave/valor da ficha técnica.
export const KV = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 180px) 1fr;
  gap: 10px 26px;
  padding: 10px 0;
  border-bottom: 1px solid var(--bt-hairline-soft);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`

// Grade de duas colunas que colapsa para uma no mobile.
export const Cols2 = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.$template || 'minmax(0, 1fr) minmax(0, 1fr)'};
  gap: ${(p) => p.$gap || 'var(--space-7)'};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`
