"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// Fade-in apenas no primeiro carregamento; as navegações seguintes são animadas pelo template.tsx
export function PageTransition({ children }: { children: React.ReactNode }) {
  const first = useRef(true);
  return (
    <motion.div
      initial={first.current ? { opacity: 0, y: 15 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onAnimationComplete={() => {
        first.current = false;
      }}
      className="flex-1 w-full"
    >
      {children}
    </motion.div>
  );
}
