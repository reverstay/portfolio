"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Download } from "lucide-react";
import { getAbout, type Experience } from "@/data/about";
import { getSite } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } };

// Etiqueta âmbar presa na borda dos cards
function Tag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute z-20 flex items-center gap-2 rounded-lg border border-accent/40 bg-black/80 px-3 py-1 font-mono text-[11px] font-semibold text-accent shadow-lg shadow-accent/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-accent/30 ${className}`}
    >
      <span className="flex h-2 w-2 items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      </span>
      <span className="tracking-wider uppercase">{label}</span>
    </div>
  );
}

// Etiqueta verde com indicador "ao vivo"
function LiveTag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute z-20 flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 shadow-md shadow-emerald-500/10 backdrop-blur-md transition-all duration-300 hover:scale-105 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-semibold tracking-wider uppercase">{label}</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs text-accent font-semibold tracking-wide uppercase">{children}</p>;
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map((s) => (
        <span
          key={s}
          className="rounded-md border border-border/60 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent/40 hover:text-text"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

const pad = (n: number) => String(n + 1).padStart(2, "0");
const formatPeriod = (p: string) => p.replace(/\s*[—-]\s*/g, " | ");

type DetailProps = { exp: Experience; index: number; total: number; onBack: () => void; reduced: boolean };

function ExperienceDetail({ exp, index, total, onBack, reduced }: DetailProps) {
  const { t } = useI18n();
  return (
    <motion.main variants={container} initial={reduced ? false : "hidden"} animate="show" className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-20">
      <div className="relative rounded-2xl border border-border/60 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-md sm:p-10">
        <Tag label={t.about.role} className="-top-3 left-8 rotate-1" />
        <Tag label={t.about.sheet} className="-top-3 right-8 -rotate-1" />

        <motion.button
          variants={fade}
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent focus-visible:outline-none"
        >
          <span>←</span> {t.about.back}
        </motion.button>

        <motion.header variants={fade} className="mt-8">
          <span className="font-mono text-xs text-accent">
            {pad(index)} / {pad(total - 1)}
          </span>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight text-text sm:text-4xl">{exp.title}</h1>
          <p className="mt-3 text-sm sm:text-base text-text-muted">
            {exp.company} <span className="text-text-muted/40">·</span> {formatPeriod(exp.period)}
          </p>
        </motion.header>

        <motion.div variants={fade} className="mt-6 space-y-4 border-t border-border/40 pt-6">
          {exp.description.map((d, i) => (
            <p key={i} className="text-sm leading-relaxed text-text-muted sm:text-base">
              {d}
            </p>
          ))}
        </motion.div>

        <motion.div variants={fade} className="mt-6 border-t border-border/40 pt-6">
          <Eyebrow>{t.about.tools}</Eyebrow>
          <div className="mt-4">
            <Chips items={exp.stack} />
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

function AboutContent() {
  const { lang, t } = useI18n();
  const about = getAbout(lang);
  const site = getSite(lang);
  const [selected, setSelected] = useState<number | null>(null);
  const pathname = usePathname();
  const reduced = !!useReducedMotion();

  // Volta para a visão geral ao navegar novamente para /sobre
  useEffect(() => setSelected(null), [pathname]);

  const open = (index: number | null) => {
    setSelected(index);
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
  };

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  if (selected !== null && about.experiences[selected]) {
    return (
      <ExperienceDetail
        key={selected}
        exp={about.experiences[selected]}
        index={selected}
        total={about.experiences.length}
        onBack={() => open(null)}
        reduced={reduced}
      />
    );
  }

  return (
    <motion.main variants={container} initial={reduced ? false : "hidden"} animate="show" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-12">
        {/* Foto */}
        <motion.div variants={fade} className="group relative md:col-span-4">
          <div className="relative flex flex-col items-center rounded-2xl border border-border/60 bg-black/40 p-4 sm:p-5 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.01]">
            <Tag label={t.about.profile} className="-top-3 left-1/2 -translate-x-1/2 rotate-1" />
            <div className="relative aspect-4/5 w-full max-w-65 sm:max-w-none overflow-hidden rounded-xl border border-border/50 bg-black shadow-inner">
              <Image
                src={about.photo}
                alt={t.about.photoAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: "center 20%" }}
                priority
              />
            </div>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Download size={14} className="shrink-0" />
              {t.about.resume}
            </a>
          </div>
        </motion.div>

        {/* Apresentação */}
        <motion.div
          variants={fade}
          className="relative md:col-span-8 flex flex-col justify-between rounded-2xl border border-border/60 bg-linear-to-br from-white/[0.03] to-transparent p-5 sm:p-8 shadow-xl backdrop-blur-md transition-transform duration-300 hover:rotate-1"
        >
          <LiveTag label={t.about.available} className="-top-2 left-6" />
          <div className="py-1">
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h1 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-text sm:text-3xl">{about.title}</h1>
            <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-text-muted sm:text-base">{about.summary}</p>
          </div>
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 border-t border-border/40 pt-4">
            <span className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span className="opacity-40 text-xs">•</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </span>
            <span className="rounded-full border border-border/60 bg-white/5 px-3 py-1 font-mono text-xs text-text-muted">{site.location}</span>
            <span className="rounded-full border border-border/60 bg-white/5 px-3 py-1 font-mono text-xs text-text-muted">{site.languages}</span>
          </div>
        </motion.div>

        {/* Trajetória */}
        <motion.div variants={fade} className="relative md:col-span-12 rounded-2xl border border-border/60 bg-white/[0.02] p-5 sm:p-8 shadow-xl backdrop-blur-md">
          <Tag label={t.about.history} className="-top-3 right-12 -rotate-1" />
          <Eyebrow>{t.about.career}</Eyebrow>
          <div className="mt-5 sm:mt-6 grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.experiences.map((exp, i) => (
              <button
                key={exp.company + i}
                onClick={() => open(i)}
                className="group relative flex min-h-32 sm:min-h-35 flex-col justify-between rounded-xl border border-border/50 bg-black/50 p-4 sm:p-5 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.04] hover:shadow-lg focus-visible:outline-none"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted/60">
                    <span className="font-semibold text-accent/80">#{pad(i)}</span>
                    <span className="text-[11px]">{formatPeriod(exp.period)}</span>
                  </div>
                  <h3 className="mt-2 font-display text-sm sm:text-base font-semibold leading-snug text-text transition-colors group-hover:text-accent">
                    {exp.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-text-muted">{exp.company}</p>
                </div>
                {exp.stack.length > 0 && (
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-1">
                    {exp.stack.slice(0, 3).map((s) => (
                      <span key={s} className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-text-muted/80">
                        {s}
                      </span>
                    ))}
                    {exp.stack.length > 3 && <span className="font-mono text-[10px] text-text-muted/40">+{exp.stack.length - 3}</span>}
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Formação */}
        <motion.div
          variants={fade}
          className="relative md:col-span-6 rounded-2xl border border-border/60 bg-white/[0.02] p-5 sm:p-8 shadow-xl backdrop-blur-md transition-transform duration-300 hover:-rotate-1"
        >
          <LiveTag label={t.about.education} className="-top-2 left-8" />
          <p className="font-mono text-xs text-text-muted/60">{about.education.meta}</p>
          <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold leading-tight text-text">{about.education.course}</h3>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {about.education.status}
          </div>
          <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-text-muted">{about.education.text}</p>
        </motion.div>

        {/* Foco atual */}
        <motion.div
          variants={fade}
          className="relative md:col-span-6 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-8 shadow-xl backdrop-blur-md transition-transform duration-300 hover:rotate-1"
        >
          <Tag label={t.about.focusTag} className="-top-3 right-8 rotate-1" />
          <Eyebrow>{t.about.focusEyebrow}</Eyebrow>
          <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold leading-tight text-text">{about.focus.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{about.focus.text}</p>
          <div className="mt-5 sm:mt-6 border-t border-accent/20 pt-4">
            <Chips items={about.focus.tags} />
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

export function About() {
  return <AboutContent />;
}
