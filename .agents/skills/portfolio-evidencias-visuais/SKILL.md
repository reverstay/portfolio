---
name: portfolio-evidencias-visuais
description: Mapear código de projetos locais, produzir topologias cartonizadas da arquitetura e capturar sistemas reais para este portfólio. Use para levantamento técnico, diagramas ilustrados, prints e documentação de mídia.
---

# Evidências visuais dos projetos

Leia `AGENTS.md` e a reserva do projeto em `docs/COORDENACAO-AGENTES.md`. Use o diretório de repositórios informado pelo usuário; nesta máquina, `C:\Repositorios`. Não altere o sistema de origem apenas para produzir imagens.

## Reconhecer o sistema

Cruze o slug em `src/data/projects.ts` (ou módulos para os quais ele tenha sido dividido) com README, manifests, rotas, configurações de serviços e código. Diferencie cópias, versões antigas e sistemas de nome parecido. Documentação desatualizada não deve substituir a implementação observada.

Registre em `docs/MIDIAS-PROJETOS.md` o caminho do repositório, commit quando disponível, arquivos que sustentam cada conexão e o estado da captura. Não leia `.env`, credenciais, bancos, dumps ou diretórios de clientes para inventariar arquitetura.

## Topologia ilustrada

Interprete “topografia” como mapa visual da arquitetura/fluxo, salvo esclarecimento diferente do usuário. Identifique usuários/dispositivos, aplicação, armazenamento e integrações, com setas verificáveis. Separe ambientes alternativos de implantação; não desenhe serviços alternativos como se rodassem simultaneamente.

Use o estilo cartonizado pedido, com composição legível em desktop e celular. Para ilustração raster, use a ferramenta de geração de imagens e suas instruções disponíveis; para diagrama determinístico em SVG, quando apropriado ao pedido, mantenha textos e conexões editáveis. Ilustração não é print. Não gerar uma interface fictícia e apresentá-la como o sistema real.

Salve o prompt final, fontes, legenda e classificação “arquitetura ilustrada”. Prefira textos curtos de tecnologia na imagem e explicação PT/EN fora dela. Copie o resultado final para `public/projects/`, inspecione a imagem e registre o caminho consumido pelo site. Se a ferramenta estiver indisponível, registre a pendência; não substitua silenciosamente a mídia solicitada.

## Prints em funcionamento

- Confira instruções e scripts de início antes de executá-los. Escolha portas livres, banco separado e fixtures fictícias; não conecte o ambiente de demonstração a bases operacionais.
- Prefira fixtures e modos demo já existentes. Não acione dispositivos físicos, notificações, importadores ou integrações de produção para preencher uma tela.
- Abra o sistema real com navegador e percorra o fluxo que deseja demonstrar. Uma tela de login prova apenas que o login renderiza; não prova o funcionamento do produto.
- Capture visão geral e fluxo principal, e webapp/mobile quando existir. Verifique legibilidade, proporção, carregamento concluído e ausência de dados privados antes de copiar o arquivo para `public/`.
- Registre rota, viewport, origem dos dados fictícios e data. Identifique se a imagem é captura atual, material histórico autorizado ou frame de vídeo existente. Não confunda esses tipos.
- Quando hardware, dependências ou acesso impedirem a execução, registre exatamente o impedimento. Aproveite mídia real já disponível somente com a origem corretamente descrita.
- Encerre apenas os processos que você iniciou, por identificador conhecido. Não pare serviços de outros agentes.

## Registro mínimo por arquivo

`projeto | tipo de mídia | caminho público | origem/arquivos de evidência | rota ou fluxo | viewport | legenda PT/EN | estado da inspeção`

Conserve fontes e prompts nos documentos internos, sem expor detalhes desnecessários na experiência do visitante. A galeria deve explicar a função de cada tela e o significado de cada conexão.
