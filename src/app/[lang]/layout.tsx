import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { I18nProvider } from "@/i18n/I18nProvider";
import { hasLocale, locales } from "@/i18n/config";
import { getSite } from "@/data/site";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const site = getSite(lang);
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "https://ramonmpm.com"),
    title: { default: site.brand, template: `%s · ${site.brand}` },
    description: site.description,
    alternates: { languages: { "pt-BR": "/pt", en: "/en" } },
    openGraph: {
      title: site.brand,
      description: site.description,
      type: "website",
      locale: lang === "pt" ? "pt_BR" : "en_US",
    },
    twitter: { card: "summary", title: site.brand, description: site.description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col bg-ink text-text font-sans antialiased overflow-x-hidden">
        <I18nProvider lang={lang}>
          <Navbar />
          <PageTransition>
            <div className="flex-1 pt-16">{children}</div>
          </PageTransition>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
