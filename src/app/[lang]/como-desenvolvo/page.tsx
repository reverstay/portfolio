import type { Metadata } from "next";
import { HowIDevelop } from "@/components/dev/HowIDevelop";
import { hasLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/como-desenvolvo">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: dictionaries[lang].meta.howIBuild } : {};
}

export default function Page() {
  return <HowIDevelop />;
}
