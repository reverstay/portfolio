# Trabalho entre agentes

Este repositório pode estar sendo editado simultaneamente por Codex e Claude Code.

1. Leia [docs/COORDENACAO-AGENTES.md](docs/COORDENACAO-AGENTES.md) antes de editar. Registre tarefa, arquivos, estado e validação na tabela de trabalho.
2. Confira `git status --short` e o diff dos arquivos que pretende alterar. Preserve alterações de outros agentes e do usuário. Releia o arquivo imediatamente antes da edição.
3. Trabalhe em arquivos distintos. Se outro agente estiver usando o mesmo arquivo, envie a proposta pelo documento e aguarde uma passagem explícita de responsabilidade. Uma reserva documental não prova que o outro agente a leu.
4. Não use reset, checkout de arquivos, clean, stash ou formatação ampla para desfazer trabalho concorrente. Faça alterações pequenas e identificáveis. Não faça commit, push ou deploy de alterações de terceiros sem coordenação.
5. Mantenha equivalência PT/EN. Use fatos de `src/data/` e evidências dos projetos; não invente métricas, depoimentos, clientes, disponibilidade ou tecnologias.
6. Preserve a marca `ramonmariano.dev`. O domínio `ramonmpm.com` é intencionalmente diferente; não trate isso como erro. O logo da Clínica Remota pertence àquele projeto.
7. Ao terminar, registre o que mudou, comandos e resultados reais, pendências e libere os arquivos. Não marque uma consulta como acordo ou teste pendente como aprovado.

Comandos existentes: `npm run dev`, `npm run build`, `npm run start`. Não há script de lint/testes no `package.json`. Para checar tipos sem atualizar o cache incremental: `npx tsc --noEmit --incremental false`. Evite builds simultâneos ou build e dev compartilhando `.next`.

## Skills locais

Leia a skill pertinente antes da tarefa; os arquivos compartilhados ficam em `.agents/skills/`. Os pontos de entrada de Claude em `.claude/skills/` remetem às mesmas instruções, sem duplicar o procedimento.

| Skill | Quando aplicar |
| --- | --- |
| [portfolio-coordenacao](.agents/skills/portfolio-coordenacao/SKILL.md) | Dividir trabalho, tratar concorrência e integrar alterações entre agentes. |
| [portfolio-evidencias-visuais](.agents/skills/portfolio-evidencias-visuais/SKILL.md) | Inventariar arquitetura, criar topologias cartonizadas e capturar sistemas reais. |
| [portfolio-casos](.agents/skills/portfolio-casos/SKILL.md) | Escrever ou revisar cards, casos e galerias PT/EN. |
| [portfolio-validacao](.agents/skills/portfolio-validacao/SKILL.md) | Verificar tipos/build, rotas, conteúdo e interface antes da entrega. |

As skills apoiam o escopo solicitado; não concedem autorização extra para publicar, acessar dados privados ou interromper agentes. Se o ambiente não descobrir skills automaticamente, abra o `SKILL.md` correspondente por este índice.
