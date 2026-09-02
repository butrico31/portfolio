import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>-_\\/[]{}=+*!?#%&'
const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

// Substitui por ruído todos os caracteres ainda não revelados (espaços preservados).
const scramble = (text, revealed) =>
  Array.from(text, (ch, i) => (ch === ' ' || i < revealed ? ch : glyph())).join('')

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Texto que "decodifica": entra embaralhado e resolve da esquerda para a direita
 * quando o elemento cruza a viewport. Dispara uma única vez. Respeita
 * prefers-reduced-motion (mostra o texto final direto).
 */
export function DecodeText({ text, className, style, charsPerSecond = 26 }) {
  const ref = useRef(null)
  const [out, setOut] = useState(() => (reduceMotion() ? text : scramble(text, 0)))

  useEffect(() => {
    if (reduceMotion()) return
    const el = ref.current
    if (!el) return

    let raf = 0
    let startTs = 0
    let lastPaint = 0

    const step = (ts) => {
      if (!startTs) startTs = ts
      const revealed = ((ts - startTs) / 1000) * charsPerSecond
      if (revealed >= text.length) {
        setOut(text)
        return
      }
      if (ts - lastPaint > 45) {
        setOut(scramble(text, Math.floor(revealed)))
        lastPaint = ts
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect()
          raf = requestAnimationFrame(step)
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text, charsPerSecond])

  return (
    <span
      ref={ref}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      {/* Cópia invisível: reserva a caixa final para o conteúdo abaixo não pular. */}
      <span style={{ opacity: 0 }}>{text}</span>
      <span
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}
      >
        {out}
      </span>
    </span>
  )
}
