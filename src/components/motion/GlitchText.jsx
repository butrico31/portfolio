import { Children } from 'react'
import styled from 'styled-components'

// Achata qualquer children de React em texto puro (para os fantasmas ciano/magenta).
function flatten(node) {
  if (node == null || node === false || node === true) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flatten).join('')
  if (node.props && node.props.children !== undefined)
    return flatten(node.props.children)
  return ''
}

const Root = styled.span`
  position: relative;
  display: inline-block;
  font: ${(p) => p.$font};
  background-image: ${(p) => p.$gradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Base = styled.span`
  position: relative;
  z-index: 2;
`

const Ghost = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  font: ${(p) => p.$font};
  pointer-events: none;
  -webkit-text-fill-color: currentColor;
  background-image: none;
  opacity: ${(p) => 0.85 * (p.$intensity ?? 1)};
  white-space: pre;
  mix-blend-mode: screen;
  z-index: 1;
  color: ${(p) => p.$color};
  animation: ${(p) => p.$anim};
`

const Scan = styled.span`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.16) 0 1px,
    transparent 1px 3px
  );
  animation: bt-scan 5.5s linear infinite;
  opacity: ${(p) => 0.5 * (p.$intensity ?? 1)};
`

/**
 * Glitch de interferência: três camadas do mesmo texto (base + fantasma ciano
 * + fantasma magenta) recortadas por clip-path e deslocadas em passos, mais
 * linhas de varredura. Dispara em rajadas curtas via keyframes.
 */
export function GlitchText({
  children,
  text,
  font,
  gradient = 'var(--bt-gradient)',
  intensity = 1,
  as = 'span',
  ...rest
}) {
  const label = text != null ? String(text) : flatten(Children.toArray(children))
  return (
    <Root as={as} $font={font} $gradient={gradient} data-glitch={label} {...rest}>
      <Base>{children}</Base>
      {label && (
        <Ghost
          aria-hidden="true"
          $font={font}
          $intensity={intensity}
          $color="#8BE9FD"
          $anim="bt-glitch-a 3.1s steps(1) infinite"
        >
          {label}
        </Ghost>
      )}
      {label && (
        <Ghost
          aria-hidden="true"
          $font={font}
          $intensity={intensity}
          $color="#FF79C6"
          $anim="bt-glitch-b 2.4s steps(1) infinite"
        >
          {label}
        </Ghost>
      )}
      {label && <Scan aria-hidden="true" $intensity={intensity} />}
    </Root>
  )
}
