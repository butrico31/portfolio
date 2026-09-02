// Tema para o ThemeProvider do styled-components.
// Os tokens completos da marca (paleta roxa, superfícies, fontes, sintaxe
// Dracula) vivem como CSS custom properties em GlobalStyle — aqui ficam só
// os atalhos que ajudam a escrever media queries e componentes.
export const theme = {
  bp: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
  },
  container: '1240px',
  gutter: 'clamp(20px, 4.2vw, 56px)',
  topBar: '52px',
  statusBar: '44px',
  accent: '#A855F7',
  accentDeep: '#7E3AF2',
  gradient: 'linear-gradient(135deg, #A855F7 0%, #7E3AF2 100%)',
}

export const media = {
  sm: `@media (max-width: ${theme.bp.sm})`,
  md: `@media (max-width: ${theme.bp.md})`,
  lg: `@media (max-width: ${theme.bp.lg})`,
  reduce: '@media (prefers-reduced-motion: reduce)',
}
