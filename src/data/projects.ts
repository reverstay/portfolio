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
  images: string[];
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
      "PostgreSQL",
      "Paradox",
      "Java",
      "Dropbox",
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
      ],
      en: [
        "Migration and synchronization of local Paradox databases to PostgreSQL.",
        "Batch processing with logging and record verification.",
        "Automatic retries via Windows Task Scheduler.",
        "Memory usage optimization during imports.",
      ],
    },
    cardHighlights: {
      pt: ["Sincronização de bases Paradox com a nuvem.", "Importações em lote com logs e conferência."],
      en: ["Paradox databases synced to the cloud.", "Batch imports with logging and verification."],
    },
    images: [],
    demoUrl: "https://blanche.neuverse.com.br/login",
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
