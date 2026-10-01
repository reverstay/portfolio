---
name: portfolio-validacao
description: Validar mudanças deste portfólio Next.js, especialmente rotas PT/EN, projetos, mídia e comportamento responsivo. Use antes de entregar alterações de interface ou integrar trabalho de agentes.
---

# Validação do portfólio

Leia o `package.json` e a coordenação antes de executar comandos. A validação depende do tipo de mudança; uma edição documental não exige subir todos os sistemas de origem.

## Comandos e concorrência

- `npx tsc --noEmit --incremental false` verifica tipos sem gravar o cache incremental. Os tipos de rotas podem depender de geração prévia do Next; se faltarem, descreva a causa em vez de inventar um resultado.
- `npm run build` é o build existente. Coordene antes: dev e build, ou dois builds, não devem disputar o mesmo `.next`. Não encerre o servidor de outro agente para liberar a pasta.
- O projeto inicialmente não tem scripts de lint/testes. Verifique o manifesto atual; não alegue ter executado scripts inexistentes nem instale uma suíte inteira para uma alteração trivial.
- Se o build falhar por rede, fontes ou serviço externo, registre a saída e separe isso de erro introduzido pelo patch. Não trate a verificação de tipos como substituta de validação visual.

## Escolher verificações relevantes

Para layout ou galeria, abra as rotas afetadas em PT/EN e verifique desktop e celular: navegação, ordem de conteúdo, cortes, proporção, controles de vídeo, legendas, overflow e foco. Confira links locais, incluindo currículo e mídia, e a troca de idioma no mesmo caso.

Para dados de projetos, verifique slugs, referências a arquivos públicos, descrições nos dois idiomas e ausência de métricas inventadas. Para acessibilidade, valide teclado e estados realmente alterados; não declare conformidade total com base em uma inspeção parcial.

Para contato, use testes isolados ou provedor simulado quando adequados. Não envie mensagens reais só para testar. Diferencie sucesso do provedor, configuração ausente e erro; preserve a mensagem digitada em falhas.

Para documentação/skills, verifique frontmatter, links relativos, caminhos citados e instruções inacabadas. Use o validador da skill de criação quando disponível.

Ao terminar, confira `git diff --check`, diff dos seus arquivos e estado final. Registre comando, resultado, rotas/viewports realmente inspecionados e limitações em `docs/COORDENACAO-AGENTES.md`. Não declare validado um cenário que apenas planejou executar.
