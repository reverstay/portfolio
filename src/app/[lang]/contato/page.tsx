import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";
import { hasLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/contato">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: dictionaries[lang].meta.contact } : {};
}

export default function Page() {
  return <Contact />;
}
