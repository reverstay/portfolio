"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { LottieSlot } from "@/components/ui/LottieSlot";
import { ChipIllustration } from "@/components/ui/Illustrations";
import { getSkillNodes } from "@/data/skills";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

// Largura aproximada de um caractere mono de 11px, para o conector sair do fim do rótulo
const CHAR_W = 6.6;

export function SkillsTree() {
  const { lang, t: dict, href } = useI18n();
  const t = dict.skills;
  const skillNodes = getSkillNodes(lang);
  const byId = new Map(skillNodes.map((n) => [n.id, n]));
  const edges = skillNodes
    .filter((n) => n.parent && byId.has(n.parent))
    .map((n) => {
      const p = byId.get(n.parent!)!;
      return { x1: p.x + 12 + p.label.length * CHAR_W + 4, y1: p.y + 4, x2: n.x - 5, y2: n.y + 4 };
    });

  return (
    <main className="min-h-screen text-text flex flex-col px-4 sm:px-8 lg:px-24 pt-16 sm:pt-20 pb-12 overflow-x-hidden">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto w-full mb-8 flex flex-col gap-4">
        <motion.div variants={item}>
          <Link href={href("/")} className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent w-fit mb-3">
            {dict.common.backHome}
          </Link>
        </motion.div>
        <motion.h1 variants={item} className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t.title}
        </motion.h1>
        <motion.p variants={item} className="text-sm text-text-muted">
          {t.subtitle}
        </motion.p>
      </motion.div>

      <div className="flex-1 flex items-start justify-center w-full max-w-7xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:flex-1 bg-surface border-2 border-border rounded-3xl p-3 sm:p-6 shadow-inner overflow-hidden">
            <svg viewBox="0 0 620 490" className="w-full h-auto max-h-[70vh] object-contain" role="img" aria-label={t.diagramAria}>
              {edges.map((e, i) => (
                <motion.line
                  key={i}
                  {...e}
                  stroke="#232933"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.08, ease: "easeInOut" }}
                />
              ))}
              {skillNodes.map((n, i) => (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                >
                  <circle cx={n.x} cy={n.y} r={n.root ? 4.5 : 3} fill={n.root ? "#F2A93B" : "#FFFFFF"} />
                  <text
                    x={n.x + 12}
                    y={n.y + 4}
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                    fill={n.root ? "#F2A93B" : "#8B93A1"}
                    className="select-none font-medium"
                  >
                    {n.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>

          <div className="relative w-full lg:w-95 h-80 sm:h-100 flex items-center justify-center bg-surface border-2 border-border rounded-3xl p-6 shadow-inner">
            {/* Conector tracejado entre os painéis */}
            <svg className="absolute -left-8 top-1/2 w-8 h-8 hidden lg:block overflow-visible pointer-events-none">
              <motion.line
                x1="0"
                y1="0"
                x2="32"
                y2="0"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
            <svg className="absolute -top-8 left-1/2 w-8 h-8 lg:hidden overflow-visible pointer-events-none">
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="32"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
            <LottieSlot src="/lottie/skills.json" className="w-full h-full" fallback={<ChipIllustration className="w-3/4 h-3/4" />} />
          </div>
        </div>
      </div>
    </main>
  );
}
