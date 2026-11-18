import { useEffect, useRef, useState } from 'react'
import { cv } from './data/cv'
import { CyberCore } from './components/CyberCore'
import { GlitchText } from './components/motion/GlitchText'
import { NeuroPreview } from './components/NeuroPreview'
import { usePortfolioMotion } from './hooks/usePortfolioMotion'
import './styles/interface.css'

const external = { target: '_blank', rel: 'noopener noreferrer' }
const navigation = [
  ['Projetos', '#projetos'],
  ['Stack', '#stack'],
  ['Trajetória', '#trajetoria'],
]

function Arrow({ down = false }) {
  return (
    <svg
      className="m-arrow"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={down ? 'M12 4v16m-6-6 6 6 6-6' : 'M5 19 19 5M5 5h14v14'}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function SectionHead({ index, title, children }) {
  return (
    <div className="section-head">
      <h2>
        <span className="section-number">/{index}</span>
        {title}
      </h2>
      {children && <p>{children}</p>}
    </div>
  )
}

export default function App() {
  const rootRef = useRef(null)
  const menuButtonRef = useRef(null)
  const [menu, setMenu] = useState(false)
  const [paused, setPaused] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  usePortfolioMotion(rootRef)

  useEffect(() => {
    if (!menu) return
    const close = (event) => {
      if (event.key === 'Escape') {
        setMenu(false)
        menuButtonRef.current?.focus()
      }
    }
    const previousOverflow = document.body.style.overflow
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = (event) => {
      if (event.matches) setMenu(false)
    }
    document.body.style.overflow = 'hidden'
    rootRef.current?.querySelector('.nav__links a')?.focus()
    document.addEventListener('keydown', close)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', close)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menu])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(cv.email)
      setCopyStatus('E-mail copiado.')
    } catch {
      setCopyStatus(`Copie o endereço: ${cv.email}`)
    }
  }

  return (
    <div
      className="interface"
      ref={rootRef}
      data-motion={paused ? 'off' : 'on'}
    >
      <header className="nav nav--centre">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#conteudo">
            Pular para o conteúdo
          </a>
          <a
            className="nav__logo"
            href="#inicio"
            aria-label="Vinicius Butrico, início"
            onClick={() => setMenu(false)}
          >
            <span className="brand-mark" aria-hidden="true">
              b<span>_</span>
            </span>
            <span>
              butrico<span className="brand-suffix">31</span>
            </span>
          </a>
          <nav
            id="navigation"
            className={`nav__links ${menu ? 'is-open' : ''}`}
            aria-label="Navegação principal"
          >
            {navigation.map(([label, href], i) => (
              <a
                className="nav__link"
                key={href}
                href={href}
                onClick={() => setMenu(false)}
              >
                <span className="nav-index">0{i + 1}</span>
                {label}
              </a>
            ))}
            <a
              className="nav__link mobile-contact"
              href="#contato"
              onClick={() => setMenu(false)}
            >
              Contato <Arrow />
            </a>
          </nav>
          <div className="nav__actions">
            <a
              className="nav-contact"
              href="#contato"
              onClick={() => setMenu(false)}
            >
              Iniciar conversa <Arrow />
            </a>
          </div>
          <button
            ref={menuButtonRef}
            className="nav__toggle"
            type="button"
            aria-expanded={menu}
            aria-controls="navigation"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenu(!menu)}
          >
            {menu ? 'Fechar −' : 'Menu +'}
          </button>
        </div>
      </header>
      <main id="conteudo" tabIndex="-1" inert={menu}>
        <section
          className="hero hero--split"
          id="inicio"
          data-enter
          aria-labelledby="hero-title"
        >
          <div className="wrap">
            <div className="hero-text">
              <div className="hero__head">
                <div className="hero-heading">
                  <p className="identity">
                    <span className="status-dot" />
                    <span className="muted">Mogi Guaçu, SP</span>
                  </p>
                  <h1
                    id="hero-title"
                    aria-label="Vinicius Butrico"
                    data-enter-whole
                  >
                    <GlitchText>Vinicius</GlitchText>{' '}
                    <GlitchText>Butrico</GlitchText>
                  </h1>
                  <p className="hero-role">Desenvolvimento full stack</p>
                </div>
                <div className="hero-intro">
                  <span className="micro-label">
                    Interface → API → Automação
                  </span>
                  <p className="hero__lead">
                    Desenvolvo produtos web e conecto sistemas. Do primeiro
                    componente à lógica que faz a operação funcionar.
                  </p>
                  <div className="btn-row">
                    <a className="btn btn--primary" href="#projetos">
                      Ver projetos <Arrow down />
                    </a>
                    <a
                      className="btn btn--secondary"
                      href={`https://${cv.github}`}
                      {...external}
                    >
                      Ver GitHub <Arrow />
                    </a>
                  </div>
                </div>
              </div>
              <div className="hero__stage" data-three-scene="cyber-core">
                <span className="stage-word" aria-hidden="true">
                  BUTRICO
                </span>
                <CyberCore paused={paused} />
                <div
                  className="stage-coordinate coordinate-left"
                  aria-hidden="true"
                >
                  <span>VB—031</span>
                  <i />
                  <span>Creative developer</span>
                </div>
                <div
                  className="stage-coordinate coordinate-right"
                  aria-hidden="true"
                >
                  <span>Web / Sistemas / IA</span>
                  <span className="crosshair">+</span>
                </div>
                <button
                  className="motion-control"
                  onClick={() => setPaused(!paused)}
                  aria-pressed={paused}
                >
                  <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
                  {paused ? 'Retomar animação' : 'Pausar animação'}
                </button>
              </div>
              <div className="hero-foot">
                <span>
                  <span className="status-dot" />
                  Aberto a projetos freelance
                </span>
                <span className="hero-foot-middle">
                  React · Node.js · Java · Integrações
                </span>
                <a href="#projetos">
                  Continue o percurso <Arrow down />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section feature-section"
          id="projetos"
          aria-labelledby="neuro-title"
        >
          <div className="wrap">
            <SectionHead index="01" title="NeuroCorp.">
              <span>Produto próprio</span> / Full stack & IA
            </SectionHead>
            <div className="feature-intro">
              <div>
                <span className="micro-label">
                  Atendimento + CRM + Automação
                </span>
                <h3 id="neuro-title">
                  Atendimento conectado<span className="accent">.</span>
                </h3>
              </div>
              <div className="feature-copy">
                <p>
                  WhatsApp, agente de IA e CRM no mesmo fluxo. Uma plataforma
                  multiempresa que mantém o contexto entre a conversa e a
                  operação.
                </p>
                <a
                  className="project-source link"
                  href="https://github.com/butrico31/NeuroCorp"
                  {...external}
                >
                  Ver repositório <Arrow />
                </a>
              </div>
            </div>
            <div className="app-frame" data-visual>
              <NeuroPreview motion={!paused} />
            </div>
            <div className="feature-bottom">
              <span className="micro-label">Da interface à infraestrutura</span>
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
          </div>
        </section>
        <section
          className="section projects-section"
          id="arquivo"
          aria-label="Outros projetos"
        >
          <div className="wrap">
            <SectionHead index="02" title="Outras construções.">
              APIs, pagamentos e processos conectados.
            </SectionHead>
            <div className="project-list">
              {cv.projetos.map((project, i) => (
                <details
                  name="portfolio-projects"
                  className="project-row"
                  key={project.index}
                  open={i === 0}
                >
                  <summary>
                    <span className="project-index">0{i + 2}</span>
                    <div className="project-name">
                      <h3>{project.title}</h3>
                      <span>{project.client}</span>
                    </div>
                    <div className="project-row-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="project-year">{project.year}</span>
                    <span className="project-expand" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="project-expanded">
                    <p>{project.description}</p>
                    <span className="micro-label">
                      {i < 2 ? 'Projeto acadêmico' : 'Projeto profissional'}
                    </span>
                  </div>
                </details>
              ))}
            </div>
            <div className="archive-footer">
              <span className="micro-label">
                Mais experimentos e código aberto
              </span>
              <a className="link" href={`https://${cv.github}`} {...external}>
                Ver GitHub <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section
          className="section stack-section"
          id="stack"
          aria-labelledby="stack-title"
        >
          <div className="wrap">
            <h2
              id="stack-title"
              className="stack-statement"
              data-moment="liquid-type"
              data-moment-opts='{"strength":0.6}'
            >
              Entre a interface
              <br />e o <span>sistema.</span>
            </h2>
            <div className="stack-content">
              <div className="about-copy">
                <span className="micro-label">/03 — Por trás do código</span>
                <p>
                  Sou Vinicius. Trabalho com desenvolvimento web, APIs REST e
                  automações que conectam ferramentas e processos.
                </p>
                <p>
                  De gateways de pagamento a fluxos de atendimento, gosto de
                  entender a operação antes de escrever o código.
                </p>
                <a
                  className="link"
                  href={`https://${cv.linkedin}`}
                  {...external}
                >
                  Ver LinkedIn <Arrow />
                </a>
              </div>
              <div className="toolchain">
                {[
                  ['Front-end', 'React / Vue.js / LWC', 'react'],
                  ['Back-end', 'Node.js / Java / Spring Boot', 'nodejs'],
                  [
                    'Dados & infraestrutura',
                    'PostgreSQL / MongoDB / Redis / Docker',
                    'mongodb',
                  ],
                  ['Integrações', 'APIs REST / N8N / Salesforce', 'salesforce'],
                ].map(([name, text, icon]) => (
                  <div className="toolchain-row" key={name}>
                    <span className="toolchain-icon">
                      <img
                        src={`/assets/icons/${icon}.svg`}
                        alt=""
                        width="28"
                        height="28"
                        loading="lazy"
                      />
                    </span>
                    <div>
                      <h3>{name}</h3>
                      <p>{text}</p>
                    </div>
                    <span className="toolchain-plus" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="section trajectory-section"
          id="trajetoria"
          data-moment="line-carries-colour"
          aria-label="Experiência e formação"
        >
          <div className="wrap">
            <SectionHead index="04" title="Código em contexto.">
              Experiência profissional e formação.
            </SectionHead>
            <div className="trajectory-layout">
              <div className="trajectory-lead">
                <span className="micro-label">Desenvolvimento na prática</span>
                <p>
                  Produtos web.
                  <br />
                  Integrações.
                  <br />
                  <span>Operações reais.</span>
                </p>
                <div className="education">
                  <span className="micro-label">Formação</span>
                  {cv.formacao.map((item) => (
                    <div key={item.curso}>
                      <h3>{item.curso}</h3>
                      <p>{item.escola}</p>
                      <span>{item.periodo}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="experience-list">
                {cv.experiencia.map((item, i) => (
                  <article className="experience" key={item.empresa}>
                    <div className="experience-date">
                      <span>0{i + 1}</span>
                      {item.periodo}
                    </div>
                    <h3>{item.empresa}</h3>
                    <p className="experience-role">{item.cargo}</p>
                    <ul>
                      {item.bullets.slice(0, 3).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        inert={menu}
        className="closing footer--dark"
        id="contato"
        aria-labelledby="contact-title"
      >
        <div className="wrap">
          <div className="close-word">
            <div className="contact-topline">
              <span className="micro-label">/05 — Próxima conexão</span>
              <span>
                <span className="status-dot" />
                Projetos freelance
              </span>
            </div>
            <h2 id="contact-title">
              Seu próximo projeto.
              <br />
              <span>Vamos construir.</span>
            </h2>
            <div className="contact-actions">
              <a className="btn btn--primary" href={`mailto:${cv.email}`}>
                Iniciar conversa <Arrow />
              </a>
              <button className="copy-email" onClick={copyEmail}>
                Copiar e-mail <span aria-hidden="true">⧉</span>
              </button>
              <span className="copy-status" role="status">
                {copyStatus}
              </span>
            </div>
            <a className="contact-email" href={`mailto:${cv.email}`}>
              {cv.email}
              <Arrow />
            </a>
          </div>
          <div className="footer-directory">
            <div className="footer-wordmark" aria-hidden="true">
              BUTRICO<span>_</span>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Vinicius Butrico</span>
              <div className="social-links">
                <a href={`https://${cv.github}`} {...external}>
                  GitHub <Arrow />
                </a>
                <a href={`https://${cv.linkedin}`} {...external}>
                  LinkedIn <Arrow />
                </a>
                <a
                  href={`https://wa.me/55${cv.telefone.replace(/\D/g, '')}`}
                  {...external}
                >
                  WhatsApp <Arrow />
                </a>
              </div>
              <a href="#inicio">
                Voltar ao topo <Arrow />
              </a>
            </div>
            <p className="trademark-credit">
              Nomes e marcas das tecnologias pertencem a seus respectivos
              titulares.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
