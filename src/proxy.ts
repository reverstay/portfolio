import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Lang } from "@/i18n/config";

// Idioma escolhido pelo seletor do menu tem prioridade sobre o do navegador
function preferredLocale(request: NextRequest): Lang {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && hasLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => hasLocale(r.lang))?.lang as Lang | undefined ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignora API, arquivos internos do Next e qualquer arquivo com extensão (vídeos, PDF, ícones...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
