# Plano — Landing enriquecida + Projetos em Destaque via GitHub

**Data:** 2026-08-28
**Origem:** conversa de planejamento (`/impeccable shape`) + banco de referências de design
**Status:** aprovado para implementação

## Motivação

Hoje `/watch/[language]` renderiza só o hero (`Abbout`) — Formações, Projetos,
Serviços e Skills vivem inteiramente em rotas separadas, cada uma com sua
própria paginação/filtro. A maioria dos portfólios de referência conta a
história inteira numa página só. Objetivo desta mudança: enriquecer a
landing com uma narrativa mais completa, sem abrir mão do investimento já
feito em SEO/paginação por rota — e usar isso como oportunidade pra trazer
destaque real (dado do GitHub, não campo manual) pros projetos mais
recentes.

## Decisão de escopo

**Enriquecer a landing, manter as rotas.** `/projects`, `/skills`,
`/formation`, `/services` continuam existindo inteiras, com filtro e
paginação como estão. Não é uma migração pra SPA — é a landing ganhando
seções que hoje só existem em rotas próprias, em versão resumida, com link
"ver tudo" pra quem quer se aprofundar.

## Referência de design consultada

Banco de referências (`Design Systems/temas_escuros/creative-agency-template.aura.build/`)
revisado por completo (design-system.html, design-system2.html, index.html).
**Aproveitado:**

- **Cards de projeto**: overlay `gradient-to-t from-black via-transparent`
  sobre a imagem, título com `translate-y-2 → translate-y-0` no hover,
  badge/tag que aparece só no hover (delay leve). Aplicado como um novo
  estado visual do `ProjectCard` existente, não um componente novo.
- **Cabeçalho de seção**: heading com **uma palavra em destaque** (cor da
  marca) + um parágrafo de apoio + botão "ver tudo" alinhado à direita no
  desktop. **Sem eyebrow/kicker** (label pequena acima do heading) — esse
  padrão já é banido pelas próprias regras de craft do projeto.
- **Grid de skills**: formato de bento com `col-span` variado (tiles
  desiguais) + `hover:border-white/20`-like accent, em vez de grid plano de
  ícones. Só a forma do tile, sem as micro-animações internas de cada um
  (over-engineered pro caso de uso).
- **Reveal ao rolar**: entrada com opacidade + leve translateY conforme a
  seção entra na viewport — mas implementado via `framer-motion`
  `whileInView`, não o `IntersectionObserver` cru da referência, porque o
  projeto já centraliza motion no `MotionConfig reducedMotion="user"`
  (issue #53) — um script à parte reabriria o buraco de
  `prefers-reduced-motion` que acabamos de fechar.

**Descartado, não combina com a identidade roxa/arredondada do projeto:**
cantos retos (`rounded-none`), paleta preto+vermelho brutalista,
labels monoespaçadas estilo "[ SYSTEM STATUS ]", cantos tracejados,
bento de "case study" com mockup de celular, contador CSS em loop infinito
(o projeto já tem `CountUp`, que conta uma vez ao entrar na viewport — isso
lê como dado real, o loop infinito da referência lê como enfeite),
formulário de contato completo no CTA final (fora de escopo).

## Estrutura da nova landing

```
Hero/Sobre (Abbout, sem mudança de conteúdo)
  ↓
Projetos em Destaque (NOVO)
  ↓
Skills em Destaque (NOVO)
  ↓
Faixa de estatísticas (NOVO, reaproveitando dados de Formações)
  ↓
CTA final (NOVO)
```

### 1. Hero — sem mudança
Mantém `Abbout` como está. Corrige de passagem um bug pequeno encontrado
durante a revisão: o botão "ver projetos" tem o link fixo em
`/watch/pt/projects`, ignorando o idioma atual — passa a usar
`/watch/${language}/projects`.

### 2. Projetos em Destaque
- Cabeçalho: heading com uma palavra em destaque + parágrafo curto + botão
  "ver todos" → `/projects`.
- 3–4 `ProjectCard`, ordenados pelo commit mais recente no GitHub (ver
  seção técnica abaixo); projetos sem repo identificável entram pela
  ordenação manual atual (`isMostRecent`/`lastUpdate`).
- Hover state novo no card: overlay gradiente, título sobe, tag de "atualizado
  há X" aparece.
- Reveal-on-scroll via `framer-motion` `whileInView`, staggered entre os
  cards.

### 3. Skills em Destaque
- Cabeçalho no mesmo formato da seção 2.
- Grid bento (tiles de tamanho variado) com 6–10 skills.
- **Critério de seleção: skills mais usadas entre os projetos em destaque
  da seção 2** — decisão tomada porque não exige nenhum campo novo no
  backend (as outras opções cogitadas exigiam) e cria uma narrativa
  coerente ("isso é o que venho usando de verdade, agora"). Se depois
  fizer mais sentido curar manualmente, dá pra trocar sem mudar a UI.
- Link "ver todas" → `/skills`.

### 4. Faixa de estatísticas
- Reaproveita os números que já existem em `formation-stats.tsx`
  (formações concluídas, horas de estudo, instituições, certificados) com
  `CountUp` (já existe no projeto, conta uma vez ao entrar na viewport).
- Sem loop infinito, sem reinventar o componente de contador.

### 5. CTA final
- Reaproveita o padrão texto+botão que já existe em `services-content.tsx`
  (`texts.cta`/`texts.ctaBtn`), hoje só visível na página de Serviços.
- Sem formulário embutido — o botão leva pro mesmo link (Google Forms) ou
  pra `/services`.

## Plano técnico — dados do GitHub

### Fonte da URL do repositório
Reaproveita `project.links.content.{frontend,backend}.url` — detecta
automaticamente qual dos dois (se algum) aponta pra `github.com` e extrai
`{owner, repo}` da URL. Sem campo novo no schema do backend.

### Busca de dados
Novo utilitário `src/lib/github.ts`:
- `GET https://api.github.com/repos/{owner}/{repo}` → usa o campo
  `pushed_at` (uma chamada só por repo, sem precisar listar commits).
- Autenticado via `GITHUB_TOKEN` (env var nova, opcional) quando presente
  — sobe o limite de 60 req/h (sem auth) pra 5000 req/h. Sem o token,
  funciona igual, só com limite mais apertado.
- Cache via `fetch(..., { next: { revalidate: 600 } })` — 10 minutos,
  consistente com o padrão `export const revalidate = 60` já usado nas
  páginas do Visitor, mas mais longo porque commit não muda a cada minuto.
- Falha (rate limit, timeout, repo privado/404) nunca bloqueia o render:
  cai pro `lastUpdate`/`isMostRecent` manual em silêncio, sem erro visível
  pro visitante.

### Exibição
- Novo helper em `src/utilis/project-date.ts` (ou arquivo irmão) usando
  `date-fns`'s `formatDistanceToNow` com locale `ptBR`/`enUS` — mesmo
  padrão bilíngue já usado em `badge-card.tsx`/`certification-card.tsx` —
  pra gerar "atualizado há 3 dias" / "updated 3 days ago".

## Interação — nav da landing

Quando o visitante está em `/watch/[language]` (rota raiz), os itens do
menu fazem scroll suave até a seção correspondente (`#projetos`, `#skills`,
`#contato`) em vez de navegar. Fora da landing, o menu continua navegando
pra rota cheia normalmente — sem mudança de comportamento.

## Escopo e limites

**Não muda:** identidade visual roxa, `/projects`/`/skills`/`/formation`/`/services`
como páginas completas, dashboard do Owner, schema do backend (exceto a
env var `GITHUB_TOKEN`, opcional).

**Arquivos novos esperados:**
- `src/lib/github.ts` — fetch + parse de repo GitHub
- `src/components/Visitor/Landing/FeaturedProjects/` — seção 2
- `src/components/Visitor/Landing/SkillsHighlights/` — seção 3
- `src/components/Visitor/Landing/StatsStrip/` — seção 4 (ou reaproveitar `formation-stats.tsx` diretamente)
- `src/components/Visitor/Landing/LandingCta/` — seção 5

**Arquivos modificados esperados:**
- `src/app/watch/[language]/page.tsx` — compõe as 5 seções
- `src/components/Visitor/Abbout/index.tsx` — corrige link do idioma
- `src/components/Visitor/Header/_components/navitems.tsx` /
  `mobileNav.tsx` — scroll suave condicional
- `src/components/Visitor/Projects/_components/project-card.tsx` — novo
  hover state
- `src/utilis/project-date.ts` — helper de data relativa
- `.env` / `.env.local.example.new` — documenta `GITHUB_TOKEN`

## Estados e casos de borda

- Nenhum projeto com repo GitHub identificável → seção 2 usa a ordenação
  manual atual, sem quebrar.
- API do GitHub fora do ar / rate limit → fallback silencioso, sem erro
  visível.
- Menos de 3 projetos cadastrados → seção 2 mostra os que existem, sem
  placeholder vazio forçado.
