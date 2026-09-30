import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { hasLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/sobre">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: dictionaries[lang].meta.about } : {};
}

export default function Page() {
  return <About />;
}
