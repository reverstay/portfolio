import { getContributions } from "@/lib/github";
import { getSite } from "@/data/site";
import { dictionaries } from "@/i18n/dictionaries";
import type { Lang } from "@/i18n/config";
import { GithubHeatmap } from "./GithubHeatmap";

export async function GithubActivity({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].github;
  const { weeks, total } = await getContributions(getSite(lang).githubUsername);

  return (
    <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 pt-4 pb-12 sm:pt-8 sm:pb-16 overflow-hidden">
      <p className="mb-2 font-mono text-xs sm:text-sm text-accent">{t.eyebrow}</p>
      <p className="mb-6 text-xs sm:text-sm text-text-muted">{t.total(total)}</p>
      <GithubHeatmap weeks={weeks} />
    </section>
  );
}
