import { createGlobalStyle } from 'styled-components'

// Tokens da marca importados de github.com/butrico31/portfolio (src/index.css)
// e do design system "Mono Portfólio". Tema fixo escuro/roxo.
export const GlobalStyle = createGlobalStyle`
  /* Fontes reais do repositório original */
  @font-face{
    font-family:"Neocrash";
    src:url("/fonts/Neocrash.ttf") format("truetype");
    font-display:swap;
  }
  @font-face{
    font-family:"Sdglitch";
    src:url("/fonts/Sdglitch.ttf") format("truetype");
    font-display:swap;
  }
  @font-face{
    font-family:"TechnoCharm";
    src:url("/fonts/TechnoCharm.otf") format("opentype");
    font-display:swap;
  }

  @import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,300..900;1,300..900&family=JetBrains+Mono:wght@400;500&display=swap");

  :root{
    /* ----- acento roxo ----- */
    --bt-accent:rgba(168,85,247,.95);
    --bt-accent-1:#A855F7;
    --bt-accent-2:#7E3AF2;
    --bt-accent-faint:rgba(168,85,247,.15);
    --bt-accent-border:rgba(168,85,247,.3);
    --bt-accent-border-hover:rgba(168,85,247,.6);
    --bt-accent-shadow:rgba(168,85,247,.3);
    --bt-accent-shadow-hover:rgba(168,85,247,.4);
    --bt-accent-glow:rgba(168,85,247,.5);
    --bt-accent-hover-bg:rgba(168,85,247,.1);
    --bt-gradient:linear-gradient(135deg,#A855F7 0%,#7E3AF2 100%);
    --bt-particle:linear-gradient(180deg,#A855F7 0%,#7E3AF2 100%);
    --bt-particle-shadow:rgba(126,58,242,.4);

    /* ----- fundos ----- */
    --bt-bg:#0F1113;
    --bt-bg-2:#1A1D21;
    --bt-bg-3:#0D0E10;
    --bt-bg-footer:rgba(10,10,11,.8);
    --bt-bg-contact:rgba(26,27,30,.5);
    --bt-page-gradient:linear-gradient(180deg,#0F1113 0%,#1A1D21 25%,#0D0E10 50%,#1A1D21 75%,#0F1113 100%);
    --bt-card:rgba(40,42,54,.9);
    --bt-card-inner:rgba(33,34,44,.8);
    --bt-card-inner-2:rgba(25,26,33,.8);
    /* versões opacas — obrigatórias em cards empilhados */
    --bt-card-solid:#282A36;
    --bt-card-inner-solid:#21222C;
    --bt-card-inner-2-solid:#191A21;

    /* ----- texto ----- */
    --bt-text:#E6E6E6;
    --bt-text-2:rgba(230,230,230,.8);
    --bt-text-muted:rgba(230,230,230,.6);
    --bt-hairline:rgba(230,230,230,.12);
    --bt-hairline-soft:rgba(230,230,230,.1);

    /* ----- editor de código (Dracula) ----- */
    --bt-code-bg:#282A36;
    --bt-code-header:#21222C;
    --bt-code-text:#F8F8F2;
    --bt-code-muted:#6272A4;
    --bt-code-border:#191A21;
    --syn-keyword:#FF79C6;
    --syn-string:#F1FA8C;
    --syn-number:#BD93F9;
    --syn-key:#8BE9FD;
    --syn-type:#8BE9FD;
    --syn-comment:#6272A4;
    --syn-punctuation:#FF79C6;
    --syn-operator:#FF79C6;

    /* ----- tipografia da marca ----- */
    --bt-font-name:"Neocrash",sans-serif;
    --bt-font-tech:"TechnoCharm",sans-serif;
    --bt-font-glitch:"Sdglitch",sans-serif;
    --font-display:"Archivo","Archivo Expanded",Helvetica Neue,Helvetica,sans-serif;
    --font-body:"Archivo",Helvetica Neue,Helvetica,sans-serif;
    --font-mono:"JetBrains Mono",ui-monospace,Menlo,monospace;
    --bt-radius:8px;

    /* ----- escala de tipo ----- */
    --text-hero:clamp(3.75rem,13vw,14rem);
    --text-display-1:clamp(2.75rem,7.5vw,7rem);
    --text-display-2:clamp(2.125rem,4.6vw,3.75rem);
    --text-title:1.875rem;
    --text-subtitle:1.375rem;
    --text-body-lg:1.1875rem;
    --text-body:1.0625rem;
    --text-body-sm:.9375rem;
    --text-label:.8125rem;
    --text-caption:.6875rem;
    --weight-light:300;
    --weight-regular:400;
    --weight-medium:500;
    --weight-bold:700;
    --leading-body:1.55;
    --tracking-display:-.03em;
    --tracking-title:-.015em;
    --tracking-label:.14em;
    --type-body:var(--weight-regular) var(--text-body)/var(--leading-body) var(--font-body);
    --type-label:var(--weight-medium) var(--text-label)/1.2 var(--font-mono);

    /* ----- espaço ----- */
    --space-1:4px;--space-2:8px;--space-3:12px;--space-4:18px;--space-5:26px;
    --space-6:38px;--space-7:56px;--space-8:82px;--space-9:120px;--space-10:180px;

    /* ----- movimento ----- */
    --ease-out-expo:cubic-bezier(.16,1,.3,1);
    --ease-out-soft:cubic-bezier(.33,1,.68,1);
    --dur-fast:200ms;
    --dur-base:420ms;
    --transition-hover:color var(--dur-fast) var(--ease-out-soft),background-color var(--dur-fast) var(--ease-out-soft),border-color var(--dur-fast) var(--ease-out-soft),opacity var(--dur-fast) var(--ease-out-soft);

    /* ----- cards empilhados ----- */
    --stack-top:88px;
  }

  *,*::before,*::after{box-sizing:border-box}

  html{-webkit-font-smoothing:antialiased;scroll-behavior:auto}

  body{
    margin:0;
    background:var(--bt-bg);
    background-image:var(--bt-page-gradient);
    background-attachment:fixed;
    color:var(--bt-text);
    font:var(--type-body);
    overflow-x:hidden;
    text-wrap:pretty;
  }

  h1,h2,h3,h4{margin:0;font-family:var(--font-display);font-weight:var(--weight-medium);letter-spacing:var(--tracking-display);line-height:.94}
  p{margin:0}

  a{color:var(--bt-text);text-decoration:none;border-bottom:1px solid var(--bt-accent-border);transition:var(--transition-hover)}
  a:hover{color:var(--bt-accent-1);border-bottom-color:var(--bt-accent-1)}

  ::selection{background:var(--bt-accent-1);color:#0F1113}
  :focus-visible{outline:2px solid var(--bt-accent-1);outline-offset:3px}

  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:.15}}

  @keyframes bt-glitch-a{
    0%,100%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
    6%{clip-path:inset(8% 0 78% 0);transform:translate(-3px,-1px)}
    9%{clip-path:inset(42% 0 41% 0);transform:translate(3px,1px)}
    12%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
    54%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
    58%{clip-path:inset(70% 0 12% 0);transform:translate(-4px,1px)}
    61%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
  }
  @keyframes bt-glitch-b{
    0%,100%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
    4%{clip-path:inset(24% 0 58% 0);transform:translate(3px,1px)}
    7%{clip-path:inset(62% 0 22% 0);transform:translate(-2px,-2px)}
    10%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
    72%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
    75%{clip-path:inset(14% 0 70% 0);transform:translate(4px,-1px)}
    78%{clip-path:inset(0 0 100% 0);transform:translate(0,0)}
  }
  @keyframes bt-scan{from{background-position:0 0}to{background-position:0 -120px}}

  @media (prefers-reduced-motion:reduce){
    [data-glitch] span[aria-hidden]{animation:none!important;opacity:0!important}
  }
`
