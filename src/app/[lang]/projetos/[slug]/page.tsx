import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { hasLocale, locales } from "@/i18n/config";
import { getProject, projectSlugs } from "@/data/projects";

export function generateStaticParams() {
  return locales.flatMap((lang) => projectSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = hasLocale(lang) ? getProject(slug, lang) : undefined;
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params, searchParams }: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const project = getProject(slug, lang);
  if (!project) notFound();
  const { from } = await searchParams;

  return <ProjectDetail project={project} fromHome={from === "home"} />;
}
