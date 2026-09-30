import { resolve, type Lang, type Localized } from "@/i18n/config";

type Text = string | Localized<string>;

// Dados gerais do portfólio. Campos com { pt, en } são traduzidos.
const raw = {
  // Logo animado do navbar. Do último ponto em diante fica na cor de destaque.
  brand: "ramonmariano.dev",
  ownerName: "Ramon Mariano",
  description: {
    pt: "Ramon Mariano, desenvolvedor full stack: soluções tecnológicas de ponta a ponta para problemas reais de negócio.",
    en: "Ramon Mariano, full-stack developer: end-to-end technology solutions for real business problems.",
  } as Text,
  githubUsername: process.env.GITHUB_USERNAME || "reverstay",
  location: "📍 Curitiba, PR",
  languages: { pt: "PT nativo · EN avançado · ES intermediário", en: "PT native · EN advanced · ES intermediate" } as Text,
  resumeUrl: "/projects/Ramon_Mariano_Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/ramonmpm",
    github: "https://github.com/reverstay",
    whatsapp: "https://wa.me/5541997963433",
    youtube: "https://www.youtube.com/c/MpMRamon",
    instagram: "https://instagram.com/mpmramon",
    email: "mailto:reversmon@gmail.com",
  },
  hero: {
    eyebrow: { pt: "// Desenvolvedor Full Stack", en: "// Full-Stack Developer" } as Text,
    title: {
      pt: "Tecnologia que resolve o negócio de ponta a ponta.",
      en: "Technology that solves the business end to end.",
    } as Text,
    // Trechos com `nowrap` não quebram linha
    description: {
      pt: [
        { text: "Entendo o problema, desenho a solução e entrego tudo o que ela precisa para funcionar: sistemas web e mobile, APIs, bancos de dados, automações e infraestrutura. Quando o negócio pede, vou além do software e integro " },
        { text: "hardware e dispositivos", nowrap: true },
        { text: " em campo — do sensor ao dashboard." },
      ],
      en: [
        { text: "I understand the problem, design the solution and deliver everything it needs to work: web and mobile systems, APIs, databases, automation and infrastructure. When the business calls for it, I go beyond software and integrate " },
        { text: "hardware and devices", nowrap: true },
        { text: " in the field — from sensor to dashboard." },
      ],
    } as Localized<{ text: string; nowrap?: boolean }[]>,
  },
  timeline: [
    {
      label: { pt: "ponta a ponta", en: "end to end" } as Text,
      text: {
        pt: "Do levantamento do processo ao deploy: frontend, backend, dados e infraestrutura.",
        en: "From process discovery to deploy: frontend, backend, data and infrastructure.",
      } as Text,
    },
    {
      label: "iot",
      text: {
        pt: "Telemetria médica expandida de 10 para 72 unidades (+620%).",
        en: "Medical telemetry expanded from 10 to 72 units (+620%).",
      } as Text,
    },
    {
      label: "−31,5%",
      text: {
        pt: "Custo de produção e instalação por módulo de telemetria.",
        en: "Production and installation cost per telemetry module.",
      } as Text,
    },
    {
      label: { pt: "fabricação", en: "manufacturing" } as Text,
      text: {
        pt: "Mais de 40 peças para mais de 15 modelos de equipamentos médicos.",
        en: "40+ parts for 15+ medical equipment models.",
      } as Text,
    },
  ],
};

export type Site = ReturnType<typeof getSite>;

export function getSite(lang: Lang) {
  return resolve(raw, lang);
}
