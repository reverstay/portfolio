"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { localizePath, locales, stripLocale, type Lang } from "@/i18n/config";
import { getSite } from "@/data/site";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const letter: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

// Mesma página no outro idioma; o cookie faz o proxy lembrar a escolha nas próximas visitas
function LanguageLinks({ className = "", query }: { className?: string; query: string }) {
  const { lang, t } = useI18n();
  const path = stripLocale(usePathname());

  const remember = (l: Lang) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className={`flex items-center gap-1 font-mono text-xs ${className}`} aria-label={t.nav.switchTo}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-text-muted/40">|</span>}
          {l === lang ? (
            <span className="font-bold text-accent" aria-current="true">
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={localizePath(l, path) + (query ? `?${query}` : "")}
              onClick={() => remember(l)}
              hrefLang={l}
              className="text-text-muted transition-colors hover:text-accent"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

// Preserva a query string (ex.: ?from=home); useSearchParams exige Suspense em páginas estáticas
function LanguageLinksWithQuery({ className }: { className?: string }) {
  return <LanguageLinks className={className} query={useSearchParams().toString()} />;
}

function LanguageSwitch({ className = "" }: { className?: string }) {
  return (
    <Suspense fallback={<LanguageLinks className={className} query="" />}>
      <LanguageLinksWithQuery className={className} />
    </Suspense>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, t, href } = useI18n();
  const isHome = stripLocale(usePathname()) === "/";
  const brand = getSite(lang).brand;
  const chars = brand.split("");
  // Do último ponto em diante (ex.: ".dev") o texto fica na cor de destaque
  const accentFrom = brand.lastIndexOf(".");

  const links = [
    { href: href("/"), label: t.nav.home },
    { href: href("/projetos"), label: t.nav.projects },
    { href: href("/sobre"), label: t.nav.about },
    { href: href("/contato"), label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black w-full overflow-x-hidden">
      <nav className="flex items-center justify-between w-full px-6 py-4 max-w-7xl mx-auto">
        <Link href={href("/")} className="font-display text-lg font-bold text-text">
          {/* O logo só anima letra a letra na página inicial */}
          <motion.span
            variants={container}
            initial={isHome ? "hidden" : "visible"}
            animate="visible"
            className="inline-flex overflow-hidden"
          >
            {chars.map((c, i) => (
              <motion.span key={i} variants={letter} className={accentFrom >= 0 && i >= accentFrom ? "text-accent" : ""}>
                {c}
              </motion.span>
            ))}
          </motion.span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          <ul className="flex gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-bold text-text-muted transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <LanguageSwitch />
          <button
            onClick={() => setOpen(!open)}
            className="text-text w-10 h-10 flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg text-lg"
            aria-label={t.nav.openMenu}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-border bg-black px-6 py-6 sm:hidden shadow-xl w-full">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-bold text-text-muted hover:text-accent transition-colors py-1"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
