# Auditoria Impeccable — `portifolio-ws/`

**Data:** 2026-08-28
**Ferramenta:** `/impeccable audit` (Impeccable skill)
**Escopo:** `src/` (Next.js 15 / React 19 / Tailwind 4)

## Pontuação de Saúde da Auditoria

| # | Dimensão | Nota | Achado Principal |
|---|-----------|-------|-------------|
| 1 | Acessibilidade | 2/4 | Nenhum tratamento de `prefers-reduced-motion` em lugar algum; erros do formulário de login não são anunciados a leitores de tela |
| 2 | Performance | 2/4 | Background WebGL (`DarkVeil`) roda continuamente atrás de todas as páginas `/owner/*` sem nenhum controle |
| 3 | Responsividade | 2/4 | `min-w-4xl` força todos os modais de edição do Owner a ≥896px — copiado e colado em 6 arquivos, quebra em todos os celulares |
| 4 | Theming | 1/4 | Três sistemas de tokens de cor concorrentes (um usado em 45 arquivos, outro praticamente morto, e um tema claro inalcançável); o efeito `.glass` está quebrado (variáveis CSS indefinidas) |
| 5 | Integridade da Implementação | 1/4 | O detector encontrou 12 padrões repetidos de "slop" característicos de IA (gradientes roxo/violeta, bordas de destaque em cards arredondados, texto em gradiente) espalhados por telas de owner e de visitante |
| **Total** | | **8/20** | **Ruim — precisa de retrabalho significativo** |

## Veredito de Integridade da Implementação

**Reprova, mas de forma recuperável.** O app não é um "template genérico de IA" — existe estrutura real de domínio (CRUD de Owner para projetos/skills/formações, páginas de visitante roteadas por idioma, uma identidade visual violeta genuína usada em 45 arquivos). O que falha é *disciplina*: os 12 achados do detector formam um padrão repetido, não isolado; o CSS carrega três sistemas de cor onde deveria haver um, dois deles praticamente mortos; o utilitário `.glass` usado na navegação principal simplesmente não faz nada porque suas custom properties nunca foram definidas; e há um arquivo de componente (`interactive-timeline.tsx`) com 0 bytes. Isso é drift acumulado ao longo de edições iterativas assistidas por IA, não um sistema coerente com alguns detalhes a ajustar.

## Resumo Executivo

- **Pontuação: 8/20 (Ruim)** — 16 issues verificadas: **6 P1, 7 P2, 3 P3**
- Principais problemas: efeito `.glass` quebrado na navegação · bug de mobile copiado e colado em 6 modais · sem suporte a redução de movimento · controles do formulário de login sem rótulo/associação · WebGL sem controle rodando em toda rota de admin · três sistemas de tokens de cor concorrentes (majoritariamente mortos)

## Achados Detalhados por Severidade

### P1 — Bloqueantes / críticos

**1. Efeito de glassmorphism quebrado (custom properties CSS indefinidas)**
- Local: `src/app/globals.css:268-288` (`.glass`, `.glass-strong`), usado por `mobileNav.tsx`, `navitems.tsx`
- Categoria: Theming / Integridade da Implementação
- Impacto: `--glass-bg`, `--glass-highlight`, `--glass-blur`, `--glass-border`, `--glass-bg-strong` são referenciadas mas nunca definidas — o blur/borda/highlight silenciosamente não fazem efeito nenhum. A navegação principal fica sem o tratamento de vidro pretendido em todas as páginas.
- Recomendação: Definir os cinco tokens `--glass-*` em `:root` (e em `.white`), ou remover as classes.
- Comando sugerido: `/impeccable polish`

**2. `min-w-4xl` copiado e colado quebra todos os modais de edição do Owner no mobile**
- Local: `formation-edit-modal.tsx:100`, `account-edit-modal.tsx:109`, `badge-form-modal.tsx:93`, `certification-form-modal.tsx:107`, `project-edit-modal.tsx:160`, `skills-edit-modal.tsx:103`
- Categoria: Responsividade
- Impacto: `min-width` prevalece sobre o `max-w-[calc(100%-2rem)]` do `DialogContent` base, forçando os seis diálogos a no mínimo 896px. Overflow/corte horizontal em celulares e na maioria dos tablets.
- WCAG: 1.4.10 Reflow
- Recomendação: Remover `min-w-4xl` ou escopá-lo (`sm:min-w-4xl`).
- Comando sugerido: `/impeccable adapt`

**3. Login: botão de mostrar/ocultar senha sem nome acessível**
- Local: `src/components/Owner/Login/_components/login-form.tsx:181-187`
- Categoria: Acessibilidade
- WCAG: 4.1.2 Nome, Função, Valor
- Recomendação: `aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}`
- Comando sugerido: `/impeccable harden`

**4. Erros do formulário de login não estão associados programaticamente aos campos**
- Local: `login-form.tsx:135-155` (email), `:169-198` (senha)
- Categoria: Acessibilidade
- WCAG: 3.3.1, 4.1.2
- Recomendação: Adicionar `aria-invalid={!!errors.campo}` e `aria-describedby` apontando para o `id` do texto de erro.
- Comando sugerido: `/impeccable harden`

**5. Nenhum suporte a `prefers-reduced-motion` em todo o app**
- Local: `globals.css:184-227` (`@keyframes float/marquee/floats`) + uso disseminado de `framer-motion`/`gsap`
- Categoria: Acessibilidade
- WCAG: 2.3.3 Animação a partir de Interações
- Recomendação: Envolver keyframes decorativos em `@media (prefers-reduced-motion: no-preference)`; condicionar variantes do framer-motion a um hook compartilhado.
- Comando sugerido: `/impeccable adapt`

**6. Background WebGL sem controle rodando continuamente em toda rota de admin**
- Local: `src/app/owner/layout.tsx:26` (`DarkVeil`)
- Categoria: Performance
- Impacto: Importado de forma estática (não `next/dynamic`), sem pausa por visibilidade/perda de foco.
- Recomendação: `next/dynamic(..., { ssr: false })` + pausar em `document.visibilitychange`.
- Comando sugerido: `/impeccable optimize`

### P2 — Maiores

**7. 12 padrões repetidos de "slop" característicos de IA (verificados pelo detector)**
- `ai-color-palette` (gradientes roxo/violeta): `formation-card.tsx:22,26`, `formation-stats.tsx:46`, `service-card.tsx:21,23`, `page-loader.tsx:96`
- `border-accent-on-rounded`: `formation-add.tsx:234`, `login-form.tsx:43`, `skill-add.tsx:250`, `skills-edit-modal.tsx:253`, `mobileNav.tsx:84`, `project-list.tsx:69`
- `gradient-text`: `login-form.tsx:118`
- Categoria: Integridade da Implementação
- Recomendação: Substituir gradientes roxo/índigo por uso deliberado da escala roxo real do projeto; remover bordas superiores grossas em cards arredondados; usar cor sólida nos títulos.
- Comando sugerido: `/impeccable polish`

**8. Três sistemas de tokens de cor concorrentes, dois praticamente mortos**
- Local: `globals.css` `:root` — tokens shadcn/oklch, escala `roxo`/`textura-roxo` (45 arquivos), escala legada `DarkP2/DarkA1-4/neutral10/neutral80/neutral90/principal/secundaria` (2 arquivos); `.white` nunca ativado; `.dark` órfã
- Categoria: Theming
- Recomendação: Consolidar na escala roxo; remover tokens legados mortos e variantes `.white`/`.dark` inalcançáveis, ou implementar um seletor de tema real.
- Comando sugerido: `/impeccable colorize`

**9. Cores brutas do Tailwind usadas em vez dos tokens, de forma disseminada**
- Local: 14+ arquivos (`chart.tsx`, `depo-btn.tsx`, `page-loader.tsx`, `section-cards.tsx`, `service-connections.tsx`, `project-card.tsx`, `TiltedCard.tsx`, `mobileNav.tsx`, etc.); destaque para `services-content.tsx:100` (gradiente de CTA `from-blue-600 to-purple-600` destoante)
- Categoria: Theming
- Recomendação: Substituir por tokens `--foreground`/`--card`/`--popover` e pela escala roxo.
- Comando sugerido: `/impeccable colorize`

**10. Dependência morta: `gsap`**
- Local: `package.json:46`
- Categoria: Performance
- Recomendação: Remover (zero usos em `src/`).
- Comando sugerido: `/impeccable optimize`

**11. Valor de contexto sem memoização causa re-renders em toda a árvore**
- Local: `src/contexts/LanguageContext.tsx:52` (provavelmente também `OwnerContext.tsx:22`)
- Categoria: Performance
- Recomendação: Envolver o valor do provider em `useMemo`.
- Comando sugerido: `/impeccable optimize`

**12. Arquivo de componente morto, com 0 bytes**
- Local: `src/components/Visitor/Formations/_components/interactive-timeline.tsx`
- Categoria: Integridade da Implementação
- Recomendação: Excluir ou finalizar.
- Comando sugerido: `/impeccable polish`

**13. Handler de clique preso na div pai em vez do botão que ela envolve**
- Local: `project-card.tsx:73` (envolvendo `src/components/ui/depo-btn.tsx`)
- Categoria: Acessibilidade
- Recomendação: Mover o handler para o `<button>` propriamente.
- Comando sugerido: `/impeccable harden`

### P3 — Polimento

**14. Faltando `ssr: false` no import dinâmico do WebGL decorativo**
- Local: `src/app/watch/[language]/layout.tsx:19` (`Silk`)
- Comando sugerido: `/impeccable optimize`

**15. Botões apenas com ícone em 36px, abaixo do alvo de toque AAA**
- Local: `src/components/ui/button.tsx:24` (`size: "icon"` → `size-9`)
- Comando sugerido: `/impeccable polish`

**16. Contraste de texto no limite**
- Local: `text-roxo100` (#d629d9) sobre `--textura-roxo-5-hex` (~4.9:1) — `project-add.tsx:310,329`, `navitems.tsx:36`, `mobileNav.tsx:84`, `dialog.tsx:64`
- Comando sugerido: `/impeccable polish`

## Padrões e Problemas Sistêmicos

- Os padrões de "slop" do detector são repetidos, não isolados — as mesmas escolhas de gradiente roxo e borda de destaque se repetem em features não relacionadas.
- O bug do `min-w-4xl` tem uma causa raiz e seis sintomas — mesmo erro copiado nos seis modais de edição do Owner.
- O theming acumulou três paletas em vez de se consolidar em uma.
- A responsividade da área do Owner, fora o bug dos modais, é razoável (tabelas tratam overflow corretamente, `analyze-detail.tsx` tem 5 variantes responsivas).

## Pontos Positivos

- Primitivos Radix/shadcn usados de forma consistente, com `focus-visible` e semântica de teclado corretos.
- `next/image` usado em todo lugar — nenhuma tag `<img>` crua.
- Hook `useIsMobile` reutilizado de forma consistente em vez de reimplementado por componente.
- Loop de animação do `DarkVeil` corretamente cancelado ao desmontar; `will-change` restrito ao elemento em tilt ativo.
- Grids voltados ao visitante usam boa progressão de breakpoints `sm:`/`md:`.
- Identidade de marca violeta real e deliberada em 45 arquivos.

## Ações Recomendadas

1. **[P1]** `/impeccable adapt` — Corrigir overflow do `min-w-4xl` nos 6 modais de edição do Owner; adicionar tratamento de `prefers-reduced-motion` em todo o site.
2. **[P1]** `/impeccable harden` — Rotular o botão de mostrar/ocultar senha, associar erros do formulário de login via `aria-invalid`/`aria-describedby`, mover o handler de clique de `project-card.tsx` para o botão.
3. **[P1]** `/impeccable polish` — Corrigir o efeito `.glass`/`.glass-strong` quebrado usado na navegação principal.
4. **[P1]** `/impeccable optimize` — Code-split e controle de visibilidade do `DarkVeil` em `/owner/*`; `ssr:false` no import de `Silk`; remover `gsap`; memoizar os valores dos providers de contexto.
5. **[P2]** `/impeccable colorize` — Consolidar os três sistemas de tokens de cor na escala roxo; remover tokens legados mortos e variantes `.white`/`.dark`; corrigir o gradiente de CTA destoante.
6. **[P2]** `/impeccable polish` — Limpar os 12 padrões de "slop" apontados pelo detector; excluir `interactive-timeline.tsx`.

---

*Gerado com `/impeccable audit` via Claude Code.*
