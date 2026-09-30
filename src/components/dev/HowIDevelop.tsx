"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { SiCplusplus, SiDocker, SiFlutter, SiPython, SiTypescript, SiYaml } from "react-icons/si";
import { getPractices, type Practice } from "@/data/practices";
import { useI18n } from "@/i18n/I18nProvider";
import { CodeBlock } from "./CodeBlock";

// Classes escritas por extenso para o Tailwind detectá-las
const LANGUAGES: Record<
  Practice["language"],
  { label: string; Icon: IconType; color: string; badge: string; active: string; hover: string; ring: string }
> = {
  python: {
    label: "Python",
    Icon: SiPython,
    color: "#3776AB",
    badge: "text-[#3776AB] bg-[#3776AB]/10 border-[#3776AB]/20",
    active: "border-[#3776AB] shadow-[0_0_20px_rgba(55,118,171,0.25)] bg-surface",
    hover: "hover:border-[#3776AB]/60 hover:shadow-[0_0_15px_rgba(55,118,171,0.15)]",
    ring: "focus-visible:ring-[#3776AB]",
  },
  cpp: {
    label: "C++",
    Icon: SiCplusplus,
    color: "#00599C",
    badge: "text-[#00599C] bg-[#00599C]/10 border-[#00599C]/20",
    active: "border-[#00599C] shadow-[0_0_20px_rgba(0,89,156,0.25)] bg-surface",
    hover: "hover:border-[#00599C]/60 hover:shadow-[0_0_15px_rgba(0,89,156,0.15)]",
    ring: "focus-visible:ring-[#00599C]",
  },
  typescript: {
    label: "TSX",
    Icon: SiTypescript,
    color: "#3178C6",
    badge: "text-[#3178C6] bg-[#3178C6]/10 border-[#3178C6]/20",
    active: "border-[#3178C6] shadow-[0_0_20px_rgba(49,120,198,0.25)] bg-surface",
    hover: "hover:border-[#3178C6]/60 hover:shadow-[0_0_15px_rgba(49,120,198,0.15)]",
    ring: "focus-visible:ring-[#3178C6]",
  },
  flutter: {
    label: "Flutter",
    Icon: SiFlutter,
    color: "#02569B",
    badge: "text-[#02569B] bg-[#02569B]/10 border-[#02569B]/20",
    active: "border-[#02569B] shadow-[0_0_20px_rgba(2,86,155,0.25)] bg-surface",
    hover: "hover:border-[#02569B]/60 hover:shadow-[0_0_15px_rgba(2,86,155,0.15)]",
    ring: "focus-visible:ring-[#02569B]",
  },
  docker: {
    label: "Docker",
    Icon: SiDocker,
    color: "#2496ED",
    badge: "text-[#2496ED] bg-[#2496ED]/10 border-[#2496ED]/20",
    active: "border-[#2496ED] shadow-[0_0_20px_rgba(36,150,237,0.25)] bg-surface",
    hover: "hover:border-[#2496ED]/60 hover:shadow-[0_0_15px_rgba(36,150,237,0.15)]",
    ring: "focus-visible:ring-[#2496ED]",
  },
  yaml: {
    label: "YAML",
    Icon: SiYaml,
    color: "#CB171E",
    badge: "text-[#CB171E] bg-[#CB171E]/10 border-[#CB171E]/20",
    active: "border-[#CB171E] shadow-[0_0_20px_rgba(203,23,30,0.25)] bg-surface",
    hover: "hover:border-[#CB171E]/60 hover:shadow-[0_0_15px_rgba(203,23,30,0.15)]",
    ring: "focus-visible:ring-[#CB171E]",
  },
};

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const heading: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const row: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const icon: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15, y: 10 },
  show: { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function CodeModal({ practice, onClose }: { practice: Practice; onClose: () => void }) {
  const t = useI18n().t.howIBuild;
  const lang = LANGUAGES[practice.language];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.dialogAria(practice.title)}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-xl border border-border bg-[#1e1e1e] shadow-2xl overflow-hidden font-mono will-change-transform"
      >
        {/* Barra de título estilo janela de editor */}
        <div className="flex items-center justify-between pl-4 pr-1 py-2 bg-[#2d2d2d] border-b border-border/40 select-none">
          <span className="text-xs text-text-muted flex items-center gap-2">
            <span className="text-accent">🗂️</span>
            {practice.title} — {t.example}
          </span>
          <div className="flex items-center">
            <button aria-hidden="true" tabIndex={-1} className="px-3 py-1 text-text-muted text-xs cursor-default">
              ‒
            </button>
            <button aria-hidden="true" tabIndex={-1} className="px-3 py-1 text-text-muted text-xs cursor-default">
              ▢
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="px-3 py-1 text-text-muted hover:bg-red-600 hover:text-white text-xs transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex bg-[#252526] border-b border-[#333] text-xs">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-t-2 border-accent text-text">
            <lang.Icon size={18} color={lang.color} />
            <span>{practice.fileName}</span>
          </div>
        </div>
        <div className="p-4 sm:p-6 overflow-x-auto bg-[#1e1e1e]">
          <p className="text-sm sm:text-base text-text-muted mb-4 font-sans leading-relaxed">{practice.description}</p>
          <CodeBlock code={practice.code} yaml={practice.language === "yaml"} />
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-t border-border/40 text-text-muted text-[11px]">
          <span>Workspace: ramonmariano.dev</span>
        </div>
      </motion.div>
    </div>
  );
}

export function HowIDevelop() {
  const { lang, t: dict, href } = useI18n();
  const t = dict.howIBuild;
  const practices = getPractices(lang);
  const [selected, setSelected] = useState<Practice | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-24 w-full overflow-x-hidden flex flex-col"
    >
      <motion.div variants={heading} className="mb-8 w-fit">
        <Link href={href("/")} className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent py-1">
          <span>←</span>
          <span>{dict.common.backHome.replace("← ", "")}</span>
        </Link>
      </motion.div>

      <div className="flex flex-col w-full mb-16">
        <motion.p variants={heading} className="mb-3 font-mono text-xs sm:text-sm text-accent">
          {t.eyebrow}
        </motion.p>
        <motion.h1 variants={heading} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight wrap-break-word w-full">
          {t.title}
        </motion.h1>
        <motion.p variants={heading} className="mt-3 max-w-xl text-sm sm:text-base text-text-muted leading-relaxed wrap-break-word w-full">
          {t.subtitle}
        </motion.p>
      </div>

      {/* Linha do tempo em zigue-zague */}
      <div className="relative w-full max-w-5xl mx-auto py-6 pl-6 md:pl-0">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="absolute left-2.5 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/85 -translate-x-1/2"
        />
        <div className="space-y-12 md:space-y-16">
          {practices.map((p, i) => {
            const lang = LANGUAGES[p.language];
            const left = i % 2 === 0;
            const active = selected?.title === p.title;
            const highlighted = hovered === i || active;
            return (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={row}
                className={`relative flex flex-col md:flex-row items-center w-full ${left ? "md:flex-row-reverse" : ""}`}
              >
                <div className="w-full md:w-1/2 pl-6 md:px-8">
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    aria-haspopup="dialog"
                    aria-label={t.exploreAria(p.title)}
                    className={`group w-full cursor-pointer flex flex-col rounded-2xl bg-surface p-6 text-left transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 ${lang.ring} border ${active ? lang.active : `border-border/75 ${lang.hover} hover:bg-surface`} ${left ? "md:text-left" : "md:text-right"}`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border w-fit mb-2 shadow-xs ${lang.badge} ${left ? "md:mr-auto" : "md:ml-auto"}`}
                    >
                      {t.explore}
                    </span>
                    <div className={`flex items-center gap-2.5 mt-1 ${left ? "md:justify-start" : "md:justify-end"}`}>
                      <h3 className="font-display text-lg font-semibold transition-colors" style={{ color: highlighted ? lang.color : undefined }}>
                        {p.title}
                      </h3>
                      <motion.div
                        variants={icon}
                        whileHover={{ scale: 1.15, rotate: 6, transition: { duration: 0.2 } }}
                        className="flex items-center justify-center cursor-pointer"
                        title={lang.label}
                      >
                        <lang.Icon size={24} color={lang.color} />
                      </motion.div>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed">{p.description}</p>
                  </button>
                </div>
                <motion.div
                  variants={icon}
                  whileHover={{ scale: 1.2, rotate: 8, transition: { duration: 0.2 } }}
                  aria-hidden="true"
                  className="absolute left-2.5 md:left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center cursor-pointer bg-[#1e1e1e] p-2.5 rounded-full border border-border shadow-md"
                >
                  <lang.Icon size={24} color={lang.color} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>{selected && <CodeModal practice={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </motion.main>
  );
}
