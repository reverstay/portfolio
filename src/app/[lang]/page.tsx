import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { GithubActivity } from "@/components/home/GithubActivity";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeTimeline } from "@/components/home/HomeTimeline";
import { StackSection } from "@/components/home/StackSection";
import { hasLocale } from "@/i18n/config";

// Renderiza por requisição: no `docker build` não há acesso garantido à API do GitHub.
// A chamada em si continua em cache por 1h (ver src/lib/github.ts).
export const dynamic = "force-dynamic";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <main className="w-full flex flex-col max-w-5xl mx-auto px-4 sm:px-6">
      <Hero />
      <StackSection />
      <GithubActivity lang={lang} />
      <FeaturedProjects />
      <Testimonials />
      <HomeTimeline />
    </main>
  );
}
