"use client";

import { motion } from "framer-motion";
import { getSite } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";

export function HomeTimeline() {
  const { lang } = useI18n();
  const items = getSite(lang).timeline;

  return (
    <footer className="mt-16 mb-24 w-full">
      <div className="ml-2 sm:ml-6 pl-4 sm:pl-8 relative border-l border-white/20">
        {/* Linha que "desenha" de cima para baixo ao entrar na tela */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="absolute -left-px top-0 bottom-0 w-px bg-white/60 pointer-events-none"
        />
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className={`relative ${i === items.length - 1 ? "" : "pb-10"}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span className="font-mono text-xs sm:text-sm text-text font-normal tracking-wide shrink-0">
                <span className="text-accent">//</span> {item.label}
              </span>
              <p className="text-sm text-text-muted wrap-break-word min-w-0">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </footer>
  );
}
