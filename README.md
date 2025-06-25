# 📌 Portfólio de Desenvolvedor

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Cargo version](https://img.shields.io/static/v1?label=cargo&message=v0.1.0&color=yellow) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)

<p align="center"> <img src="https://socialify.git.ci/wallacemt/dev-portifolio/image?custom_description=Este+%C3%A9+o+meu+portf%C3%B3lio+pessoal%2C+constru%C3%ADdo+utilizando+React%2C+TailwindCSS+e+v%C3%A1rias+outras+bibliotecas+populares+para+criar+uma+interface+interativa+e+responsiva.+Este+portf%C3%B3lio+tem+como+objetivo+mostrar+minhas+habilidades%2C+projetos+e+servi%C3%A7os%2C+al%C3%A9m+de+fornecer+uma+navega%C3%A7%C3%A3o+fluida+com+anima%C3%A7%C3%B5es+e+scroll+suave.&description=1&font=Source+Code+Pro&forks=1&issues=1&language=1&logo=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fdevicons%2Fdevicon%40latest%2Ficons%2Freact%2Freact-original.svg&name=1&owner=1&pattern=Charlie+Brown&pulls=1&stargazers=1&theme=Dark" alt="project-image"></p>

## 🚀 Tecnologias Utilizadas

<div align='center' id="tecnologias-utilizadas">
    <img align='center' height='49' width='49' title='React' alt='React' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Tailwind' alt='Tailwind' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' style="filter: invert(1);"  title='Swiper' alt='Swiper' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swiper/swiper-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Vite' alt='Vite' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg'/> &nbsp;
    <img align='center' height='70' width='70' title='Docker' alt='docker' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' /> &nbsp;
     <img align='center' height='49' width='49' style="filter: invert(1);"  title='FrameMotion' alt='FrameMotion' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original-wordmark.svg'/> &nbsp;
     <img align='center' height='49' width='49' title='JS' alt='JS' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'/> &nbsp;
     <img align='center' height='49' width='49' title='json' alt='json' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg'/> &nbsp;
</div>

## 📂 Estrutura do Projeto

```
/public
  /database                # Banco de dados em formato json com os dados.
  /fonts                   # Fonts instaladas e utilizadas na aplicação.
  /images                  # Imagens que sao utilizadas.
/src
  /components            # Componentes React reutilizáveis (Home, Sobre, Projetos, etc..)
  /screens               # Tela principal do portfólio.
  /locales               # Arquivo json com as traduções utilizadas.
  App.jsx                # Componente principal
  i18n.js                # Serviço de tradução.
  index.css              # Css global.
  main.jsx               # Ponto de entrada do React
  routes.jsx             # Rotas utilizadas na aplicação.
tailwind.config.js     # Configurações do TailwindCSS
postcss.config.js      # Configuração do PostCSS
README.md                # Este arquivo
package.json             # Dependências e scripts do projeto
```

## 📌 Funcionalidades

- **Multilinguagem**: O portfólio suporta múltiplos idiomas utilizando `react-i18next`.

- **Animações e Transições**: Animações de scroll e transições suaves com `anime.js` e `framer-motion`.

- **Seções dinâmicas**: O portfólio é dividido em várias seções que são carregadas dinamicamente.

- **Scroll suave**: A navegação suave com `locomotive-scroll` para uma experiência de usuário otimizada.

## 🛠️ Configuração e Execução

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/wallacemt/dev-portifolio
```

```bash
cd dev-portifolio
```

### 2️⃣ Instalar As Dependencias Da Aplicação

- Usando npm:

  ```bash
  npm install
  ```

- Usando yarn:
  ```bash
  yarn  install
  ```

### 3️⃣ Rodar a Aplicação Manualmente (Sem Docker)

```bash
npm run dev
```

### 4️⃣ Ou Rodar a Aplicação com Docker

```bash
docker-compose up --build -d
```

`A aplicação estará disponível em` **http://localhost:5173**

## 🛠 Contribuição

Ficou interessado em contribuir? Faça um **fork** do repositório, crie uma **branch**, implemente a melhoria e envie um **pull request**. Toda ajuda é bem-vinda!

1. **Fork the repository.**
2. **Clone your forked repository to your local machine.**
3. **Create a branch for your feature or fix:**

   ```bash
   git checkout -b my-new-feature
   ```

4. **Commit your changes:**

   ```bash
   git commit -m 'Add new feature'
   ```

5. **Push your changes to your fork:**

   ```bash
   git push origin my-new-feature
   ```

6. **Create a Pull Request.**

<span id="license"></span>

# 📜 Licença

`Este projeto está sob a licença MIT.`
