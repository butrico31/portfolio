import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

const views = ['Atendimento', 'Pipeline CRM', 'Arquitetura']
const repos = [
  ['NeuroCorp-Web', 'Interface', 'React + Vite'],
  ['NeuroCorp-Core', 'Mensagens', 'WhatsApp + WebSocket'],
  ['NeuroCorp-CRM', 'Plataforma', 'Node.js + PostgreSQL'],
  ['NeuroCorp', 'Agente', 'IA + Redis + Docker'],
]

export function NeuroPreview({ motion = true }) {
  const [view, setView] = useState(0)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    if (!motion) return
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
        )
      },
      contentRef,
    )
    return () => media.revert()
  }, [view, motion])
  return (
    <div className="neuro-preview">
      <div className="preview-toolbar">
        <span className="preview-logo">
          <span aria-hidden="true">✳</span> neurocorp
          <span className="preview-divider">/</span>
          <span className="preview-workspace">Workspace</span>
        </span>
        <span className="preview-demo">
          PRÉVIA CONCEITUAL · DADOS ILUSTRATIVOS
        </span>
      </div>
      <div className="preview-nav" aria-label="Visualizações do projeto">
        {views.map((label, i) => (
          <button
            key={label}
            aria-pressed={view === i}
            onClick={() => setView(i)}
          >
            <span className="preview-tab-icon" aria-hidden="true">
              {['▣', '◫', '⌘'][i]}
            </span>
            {label}
          </button>
        ))}
      </div>
      <div className="preview-content" ref={contentRef}>
        {view === 0 && (
          <div className="inbox-preview">
            <div className="inbox-list">
              <div className="inbox-list-heading">
                Conversas <span>03</span>
              </div>
              {[
                ['AS', 'Ana Silva', 'Quero conhecer a plataforma.', 'Agora'],
                ['LC', 'Lucas Costa', 'Perfeito, obrigado!', '12:40'],
                ['ML', 'Marina Lima', 'Podemos agendar uma conversa?', '11:32'],
              ].map(([initials, name, message, time], i) => (
                <div
                  className={`mock-conversation ${i === 0 ? 'selected' : ''}`}
                  key={initials}
                >
                  <span className="mock-avatar">{initials}</span>
                  <div>
                    <strong>
                      {name}
                      <small>{time}</small>
                    </strong>
                    <p>{message}</p>
                  </div>
                </div>
              ))}
              <div className="inbox-note">
                <i /> Atendimento humano + agente de IA
              </div>
            </div>
            <div className="mock-chat">
              <div className="chat-heading">
                <span className="mock-avatar">AS</span>
                <div>
                  <strong>Ana Silva</strong>
                  <small>WhatsApp · Em atendimento</small>
                </div>
                <span className="chat-badge">Agente de IA</span>
              </div>
              <div className="chat-messages">
                <span className="chat-date">CONVERSA DE EXEMPLO</span>
                <p className="chat-bubble incoming">
                  Oi! Quero conhecer a plataforma.<small>14:32</small>
                </p>
                <p className="chat-bubble outgoing">
                  Olá, Ana! Vamos lá. Você quer organizar o atendimento ou
                  acompanhar as oportunidades no CRM?
                  <small>
                    14:32 <span>✓✓</span>
                  </small>
                </p>
                <p className="chat-bubble incoming">
                  Os dois! Podemos conversar?<small>14:33</small>
                </p>
                <span className="chat-event">
                  ↗ Contexto disponível para o time
                </span>
              </div>
              <div className="chat-input" aria-hidden="true">
                <span>Conversa, contexto e próximo passo.</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        )}
        {view === 1 && (
          <div className="pipeline-preview">
            <div className="pipeline-heading">
              <strong>Oportunidades</strong>
              <span>FUNIL COMERCIAL / EXEMPLO</span>
            </div>
            <div className="pipeline-columns">
              {[
                ['Novo contato', ['Studio Aurora', 'Órbita Digital']],
                ['Em conversa', ['Horizonte Tech']],
                ['Proposta', ['Nexo Design']],
              ].map(([label, clients], i) => (
                <div className="pipeline-column" key={label}>
                  <h4>
                    <i
                      style={{
                        background: ['#9b87ca', '#5fa4c9', '#c59a57'][i],
                      }}
                    />
                    {label}
                    <span>{clients.length}</span>
                  </h4>
                  {clients.map((client, j) => (
                    <div className="pipeline-card" key={client}>
                      <small>OPORTUNIDADE 0{i + j + 1}</small>
                      <strong>{client}</strong>
                      <p>
                        {
                          [
                            'Primeiro contato via WhatsApp',
                            'Entendendo a operação',
                            'Proposta em análise',
                          ][i]
                        }
                      </p>
                      <span>
                        Empresa fictícia <b>↗</b>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {view === 2 && (
          <div className="architecture-preview">
            <div className="architecture-heading">
              <strong>Uma plataforma. Quatro camadas.</strong>
              <p>Responsabilidades separadas, dados e contexto conectados.</p>
            </div>
            <div className="architecture-nodes">
              {repos.map(([repo, role, stack], i) => (
                <a
                  key={repo}
                  href={`https://github.com/butrico31/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <small>
                    0{i + 1} / {role}
                  </small>
                  <strong>{repo}</strong>
                  <span>{stack}</span>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
            <div className="architecture-data">
              <span>PostgreSQL + pgvector</span>
              <i />
              <span>Redis + BullMQ</span>
              <i />
              <span>WhatsApp Cloud API</span>
            </div>
          </div>
        )}
      </div>
      <div className="preview-status">
        <span>
          <i /> {views[view].toUpperCase()} / NEUROCORP
        </span>
        <span>PRODUTO CONECTADO, DE PONTA A PONTA</span>
      </div>
    </div>
  )
}
