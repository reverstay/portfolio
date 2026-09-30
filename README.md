# ramonmpm.com

Portfólio de **Ramon Mariano**, desenvolvedor full stack: soluções tecnológicas de ponta a ponta, do sensor ao dashboard.

🌐 **https://ramonmpm.com** · disponível em português (`/pt`) e inglês (`/en`)

[LinkedIn](https://www.linkedin.com/in/ramonmpm) · [GitHub](https://github.com/reverstay) · [Currículo (PDF)](public/projects/Ramon_Mariano_Resume.pdf)

---

## O que tem no site

- **Início**: apresentação, stack, mapa de contribuições do GitHub, projetos em destaque e principais resultados.
- **Projetos**: sistemas web e mobile, integração com hardware e IoT, automação e fabricação, cada um com atuação, resultados e vídeo de demonstração.
- **Sobre**: trajetória profissional, formação e áreas de foco.
- **Como eu desenvolvo**: práticas de engenharia com exemplos de código.
- **Tech Stack**: diagrama das tecnologias por área.
- **Contato**: formulário que envia e-mail via [Resend](https://resend.com).

## Stack

| Camada | Tecnologias |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Estilo e animação | Tailwind CSS v4, Framer Motion, Lottie |
| Idiomas | Rotas `/pt` e `/en`, com detecção do idioma do navegador (`src/proxy.ts`) |
| Infra | Docker (build standalone), Docker Compose, Caddy (HTTPS automático) |

## Rodando localmente

Requer Node.js 22+.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. A raiz redireciona para `/pt` ou `/en` conforme o idioma do navegador.

## Publicando em ramonmpm.com

O deploy usa Docker Compose em um servidor Linux (VPS) com dois serviços: o site (`app`) e o [Caddy](https://caddyserver.com), que emite e renova o certificado HTTPS sozinho.

**1. DNS.** No painel do domínio, aponte para o IP do servidor:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | `@` | IP do servidor |
| A | `www` | IP do servidor |

**2. Servidor.** Com Docker instalado e as portas 80 e 443 liberadas no firewall:

```bash
git clone https://github.com/reverstay/portfolio.git
cd portfolio
cp .env.example .env    # preencha as chaves do formulário de contato, se quiser
docker compose up -d --build
```

Em alguns segundos o site responde em https://ramonmpm.com, e `www.ramonmpm.com` redireciona para o domínio principal.

**3. Atualizar** depois de um novo commit:

```bash
git pull
docker compose up -d --build
```

Logs: `docker compose logs -f app`.

### Só o container, sem Caddy

```bash
docker build -t portfolio .
docker run -d --name portfolio --restart unless-stopped -p 3000:3000 portfolio
```

## Variáveis de ambiente

Ficam no arquivo `.env` (modelo em [`.env.example`](.env.example)).

| Variável | Uso |
| --- | --- |
| `SITE_URL` | URL pública, usada nos metadados e links de compartilhamento (padrão `https://ramonmpm.com`) |
| `GITHUB_USERNAME` | usuário do mapa de contribuições (padrão `reverstay`) |
| `RESEND_API_KEY` | chave do Resend para o formulário de contato |
| `CONTACT_TO_EMAIL` | e-mail que recebe as mensagens |
| `CONTACT_FROM_EMAIL` | remetente, de um domínio verificado no Resend |

Sem `RESEND_API_KEY`, as mensagens do formulário aparecem apenas nos logs do container.

## Editando o conteúdo

Todo o conteúdo fica em `src/data/`, com os textos em português e inglês lado a lado (`{ pt, en }`):

| Arquivo | Conteúdo |
| --- | --- |
| `site.ts` | nome, textos da home, redes sociais, destaques |
| `projects.ts` | projetos e seções da página de projetos |
| `about.ts` | página Sobre: trajetória, formação e foco |
| `practices.ts` | cards e exemplos de código de "Como eu desenvolvo" |
| `skills.ts` | diagrama da página Tech Stack |
| `testimonials.ts` | depoimentos (a seção aparece quando a lista tem itens) |

Textos fixos da interface (botões, títulos) ficam em `src/i18n/dictionaries.ts`. Vídeos, imagens e o currículo ficam em `public/projects/`.

Animações Lottie opcionais: coloque `hero.json`, `skills.json` ou `success.json` em `public/lottie/` para substituir as ilustrações padrão.
