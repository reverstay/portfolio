"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ProjectCard, cardItem } from "@/components/projects/ProjectCard";
import { getProjects } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export function FeaturedProjects() {
  const { lang, t, href } = useI18n();
  const featured = getProjects(lang).filter((p) => p.featured);

  return (
    <motion.section variants={container} initial="hidden" animate="show" className="mt-16 mb-24 w-full">
      <motion.div variants={cardItem} className="flex items-center justify-between mb-6">
        <p className="font-mono text-xs sm:text-sm text-accent">{t.featured.eyebrow}</p>
        <Link href={href("/projetos")} className="text-xs sm:text-sm font-mono text-text-muted hover:text-accent transition-colors">
          {t.featured.seeAll}
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full items-stretch">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} fromHome />
        ))}
      </div>
    </motion.section>
  );
}
