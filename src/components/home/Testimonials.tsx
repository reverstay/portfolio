"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { useI18n } from "@/i18n/I18nProvider";

// Cada card de "post-it" tem rotação, deslocamento e fita adesiva próprios
const layouts = [
  { rotate: "md:-rotate-2", offset: "", tape: "-rotate-6" },
  { rotate: "md:rotate-1", offset: "md:mt-7", tape: "rotate-3" },
  { rotate: "md:-rotate-1.5", offset: "md:mt-2", tape: "-rotate-2" },
];

function Avatar({ t }: { t: Testimonial }) {
  const cls =
    "h-12 w-12 shrink-0 -rotate-2 rounded-sm border border-border object-cover shadow-sm ring-2 ring-border/50 transition-all duration-300 group-hover:rotate-0 group-hover:ring-accent/40";
  if (t.avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={t.avatar} alt={t.name} className={cls} />;
  }
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return <div className={`${cls} flex items-center justify-center bg-surface-elevated font-display text-sm font-bold text-accent`}>{initials}</div>;
}

export function Testimonials() {
  const { t: dict } = useI18n();
  const t0 = dict.testimonials;
  const [start, setStart] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Avança o carrossel a cada 12s, pausando enquanto um card está expandido
  useEffect(() => {
    if (expanded) return;
    const id = setInterval(() => setStart((s) => (s + 1) % testimonials.length), 12000);
    return () => clearInterval(id);
  }, [expanded]);

  useEffect(() => setExpanded(null), [start]);

  if (testimonials.length === 0) return null;

  const visible = Array.from({ length: Math.min(3, testimonials.length) }, (_, i) => testimonials[(start + i) % testimonials.length]);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pt-4 pb-12 sm:px-6 sm:pb-16 md:pt-6 md:pb-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10 text-center sm:mb-14 md:text-left"
      >
        <p className="mb-3 font-mono text-xs text-accent sm:text-sm">{t0.eyebrow}</p>
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl md:text-4xl">{t0.title}</h2>
      </motion.div>

      <div className="relative">
        {/* Mural pontilhado ao fundo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -top-5 -bottom-5 -z-10 opacity-[0.35] sm:-inset-x-8 sm:opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "22px 22px",
            backgroundPosition: "center",
            color: "#ffffff",
            WebkitMaskImage: "radial-gradient(ellipse 90% 85% at center, black 60%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 90% 85% at center, black 60%, transparent 100%)",
          }}
        />

        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => {
              const l = layouts[i % layouts.length];
              const isOpen = expanded === t.name;
              return (
                <motion.article
                  key={`${t.name}-${start}`}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  onClick={() => setExpanded((cur) => (cur === t.name ? null : t.name))}
                  style={{ borderRadius: "3px" }}
                  className={`group relative flex w-full cursor-pointer flex-col justify-between border border-border/80 bg-surface/90 p-6 pb-9 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors duration-300 ease-out hover:z-10 hover:rotate-0 hover:border-accent/40 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] lg:p-7 lg:pb-10 ${l.rotate} ${isOpen ? "" : `h-auto ${l.offset} md:h-108`}`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 border border-accent/30 bg-accent/15 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:rotate-0 ${l.tape}`}
                  />
                  <span className="pointer-events-none absolute bottom-2.5 right-3 select-none font-serif text-3xl font-black leading-none text-text/10">”</span>

                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                      <div className="flex items-center gap-3.5">
                        <Avatar t={t} />
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex gap-0.5 text-xs text-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.2)]">★★★★★</div>
                          <h3 className="truncate text-sm font-bold text-text transition-colors duration-200 group-hover:text-accent">{t.name}</h3>
                          <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-text/60" title={t.role}>
                            {t.role}
                          </p>
                        </div>
                      </div>
                      {t.linkedin && (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={t0.linkedin(t.name)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-surface/60 text-text/40 transition-all duration-200 hover:scale-110 hover:border-[#0a66c2]/30 hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    <div className="mb-4 h-px w-full border-t border-dashed border-border/70 sm:mb-5" />

                    <div className="min-h-0 flex-1">
                      <p className={`text-[13.5px] leading-relaxed text-text/80 ${isOpen ? "" : "line-clamp-6 md:line-clamp-11"}`}>{t.content}</p>
                      <span className="relative z-10 mt-2 inline-block text-xs font-semibold text-accent">{isOpen ? t0.collapse : t0.readAll}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
