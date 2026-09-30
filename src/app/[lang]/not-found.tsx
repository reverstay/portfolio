"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="mb-3 font-mono text-sm text-accent">// 404</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-text">{t.notFound.title}</h1>
      <p className="mt-3 text-sm text-text-muted">{t.notFound.text}</p>
      <Link href={href("/")} className="mt-8 inline-flex text-sm text-text-muted hover:text-accent transition-colors">
        {t.common.backHome}
      </Link>
    </main>
  );
}
