_Desenvolver a seção de entrada da aplicação (landing section), exibindo as principais informações públicas do Owner, incluindo nome, cargo, bio curta, link para o currículo e (opcionalmente) avatar. Essa seção será o primeiro conteúdo visível ao acessar /visitor._

- [ ] 1. Estrutura do Componente
  - Local: `/components/sections/IntroSection.tsx`
  - Dados fornecidos via contexto useVisitorData()
  - Renderizar:
    - name (destaque em heading)
    - occupation (subtítulo)
    - about (parágrafo)
    - avatar (se existir)
    - Botão/Link para abrir ou baixar o CV (PDF)
    - Exemplo: owner.cvUrl ou URL fixa no backend
- [ ] 2. Estilo com Tailwind + Responsividade
  - Layout centralizado ou 2 colunas (texto + imagem)
  - Mobile-first com espaçamentos ajustados
  - Usar animação leve com framer-motion ou shadcn/ui-motion (opcional)
- [ ] 3. Acessibilidade e semântica
  - h1 com nome
  - h2 ou p com bio
  - a com download ou target para CV
  - img com alt dinâmico
- [ ] 4. Inserção no Visitor Page
  - Local: /app/visitor/page.tsx
  - Uso do componente IntroSection logo após o carregamento
- [ ] Critérios de Aceitação:
    - Informações públicas do Owner exibidas corretamente

    - Estilo limpo e responsivo com Tailwind

    - Link funcional para abrir ou baixar o currículo

    - Uso do contexto global (useVisitorData())

    - Código modular, reutilizável e sem hardcoded