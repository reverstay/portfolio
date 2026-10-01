---
name: portfolio-casos
description: Criar ou melhorar casos e cards PT/EN neste portfólio, conectando problema, contribuição de Ramon, resultados e mídia verificada. Use para textos, galerias e apresentação dos projetos.
---

# Apresentação dos casos

Leia `AGENTS.md` e confirme quem está editando o modelo de projetos. Antes de alterar, inspecione a versão atual de `src/data/projects.ts`, `src/components/projects/ProjectCard.tsx`, `ProjectDetail.tsx` e `src/i18n/dictionaries.ts`; não presuma que os campos originais ainda existem.

Mostre primeiro o que ajuda a avaliar o trabalho: problema e público, contribuição específica de Ramon, resultado verificável e demonstração. A arquitetura ilustrada explica o sistema; screenshots comprovam a interface. Coloque detalhes técnicos após o resumo quando isso melhorar a leitura.

- Card: título reconhecível, benefício concreto, estado verdadeiro do produto e poucos destaques. Evite listas de tecnologia que ocupem o lugar da explicação do problema.
- Caso: diferencie trabalho individual e em equipe. Não invente números, depoimentos, usuários ativos, disponibilidade, tecnologia ou responsabilidade. Resultados qualitativos são válidos quando específicos e sustentados.
- Mídia: cada item precisa de propósito, descrição alternativa e legenda equivalentes em PT/EN. Distinga arquitetura ilustrada, captura real e material histórico. Preserve proporção; vídeos precisam poder ser examinados e pausados.
- Links: diferencie demonstração pública, acesso autenticado e repositório. Não chame um login privado de demo aberta. Projetos confidenciais não devem ganhar links fictícios.
- Idiomas: mantenha sentido, nomes próprios e números corretos; revise separador decimal, rótulos de mídia e links localizados. Não duplique strings se o dicionário ou o resolvedor existente já atende.
- Evolução de dados: se introduzir `media`, preserve ou migre explicitamente os registros com `images`; não quebrar projetos sem imagens, sem vídeo ou sob confidencialidade. Coordene a alteração do tipo antes de outros agentes preencherem conteúdo.

Use fatos existentes e `docs/MIDIAS-PROJETOS.md` como evidências. Preserve marca, estilo e decisões do usuário. Conclua verificando um caso com mídia, um sem mídia e PT/EN, além das verificações técnicas proporcionais à alteração.
