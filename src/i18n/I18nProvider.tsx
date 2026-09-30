"use client";

import { createContext, useContext } from "react";
import { defaultLocale, localizePath, type Lang } from "./config";
import { dictionaries } from "./dictionaries";

const LangContext = createContext<Lang>(defaultLocale);

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const lang = useContext(LangContext);
  return {
    lang,
    t: dictionaries[lang],
    href: (path: string) => localizePath(lang, path),
  };
}
