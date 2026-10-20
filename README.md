# Portfólio Pessoal - Gabriel

Portfólio pessoal responsivo desenvolvido com **Next.js**, **React** e **TypeScript**, criado para apresentar meu perfil como desenvolvedor, meus projetos, habilidades e formas de contato.

🌐 **Acesse o portfólio:** https://portifolio-theta-eight-99.vercel.app/

## 📌 Sobre o projeto

O foco do projeto é proporcionar uma boa experiência tanto em **desktop quanto em dispositivos móveis**, mantendo uma estrutura organizada e fácil de manter.

Principais recursos:

- Seções de apresentação, projetos, sobre e contato em uma página única;
- Versões em português (`/pt`) e inglês (`/en`), com detecção do idioma do navegador e botão para alternar;
- Tema claro e escuro;
- Animações de entrada que respeitam a preferência de "reduzir movimento" do sistema;
- Navegação por teclado (foco visível, menu mobile acessível);
- Botão para copiar o e-mail com feedback visual;
- SEO com metadados, imagem de Open Graph, `robots.txt` e `sitemap.xml` gerados pelo Next.js.

## 🚀 Tecnologias utilizadas

- **Next.js 16** (App Router) — framework React;
- **React 19** — construção da interface;
- **TypeScript** — tipagem estática;
- **CSS Modules** — estilos com escopo por componente;
- **Framer Motion** — animações;
- **next-themes** — alternância de tema claro/escuro;
- **React Icons** — ícones;
- **ESLint** e **Prettier** — análise e formatação do código;
- **GitHub Actions** — integração contínua;
- **Vercel** — hospedagem e deploy.

## 📂 Estrutura do projeto

```text
./
├── app/
│   ├── [lang]/               # Tudo que é página fica dentro do idioma (/pt, /en)
│   │   ├── layout.tsx        # Layout raiz e metadados (por idioma)
│   │   ├── page.tsx          # Página principal
│   │   ├── not-found.tsx     # Página 404 traduzida
│   │   ├── opengraph-image.tsx # Imagem de compartilhamento por idioma
│   │   └── [...rest]/        # Captura caminhos inexistentes e mostra a 404
│   ├── globals.css           # Reset, tokens de tema e estilos base
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml (com as versões em cada idioma)
│   └── icon.svg              # Favicon
│
├── components/
│   ├── layout/               # Header, Footer e Container
│   ├── sections/             # Seções da página (Hero, Projects, About, Contact...)
│   ├── ui/                   # Componentes reutilizáveis (Card, ThemeToggle, LanguageToggle...)
│   ├── LocaleProvider.tsx    # Disponibiliza idioma e traduções aos Client Components
│   └── Providers.tsx         # Providers de idioma, tema e animação
│
├── data/
│   └── projects.ts           # Lista de projetos exibidos
│
├── hooks/
│   └── useActiveSection.ts   # Destaca no menu a seção visível
│
├── lib/
│   ├── i18n/                 # Idiomas: configuração, dicionários (pt/en) e detecção
│   ├── github.ts             # Busca e resume os repositórios da API do GitHub
│   ├── site.ts               # URL, e-mail, usuário do GitHub, redes sociais e menu
│   └── techIcons.ts          # Mapa de tecnologia → ícone
│
├── public/
│   └── images/               # Screenshots dos projetos
│
├── proxy.ts                  # Redireciona "/" para /pt ou /en conforme o idioma
│
└── .github/workflows/ci.yml  # Pipeline de CI
```

Cada componente com estilo próprio tem um arquivo `.module.css` ao lado (ex.: `Card.tsx` + `Card.module.css`).

## ✏️ Como atualizar o conteúdo

- **Textos do site:** ficam em [`lib/i18n/dictionaries/pt.ts`](lib/i18n/dictionaries/pt.ts) e [`en.ts`](lib/i18n/dictionaries/en.ts). O dicionário em inglês é tipado a partir do português, então o TypeScript avisa se faltar alguma tradução.
- **Adicionar um projeto:** inclua um objeto no array de [`data/projects.ts`](data/projects.ts), com `slug` único e título e descrição em `pt` e `en`. A imagem deve ficar em `public/images/`. Os testes verificam se nenhuma tradução ficou faltando.
- **Alterar e-mail, redes sociais ou URL do site:** edite [`lib/site.ts`](lib/site.ts).
- **Nova tecnologia com ícone:** adicione ao mapa em [`lib/techIcons.ts`](lib/techIcons.ts).
- **Seção "Atividade no GitHub":** é gerada automaticamente a partir dos repositórios públicos do usuário definido em `siteConfig.githubUser`, atualizando no máximo a cada hora. Descrições e linguagens vêm do próprio GitHub, então mantenha-as preenchidas por lá. Se a API estiver indisponível, a seção simplesmente não aparece.
- **Currículo para download:** coloque o PDF em `public/` e defina `RESUME_PATH` em [`components/sections/Hero.tsx`](components/sections/Hero.tsx).

## ⚙️ Como executar o projeto

### Pré-requisitos

- Node.js 20.9 ou superior
- npm

### Instalação

```bash
git clone https://github.com/GabrielS0306/Portifolio.git
cd Portifolio
npm install
npm run dev
```

Depois, acesse http://localhost:3000.

### Variáveis de ambiente (opcional)

Copie `.env.example` para `.env.local`. O `GITHUB_TOKEN` é opcional: sem ele a API do GitHub permite 60 requisições por hora, o que já basta para o site.

## 📦 Scripts disponíveis

| Comando                | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento      |
| `npm run build`        | Gera a versão de produção                 |
| `npm run start`        | Inicia a aplicação em modo de produção    |
| `npm run lint`         | Executa o ESLint                          |
| `npm run typecheck`    | Verifica os tipos com o TypeScript        |
| `npm test`             | Roda os testes de unidade (Vitest)        |
| `npm run test:watch`   | Roda os testes de unidade em modo watch   |
| `npm run test:e2e`     | Roda os testes E2E (Playwright)           |
| `npm run format`       | Formata o código com o Prettier           |
| `npm run format:check` | Verifica se o código está formatado       |

## 🧪 Testes

- **Unidade** (`tests/unit/`): Vitest + Testing Library. Cobrem os componentes principais e validam os dados de `data/projects.ts` (ícone para cada tecnologia, imagens existentes, links válidos).
- **E2E** (`tests/e2e/`): Playwright, rodando no build de produção em desktop e mobile. Cobrem navegação, menu mobile, troca de tema e a página 404.

Na primeira vez, instale o navegador do Playwright:

```bash
npx playwright install chromium
```

## ✅ Integração contínua

A cada push na `main` e em todo pull request, o GitHub Actions executa `format:check`, `lint`, `typecheck`, testes de unidade, `build` e os testes E2E.

## 🌐 Deploy

O projeto está publicado na **Vercel**.

## 👨‍💻 Autor

**Gabriel** — desenvolvedor com foco em **Full-Stack**, buscando evoluir constantemente através da criação de projetos e aplicação prática de diferentes tecnologias.

- [LinkedIn](https://www.linkedin.com/in/gabriel-dos-santos-nunes-713a2a312/)
- [GitHub](https://github.com/GabrielS0306)
