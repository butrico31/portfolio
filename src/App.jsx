import { useRef, useState } from 'react'
import { GlitchText } from './components/motion/GlitchText'
import { cv } from './data/cv'
import { Circuit } from './components/Circuit'
import { NeuroPreview } from './components/NeuroPreview'
import { usePortfolioMotion } from './hooks/usePortfolioMotion'
import { ScrollStars, SectionCircuit } from './components/motion/PageAtmosphere'
import './styles/interface.css'

const external = { target: '_blank', rel: 'noreferrer' }
const nameFont = '400 clamp(3.5rem, 8.1vw, 8rem)/.98 "Neocrash", sans-serif'
const Arrow = () => <span aria-hidden="true">↗</span>

function SectionLabel({ number, children, note }) {
  return (
    <div className="section-label">
      <span className="section-index">{number}</span>
      <span>{children}</span>
      <i />
      <span className="section-note">{note}</span>
    </div>
  )
}

export default function App() {
  const interfaceRef = useRef(null)
  const [menu, setMenu] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  usePortfolioMotion(interfaceRef, true)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(cv.email)
      setCopyStatus('E-mail copiado!')
    } catch {
      setCopyStatus(`Copie o endereço: ${cv.email}`)
    }
  }

  return (
    <div
      ref={interfaceRef}
      className="interface"
      data-motion="on"
    >
      <ScrollStars />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="topbar">
        <a
          className="brand"
          href="#inicio"
          aria-label="Vinicius Butrico, início"
        >
          <span className="brand-symbol">
            VB<span>_</span>
          </span>
          <span>
            BUTRICO<span className="brand-id">31</span>
            <small>PERSONAL INTERFACE</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? 'FECHAR −' : 'MENU +'}
        </button>
        <nav
          id="navigation"
          className={menu ? 'navigation is-open' : 'navigation'}
          aria-label="Navegação principal"
        >
          {[
            ['01', 'Projetos', '#projetos'],
            ['02', 'Sobre', '#sobre'],
            ['03', 'Contato', '#contato'],
          ].map(([n, label, href]) => (
            <a href={href} key={n} onClick={() => setMenu(false)}>
              <span>{n} /</span> {label}
            </a>
          ))}
        </nav>
        <a
          className="header-github"
          href={`https://${cv.github}`}
          {...external}
        >
          GITHUB <Arrow />
        </a>
      </header>
      <main id="conteudo">
        <section
          className="hero shell"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span>
              <i className="status-dot" /> DESENVOLVEDOR FULL STACK
            </span>
            <span>
              BRASIL / SP <span className="muted">—</span> UTC−03
            </span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span>//</span> IDEIAS EM CONSTRUÇÃO. SISTEMAS EM EVOLUÇÃO.
              </p>
              <h1 id="hero-title">
                <GlitchText
                  font={nameFont}
                  gradient="linear-gradient(160deg, #e6b6ff 0%, #b776f5 48%, #8253d9 100%)"
                >
                  VINICIUS
                </GlitchText>
                <GlitchText
                  font={nameFont}
                  gradient="linear-gradient(160deg, #e6b6ff 0%, #b776f5 48%, #8253d9 100%)"
                >
                  BUTRICO
                </GlitchText>
                <span className="name-cursor" aria-hidden="true">
                  _
                </span>
              </h1>
              <p className="hero-statement">
                Da interface ao que
                <br />
                acontece <span>por trás dela.</span>
              </p>
              <p className="hero-description">
                Desenvolvo produtos web, conecto sistemas e automatizo
                processos. Gosto de entender como as coisas funcionam — e de
                fazer funcionar melhor.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projetos">
                  EXPLORAR PROJETOS <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href="#contato">
                  Vamos conversar <Arrow />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-label">
                <span>VB / NEURAL INTERFACE</span>
                <span className="cyan">[ CONNECTED ]</span>
              </div>
              <Circuit />
              <a className="hero-feature" href="#neurocorp">
                <span className="feature-indicator" aria-hidden="true">
                  N<span>↗</span>
                </span>
                <span>
                  <small>EM DESTAQUE / 01</small>
                  <strong>NeuroCorp</strong>
                  <span>Atendimento. CRM. Automação.</span>
                </span>
                <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              WEB DEVELOPMENT <b>×</b> SYSTEM INTEGRATION <b>×</b> AUTOMATION
            </span>
            <a href="#projetos">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section
          id="projetos"
          className="work shell"
          aria-labelledby="work-title"
        >
          <SectionCircuit placement="work" />
          <SectionLabel number="01" note="SELECTED WORK">
            PROJETOS SELECIONADOS
          </SectionLabel>
          <div className="section-heading">
            <h2 id="work-title">
              Código que
              <br />
              <span>virou produto.</span>
            </h2>
            <p>
              Produtos, integrações e os problemas
              <br className="desktop-break" /> que me fizeram escrever código.
            </p>
          </div>
          <article className="neuro-project" id="neurocorp">
            <div className="project-bar">
              <span>
                <i className="status-dot" /> PROJETO PRINCIPAL
              </span>
              <span>FULL STACK / SAAS MULTIEMPRESA</span>
            </div>
            <div className="neuro-intro">
              <div>
                <p className="eyebrow">01 / PLATAFORMA DE ATENDIMENTO</p>
                <h3>
                  Neuro<span>Corp</span>
                  <span className="project-dot">.</span>
                </h3>
              </div>
              <p>
                Uma conversa não deveria se perder
                <br />
                entre o atendimento e o CRM.
              </p>
            </div>
            <NeuroPreview />
            <div className="neuro-details">
              <div>
                <h4>Da primeira mensagem ao próximo passo.</h4>
                <p>
                  Uma plataforma que reúne WhatsApp, agente de IA e CRM. O
                  atendimento acompanha o contexto da conversa, enquanto a
                  operação organiza clientes e oportunidades no mesmo lugar.
                </p>
                <div className="tags">
                  {[
                    'React',
                    'Node.js',
                    'PostgreSQL',
                    'Redis',
                    'Docker',
                    'OpenAI',
                  ].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-facts">
                <div>
                  <span>O DESAFIO</span>
                  <p>
                    Conectar atendimento, dados e automação em uma arquitetura
                    multiempresa.
                  </p>
                </div>
                <div>
                  <span>A CONSTRUÇÃO</span>
                  <p>
                    Painel React, APIs de CRM e mensagens, processamento em
                    filas e agente de IA.
                  </p>
                </div>
                <a
                  className="text-link"
                  href="https://github.com/butrico31/NeuroCorp"
                  {...external}
                >
                  Explorar o projeto <Arrow />
                </a>
              </div>
            </div>
          </article>
          <div className="other-projects">
            <div className="projects-list-label">
              <span>OUTRAS CONSTRUÇÕES</span>
              <span>02 — 05</span>
            </div>
            {cv.projetos.map((project, i) => (
              <details className="project-row" key={project.index}>
                <summary>
                  <span className="row-number">0{i + 2}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.client}</p>
                  </div>
                  <div className="row-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="row-expand" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="project-expanded">
                  <p>{project.description}</p>
                  <span>
                    {project.year} /{' '}
                    {i < 2
                      ? 'PROJETO ACADÊMICO'
                      : 'PROJETO PROFISSIONAL · IMERSA TECNOLOGIA'}
                  </span>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section
          id="sobre"
          className="about shell"
          aria-labelledby="about-title"
        >
          <SectionCircuit placement="about" />
          <SectionLabel number="02" note="THE DEVELOPER">
            POR TRÁS DO CÓDIGO
          </SectionLabel>
          <div className="about-grid">
            <div>
              <p className="eyebrow">PRAZER, VINICIUS.</p>
              <h2 id="about-title">
                Curioso por natureza.
                <br />
                <span>Dev por escolha.</span>
              </h2>
              <p className="about-description">
                Meu lugar é entre a ideia e o sistema rodando. Trabalho com
                desenvolvimento web, APIs e automações, transitando entre a
                experiência de quem usa e a lógica que sustenta tudo.
              </p>
              <p className="about-description">
                De integrações de pagamento a fluxos de atendimento, gosto dos
                projetos em que as peças precisam conversar. O NeuroCorp é onde
                reúno muito do que venho construindo e aprendendo.
              </p>
              <a
                className="text-link"
                href={`https://${cv.github}`}
                {...external}
              >
                O código também conta a história <Arrow />
              </a>
            </div>
            <div className="toolchain">
              <div className="toolchain-heading">
                <span>TOOLCHAIN / CONECTADA</span>
                <span className="cyan">[ + ]</span>
              </div>
              {[
                ['FRONT-END', 'React / Vue.js / LWC'],
                ['BACK-END', 'Node.js / Java / Spring Boot'],
                ['DADOS & INFRA', 'PostgreSQL / MongoDB / Redis / Docker'],
                ['INTEGRAÇÕES', 'APIs REST / N8N / Salesforce'],
              ].map(([label, text], i) => (
                <div className="toolchain-row" key={label}>
                  <span className="toolchain-node" aria-hidden="true" />
                  <small>
                    0{i + 1} / {label}
                  </small>
                  <p>{text}</p>
                </div>
              ))}
              <span className="toolchain-footer">LEARN → BUILD → ITERATE</span>
            </div>
          </div>
          <div className="trajectory">
            <p className="eyebrow">
              NO CAMINHO<span> / EXPERIÊNCIA & FORMAÇÃO</span>
            </p>
            <div>
              {cv.experiencia.map((item) => (
                <div className="trajectory-item" key={item.empresa}>
                  <span>{item.periodo}</span>
                  <h3>{item.empresa}</h3>
                  <p>{item.cargo}</p>
                </div>
              ))}
              <div className="trajectory-item">
                <span>2023 — 2026 · PREVISTO</span>
                <h3>Sistemas de Informação</h3>
                <p>FHO Uniararas</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contato"
          className="contact shell"
          aria-labelledby="contact-title"
        >
          <SectionCircuit placement="contact" />
          <SectionLabel number="03" note="OPEN CHANNEL">
            ABRIR CONEXÃO
          </SectionLabel>
          <div className="contact-layout">
            <div>
              <p className="eyebrow">
                <i className="status-dot" /> ABERTO A PROJETOS FREELANCE
              </p>
              <h2 id="contact-title">
                Tem uma ideia?
                <br />
                <span>Vamos construir.</span>
                <span className="contact-cursor" aria-hidden="true">
                  _
                </span>
              </h2>
              <p>
                Um produto novo, uma integração ou uma boa conversa sobre
                código.
              </p>
            </div>
            <a
              className="contact-arrow"
              href={`mailto:${cv.email}`}
              aria-label="Enviar e-mail para Vinicius Butrico"
            >
              <Arrow />
            </a>
          </div>
          <div className="contact-bottom">
            <div className="email-group">
              <a href={`mailto:${cv.email}`}>{cv.email}</a>
              <button
                onClick={copyEmail}
                aria-label="Copiar endereço de e-mail"
                title="Copiar e-mail"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M8 8h12v13H8zM16 8V3H3v13h5" />
                </svg>
              </button>
              <span className="copy-status" role="status">
                {copyStatus}
              </span>
            </div>
            <div className="social-links">
              <a href={`https://${cv.github}`} {...external}>
                GitHub <Arrow />
              </a>
              <a href={`https://${cv.linkedin}`} {...external}>
                LinkedIn <Arrow />
              </a>
              <a href="https://wa.me/5519989751609" {...external}>
                WhatsApp <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer shell">
        <a href="#inicio" className="footer-brand">
          VB<span>_</span>{' '}
          <span>© {new Date().getFullYear()} VINICIUS BUTRICO</span>
        </a>
        <span className="footer-location">
          MOGI GUAÇU, BRASIL / CODE. BUILD. REPEAT.
        </span>
        <a href="#inicio" aria-label="Voltar ao início">
          ↑ TOPO
        </a>
      </footer>
    </div>
  )
}
