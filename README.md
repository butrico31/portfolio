# Vinicius Butrico / Personal Interface

Portfólio em React com direção cyberpunk: grafite, amarelo ácido, ciano e um astrolábio de poliedros em Three.js. O GSAP/ScrollTrigger controla a abertura e a reconstrução do núcleo durante o scroll. O NeuroCorp é o projeto principal.

## Desenvolvimento

```sh
npm install
npm run dev
```

No PowerShell com execução de scripts desabilitada, use `npm.cmd`.

## Build

```sh
npm run build
npm run preview
npm test
npm run lint
```

O Vite gera a versão de produção em `dist/`. Edite os arquivos em `src/`, pois o build substitui os arquivos gerados.

## Onde editar

- `src/App.jsx`: estrutura, apresentação e contato.
- `src/data/cv.js`: projetos anteriores, experiência e links profissionais.
- `src/components/NeuroPreview.jsx`: prévia interativa do NeuroCorp, com atendimento, pipeline e arquitetura.
- `src/components/CyberCore.jsx`: renderização 3D, pausa, redimensionamento, movimento reduzido e descarte de recursos.
- `src/components/tech-geometry.mjs`: icosaedro com vinte facetas triangulares desmontáveis, núcleo luminoso, órbitas e anéis satélites da escultura.
- `src/components/sculpture-choreography.mjs`: abertura, pausa e reconstrução do núcleo; os testes verificam o ciclo, enquadramento, movimento reduzido e descarte.
- `src/hooks/usePortfolioMotion.js`: navegação com ScrollTrigger e montagem das interações da skill.
- `public/portfolio-motion.js`: carrega os módulos estáticos por uma tag HTML e acompanha o ciclo de vida do React. Arquivos JavaScript de `public/` não devem ser importados pelos módulos em `src/` no Vite.
- `public/assets/moments`: módulos CSS/JS originais dos momentos de tipografia e transição da skill design-taste-frontend; demos e metadados sem uso foram removidos.
- `src/styles/interface.css`: identidade visual, responsividade e movimento reduzido.

A prévia do NeuroCorp é conceitual, usa dados fictícios e não se conecta ao sistema real. Os links dos quatro módulos levam aos respectivos repositórios. A cena respeita a preferência de movimento reduzido, oferece pausa, suspende a renderização fora da tela e mostra `public/cyber-core.svg` se WebGL estiver indisponível, perder o contexto ou rejeitar um shader. Urbanist e DM Mono são carregadas pelo Google Fonts, com fontes de segurança locais. Os ícones oficiais são arquivos locais; as fontes e licenças estão em `public/assets/icons/icons-credits.json`.

A janela do NeuroCorp acompanha a proporção da viewport e se atualiza ao redimensionar. A altura mínima preserva o conteúdo em telas baixas; no celular a lista lateral é ocultada e a conversa ocupa a largura disponível. As mensagens usam largura natural, com recebidas à esquerda, enviadas à direita e o campo no rodapé.

O hero destaca Vinicius Butrico na fonte local Neocrash, com degradê amarelo/ciano e glitch; Desenvolvimento full stack é o subtítulo. Título, descrição e ações ficam à esquerda e o 3D à direita no desktop. Abaixo de 1024px os blocos ficam um abaixo do outro. A câmera se adapta ao formato do quadro para manter o núcleo inteiro visível.

Em telas a partir de 1024px de largura e 700px de altura, o hero reserva 56svh (até 560px) para o pin. O núcleo abre nos primeiros 40% do percurso, permanece aberto até 60% e se reconstrói no restante, com scrub de 1,5 segundo. Parado, repete um ciclo lento de 24 segundos. O espaço é reservado em CSS (`.hero.has-pin`), sem sobrepor os projetos. Movimento reduzido, celulares e telas baixas mantêm a rolagem livre.

As faces mantêm a abertura ampla. As órbitas internas se expandem mais que as externas durante a desmontagem, preservando uma folga ao redor das peças. Uma compensação suave de escala mantém o conjunto enquadrado. O teste de folga verifica as superfícies dos anéis e seus satélites em 105 estados da animação.
