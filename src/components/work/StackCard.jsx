import styled from 'styled-components'

// tons opacos — obrigatórios em pilha, senão o card de baixo vaza.
const TONES = {
  dark: {
    bg: 'var(--ink-800)',
    fg: 'var(--paper-200)',
    muted: 'var(--ink-300)',
    line: 'rgba(246,243,238,.20)',
    media: 'var(--ink-700)',
  },
  light: {
    bg: 'var(--paper-100)',
    fg: 'var(--ink-900)',
    muted: 'var(--ink-500)',
    line: 'rgba(10,10,10,.14)',
    media: 'var(--paper-300)',
  },
  brand: {
    bg: 'var(--bt-card-solid)',
    fg: 'var(--bt-text)',
    muted: 'var(--bt-text-2)',
    line: 'var(--bt-accent-border)',
    media: 'var(--bt-card-inner-solid)',
  },
  'brand-deep': {
    bg: 'var(--bt-card-inner-solid)',
    fg: 'var(--bt-text)',
    muted: 'var(--bt-text-2)',
    line: 'var(--bt-accent-border)',
    media: 'var(--bt-card-inner-2-solid)',
  },
}

const Article = styled.article`
  position: sticky;
  top: var(--stack-top);
  border-radius: 14px;
  overflow: hidden;
  background: ${(p) => p.$t.bg};
  color: ${(p) => p.$t.fg};
  border: 1px solid ${(p) => p.$t.line};
  box-shadow: 0 -1px 0 rgba(10, 10, 10, 0.1), 0 -28px 60px -34px rgba(10, 10, 10, 0.42);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  min-height: clamp(360px, 58vh, 620px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: 0;
  }
`

const Body = styled.div`
  padding: clamp(24px, 3vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
`

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: ${(p) => p.$muted};
`

const Head = styled.div`
  display: grid;
  gap: var(--space-4);
`

const Title = styled.h3`
  font: var(--weight-medium) var(--text-display-2) / 0.94 var(--font-display);
  letter-spacing: var(--tracking-display);
`

const Client = styled.p`
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: ${(p) => p.$muted};
`

const Desc = styled.p`
  font: var(--type-body);
  max-width: 42ch;
  color: ${(p) => p.$muted};
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`

const TagChip = styled.span`
  padding: 6px 12px 5px;
  border-radius: 999px;
  border: 1px solid ${(p) => p.$line};
  font: var(--type-label);
  font-size: var(--text-caption);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  white-space: nowrap;
  color: ${(p) => p.$fg};
`

const Media = styled.div`
  background: ${(p) => p.$media};
  position: relative;
  min-height: ${(p) => (p.$compact ? '260px' : 'auto')};

  @media (max-width: 900px) {
    min-height: 260px;
  }
`

// Card de projeto que empilha no scroll. Metade do card é o painel de código.
export function StackCard({
  index,
  title,
  client,
  year,
  tags = [],
  description,
  tone = 'light',
  media,
  style,
  className,
}) {
  const t = TONES[tone] || TONES.light
  return (
    <Article $t={t} style={style} className={className}>
      <Body>
        <Meta $muted={t.muted}>
          <span>{index}</span>
          <span>{year}</span>
        </Meta>
        <Head>
          <Title>{title}</Title>
          {client && <Client $muted={t.muted}>{client}</Client>}
          {description && <Desc $muted={t.muted}>{description}</Desc>}
          {tags.length > 0 && (
            <Tags>
              {tags.map((x) => (
                <TagChip key={x} $line={t.line} $fg={t.fg}>
                  {x}
                </TagChip>
              ))}
            </Tags>
          )}
        </Head>
      </Body>
      <Media $media={t.media}>{media || null}</Media>
    </Article>
  )
}
