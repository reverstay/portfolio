export const locales = ["pt", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = "pt";

export const hasLocale = (value: string): value is Lang => (locales as readonly string[]).includes(value);

// "/projetos" → "/en/projetos"; "/" → "/en"
export function localizePath(lang: Lang, path: string) {
  return `/${lang}${path === "/" ? "" : path}`;
}

// "/en/projetos" → "/projetos"
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first)) return "/" + rest.join("/");
  return pathname || "/";
}

// Texto traduzível nos arquivos de dados
export type Localized<T> = { pt: T; en: T };

// Troca recursivamente todo { pt, en } pelo valor do idioma
export type Resolved<T> =
  T extends Localized<infer U>
    ? Resolved<U>
    : T extends (infer E)[]
      ? Resolved<E>[]
      : T extends object
        ? { [K in keyof T]: Resolved<T[K]> }
        : T;

function isLocalized(v: unknown): v is Localized<unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return keys.length === 2 && "pt" in v && "en" in v;
}

export function resolve<T>(value: T, lang: Lang): Resolved<T> {
  if (isLocalized(value)) return resolve(value[lang], lang) as Resolved<T>;
  if (Array.isArray(value)) return value.map((v) => resolve(v, lang)) as Resolved<T>;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, lang)])) as Resolved<T>;
  }
  return value as Resolved<T>;
}
