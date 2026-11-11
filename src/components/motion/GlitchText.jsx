import { Children } from 'react'

function flatten(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flatten).join('')
  return node.props?.children == null ? '' : flatten(node.props.children)
}

export function GlitchText({
  children,
  text,
  font,
  gradient = 'var(--bt-gradient)',
  intensity = 1,
  as: Element = 'span',
  className = '',
  style,
  ...rest
}) {
  const label =
    text != null ? String(text) : flatten(Children.toArray(children))

  return (
    <Element
      {...rest}
      className={`glitch-text ${className}`}
      data-glitch={label}
      style={{
        '--glitch-font': font,
        '--glitch-opacity': 0.85 * intensity,
        '--scan-opacity': 0.25 * intensity,
        backgroundImage: gradient,
        ...style,
      }}
    >
      <span className="glitch-base">{children ?? text}</span>
      {label && (
        <>
          <span className="glitch-ghost glitch-cyan" aria-hidden="true">
            {label}
          </span>
          <span className="glitch-ghost glitch-pink" aria-hidden="true">
            {label}
          </span>
          <span className="glitch-scan" aria-hidden="true" />
        </>
      )}
    </Element>
  )
}
