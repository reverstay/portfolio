export type ContributionDay = { date: string; count: number };

type ApiResponse = { contributions: ContributionDay[] };

// Contribuições do último ano, agrupadas em semanas (domingo a sábado).
// Usa a API pública github-contributions-api.jogruber.de; revalida a cada hora.
export async function getContributions(username: string) {
  const days = username ? await fetchDays(username) : [];
  const source = days.length ? days : emptyYear();
  const total = source.reduce((sum, d) => sum + d.count, 0);

  const weeks: ContributionDay[][] = [];
  const firstDow = new Date(source[0].date + "T00:00:00Z").getUTCDay();
  let week: ContributionDay[] = [];
  // Descarta dias iniciais até o primeiro domingo para alinhar as colunas
  for (const day of source.slice(firstDow === 0 ? 0 : 7 - firstDow)) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);

  return { weeks, total };
}

async function fetchDays(username: string): Promise<ContributionDay[]> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse;
    return json.contributions.map(({ date, count }) => ({ date, count }));
  } catch {
    return [];
  }
}

function emptyYear(): ContributionDay[] {
  const today = new Date();
  return Array.from({ length: 371 }, (_, i) => {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - 370 + i);
    return { date: d.toISOString().slice(0, 10), count: 0 };
  });
}
