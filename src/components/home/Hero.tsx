"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LottieSlot } from "@/components/ui/LottieSlot";
import { CodeWindowIllustration } from "@/components/ui/Illustrations";
import { getSite } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

function SkillLinks() {
  const { t, href } = useI18n();
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-mono text-xs sm:text-sm text-accent">// skills</p>
      <div className="flex flex-wrap items-center gap-3 w-full">
        <Link
          href={href("/skills-tree")}
          className="group relative inline-flex items-center gap-2 rounded-lg border border-border/70 bg-surface/40 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-text-muted backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-surface hover:text-text hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
        >
          <span className="font-mono text-xs text-accent/70 transition-colors group-hover:text-accent">$</span>
          <span>Stack</span>
          <svg
            className="w-3.5 h-3.5 text-text-muted/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>
        <Link
          href={href("/como-desenvolvo")}
          className="group relative inline-flex items-center gap-2.5 rounded-lg border border-border/70 bg-surface/40 px-3.5 py-1.5 text-xs font-mono text-text-muted/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-surface hover:text-text hover:shadow-[0_0_15px_rgba(16,185,129,0.08)]"
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{t.hero.howIBuild}</span>
        </Link>
      </div>
    </div>
  );
}

export function Hero() {
  const { lang, t, href } = useI18n();
  const site = getSite(lang);
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-24 w-full overflow-x-hidden"
    >
      <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:justify-between w-full">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left w-full min-w-0">
          <motion.p variants={item} className="mb-4 font-mono text-xs sm:text-sm text-accent">
            {site.hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight wrap-break-word w-full"
          >
            {site.hero.title}
          </motion.h1>
          <motion.p variants={item} className="mt-4 max-w-xl text-sm sm:text-base text-text-muted leading-relaxed wrap-break-word w-full">
            {site.hero.description.map((part, i) =>
              part.nowrap ? (
                <span key={i} className="whitespace-nowrap">
                  {part.text}
                </span>
              ) : (
                part.text
              ),
            )}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="primary" href={href("/projetos")} className="w-full sm:w-auto justify-center">
              {t.hero.viewProjects}
            </Button>
            <Button variant="secondary" href={href("/contato")} className="w-full sm:w-auto justify-center">
              {t.hero.letsTalk}
            </Button>
          </motion.div>
        </div>

        <motion.div variants={item} className="w-48 sm:w-80 max-w-full shrink-0 flex justify-center">
          <LottieSlot src="/lottie/hero.json" className="w-full h-auto" fallback={<CodeWindowIllustration className="w-full h-auto" />} />
        </motion.div>
      </div>

      <motion.div variants={item} className="mt-12 w-full overflow-x-hidden">
        <SkillLinks />
      </motion.div>
    </motion.section>
  );
}
