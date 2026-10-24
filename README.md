# Portfólio Pessoal - Gabriel

Portfólio pessoal responsivo desenvolvido com **Next.js**, **React** e **TypeScript**, criado para apresentar meu perfil como desenvolvedor, meus projetos, habilidades e formas de contato.

🌐 **Acesse o portfólio:** https://portifolio-theta-eight-99.vercel.app/

## 📌 Sobre o projeto

O foco do projeto é proporcionar uma boa experiência tanto em **desktop quanto em dispositivos móveis**, mantendo uma estrutura organizada e fácil de manter.

Principais recursos:

- Seções de apresentação, projetos, sobre e contato em uma página única;
- Página de estudo de caso para cada projeto (`/pt/projetos/[slug]`), com contexto, funcionalidades, decisões técnicas, telas e aprendizados;
- Versões em português (`/pt`) e inglês (`/en`), com detecção do idioma do navegador e botão para alternar;
- Tema claro e escuro;
- Animações de entrada que respeitam a preferência de "reduzir movimento" do sistema;
- Navegação por teclado (foco visível, menu mobile acessível);
- Blog em MDX (`/pt/blog`), com destaque de sintaxe, índice por post e rascunhos que só aparecem em desenvolvimento;
- Formulário de contato que envia a mensagem direto para o meu e-mail (Server Action + Zod + Resend), com validação traduzida e proteção contra bots;
- Botão para copiar o e-mail com feedback visual;
- SEO com metadados, imagem de Open Graph, `robots.txt` e `sitemap.xml` gerados pelo Next.js.

## 🚀 Tecnologias utilizadas

- **Next.js 16** (App Router) — framework React;
- **React 19** — construção da interface;
- **TypeScript** — tipagem estática;
- **CSS Modules** — estilos com escopo por componente;
- **Framer Motion** — animações;
- **Zod** e **Resend** — validação e envio do formulário de contato;
- **MDX** (`@next/mdx`) e **Shiki** (`rehype-pretty-code`) — posts do blog com destaque de sintaxe;
- **next-themes** — alternância de tema claro/escuro;
- **React Icons** — ícones;
- **ESLint** e **Prettier** — análise e formatação do código;
- **GitHub Actions** — integração contínua;
- **Vercel** — hospedagem e deploy.

## 📂 Estrutura do projeto

```text
./
├── app/
│   ├── actions/contact.ts    # Server Action do formulário de contato
│   ├── [lang]/               # Tudo que é página fica dentro do idioma (/pt, /en)
│   │   ├── layout.tsx        # Layout raiz e metadados (por idioma)
│   │   ├── page.tsx          # Página principal
│   │   ├── not-found.tsx     # Página 404 traduzida
│   │   ├── opengraph-image.tsx # Imagem de compartilhamento por idioma
│   │   ├── projetos/[slug]/  # Estudo de caso de cada projeto
│   │   ├── blog/             # Lista de posts e página de cada post
│   │   └── [...rest]/        # Captura caminhos inexistentes e mostra a 404
│   ├── globals.css           # Reset, tokens de tema e estilos base
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml (com as versões em cada idioma)
│   └── icon.svg              # Favicon
│
├── components/
│   ├── layout/               # Header, Footer e Container
│   ├── sections/             # Seções da página (Hero, Projects, About, Timeline, Contact...)
│   ├── ui/                   # Componentes reutilizáveis (Card, ThemeToggle, LanguageToggle...)
│   ├── LocaleProvider.tsx    # Disponibiliza idioma e traduções aos Client Components
│   └── Providers.tsx         # Providers de idioma, tema e animação
│
├── content/
│   └── blog/                 # Posts do blog (.mdx)
│
├── data/
│   ├── projects.ts           # Lista de projetos exibidos
│   └── caseStudies.ts        # Conteúdo dos estudos de caso (pt/en)
│
├── hooks/
│   └── useActiveSection.ts   # Destaca no menu a seção visível
│
├── lib/
│   ├── i18n/                 # Idiomas: configuração, dicionários (pt/en) e detecção
│   ├── blog.ts               # Leitura dos posts: frontmatter, índice e tempo de leitura
│   ├── contact.ts            # Regras de validação do formulário de contato
│   ├── github.ts             # Busca e resume os repositórios da API do GitHub
│   ├── site.ts               # URL, e-mail, usuário do GitHub, redes sociais e menu
│   └── techIcons.ts          # Mapa de tecnologia → ícone
│
├── public/
│   └── images/               # Screenshots dos projetos (galerias em images/projects/<slug>/)
│
├── mdx-components.tsx        # Componentes disponíveis nos posts (Callout, blocos de código)
├── proxy.ts                  # Redireciona "/" para /pt ou /en conforme o idioma
│
└── .github/workflows/ci.yml  # Pipeline de CI
```

Cada componente com estilo próprio tem um arquivo `.module.css` ao lado (ex.: `Card.tsx` + `Card.module.css`).

## ✏️ Como atualizar o conteúdo

- **Textos do site:** ficam em [`lib/i18n/dictionaries/pt.ts`](lib/i18n/dictionaries/pt.ts) e [`en.ts`](lib/i18n/dictionaries/en.ts). O dicionário em inglês é tipado a partir do português, então o TypeScript avisa se faltar alguma tradução.
- **Adicionar um projeto:** inclua um objeto no array de [`data/projects.ts`](data/projects.ts), com `slug` único e título e descrição em `pt` e `en`. A imagem deve ficar em `public/images/`. Os testes verificam se nenhuma tradução ficou faltando.
- **Linha do tempo (seção "Trajetória"):** edite `timeline.items` nos dois dicionários, do mais recente para o mais antigo. Marque `current: true` no item atual para destacá-lo.
- **Estudo de caso de um projeto:** adicione uma entrada em [`data/caseStudies.ts`](data/caseStudies.ts) com o mesmo `slug` do projeto. A página e o link "Detalhes" no card aparecem automaticamente, e o sitemap passa a incluí-la. Imagens da galeria ficam em `public/images/projects/<slug>/`.
- **Escrever um post:** crie `content/blog/<slug>.mdx` começando com o cabeçalho abaixo. Com `draft: true` o post só aparece no `npm run dev`; para publicar, remova a linha ou use `false`. O post de exemplo [`como-escrever-um-post.mdx`](content/blog/como-escrever-um-post.mdx) mostra tudo o que dá para usar. O link "Blog" no menu e a seção "Últimos posts" na home só aparecem quando há pelo menos um post publicado.

    ```yaml
    ---
    title: "Título do post"
    summary: "Resumo que aparece na lista e no Google"
    date: "2026-11-05"
    tags: ["Laravel", "Docker"]
    draft: true
    ---
    ```

- **Alterar e-mail, redes sociais ou URL do site:** edite [`lib/site.ts`](lib/site.ts).
- **Nova tecnologia com ícone:** adicione ao mapa em [`lib/techIcons.ts`](lib/techIcons.ts).
- **Seção "Atividade no GitHub":** é gerada automaticamente a partir dos repositórios públicos do usuário definido em `siteConfig.githubUser`, atualizando no máximo a cada hora. Descrições e linguagens vêm do próprio GitHub, então mantenha-as preenchidas por lá. Se a API estiver indisponível, a seção simplesmente não aparece.
- **Currículo para download:** substitua os PDFs em `public/resume/` mantendo os nomes, ou altere os caminhos em `resumeFiles` ([`lib/site.ts`](lib/site.ts)). Cada idioma do site baixa o seu arquivo.

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

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

- `RESEND_API_KEY`: chave do [Resend](https://resend.com/api-keys), necessária para o formulário de contato. Sem ela o site funciona, mas o formulário mostra uma mensagem de erro ao enviar. Enquanto não houver domínio verificado no Resend, as mensagens só chegam ao e-mail da conta do Resend, que deve ser o mesmo de `siteConfig.email`. Na Vercel, cadastre a mesma variável em Production e Preview.
- `GITHUB_TOKEN` (opcional): sem ele a API do GitHub permite 60 requisições por hora, o que já basta para o site.

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
- **E2E** (`tests/e2e/`): Playwright, rodando no build de produção em desktop e mobile. Cobrem navegação, menu mobile, troca de tema, idiomas, a página 404, o blog (usando os rascunhos, com `SHOW_DRAFTS=true`) e a validação do formulário de contato (sem enviar e-mails de verdade).

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

- [LinkedIn](https://www.linkedin.com/in/gabriel-dos-santos-nunes/)
- [GitHub](https://github.com/GabrielS0306)
