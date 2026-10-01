"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check, Folder } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project, ProjectVariant } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type Theme = {
  card: string;
  tab: string;
  title: string;
  icon: string;
  overlay: string;
  tabBg: string;
  tabText: string;
  pill: { className: string; dot?: boolean };
};

// Classes escritas por extenso para o Tailwind detectá-las
const themes: Record<ProjectVariant, Theme> = {
  enterprise: {
    card: "border-border group-hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/20",
    tab: "border-border group-hover:border-blue-400",
    title: "group-hover:text-blue-400",
    icon: "text-blue-400",
    overlay: "bg-blue-400/5",
    tabBg: "bg-blue-500/10",
    tabText: "text-blue-300",
    pill: {
      className: "rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400",
    },
  },
  commercial: {
    card: "border-border group-hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-400/20",
    tab: "border-border group-hover:border-emerald-400",
    title: "group-hover:text-emerald-400",
    icon: "text-emerald-400",
    overlay: "bg-emerald-400/5",
    tabBg: "bg-emerald-500/10",
    tabText: "text-emerald-300",
    pill: {
      className: "rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    },
  },
  store: {
    card: "border-border group-hover:border-accent hover:shadow-2xl hover:shadow-accent/20",
    tab: "border-border group-hover:border-accent",
    title: "group-hover:text-accent",
    icon: "text-accent",
    overlay: "bg-accent/5",
    tabBg: "bg-accent/10",
    tabText: "text-accent",
    pill: { className: "rounded-full border border-accent/30 bg-accent/10 text-accent" },
  },
  freelance: {
    card: "border-border group-hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/20",
    tab: "border-border group-hover:border-cyan-400",
    title: "group-hover:text-cyan-400",
    icon: "text-cyan-400",
    overlay: "bg-cyan-400/5",
    tabBg: "bg-cyan-500/10",
    tabText: "text-cyan-300",
    pill: { className: "rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400" },
  },
  wip: {
    card: "border-cyan-500/30 group-hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.05)]",
    tab: "border-cyan-500/30 group-hover:border-cyan-400",
    title: "group-hover:text-cyan-400",
    icon: "text-cyan-400",
    overlay: "bg-cyan-400/5",
    tabBg: "bg-cyan-500/10",
    tabText: "text-cyan-300",
    pill: {
      className: "inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
      dot: true,
    },
  },
  opensource: {
    card: "border-border group-hover:border-zinc-400 hover:shadow-2xl hover:shadow-zinc-400/20",
    tab: "border-border group-hover:border-zinc-400",
    title: "group-hover:text-zinc-200",
    icon: "text-zinc-400",
    overlay: "bg-zinc-400/5",
    tabBg: "bg-zinc-500/10",
    tabText: "text-zinc-300",
    pill: { className: "rounded-full border border-zinc-400/30 bg-zinc-400/10 text-zinc-300" },
  },
};

export function ProjectCard({ project, fromHome = false }: { project: Project; fromHome?: boolean }) {
  const { t: dict, href: localize } = useI18n();
  const t = themes[project.variant];
  const visibleStack = project.stack.slice(0, 3);
  const hiddenCount = project.stack.length - visibleStack.length;
  const highlights = project.cardHighlights ?? project.highlights.slice(0, 2);
  const href = localize(`/projetos/${project.slug}`) + (fromHome ? "?from=home" : "");

  return (
    <motion.div variants={cardItem} className="h-full w-full">
      <Link
        href={href}
        className="group relative flex flex-col h-full w-full transition-transform duration-500 ease-out hover:-translate-y-2"
      >
        {/* Aba de pasta */}
        <div className="flex items-end">
          <div
            className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-t-xl border-t-2 border-x-2 -mb-0.5 transition-colors duration-500 ${t.tabBg} ${t.tab}`}
          >
            <Folder className={`h-3.5 w-3.5 transition-colors duration-300 ${t.icon}`} />
            <span className={`text-[10px] font-mono font-semibold tracking-wider uppercase transition-colors duration-300 ${t.tabText}`}>
              {project.category}
            </span>
          </div>
        </div>

        <div
          className={`relative z-0 flex flex-col justify-between flex-1 rounded-b-2xl rounded-tr-2xl rounded-tl-none border-2 bg-surface p-5 sm:p-6 transition-all duration-500 overflow-hidden ${t.card}`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${t.overlay}`} />

          <div className="relative z-10 w-full overflow-hidden flex-1">
            {project.cover && (
              <div className="mb-4 aspect-16/10 w-full overflow-hidden rounded-xl border border-border/60 bg-surface-elevated">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className={`h-full w-full ${project.coverFit === "contain" ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-[1.03]`}
                />
              </div>
            )}
            <div className={`mb-3 flex flex-wrap items-center gap-1.5 sm:mb-4 ${project.logo ? "justify-between" : "justify-end"}`}>
              {project.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.logo} alt="" aria-hidden className="h-7 w-auto object-contain" />
              )}
              <span className={`${t.pill.className} px-2.5 py-0.5 text-[10px] font-semibold tracking-wide whitespace-nowrap backdrop-blur-sm`}>
                {t.pill.dot && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                {project.badge ?? dict.projects.pills[project.variant]}
              </span>
            </div>

            <h3 className={`font-display text-lg sm:text-xl font-semibold text-text transition-colors duration-300 line-clamp-1 ${t.title}`}>
              {project.cardTitle ?? project.title}
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-text-muted/80 group-hover:text-text-muted transition-colors duration-300 line-clamp-2 leading-relaxed">
              {project.cardDescription ?? project.description}
            </p>

            {highlights.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2 w-full overflow-hidden">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-xs sm:text-[13px] text-text-muted/90 group-hover:text-text transition-colors duration-300 leading-tight w-full overflow-hidden"
                  >
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 stroke-[2.5] transition-transform duration-500 group-hover:scale-110 ${t.icon}`} />
                    <span className="block line-clamp-2 w-full">{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative z-10 pt-5 flex flex-wrap gap-2 w-full mt-auto">
            {visibleStack.map((s) => (
              <Badge key={s} className="whitespace-nowrap shrink-0 transition-all duration-300 group-hover:bg-surface-elevated">
                {s}
              </Badge>
            ))}
            {hiddenCount > 0 && (
              <Badge className="whitespace-nowrap shrink-0 text-text-muted bg-transparent border-dashed transition-all duration-300 group-hover:border-solid">
                {`+${hiddenCount}`}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
