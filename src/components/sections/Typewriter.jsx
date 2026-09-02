import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Cursor = styled.span`
  color: var(--bt-accent-1);
  font-weight: 400;
  animation: blink 1s steps(1) infinite;
`

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Digita / apaga uma lista de frases em loop. Respeita prefers-reduced-motion.
export function Typewriter({ items, speed = 68, erase = 34, hold = 1700, gap = 320 }) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState(() => (reduceMotion() ? items[0] : ''))

  useEffect(() => {
    if (reduceMotion()) return
    const word = items[i % items.length]
    let n = 0
    let del = false
    let t

    const tick = () => {
      if (!del) {
        n++
        setTxt(word.slice(0, n))
        if (n === word.length) {
          del = true
          t = setTimeout(tick, hold)
          return
        }
      } else {
        n--
        setTxt(word.slice(0, n))
        if (n === 0) {
          t = setTimeout(() => setI((v) => v + 1), gap)
          return
        }
      }
      t = setTimeout(tick, del ? erase : speed)
    }

    t = setTimeout(tick, 260)
    return () => clearTimeout(t)
  }, [i, items, speed, erase, hold, gap])

  return (
    <span>
      {txt}
      <Cursor>_</Cursor>
    </span>
  )
}
