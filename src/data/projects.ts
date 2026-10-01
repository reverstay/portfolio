import { resolve, type Lang, type Localized, type Resolved } from "@/i18n/config";

type Text = string | Localized<string>;
type List = string[] | Localized<string[]>;

// A variante define a cor e o selo do card:
// enterprise (azul) · commercial (verde) · store (âmbar) · freelance (ciano) · wip (ciano, em desenvolvimento) · opensource (cinza)
export type ProjectVariant = "enterprise" | "commercial" | "store" | "freelance" | "wip" | "opensource";

// Seções da página /projetos, na ordem em que aparecem
const rawGroups = [
  {
    id: "software",
    eyebrow: { pt: "desenvolvimento", en: "development" } as Text,
    title: { pt: "Sistemas web e mobile", en: "Web and mobile systems" } as Text,
  },
  {
    id: "hardware",
    eyebrow: "hardware + software",
    title: { pt: "Integração, IoT e telemetria", en: "Integration, IoT and telemetry" } as Text,
  },
  {
    id: "operations",
    eyebrow: { pt: "automação e fabricação", en: "automation and manufacturing" } as Text,
    title: { pt: "Dados, automação e prototipagem", en: "Data, automation and prototyping" } as Text,
  },
] as const;

export type ProjectGroup = (typeof rawGroups)[number]["id"];

// "screenshot": captura real do sistema (ambiente de demonstração, dados fictícios).
// "architecture": ilustração da arquitetura feita a partir do código; não é print.
export type MediaKind = "screenshot" | "architecture";

type RawMedia = {
  src: string;
  kind: MediaKind;
  device?: "desktop" | "mobile";
  alt: Text;
  caption: Text;
};

export type ProjectMedia = Resolved<RawMedia>;

type RawProject = {
  slug: string;
  title: Text;
  cardTitle?: Text;
  category: Text;
  group: ProjectGroup;
  variant: ProjectVariant;
  // Substitui o texto padrão do selo da variante
  badge?: Text;
  featured?: boolean;
  isWeb?: boolean;
  inDevelopment?: boolean;
  description: Text;
  cardDescription?: Text;
  longDescription: Text;
  role?: Text;
  results?: List;
  stack: Text[];
  highlights: List;
  cardHighlights?: List;
  // Logo do cliente/produto (PNG com fundo transparente), exibido no card e no topo da página
  logo?: string;
  images: string[];
  // Galeria com legenda; quando existe, substitui `images` na página do projeto
  media?: RawMedia[];
  // Imagem do produto exibida no card
  cover?: string;
  coverFit?: "contain" | "cover";
  // O link de demoUrl leva a um login, não a uma demonstração aberta
  demoIsLogin?: boolean;
  videoUrl?: string;
  // "phone" mostra o vídeo numa moldura de celular; "wide" em tela cheia. Padrão: wide se isWeb.
  videoLayout?: "phone" | "wide";
  storeImageUrl?: string;
  diagramUrl?: string;
  youtubeEmbedUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  isNda?: boolean;
};

export type Project = Resolved<RawProject>;

const raw: RawProject[] = [
  {
    slug: "blanche",
    title: { pt: "Blanche — Sistema para lavanderia", en: "Blanche — Laundry management system" },
    cardTitle: "Blanche",
    category: "Web",
    group: "software",
    variant: "freelance",
    badge: { pt: "Em produção", en: "In production" },
    featured: true,
    isWeb: true,
    description: {
      pt: "Sistema web que centraliza os dados de uma rede de seis lavanderias em Curitiba.",
      en: "Web system that centralizes data from a network of six laundries in Curitiba, Brazil.",
    },
    longDescription: {
      pt: "Sistema web para uma lavanderia com seis unidades em Curitiba, que precisava reunir em uma plataforma online as informações mantidas em bases locais Paradox.",
      en: "Web system for a laundry business with six locations in Curitiba, which needed to bring the data kept in local Paradox databases into a single online platform.",
    },
    role: {
      pt: "Desenvolvimento full stack, migração e sincronização de dados, processamento em lotes, registro de logs e conferência da quantidade de registros. Implementação de novas tentativas pelo Agendador de Tarefas do Windows e otimização do consumo de memória.",
      en: "Full-stack development, data migration and synchronization, batch processing, logging and record-count verification. Implemented automatic retries through Windows Task Scheduler and optimized memory usage.",
    },
    results: {
      pt: ["Dados do sistema legado disponíveis na plataforma web.", "Redução do consumo de memória após ajustes nas importações e configurações."],
      en: ["Legacy system data available on the web platform.", "Lower memory usage after tuning imports and configuration."],
    },
    stack: [
      "Python",
      "Django",
      "React",
      "PostgreSQL",
      "Paradox",
      "Dropbox",
      "PWA / Web Push",
      "Java",
      "Railway",
      "Nginx",
      { pt: "Agendador de Tarefas do Windows", en: "Windows Task Scheduler" },
    ],
    highlights: {
      pt: [
        "Migração e sincronização de bases Paradox locais para PostgreSQL.",
        "Processamento em lotes com registro de logs e conferência de registros.",
        "Novas tentativas automáticas via Agendador de Tarefas do Windows.",
        "Otimização do consumo de memória nas importações.",
        "Painel web e app instalável (PWA) com telão de produção, pedidos, delivery e avisos por push.",
        "Permissões por papel e por unidade, aplicadas na API.",
      ],
      en: [
        "Migration and synchronization of local Paradox databases to PostgreSQL.",
        "Batch processing with logging and record verification.",
        "Automatic retries via Windows Task Scheduler.",
        "Memory usage optimization during imports.",
        "Web dashboard and installable app (PWA) with production board, orders, delivery and push notifications.",
        "Role- and location-based permissions enforced by the API.",
      ],
    },
    cardHighlights: {
      pt: ["Sincronização de bases Paradox com a nuvem.", "Importações em lote com logs e conferência."],
      en: ["Paradox databases synced to the cloud.", "Batch imports with logging and verification."],
    },
    images: [],
    cover: "/projects/blanche/blanche-logo.png",
    coverFit: "contain",
    media: [
      {
        src: "/projects/topologias/blanche-arquitetura.png",
        kind: "architecture",
        alt: {
          pt: "Mapa ilustrado: seis lavanderias com bases Paradox enviam dados ao Dropbox; um coletor grava no PostgreSQL, servido por uma API Django a um front-end React instalável.",
          en: "Illustrated map: six laundries with Paradox databases send data to Dropbox; a collector writes it to PostgreSQL, served by a Django API to an installable React front end.",
        },
        caption: {
          pt: "As bases Paradox de cada loja chegam pelo Dropbox. O coletor converte e importa os dados no PostgreSQL; a API Django enfileira novas coletas e atende o painel web e o app.",
          en: "Each store's Paradox databases arrive through Dropbox. The collector converts and imports them into PostgreSQL; the Django API queues new runs and serves the web dashboard and the app.",
        },
      },
      {
        src: "/projects/blanche/desktop/03-dashboard.webp",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Dashboard com pedidos, pendências, atrasos, faturamento e ticket médio das seis unidades.",
          en: "Dashboard with orders, pending and late items, revenue and average ticket across six locations.",
        },
        caption: {
          pt: "Dashboard consolidado da rede: indicadores por período, com gráficos que abrem a lista de pedidos correspondente.",
          en: "Network-wide dashboard: indicators by period, with charts that open the matching list of orders.",
        },
      },
      {
        src: "/projects/blanche/desktop/04-telao.webp",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Telão com fichas das comandas do dia, separadas por unidade, status e urgência.",
          en: "Production board with the day's tickets, by location, status and urgency.",
        },
        caption: {
          pt: "Telão da produção: cada ficha mostra as peças que ainda faltam sair, com baixa por peça ou da comanda inteira.",
          en: "Production board: each ticket shows the items still to go out, cleared one item at a time or all at once.",
        },
      },
      {
        src: "/projects/blanche/desktop/05-pedidos.webp",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Grade de pedidos com ROL, cliente, entrega, valores, despacho e situação.",
          en: "Order grid with ticket number, customer, due date, amounts, dispatch and status.",
        },
        caption: {
          pt: "Grade de pedidos no formato do sistema legado das lojas, com atalhos de teclado e cores por situação de pagamento.",
          en: "Order grid in the layout of the stores' legacy system, with keyboard shortcuts and colors by payment status.",
        },
      },
      {
        src: "/projects/blanche/desktop/07-delivery.webp",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Quadro de delivery com colunas de pedidos novos, confirmados e em rota.",
          en: "Delivery board with columns for new, confirmed and en-route orders.",
        },
        caption: {
          pt: "Delivery: coletas e entregas em domicílio organizadas em quadro; pedidos feitos pelo site entram como novos.",
          en: "Delivery: home pickups and drop-offs on a board; orders placed on the website arrive as new.",
        },
      },
      {
        src: "/projects/blanche/desktop/08-backup.webp",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Painel de backup com estado da última coleta, unidades sincronizadas, falhas e agenda automática.",
          en: "Backup panel with last run status, synced locations, failures and automatic schedule.",
        },
        caption: {
          pt: "Backup das lojas: estado da sincronização, falhas por unidade, versões guardadas no Dropbox e horários da coleta automática.",
          en: "Store backups: sync status, failures per location, versions kept in Dropbox and automatic collection times.",
        },
      },
      {
        src: "/projects/blanche/desktop/10-permissoes.webp",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Tabela de papéis (master, administrador, operacional, caixa) e o que cada um pode fazer.",
          en: "Table of roles (master, administrator, operations, cashier) and what each can do.",
        },
        caption: {
          pt: "Papéis e permissões: a tabela é gerada do mesmo código que aplica as regras na API.",
          en: "Roles and permissions: the table is generated from the same code that enforces the rules in the API.",
        },
      },
      {
        src: "/projects/blanche/mobile/03-telao.webp",
        kind: "screenshot",
        device: "mobile",
        alt: { pt: "Telão no celular, com filtro de unidades e ficha de comanda.", en: "Production board on a phone, with location filter and a ticket card." },
        caption: { pt: "Telão no celular, com navegação inferior.", en: "Production board on a phone, with bottom navigation." },
      },
      {
        src: "/projects/blanche/mobile/02-instalar-app.webp",
        kind: "screenshot",
        device: "mobile",
        alt: { pt: "Tela inicial no celular com convite para instalar o app.", en: "Mobile home screen with a prompt to install the app." },
        caption: { pt: "Instalação como app (PWA), que abre em tela cheia pelo ícone.", en: "Install as an app (PWA), opening full screen from its icon." },
      },
      {
        src: "/projects/blanche/mobile/05-avisos.webp",
        kind: "screenshot",
        device: "mobile",
        alt: {
          pt: "Central de avisos com coleta concluída, comanda urgente, backup atrasado e novo pedido.",
          en: "Notification center with finished sync, urgent ticket, late backup and new order.",
        },
        caption: { pt: "Central de avisos, também enviados por push ao aparelho.", en: "Notification center, also delivered as push notifications." },
      },
    ],
    demoUrl: "https://blanche.neuverse.com.br/login",
    demoIsLogin: true,
  },
  {
    slug: "comando-remoto",
    title: "Comando Remoto",
    category: "IoT",
    group: "hardware",
    variant: "enterprise",
    badge: "Hardware + software",
    description: {
      pt: "Controle físico remoto de equipamentos de ressonância magnética GE via KVM over IP, com vídeo em baixa latência.",
      en: "Remote physical control of GE MRI equipment via KVM over IP, with low-latency video.",
    },
    longDescription: {
      pt: "Integração de hardware e software para operar equipamentos de ressonância magnética da GE à distância: o console do equipamento é controlado via KVM over IP, com vídeo transmitido em baixa latência, e atuadores físicos são acionados remotamente.",
      en: "Hardware and software integration for operating GE MRI equipment remotely: the equipment console is controlled via KVM over IP with low-latency video streaming, and physical actuators are driven remotely.",
    },
    role: {
      pt: "Desenvolvimento do software full stack e da infraestrutura: KVM over IP com Raspberry Pi 5 em modo USB Gadget, streaming de vídeo via WebRTC/WHEP, comunicação em tempo real com Django Channels e controle de atuadores, incluindo motores de passo, por sinais PWM.",
      en: "Full-stack software and infrastructure development: KVM over IP using a Raspberry Pi 5 in USB Gadget mode, video streaming over WebRTC/WHEP, real-time communication with Django Channels and actuator control, including stepper motors, through PWM signals.",
    },
    results: {
      pt: ["Integração entre a aplicação web e os dispositivos físicos, permitindo executar comandos remotos sobre os atuadores."],
      en: ["Integration between the web application and the physical devices, enabling remote commands on the actuators."],
    },
    stack: ["Django", "Django Channels", "React", "Raspberry Pi 5", "USB Gadget", "KVM over IP", "WebRTC / WHEP", "PWM"],
    highlights: {
      pt: [
        "KVM over IP com Raspberry Pi 5 emulando teclado e mouse via USB Gadget.",
        "Vídeo do equipamento em baixa latência com WebRTC/WHEP.",
        "Comandos em tempo real com Django Channels.",
        "Controle de motores de passo por PWM.",
      ],
      en: [
        "KVM over IP with a Raspberry Pi 5 emulating keyboard and mouse via USB Gadget.",
        "Low-latency equipment video over WebRTC/WHEP.",
        "Real-time commands with Django Channels.",
        "Stepper motor control through PWM.",
      ],
    },
    cardHighlights: {
      pt: ["KVM over IP com Raspberry Pi 5.", "Vídeo em baixa latência com WebRTC."],
      en: ["KVM over IP with a Raspberry Pi 5.", "Low-latency video with WebRTC."],
    },
    images: [],
    cover: "/projects/comando-remoto/ativos-desktop.png",
    media: [
      {
        src: "/projects/topologias/comando-remoto-arquitetura.png",
        kind: "architecture",
        alt: {
          pt: "Arquitetura ilustrada: React, Django Channels, PostgreSQL, Raspberry Pi, USB HID, PWM e vídeo via MediaMTX.",
          en: "Illustrated architecture: React, Django Channels, PostgreSQL, Raspberry Pi, USB HID, PWM and video through MediaMTX.",
        },
        caption: {
          pt: "Comandos seguem da aplicação React ao Django Channels e ao Raspberry Pi; USB HID e PWM conectam o controle ao hardware. O vídeo é distribuído pelo MediaMTX via WebRTC/WHEP. Ilustração conceitual, sem representar uma instalação física específica.",
          en: "Commands flow from React through Django Channels to the Raspberry Pi; USB HID and PWM connect control to hardware. MediaMTX delivers video over WebRTC/WHEP. Conceptual illustration, not a depiction of a specific physical installation.",
        },
      },
      {
        src: "/projects/comando-remoto/ativos-desktop.png",
        kind: "screenshot",
        device: "desktop",
        alt: {
          pt: "Painel de ativos do Comando Remoto com dispositivo de demonstração offline e alertas de comunicação.",
          en: "Comando Remoto asset panel with an offline demo device and communication alerts.",
        },
        caption: {
          pt: "Lista de ativos com identificação do equipamento, estado da conexão e últimos alertas. Captura real em ambiente local com dados fictícios e dispositivo offline; não demonstra streaming nem acionamento físico.",
          en: "Asset list showing equipment identification, connection status and recent alerts. Actual capture from a local environment with fictitious data and an offline device; it does not demonstrate streaming or physical actuation.",
        },
      },
      {
        src: "/projects/comando-remoto/ativos-mobile.png",
        kind: "screenshot",
        device: "mobile",
        alt: {
          pt: "Lista de ativos e alertas do Comando Remoto em tela de celular, com dispositivo fictício offline.",
          en: "Comando Remoto asset list and alerts on a mobile screen, with a fictitious offline device.",
        },
        caption: {
          pt: "A mesma interface em tela de celular: navegação compacta e consulta ao estado do ativo. Dados fictícios, sem hardware conectado.",
          en: "The same interface on a mobile screen: compact navigation and asset status. Fictitious data, with no connected hardware.",
        },
      },
    ],
  },
  {
    slug: "robo-autonomo-lidar",
    title: { pt: "Robô autônomo com LiDAR — Turtlebot Relâmpago Marquinhos", en: "Autonomous LiDAR robot — Turtlebot Relâmpago Marquinhos" },
    cardTitle: { pt: "Robô autônomo com LiDAR", en: "Autonomous LiDAR robot" },
    category: { pt: "Robótica", en: "Robotics" },
    group: "hardware",
    variant: "opensource",
    badge: { pt: "Projeto acadêmico", en: "Academic project" },
    isWeb: true,
    description: {
      pt: "Robô móvel que mapeia o ambiente com um LiDAR 2D e navega em modo autônomo ou manual.",
      en: "Mobile robot that maps its surroundings with a 2D LiDAR and drives in autonomous or manual mode.",
    },
    longDescription: {
      pt: "Robô no estilo Turtlebot desenvolvido na UTFPR em equipe de três pessoas (Ramon M. P. Mariano, Raphael Leite Diniz e Gustavo Orlando Bocon Huziy). Um Raspberry Pi com Ubuntu lê o LiDAR e constrói o mapa do ambiente, enquanto um ESP32 com FreeRTOS controla os motores e lê os sensores de movimento. O mapa gerado pode ser salvo ao fim da exploração.",
      en: "Turtlebot-style robot developed at UTFPR by a team of three (Ramon M. P. Mariano, Raphael Leite Diniz and Gustavo Orlando Bocon Huziy). A Raspberry Pi running Ubuntu reads the LiDAR and builds a map of the environment, while an ESP32 running FreeRTOS drives the motors and reads the motion sensors. The resulting map can be saved at the end of the exploration.",
    },
    role: {
      pt: "Desenvolvimento do sistema embarcado e da integração entre Raspberry Pi e ESP32, programação em Python e FreeRTOS, montagem eletrônica e fabricação da estrutura com impressão 3D.",
      en: "Developed the embedded system and the Raspberry Pi–ESP32 integration, programmed in Python and FreeRTOS, assembled the electronics and fabricated the chassis parts with 3D printing.",
    },
    results: {
      pt: [
        "Mapeamento de ambientes internos com LiDAR 2D, com salvamento do mapa.",
        "Dois modos de operação: autônomo e manual.",
        "Arquitetura documentada em diagrama de blocos, da alimentação aos sensores.",
      ],
      en: [
        "Indoor mapping with a 2D LiDAR, with map saving.",
        "Two operating modes: autonomous and manual.",
        "Architecture documented in a block diagram, from power supply to sensors.",
      ],
    },
    stack: [
      "Ubuntu",
      "Python",
      "FreeRTOS",
      "Raspberry Pi 4",
      "ESP32",
      { pt: "LiDAR 2D", en: "2D LiDAR" },
      { pt: "Giroscópio e acelerômetro", en: "Gyroscope and accelerometer" },
      "Encoders",
      { pt: "Ponte H", en: "H-bridge" },
      { pt: "Impressão 3D", en: "3D printing" },
    ],
    highlights: {
      pt: [
        "Raspberry Pi 4 com Ubuntu processando o LiDAR e gerando o mapa.",
        "ESP32 com FreeRTOS controlando dois motores via ponte H, com encoders e giroscópio/acelerômetro.",
        "Alimentação por bateria com conversor step-down de 12 V para 5 V.",
        "Estrutura e suportes fabricados com impressão 3D.",
      ],
      en: [
        "Raspberry Pi 4 running Ubuntu processes the LiDAR and builds the map.",
        "ESP32 with FreeRTOS drives two motors through an H-bridge, with encoders and a gyroscope/accelerometer.",
        "Battery power with a 12 V to 5 V step-down converter.",
        "Chassis and mounts fabricated with 3D printing.",
      ],
    },
    cardHighlights: {
      pt: ["Mapeamento com LiDAR 2D.", "ESP32 com FreeRTOS + Raspberry Pi com Ubuntu."],
      en: ["Mapping with a 2D LiDAR.", "ESP32 with FreeRTOS + Raspberry Pi with Ubuntu."],
    },
    images: [],
    videoUrl: "/projects/robo-autonomo.mp4",
    videoLayout: "wide",
  },
  {
    slug: "clinica-remota",
    title: { pt: "Clínica Remota — Telemetria de equipamentos médicos", en: "Clínica Remota — Medical equipment telemetry" },
    cardTitle: "Clínica Remota",
    category: { pt: "Telemetria", en: "Telemetry" },
    group: "hardware",
    variant: "commercial",
    badge: { pt: "Em operação", en: "In operation" },
    featured: true,
    description: {
      pt: "Monitoramento remoto de equipamentos médicos: módulos de telemetria, rede segura e plataforma de gestão.",
      en: "Remote monitoring of medical equipment: telemetry modules, a secure network and a management platform.",
    },
    longDescription: {
      pt: "Solução para monitorar equipamentos médicos à distância. Reúne os módulos de telemetria instalados nos equipamentos, a conectividade entre eles e os recursos de monitoramento, estruturada por redes overlay, e uma plataforma de gestão para a operação.",
      en: "A solution for monitoring medical equipment remotely. It combines the telemetry modules installed on the equipment, overlay-network connectivity between them and the monitoring resources, and a management platform for the operation.",
    },
    role: {
      pt: "Montagem, configuração e testes dos módulos; melhorias de hardware, firmware e processos; diagnóstico de falhas e suporte às equipes de campo. Gestão da infraestrutura de comunicação e segurança com redes overlay. Desenvolvimento e manutenção da plataforma de gestão, com documentos, relatórios, compras, estoque, comunicação interna e autenticação integrada ao Google, além de relatórios de qualidade de montagem, instalação e testes.",
      en: "Module assembly, configuration and testing; hardware, firmware and process improvements; fault diagnosis and support for field teams. Management of the communication and security infrastructure with overlay networks. Built and maintained the management platform for documents, reporting, procurement, inventory, internal communication and Google-integrated authentication, plus quality reporting for assembly, installation and testing.",
    },
    results: {
      pt: [
        "Participação na expansão da operação de 10 para 72 unidades (+620%).",
        "Custo de produção e instalação por módulo reduzido de R$ 2.700 para R$ 1.850 (−31,5%).",
        "Mais de 20 manuais de processo produzidos.",
        "Apoio a mais de 15 instalações em campo.",
        "Conectividade dos equipamentos garantida por seis chips de dados de telemetria.",
      ],
      en: [
        "Contributed to expanding the operation from 10 to 72 units (+620%).",
        "Production and installation cost per module reduced from R$ 2,700 to R$ 1,850 (−31.5%).",
        "20+ process manuals written.",
        "Supported 15+ field installations.",
        "Equipment connectivity through six telemetry data SIMs.",
      ],
    },
    stack: [
      { pt: "Eletrônica", en: "Electronics" },
      "Firmware",
      { pt: "Telemetria", en: "Telemetry" },
      "Django",
      "React",
      "PostgreSQL",
      "Django Channels",
      "NetBird",
      "ZeroTier",
      { pt: "Redes overlay", en: "Overlay networks" },
      "Google OAuth",
    ],
    highlights: {
      pt: [
        "Melhorias de hardware, firmware e processos de montagem dos módulos.",
        "Redes overlay com NetBird e ZeroTier para acesso seguro aos equipamentos.",
        "Plataforma de gestão com login integrado ao Google.",
        "Padronização de procedimentos de montagem, configuração e testes.",
      ],
      en: [
        "Hardware, firmware and assembly process improvements for the modules.",
        "Overlay networks with NetBird and ZeroTier for secure equipment access.",
        "Management platform with Google sign-in.",
        "Standardized assembly, configuration and testing procedures.",
      ],
    },
    cardHighlights: {
      pt: ["Custo por módulo reduzido em 31,5%.", "Operação expandida de 10 para 72 unidades."],
      en: ["Cost per module reduced by 31.5%.", "Operation expanded from 10 to 72 units."],
    },
    images: [],
    media: [
      {
        src: "/projects/clinica-remota/erp/arquitetura.webp",
        kind: "architecture",
        alt: {
          pt: "Mapa ilustrado do ERP: navegador acessa o Nginx, que serve o React e encaminha ao Django ASGI; Django usa PostgreSQL e Redis, autentica pelo Google e sincroniza com a API da Clínica Remota; dados do Flask legado migrados por comando.",
          en: "Illustrated ERP map: the browser reaches Nginx, which serves React and proxies to Django ASGI; Django uses PostgreSQL and Redis, signs in with Google and syncs with the Clínica Remota API; legacy Flask data migrated by a command.",
        },
        caption: {
          pt: "Plataforma de gestão (ERP): o Nginx entrega o React e encaminha API, WebSocket e páginas ao Django ASGI. O chat usa Redis via Channels; inventário de clínicas e ativos e eventos de disponibilidade vêm da API da Clínica Remota. Os dados do sistema Flask anterior entram por um comando de migração.",
          en: "Management platform (ERP): Nginx serves React and proxies API, WebSocket and pages to Django ASGI. Chat runs on Redis through Channels; the clinic and asset inventory and availability events come from the Clínica Remota API. Data from the previous Flask system is brought in by a migration command.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/desktop/01-inicio.webp",
        kind: "screenshot",
        device: "desktop",
        alt: { pt: "Tela inicial do ERP com atalhos para menu, chat, produção, compras, estoque, relatórios e ativos.", en: "ERP home screen with shortcuts to menu, chat, production, purchasing, inventory, reports and assets." },
        caption: {
          pt: "Início: atalhos para as áreas do sistema, alertas e notificações recentes, com menu lateral por operação, documentos e cadastros.",
          en: "Home: shortcuts to each area, recent alerts and notifications, with a side menu grouped into operations, documents and records.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/desktop/02-temas.webp",
        kind: "screenshot",
        device: "desktop",
        alt: { pt: "A mesma tela inicial nos temas Claro, Escuro, Midnight e OPX Junina.", en: "The same home screen in the Light, Dark, Midnight and OPX Junina themes." },
        caption: {
          pt: "Quatro temas — Claro, Escuro, Midnight e OPX Junina —, trocados por um botão no cabeçalho e lembrados no navegador.",
          en: "Four themes — Light, Dark, Midnight and OPX Junina — switched from a header button and remembered by the browser.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/desktop/03-planejamento-compras.webp",
        kind: "screenshot",
        device: "desktop",
        alt: { pt: "Planejamento de compras no tema escuro, com total de módulos, cotação do dólar, importação de CSV e totais.", en: "Purchase planning in the dark theme, with module count, dollar rate, CSV import and totals." },
        caption: {
          pt: "Planejamento de compras: calcula custo por módulo, material de instalação e total a partir da quantidade de módulos e da cotação do dólar; itens podem vir de CSV.",
          en: "Purchase planning: computes cost per module, installation material and total from the module count and the dollar rate; items can be imported from CSV.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/desktop/04-fluxo-producao.webp",
        kind: "screenshot",
        device: "desktop",
        alt: { pt: "Fluxo de produção no tema Midnight, com filtros por cliente, estágio, serial do painel e data de instalação.", en: "Production flow in the Midnight theme, with filters by customer, stage, panel serial and installation date." },
        caption: {
          pt: "Fluxo de produção: acompanha cada ativo por cliente, clínica e estágio, do painel à instalação.",
          en: "Production flow: tracks each asset by customer, clinic and stage, from panel to installation.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/desktop/05-estagios.webp",
        kind: "screenshot",
        device: "desktop",
        alt: { pt: "Cadastro dos estágios de relatório: montagem, testes, instalação e concluído.", en: "Report stage settings: assembly, testing, installation and done." },
        caption: {
          pt: "Estágios configuráveis — montagem, testes, instalação e concluído — que organizam os relatórios de qualidade.",
          en: "Configurable stages — assembly, testing, installation and done — that structure the quality reports.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/desktop/06-usuarios.webp",
        kind: "screenshot",
        device: "desktop",
        alt: { pt: "Gestão de usuários com perfis admin, financeiro, gestor, técnico, visualizador e almoxarifado e vínculo com o Google.", en: "User management with admin, finance, manager, technician, viewer and warehouse roles and Google account link." },
        caption: {
          pt: "Usuários e perfis de acesso, com login local ou pela conta Google.",
          en: "Users and access roles, with local sign-in or a Google account.",
        },
      },
      {
        src: "/projects/clinica-remota/erp/mobile/01-inicio.webp",
        kind: "screenshot",
        device: "mobile",
        alt: { pt: "Tela inicial do ERP no celular, tema claro.", en: "ERP home screen on a phone, light theme." },
        caption: { pt: "Início no celular, tema claro.", en: "Home on a phone, light theme." },
      },
      {
        src: "/projects/clinica-remota/erp/mobile/02-menu.webp",
        kind: "screenshot",
        device: "mobile",
        alt: { pt: "Menu do sistema no celular, tema OPX Junina.", en: "System menu on a phone, OPX Junina theme." },
        caption: { pt: "Menu do sistema, tema OPX Junina.", en: "System menu, OPX Junina theme." },
      },
      {
        src: "/projects/clinica-remota/erp/mobile/03-fluxo.webp",
        kind: "screenshot",
        device: "mobile",
        alt: { pt: "Filtros do fluxo de produção no celular, tema escuro.", en: "Production flow filters on a phone, dark theme." },
        caption: { pt: "Fluxo de produção, tema escuro.", en: "Production flow, dark theme." },
      },
    ],
    logo: "/projects/clinica-remota-logo.png",
    videoUrl: "/projects/clinica-remota.mp4",
    videoLayout: "phone",
    demoUrl: "https://clinicaremota.com",
  },
  {
    slug: "erp-nucleo-dev",
    title: "ERP Núcleo Dev",
    category: "Web",
    group: "software",
    variant: "store",
    badge: { pt: "Sistema interno", en: "Internal system" },
    isWeb: true,
    description: {
      pt: "Sistema de gestão interno para apoiar a operação do núcleo de desenvolvimento.",
      en: "Internal management system supporting the development team's operation.",
    },
    longDescription: {
      pt: "Sistema de gestão empresarial interno, criado para apoiar a operação do núcleo de desenvolvimento.",
      en: "Internal enterprise resource planning system built to support the development team's operation.",
    },
    role: {
      pt: "Criação e manutenção do ERP, com automação de processos e implementação de integração e entrega contínuas.",
      en: "Built and maintained the ERP, automating processes and implementing continuous integration and delivery.",
    },
    results: {
      pt: ["Plataforma interna de gestão entregue e mantida, com integração e entrega de software automatizadas."],
      en: ["Internal management platform delivered and maintained, with automated software integration and delivery."],
    },
    stack: ["Python", "Django", "GitHub Actions", "CI/CD"],
    highlights: {
      pt: ["Automação de processos internos.", "Pipelines de CI/CD com GitHub Actions."],
      en: ["Internal process automation.", "CI/CD pipelines with GitHub Actions."],
    },
    images: [],
  },
  {
    slug: "manufatura-aditiva",
    title: { pt: "Manufatura aditiva e prototipagem rápida", en: "Additive manufacturing and rapid prototyping" },
    cardTitle: { pt: "Manufatura aditiva", en: "Additive manufacturing" },
    category: { pt: "Fabricação 3D", en: "3D manufacturing" },
    group: "operations",
    variant: "opensource",
    badge: { pt: "Fabricação", en: "Manufacturing" },
    description: {
      pt: "Peças customizadas e de reposição para equipamentos médicos Philips, GE e Siemens.",
      en: "Custom and spare parts for Philips, GE and Siemens medical equipment.",
    },
    longDescription: {
      pt: "Desenvolvimento de peças e componentes customizados, incluindo reposição para equipamentos médicos Philips, GE e Siemens, e iteração de protótipos para novos hardwares.",
      en: "Development of custom parts and components, including spare parts for Philips, GE and Siemens medical equipment, and prototype iteration for new hardware.",
    },
    role: {
      pt: "Gerenciamento do setor de impressão 3D, engenharia reversa, digitalização, modelagem e fabricação de peças. Projeto de um elo para bobina abdominal de ressonância GE, com fabricação coordenada na China. Apoio à engenharia reversa de circuitos de bobinas e pré-amplificadores de ressonância.",
      en: "Managed the 3D printing area: reverse engineering, 3D scanning, modeling and part fabrication. Designed a replacement link for a GE abdominal MRI coil and coordinated its manufacturing in China. Supported reverse engineering of MRI coil and preamplifier circuits.",
    },
    results: {
      pt: ["Mais de 40 peças desenvolvidas para mais de 15 modelos de equipamentos.", "Elo projetado e em uso em uma bobina abdominal de ressonância GE."],
      en: ["40+ parts developed for 15+ equipment models.", "Replacement link designed and now in use in a GE abdominal MRI coil."],
    },
    stack: [
      "Autodesk Fusion 360",
      "Blender",
      "OrcaSlicer",
      "Creality K1 Max",
      "Creality Raptor",
      "Bambu Lab",
      "PLA · ABS · TPU · PETG",
      "Nylon · PET-CF",
    ],
    highlights: {
      pt: [
        "Engenharia reversa com escaneamento 3D.",
        "Modelagem paramétrica e iteração de protótipos.",
        "Fabricação em PLA, ABS, TPU, nylon, PETG e PET-CF.",
      ],
      en: ["Reverse engineering with 3D scanning.", "Parametric modeling and prototype iteration.", "Fabrication in PLA, ABS, TPU, nylon, PETG and PET-CF."],
    },
    cardHighlights: {
      pt: ["Mais de 40 peças para mais de 15 modelos.", "Engenharia reversa com escaneamento 3D."],
      en: ["40+ parts for 15+ equipment models.", "Reverse engineering with 3D scanning."],
    },
    images: [],
  },
  {
    slug: "uaxica",
    title: { pt: "Uaxica — Aplicativo e site de mobilidade", en: "Uaxica — Mobility app and website" },
    cardTitle: "Uaxica",
    category: { pt: "App mobile", en: "Mobile app" },
    group: "software",
    variant: "freelance",
    badge: { pt: "App + site", en: "App + website" },
    description: {
      pt: "Plataforma de mobilidade de uma empresa de Luanda, Angola, com apps para passageiros e motoristas.",
      en: "Mobility platform for a company based in Luanda, Angola, with apps for passengers and drivers.",
    },
    longDescription: {
      pt: "Plataforma de mobilidade de uma empresa sediada em Luanda, Angola, com interfaces para passageiros e motoristas e um site institucional. Trabalho remoto entre janeiro e junho de 2024.",
      en: "Mobility platform for a company based in Luanda, Angola, with interfaces for passengers and drivers and a corporate website. Remote work from January to June 2024.",
    },
    role: {
      pt: "Desenvolvimento de telas, navegação, validações, lógica de negócio e integração com serviços de backend em Flutter. Apoio à localização e à preparação de assets Android/iOS, protótipos de telas no Figma e builds Android para testes. Desenvolvimento do site institucional.",
      en: "Built screens, navigation, input validation, business logic and backend service integration in Flutter. Supported localization and Android/iOS asset preparation, created Figma screen prototypes and prepared Android test builds. Developed the corporate website.",
    },
    results: {
      pt: ["Interfaces para dois perfis de usuário: passageiro e motorista.", "Site institucional responsivo alinhado à identidade visual do aplicativo."],
      en: ["Interfaces for two user groups: passengers and drivers.", "Responsive corporate website consistent with the app's visual identity."],
    },
    stack: ["Flutter", "Dart", "Figma", "Gradle", "Bootstrap", "JavaScript", "Node.js"],
    highlights: {
      pt: ["Telas, navegação e validações em Flutter.", "Integração com serviços de backend.", "Builds Android para testes com Gradle."],
      en: ["Screens, navigation and validation in Flutter.", "Backend service integration.", "Android test builds with Gradle."],
    },
    cardHighlights: {
      pt: ["Apps para passageiros e motoristas.", "Site institucional responsivo."],
      en: ["Apps for passengers and drivers.", "Responsive corporate website."],
    },
    images: [],
    videoUrl: "/projects/uaxica.mp4",
    videoLayout: "wide",
  },
  {
    slug: "medbot",
    title: { pt: "MedBot — Bot de Telegram para o centro de operações da Copel", en: "MedBot — Telegram bot for Copel's operations center" },
    cardTitle: "MedBot",
    category: "Bot Telegram",
    group: "operations",
    variant: "enterprise",
    badge: { pt: "Ferramenta interna", en: "Internal tool" },
    description: {
      pt: "Bot de Telegram que agiliza consultas e testes de telemetria no centro de operações da medição da Copel Distribuição.",
      en: "Telegram bot that speeds up telemetry lookups and tests at Copel Distribuição's metering operations center.",
    },
    longDescription: {
      pt: "Bot desenvolvido para o centro de operações do departamento de medição (DMED) da Copel Distribuição. Reúne em um chat as consultas que as equipes fazem no dia a dia: status e comissionamento de telemetrias, rotinas de medidores e cobertura de sinal das operadoras na região do equipamento.",
      en: "Bot built for the operations center of Copel Distribuição's metering department (DMED). It brings the team's everyday lookups into a single chat: telemetry status and commissioning, meter routines and carrier signal coverage around the equipment.",
    },
    role: {
      pt: "Concepção e desenvolvimento do bot: fluxo de menus, validação das entradas, consulta aos dados das telemetrias e geração do mapa de cobertura de sinal.",
      en: "Designed and built the bot: menu flow, input validation, telemetry data lookups and signal coverage map generation.",
    },
    results: {
      pt: [
        "Status de uma telemetria em segundos: operadora, intensidade do sinal, temperatura, servidor e porta de conexão, cliente, data e tipo de conexão.",
        "Mapa interativo com as antenas mais próximas e a distância até cada uma, por operadora.",
        "Menus para comissionamento, memória de massa e ajuste de relógio de medidores.",
      ],
      en: [
        "Telemetry status in seconds: carrier, signal strength, temperature, connection server and port, client, connection date and type.",
        "Interactive map with the nearest cell towers and the distance to each one, by carrier.",
        "Menus for commissioning, meter load profile and meter clock adjustment.",
      ],
    },
    stack: ["Telegram Bot API", "Leaflet", "OpenStreetMap", { pt: "Telemetria GPRS", en: "GPRS telemetry" }],
    highlights: {
      pt: [
        "Menus em teclado inline: Telemetria, Medidor, Cobertura de Sinal e Ajuda.",
        "Validação do número da telemetria (prefixo 00 seguido de oito dígitos).",
        "Mapa HTML gerado sob demanda com antenas por operadora.",
      ],
      en: [
        "Inline keyboard menus: Telemetry, Meter, Signal Coverage and Help.",
        "Telemetry ID validation (00 prefix followed by eight digits).",
        "On-demand HTML map with cell towers by carrier.",
      ],
    },
    cardHighlights: {
      pt: ["Status de telemetria direto no chat.", "Mapa de cobertura de sinal por operadora."],
      en: ["Telemetry status right in the chat.", "Signal coverage map by carrier."],
    },
    images: [],
    videoUrl: "/projects/medbot.mp4",
    videoLayout: "phone",
  },
  {
    slug: "copel-automacao-medicao",
    title: { pt: "Automação e análise de medição na Copel", en: "Metering automation and analytics at Copel" },
    cardTitle: { pt: "Automação na Copel", en: "Automation at Copel" },
    category: { pt: "Automação", en: "Automation" },
    group: "operations",
    variant: "enterprise",
    badge: { pt: "Setor elétrico", en: "Power utility" },
    description: {
      pt: "Automação de rotinas e análise de dados no departamento de medição de energia (DMED).",
      en: "Routine automation and data analysis at the energy metering department (DMED).",
    },
    longDescription: {
      pt: "Automação de rotinas e análise de dados no departamento de medição de energia (DMED) da Copel, entre 2023 e 2024.",
      en: "Routine automation and data analysis at Copel's energy metering department (DMED), from 2023 to 2024.",
    },
    role: {
      pt: "Scripts em Python para processamento de dados e tarefas recorrentes. Apoio à substituição de equipamentos de telemedição em subestações, com testes de comunicação e verificação de conectividade junto às equipes de campo. Apoio à avaliação técnica de equipamentos e à organização das atividades dos estagiários.",
      en: "Python scripts for data processing and recurring tasks. Supported telemetering equipment replacement at substations, with communication tests and connectivity checks alongside field teams. Supported equipment assessment and coordinated intern assignments.",
    },
    results: {
      pt: ["Rotinas automatizadas e análises de dados de medição para apoiar a operação."],
      en: ["Automated routines and metering data analyses supporting the operation."],
    },
    stack: ["Python", "pandas", "openpyxl", "Excel", "Power BI"],
    highlights: {
      pt: [
        "Automação de tarefas recorrentes com pandas e openpyxl.",
        "Análises de dados de medição com Python e Power BI.",
        "Testes de comunicação de telemedição em subestações.",
      ],
      en: [
        "Recurring task automation with pandas and openpyxl.",
        "Metering data analysis with Python and Power BI.",
        "Telemetering communication tests at substations.",
      ],
    },
    cardHighlights: {
      pt: ["Rotinas automatizadas em Python.", "Análises de medição com Power BI."],
      en: ["Automated routines in Python.", "Metering analytics with Power BI."],
    },
    images: [],
  },
];

export const projectSlugs = raw.map((p) => p.slug);

export function getProjects(lang: Lang): Project[] {
  return resolve(raw, lang);
}

export function getProject(slug: string, lang: Lang): Project | undefined {
  const p = raw.find((x) => x.slug === slug);
  return p && resolve(p, lang);
}

export function getProjectGroups(lang: Lang) {
  return resolve(rawGroups, lang);
}
