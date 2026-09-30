"use client";

import { motion } from "framer-motion";
import type { ContributionDay } from "@/lib/github";
import { useI18n } from "@/i18n/I18nProvider";

function colorFor(count: number) {
  if (count === 0) return "#151A21";
  if (count <= 2) return "#2a3a2f";
  if (count <= 5) return "#3d6b4a";
  if (count <= 9) return "#5FD9A4";
  return "#F2A93B";
}

export function GithubHeatmap({ weeks }: { weeks: ContributionDay[][] }) {
  const { t } = useI18n();
  return (
    <div className="w-full overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] scrollbar-thin">
      <div className="flex gap-1" style={{ minWidth: weeks.length * 14 }}>
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-1">
            {week.map((day, d) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (w * 7 + d) * 0.003, ease: "easeOut" }}
                title={t.github.day(day.date, day.count)}
                className="h-2.5 w-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: colorFor(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
