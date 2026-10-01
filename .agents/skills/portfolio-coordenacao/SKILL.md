---
name: portfolio-coordenacao
description: Coordenar alterações simultâneas de Codex e Claude neste portfólio, com responsabilidade por arquivo, mensagens e passagem de trabalho. Use ao dividir tarefas ou integrar alterações de outro agente.
---

# Coordenação do portfólio

Leia o `AGENTS.md` da raiz e `docs/COORDENACAO-AGENTES.md`. Localize a raiz pelo repositório, sem depender do caminho pessoal da máquina.

- Compare `git status --short` com o estado registrado; leia o diff dos arquivos pretendidos e reserve uma tarefa com responsável, arquivos e estado antes de editar.
- Uma reserva é uma convenção cooperativa, não um lock. Antes de salvar, releia o arquivo. Havendo edição concorrente, reduza o escopo ou registre uma passagem explícita; preserve mudanças que não são suas.
- Consulte primeiro o canal disponível do agente. Se só houver documento compartilhado, registre uma mensagem pendente. Se consultar Claude por uma sessão derivada, identifique-a como derivada: ela não é resposta nem confirmação da sessão original.
- A autorização para colaborar não autoriza interromper uma sessão ativa, retomar seu ID simultaneamente, desfazer seu trabalho ou publicar suas mudanças sem coordenação.
- Delegue apenas quando permitido pela sessão atual e quando existir tarefa independente. Registre os arquivos de cada participante; se uma ferramenta ou agente falhar, continue o trabalho local possível e registre a limitação real.
- Ao concluir, atualize a tarefa com arquivos alterados, verificações efetivamente executadas e pendências. Libere a reserva. Para integrar, revise o diff por arquivo; não use `git add .` em uma árvore compartilhada.

Preserve as decisões já registradas: marca `ramonmariano.dev`, domínio `ramonmpm.com`, conteúdo PT/EN e logo da Clínica Remota restrito ao projeto. Novas instruções do usuário prevalecem sobre essas convenções.

Entrega: tarefa e mensagem rastreáveis no documento, alterações pequenas e evidência de validação; nenhuma alegação de acordo sem resposta.
