import { resolve, type Lang, type Localized, type Resolved } from "@/i18n/config";

type Text = string | Localized<string>;
type List = string[] | Localized<string[]>;

type RawExperience = {
  title: Text;
  company: string;
  period: Text;
  stack: Text[];
  description: List;
};

export type Experience = Resolved<RawExperience>;

const raw = {
  photo: "/projects/foto-ramon.png",
  title: {
    pt: "Desenvolvedor Full Stack",
    en: "Full-Stack Developer",
  } as Text,
  summary: {
    pt: "Resolvo problemas de negócio com tecnologia, de ponta a ponta: entendo o processo, proponho a solução e desenvolvo cada camada, da interface ao banco de dados, da API à infraestrutura e, quando necessário, ao hardware em campo. Na OPx, essa visão ajudou a expandir a operação de telemetria de 10 para 72 unidades (+620%) e a reduzir em 31,5% o custo por módulo.",
    en: "I solve business problems with technology, end to end: I understand the process, propose the solution and build every layer, from the interface to the database, from the API to the infrastructure and, when needed, to hardware in the field. At OPx, this approach helped expand the telemetry operation from 10 to 72 units (+620%) and cut cost per module by 31.5%.",
  } as Text,
  education: {
    meta: { pt: "UTFPR · Previsão de conclusão: 2027", en: "UTFPR · Expected graduation: 2027" } as Text,
    course: { pt: "Bacharelado em Engenharia Eletrônica", en: "Bachelor's Degree in Electronic Engineering" } as Text,
    status: { pt: "Em andamento", en: "In progress" } as Text,
    text: {
      pt: "Universidade Tecnológica Federal do Paraná. Também sou técnico em Eletrotécnica (FORMA-BRASIL, 2024) e em Logística (Colégio Estadual Presidente Lamenha Lins, 2018), com registro no CFT e treinamentos NR10, NR12 e NR35.",
      en: "Federal University of Technology – Paraná. I also hold technical diplomas in Electrotechnics (FORMA-BRASIL, 2024) and Logistics (Colégio Estadual Presidente Lamenha Lins, 2018), am registered with the Federal Council of Industrial Technicians (CFT) and have NR10, NR12 and NR35 safety training.",
    } as Text,
  },
  focus: {
    title: { pt: "Soluções de ponta a ponta", en: "End-to-end solutions" } as Text,
    text: {
      pt: "Um único responsável técnico do problema à entrega: sistemas sob medida, integrações entre plataformas, automação de processos e telemetria conectando equipamentos físicos ao software.",
      en: "One technical owner from problem to delivery: custom systems, platform integrations, process automation and telemetry connecting physical equipment to software.",
    } as Text,
    tags: ["Django", "React", "PostgreSQL", "Docker", "APIs REST", "Python", "ESP32", "Raspberry Pi", "Power BI"],
  },
  // Mais recente primeiro (pela data de término): o card #01 é o cargo atual
  experiences: [
    {
      title: { pt: "Supervisor de Departamento", en: "Department Supervisor" },
      company: "OPx Soluções Inteligentes",
      period: { pt: "Fev 2026 — Set 2026", en: "Feb 2026 — Sep 2026" },
      stack: [
        { pt: "Liderança técnica", en: "Technical leadership" },
        { pt: "Telemetria", en: "Telemetry" },
        { pt: "Melhoria de processos", en: "Process improvement" },
        { pt: "Documentação técnica", en: "Technical documentation" },
        "Kanban",
        "Kaizen",
        "5S",
      ],
      description: {
        pt: [
          "Coordenei a equipe nas frentes de eletrônica, software e manufatura aditiva, mantendo atuação prática no desenvolvimento.",
          "Contribuí para a expansão da telemetria de 10 para 72 unidades (+620%) com apoio a implantações em campo, diagnóstico de falhas e melhorias nos processos de montagem e instalação.",
          "Reduzi em 31,5% o custo de produção e instalação por módulo com melhorias no processo produtivo.",
          "Padronizei montagem, configuração e testes em mais de 20 manuais de processo e apoiei mais de 15 instalações em campo.",
          "Garanti a conectividade dos equipamentos monitorados com seis chips de dados de telemetria.",
        ],
        en: [
          "Coordinated the team across electronics, software and additive manufacturing while staying hands-on in development.",
          "Contributed to telemetry expansion from 10 to 72 units (+620%) by supporting field deployments, troubleshooting and improvements to assembly and installation processes.",
          "Reduced production and installation cost per module by 31.5% by improving the production process.",
          "Standardized assembly, configuration and testing in 20+ process manuals and supported 15+ field installations.",
          "Kept monitored equipment connected through six telemetry data SIMs.",
        ],
      },
    },
    {
      title: { pt: "Líder de Desenvolvimento – Software e Eletrônica", en: "Development Lead – Software and Electronics" },
      company: "OPx Soluções Inteligentes",
      period: { pt: "Abr 2025 — Fev 2026", en: "Apr 2025 — Feb 2026" },
      stack: [
        "Django",
        "React",
        "Raspberry Pi",
        "WebRTC",
        "Ubuntu Server",
        "Firmware",
        { pt: "Eletrônica", en: "Electronics" },
        "Fusion 360",
        { pt: "Impressão 3D", en: "3D printing" },
      ],
      description: {
        pt: [
          "Contribuí com software full stack e infraestrutura para o Comando Remoto, solução para operação remota de ressonâncias GE via KVM over IP.",
          "Construí e mantive a plataforma de gestão da Clínica Remota: documentos, relatórios, compras, estoque, comunicação interna e login com Google, além de relatórios de qualidade de montagem, instalação e testes.",
          "Estruturei o pipeline de deploy de três aplicações internas em Ubuntu Server.",
          "Desenvolvi procedimentos de montagem eletrônica e jigs de teste, implementei melhorias de hardware e firmware e apoiei a engenharia reversa de circuitos de bobinas e pré-amplificadores de ressonância.",
          "Desenvolvi mais de 40 peças de reposição para mais de 15 modelos de equipamentos médicos Philips, GE e Siemens, com engenharia reversa, escaneamento 3D, modelagem e fabricação. Projetei um elo hoje em uso em uma bobina abdominal de ressonância GE, com fabricação coordenada na China.",
        ],
        en: [
          "Contributed full-stack software and infrastructure to Comando Remoto, a solution for remote operation of GE MRI equipment via KVM over IP.",
          "Built and maintained the Clínica Remota management platform: documents, reporting, procurement, inventory, internal communication and Google sign-in, plus quality reporting for assembly, installation and testing.",
          "Set up the deployment pipeline for three internal applications on Ubuntu Server.",
          "Developed electronic assembly procedures and test jigs, implemented hardware and firmware improvements, and supported reverse engineering of MRI coil and preamplifier circuits.",
          "Developed 40+ spare parts for 15+ Philips, GE and Siemens medical equipment models through reverse engineering, 3D scanning, modeling and fabrication. Designed a replacement link now used in a GE abdominal MRI coil and coordinated its manufacturing in China.",
        ],
      },
    },
    {
      title: { pt: "Estagiário de Engenharia Elétrica – DMED", en: "Electrical Engineering Intern – DMED" },
      company: "Copel",
      period: { pt: "Jan 2023 — Out 2024", en: "Jan 2023 — Oct 2024" },
      stack: ["Python", "pandas", "openpyxl", "Excel", "Power BI", "Telegram Bot API"],
      description: {
        pt: [
          "Automatizei rotinas recorrentes de medição de energia e analisei dados de medição com Python, pandas, openpyxl, Excel e Power BI.",
          "Desenvolvi o MedBot, bot de Telegram do centro de operações da medição para consultar status de telemetrias, rotinas de medidores e cobertura de sinal.",
          "Apoiei a substituição de equipamentos de telemedição e os testes de comunicação em subestações, acompanhando as equipes de campo e verificando a conectividade.",
          "Coordenei as atividades dos estagiários e apoiei a avaliação de equipamentos, pesquisa de fornecedores e testes.",
        ],
        en: [
          "Automated recurring energy-metering routines and analyzed measurement data using Python, pandas, openpyxl, Excel and Power BI.",
          "Built MedBot, the metering operations center's Telegram bot for looking up telemetry status, meter routines and signal coverage.",
          "Supported telemetering equipment replacement and communication testing at substations by accompanying field teams and checking connectivity.",
          "Coordinated intern assignments and supported equipment assessment, supplier research and testing.",
        ],
      },
    },
    {
      title: { pt: "Desenvolvedor Flutter", en: "Flutter Developer" },
      company: "Uaxica",
      period: { pt: "Jan 2024 — Jun 2024", en: "Jan 2024 — Jun 2024" },
      stack: ["Flutter", "Dart", "Figma", "Gradle", "Bootstrap", "JavaScript", "Node.js"],
      description: {
        pt: [
          "Trabalho remoto para empresa sediada em Luanda, Angola.",
          "Desenvolvi as interfaces mobile para passageiros e motoristas em Flutter e Dart, incluindo navegação, validação de entradas, lógica de negócio e integração com serviços de backend.",
          "Apoiei a localização e a preparação de assets Android/iOS, criei protótipos de telas no Figma e preparei builds Android para testes com Gradle.",
          "Desenvolvi o site institucional da plataforma com Bootstrap, JavaScript e Node.js, responsivo e alinhado à identidade visual do aplicativo.",
        ],
        en: [
          "Remote work for a company based in Luanda, Angola.",
          "Developed the passenger and driver mobile interfaces in Flutter and Dart, including navigation, input validation, business logic and backend service integration.",
          "Supported localization and Android/iOS asset preparation, created Figma screen prototypes and prepared Android test builds with Gradle.",
          "Developed the platform's corporate website with Bootstrap, JavaScript and Node.js, responsive and consistent with the app's visual identity.",
        ],
      },
    },
  ] as RawExperience[],
};

export type About = ReturnType<typeof getAbout>;

export function getAbout(lang: Lang) {
  return resolve(raw, lang);
}
