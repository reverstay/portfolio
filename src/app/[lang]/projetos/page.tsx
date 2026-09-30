import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { hasLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: dictionaries[lang].meta.projects } : {};
}

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
