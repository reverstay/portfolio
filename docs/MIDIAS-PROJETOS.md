# Mídias verificadas — Comando Remoto

## Origem e escopo

Inspeção em 30/09/2026. Fonte: `C:/Repositorios/comando-remoto`, HEAD `835dd2507bff1955447fecac0147db16d5cd955d` (código local, sem alterar fontes). Integração em `src/data/projects.ts`, após passagem explícita do Claude.

As capturas mostram a aplicação React real com backend Django real e banco SQLite demonstrativo isolado em `%TEMP%/portfolio-codex-evidence-20261001`. Dados criados pelo comando nativo `seed_demo`; dispositivos marcados offline. E-mail em memória; acesso externo do navegador bloqueado. Nenhum agente de hardware ou MediaMTX foi iniciado. Não comprovam streaming, desempenho ou acionamento físico.

## Arquivos

| Caminho em public | Tipo / fluxo | Viewport | Inspeção |
| --- | --- | --- | --- |
| `projects/comando-remoto/ativos-desktop.png` | Captura real: login → Ativos, identificação e alertas do dispositivo fictício | 1440 × 1000 | Inspecionada; dados fictícios, equipamento offline |
| `projects/comando-remoto/ativos-mobile.png` | Captura real: mesma lista em celular | 390 × 844, captura da página inteira | Inspecionada; navegação compacta, sem hardware |
| `projects/topologias/comando-remoto-arquitetura.png` | Arquitetura ilustrada preexistente, agora integrada | 1672 × 941 | Inspecionada; esquema conceitual, não representa instalação específica |

Rotas locais da captura: frontend `http://127.0.0.1:5189/`, API `http://127.0.0.1:8019/api`. Tela de pré-visualização KVM também percorrida, mas não incluída porque não havia sinal de vídeo. Legendas e textos alternativos PT/EN estão juntos dos arquivos no campo `media` de `projects.ts`; `cover` reutiliza a captura desktop.

## Fontes da arquitetura

- React e URLs REST/WebSocket/WHEP: `front-end/package.json`, `src/services/runtimeConfig.ts`, `src/app/App.tsx`, `src/services/webrtc.ts`.
- Django, Channels, PostgreSQL: `backend/config/settings.py`; encaminhamento de comandos: `backend/apps/remote_control/views.py` e consumidores do mesmo app.
- USB HID, captura/publicação de vídeo e PCA9685/PWM: `firmware/agent.py`, `firmware/README.md`, `firmware/firmware.md`.
- Distribuição de vídeo: `docker/mediamtx/mediamtx.yml`.

A ilustração já estava no workspace ao retomar. Seu prompt original não foi recuperado; não foi gerada novamente. Os ícones de câmera/equipamento e atuadores são simbólicos. O caminho de vídeo resume captura → publicação → MediaMTX → navegador; não é um diagrama elétrico.

## Material do Blanche

Capturas e ilustração preexistentes foram integradas pelo Claude. Origem detalhada e validação dessa produção permanecem sob responsabilidade registrada em `COORDENACAO-AGENTES.md`; não foram recapturadas nesta tarefa.

Atualização recebida do Claude em 30/09: capturas do Blanche conferidas com usuária “Ana Demonstração”, e-mails @exemplo.com e clientes fictícios. Fontes: `C:/Repositorios/Neuverse/blanche/blanche-system`, commit `186bbf78a`. O Claude verificou PT em 1280/390 px e EN em 1280 px, galeria desktop/mobile e Escape no modal. Essa verificação é atribuída ao Claude; o Codex também verificou carregamento das imagens e ausência de overflow em PT/EN a 1440/390 px. Os prompts originais e viewports de produção das capturas preexistentes não foram recuperados.
