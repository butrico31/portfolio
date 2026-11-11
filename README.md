# Vinicius Butrico / Personal Interface

Portfólio em React e JSX, com identidade visual inspirada no README do GitHub: circuitos, ciano, magenta, tipografia local e glitch no nome. O NeuroCorp é o projeto principal.

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
```

O Vite gera a versão de produção em `dist/`. Edite os arquivos em `src/`, pois o build substitui os arquivos gerados.

## Onde editar

- `src/App.jsx`: estrutura, apresentação e contato.
- `src/data/cv.js`: projetos anteriores, experiência e links profissionais.
- `src/components/NeuroPreview.jsx`: prévia interativa do NeuroCorp, com atendimento, pipeline e arquitetura.
- `src/components/Circuit.jsx`: ilustração vetorial do circuito.
- `src/components/motion/GlitchText.jsx`: efeito do nome em React e CSS.
- `src/components/motion/PageAtmosphere.jsx`: circuitos decorativos nas seções e estrelas em camadas que sobem com a rolagem, sem capturar cliques.
- `src/hooks/usePortfolioMotion.js`: entrada em sequência, desenho dos circuitos, sinais em movimento, revelações no scroll e interação dos links com GSAP e ScrollTrigger.
- `src/styles/interface.css`: identidade visual, responsividade e movimento reduzido.

A prévia do NeuroCorp é conceitual, usa dados fictícios e não se conecta ao sistema real. Os links dos quatro módulos levam aos respectivos repositórios. Os efeitos ficam ligados, respeitando a preferência de movimento reduzido do sistema. As fontes estão em `public/fonts`, sem dependência de serviços externos.
