# 🌟 Portfolio Wallace Santana | FullStack Developer

[![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> **Portfólio moderno e responsivo desenvolvido com Next.js 15 e TypeScript, apresentando projetos, habilidades e experiências profissionais de forma interativa e multilíngue.**

## ✨ **Principais Funcionalidades**

- 🌍 **Multilíngue** - Suporte para português e inglês com troca dinâmica
- 📱 **Responsivo** - Design adaptável para desktop, tablet e mobile
- 🎨 **Animações Interativas** - Utilizando Framer Motion e GSAP
- 🔗 **Integração com API** - Conteúdo dinâmico carregado via API externa
- ⚡ **Performance Otimizada** - Next.js 15 com Turbopack
- 🎭 **3D Components** - Elementos 3D com Three.js e React Three Fiber
- 📊 **Loading States** - Estados de carregamento personalizados
- 🍪 **Persistência** - Preferências salvas em cookies
- 📈 **SEO Otimizado** - Meta tags e Open Graph configurados

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Framer Motion](https://www.framer.com/motion/)** - Animações e transições
- **[GSAP](https://gsap.com/)** - Animações complexas
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - Componentes 3D

### **UI/UX**

- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Phosphor Icons](https://phosphoricons.com/)** - Biblioteca de ícones
- **[React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)** - Observador de scroll

### **Estado e Dados**

- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[js-cookie](https://github.com/js-cookie/js-cookie)** - Gerenciamento de cookies
- **React Context API** - Gerenciamento de estado global

### **Desenvolvimento**

- **[ESLint](https://eslint.org/)** - Linting de código
- **[Turbopack](https://turbo.build/)** - Bundler ultra-rápido

---

## 📂 **Estrutura do Projeto**

```
📦 portifolio-ws/
┣ 📂 src/
┃ ┣ 📂 app/                      # Next.js App Router
┃ ┃ ┣ 📂 watch/[language]/       # Rotas multilíngues
┃ ┃ ┃ ┣ 📂 projects/             # Página de projetos
┃ ┃ ┃ ┣ 📂 skills/               # Página de habilidades
┃ ┃ ┃ ┣ layout.tsx               # Layout da linguagem
┃ ┃ ┃ ┗ page.tsx                 # Página inicial
┃ ┃ ┣ globals.css                # Estilos globais
┃ ┃ ┣ layout.tsx                 # Root layout
┃ ┃ ┗ page.tsx                   # Página raiz
┃ ┣ 📂 blocks/                   # Componentes reutilizáveis
┃ ┃ ┣ 📂 Backgrounds/            # Componentes de background
┃ ┃ ┣ 📂 Components/             # Componentes UI
┃ ┃ ┗ 📂 TextAnimations/         # Animações de texto
┃ ┣ 📂 components/               # Componentes da aplicação
┃ ┃ ┣ 📂 ui/                     # Componentes base (Radix)
┃ ┃ ┗ 📂 Visitor/                # Componentes específicos
┃ ┃   ┣ 📂 Header/               # Cabeçalho e navegação
┃ ┃   ┣ 📂 Projects/             # Seção de projetos
┃ ┃   ┣ 📂 Skills/               # Seção de habilidades
┃ ┃   ┗ 📂 Footer/               # Rodapé
┃ ┣ 📂 contexts/                 # Contextos React
┃ ┃ ┣ LanguageContext.tsx        # Contexto de idioma
┃ ┃ ┗ OwnerContext.tsx           # Contexto do proprietário
┃ ┣ 📂 services/                 # Integração com API
┃ ┃ ┣ ownerApi.ts                # API do proprietário
┃ ┃ ┣ projects.ts                # API de projetos
┃ ┃ ┗ skillsApi.ts               # API de habilidades
┃ ┣ 📂 types/                    # Definições TypeScript
┃ ┣ 📂 lib/                      # Utilitários
┃ ┃ ┣ axios.ts                   # Configuração do Axios
┃ ┃ ┗ utils.ts                   # Funções utilitárias
┃ ┗ middleware.ts                # Middleware Next.js
┣ 📂 public/                     # Arquivos estáticos
┃ ┣ 📂 images/                   # Imagens da aplicação
┃ ┗ owner.jpeg                   # Foto de perfil
┣ next.config.ts                 # Configuração Next.js
┣ tailwind.config.js             # Configuração Tailwind
┣ tsconfig.json                  # Configuração TypeScript
┗ package.json                   # Dependências do projeto
```

---

## ⚙️ **Configuração e Instalação**

### **Pré-requisitos**

- **Node.js** >= 18.x
- **npm** ou **yarn**

### **1. Clone o Repositório**

```bash
git clone https://github.com/wallacemt/dev-portifolio.git
cd dev-portifolio
```

### **2. Instale as Dependências**

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### **3. Configure as Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API backend
API_URL=https://sua-api.com

# ID do proprietário do portfolio
OWNER_ID=seu-owner-id
```

### **4. Execute o Projeto**

#### **Desenvolvimento**

```bash
# Com Turbopack (recomendado - mais rápido)
npm run dev

# Ou modo tradicional
npx next dev
```

#### **Produção**

```bash
# Build de produção
npm run build

# Executar build
npm start
```

A aplicação estará disponível em **http://localhost:3000**

---

## 🌐 **Rotas da Aplicação**

| Rota                     | Descrição                                     |
| ------------------------ | --------------------------------------------- |
| `/`                      | Redirecionamento automático para `/watch/pt/` |
| `/watch/pt/`             | Página inicial em português                   |
| `/watch/en/`             | Página inicial em inglês                      |
| `/watch/[lang]/projects` | Página de projetos                            |
| `/watch/[lang]/skills`   | Página de habilidades                         |

---

## 🎯 **Funcionalidades Detalhadas**

### **🌍 Sistema Multilíngue**

- Troca dinâmica entre português e inglês
- Persistência da preferência em cookies
- Redirecionamento automático baseado na preferência
- Conteúdo localizado via API

### **📱 Design Responsivo**

- Layout adaptável para todas as telas
- Navegação mobile otimizada
- Componentes que se reorganizam automaticamente
- Imagens otimizadas para diferentes resoluções

### **🎨 Animações e Interações**

- Animações suaves com Framer Motion
- Efeitos de scroll e intersecção
- Hover effects personalizados
- Loading states animados

### **🔗 Integração com API**

- Carregamento dinâmico de dados
- Cache e otimização de requisições
- Tratamento de erros
- Estados de loading

---

## 🤝 **Contribuindo**

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### **Padrões de Código**

- Use **TypeScript** para tipagem
- Siga o padrão **ESLint** configurado
- Componentes devem ser **funcionais** com hooks
- Mantenha a **responsividade** em mente
- Documente **APIs** e **funções complexas**

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor
- GitHub: [@wallacemt](https://github.com/wallacemt)
---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

