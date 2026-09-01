# UI kit — Portfólio dev (Vinicius Butrico)

Portfólio de desenvolvedor em terminal escuro (`#08090A`), monospace nos metadados, Archivo no display, âmbar de fósforo como único acento. Conteúdo real, tirado do currículo enviado.

## O que é próprio deste kit (e não "genérico de IA")
- **Ficha técnica em vez de hero falante:** nenhum "Olá, eu sou". O topo é nome + tabela chave/valor (função, stack, formação, links), como uma folha de especificação.
- **Seções numeradas `§01…§05`** com âmbar, régua fina, sem ícone nenhum.
- **Barra de status fixa no rodapé** com ponto piscando e disponibilidade — vocabulário de IDE, não de landing page.
- **Relógio de São Paulo** no header, tabular-nums.
- **Mídia dos cards de projeto é código**, não imagem: request/response, fluxo do N8N, chamadas da API do ClickUp.
- **Partículas no site inteiro**: `ParticleField spread="document"` distribui os pontos pela altura toda da página (todas as seções têm pontos, eles rolam com o conteúdo) e eles se afastam do cursor. As cápsulas que esticam no scroll ficam disponíveis em `ScrollParticles`, mas não são usadas aqui.

## Arquivos
| Arquivo | O que é |
|---|---|
| `index.html` | shell dark (`data-theme="dark"`), React/Babel, GSAP, Lenis, bundle do DS |
| `cv.jsx` | todo o conteúdo do currículo em um objeto `cv` — edite aqui |
| `Chrome.jsx` | header fixo com relógio + barra de status inferior |
| `Intro.jsx` | ficha técnica de abertura (anima no load) |
| `Experience.jsx` | §01 timeline de empregos + `SecHead` compartilhado |
| `Projects.jsx` | §02 cards empilhando + lista de outras entregas |
| `Skills.jsx` | §03 stack por categoria e §04 formação/idiomas |
| `Contact.jsx` | §05 e-mail gigante, links, copiar telefone |
| `dev-app.jsx` | Lenis + ScrollTrigger, âncoras suaves, monta tudo |

## Para trocar conteúdo
Tudo em `cv.jsx`. Os snippets de código dentro dos cards estão em `Projects.jsx` (`snippets`).
