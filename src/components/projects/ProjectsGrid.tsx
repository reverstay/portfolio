"use client";

import { motion, type Variants } from "framer-motion";
import { FolderCode } from "lucide-react";
import { ProjectCard, cardItem } from "./ProjectCard";
import { getProjectGroups, getProjects, type Project } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };

function Group({ eyebrow, title, items }: { eyebrow: string; title: string; items: Project[] }) {
  if (items.length === 0) return null;
  return (
    <motion.div variants={cardItem} className="mt-16 first:mt-0 sm:mt-20 sm:first:mt-0">
      <div className="flex flex-col gap-1 mb-8 sm:mb-10">
        <p className="font-mono text-xs sm:text-sm text-accent tracking-wider font-normal">// {eyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-text">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full items-stretch">
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectsGrid() {
  const { lang, t } = useI18n();
  const projects = getProjects(lang);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 overflow-hidden w-full"
    >
      <motion.div variants={cardItem} className="flex items-center gap-3 mb-12 sm:mb-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text tracking-tight">
          <span className="font-mono text-accent">//</span> {t.projects.all}
        </h1>
        <FolderCode className="h-7 w-7 sm:h-8 sm:w-8 text-accent shrink-0 stroke-[1.75]" />
      </motion.div>
      {getProjectGroups(lang).map((g) => (
        <Group key={g.id} eyebrow={g.eyebrow} title={g.title} items={projects.filter((p) => p.group === g.id)} />
      ))}
    </motion.section>
  );
}
