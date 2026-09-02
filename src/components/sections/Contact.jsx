import { useState } from 'react'
import styled from 'styled-components'
import { Wrap, Mono, Section, Rule } from '../../styles/primitives'
import { SecHead } from './SecHead'
import { Button } from '../core/Button'
import { cv } from '../../data/cv'

const Sec = styled(Section)`
  padding-bottom: clamp(120px, 14vw, 200px);
`

const Inner = styled(Wrap)`
  display: grid;
  gap: var(--space-6);
`

const BigMail = styled.a`
  font: var(--weight-medium) clamp(1.75rem, 5.4vw, 4.5rem) / 1 var(--font-display);
  letter-spacing: -0.035em;
  border-bottom: none;
  word-break: break-word;
`

const Actions = styled.div`
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
`

const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
`

// §05 — e-mail gigante, links e copiar telefone.
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyPhone = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(cv.telefone)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Sec id="contato">
      <Inner>
        <SecHead
          n="§05"
          label="Contato"
          title="Tem um sistema que precisa conversar com outro?"
          note="Respondo e-mail e WhatsApp no mesmo dia."
        />
        <BigMail href={`mailto:${cv.email}`}>{cv.email}</BigMail>
        <Actions>
          <Button href={`https://${cv.github}`}>GitHub</Button>
          <Button variant="secondary" href={`https://${cv.linkedin}`}>
            LinkedIn
          </Button>
          <Button variant="secondary" href={`https://${cv.site}`}>
            {cv.site}
          </Button>
          <Button as="button" variant="ghost" type="button" onClick={copyPhone}>
            {copied ? 'telefone copiado' : 'copiar telefone'}
          </Button>
        </Actions>
        <Rule style={{ marginTop: 'var(--space-6)' }} />
        <FootRow>
          <Mono $dim>© 2026 {cv.nome}</Mono>
          <Mono $dim>Mogi Guaçu · SP · Brasil</Mono>
        </FootRow>
      </Inner>
    </Sec>
  )
}
