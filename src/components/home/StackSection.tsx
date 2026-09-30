"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiAngular, SiBootstrap, SiC, SiCplusplus, SiCss, SiDjango, SiDocker, SiEspressif, SiFastapi, SiFigma, SiFlask,
  SiFlutter, SiGit, SiGithub, SiHtml5, SiJavascript, SiKotlin, SiLinux, SiNextdotjs, SiNginx, SiPostgresql, SiPython,
  SiRaspberrypi, SiReact, SiStmicroelectronics, SiTailwindcss, SiTypescript,
} from "react-icons/si";
import { useI18n } from "@/i18n/I18nProvider";

type Tech = { name: string; Icon: IconType; color: string };

// Mesma divisão do README do GitHub
const groups: { title: { pt: string; en: string }; items: Tech[] }[] = [
  {
    title: { pt: "Linguagens", en: "Languages" },
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
      { name: "C", Icon: SiC, color: "#A8B9CC" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "Java", Icon: FaJava, color: "#ED8B00" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#663399" },
    ],
  },
  {
    title: { pt: "Backend & Frontend", en: "Backend & Frontend" },
    items: [
      { name: "Django", Icon: SiDjango, color: "#44B78B" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Flask", Icon: SiFlask, color: "#E7EAEE" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#E7EAEE" },
      { name: "Angular", Icon: SiAngular, color: "#DD0031" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
      { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
    ],
  },
  {
    title: { pt: "Hardware, Infra & Dados", en: "Hardware, Infra & Data" },
    items: [
      { name: "Espressif", Icon: SiEspressif, color: "#E7352C" },
      { name: "STM32", Icon: SiStmicroelectronics, color: "#3CB4E6" },
      { name: "Raspberry Pi", Icon: SiRaspberrypi, color: "#C51A4A" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Nginx", Icon: SiNginx, color: "#009639" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#E7EAEE" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

export function StackSection() {
  const { lang } = useI18n();

  return (
    <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 pt-4 pb-12 sm:pt-8 sm:pb-16">
      <p className="mb-6 font-mono text-xs sm:text-sm text-accent">// stack</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title.en}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: gi * 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-border/70 bg-surface/40 p-5"
          >
            <h3 className="mb-4 font-display text-sm font-semibold text-text">{g.title[lang]}</h3>
            <ul className="flex flex-wrap justify-center gap-2">
              {g.items.map(({ name, Icon, color }) => (
                <li
                  key={name}
                  title={name}
                  className="group flex w-[calc(33.333%-0.34rem)] flex-col items-center gap-1.5 rounded-lg border border-transparent px-1 py-2 transition-colors hover:border-border hover:bg-surface"
                >
                  <Icon size={24} color={color} className="transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-center font-mono text-[10px] leading-tight text-text-muted group-hover:text-text">{name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
