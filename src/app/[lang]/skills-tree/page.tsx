import type { Metadata } from "next";
import { SkillsTree } from "@/components/skills/SkillsTree";
import { hasLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/skills-tree">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: dictionaries[lang].meta.skills } : {};
}

export default function Page() {
  return <SkillsTree />;
}
