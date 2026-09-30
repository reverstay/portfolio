"use client";

import { motion } from "framer-motion";

// Ilustrações animadas usadas quando não há arquivo Lottie em public/lottie/.

const lines = [
  { x: 28, w: 70, c: "#f2a93b" },
  { x: 44, w: 110, c: "#8b93a1" },
  { x: 44, w: 80, c: "#5fd9a4" },
  { x: 60, w: 96, c: "#8b93a1" },
  { x: 44, w: 60, c: "#54a2ff" },
  { x: 28, w: 30, c: "#f2a93b" },
];

export function CodeWindowIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} role="img" aria-label="Ilustração de código">
      <motion.g initial={{ y: 0 }} animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="10" y="20" width="220" height="150" rx="12" fill="#121212" stroke="#242424" strokeWidth="2" />
        <rect x="10" y="20" width="220" height="26" rx="12" fill="#1a1a1a" />
        <rect x="10" y="34" width="220" height="12" fill="#1a1a1a" />
        {["#ff6568", "#fcbb00", "#00d294"].map((c, i) => (
          <circle key={c} cx={28 + i * 14} cy="33" r="4" fill={c} />
        ))}
        {lines.map((l, i) => (
          <motion.rect
            key={i}
            x={l.x}
            y={62 + i * 16}
            height="7"
            rx="3.5"
            fill={l.c}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: [0, l.w, l.w, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, times: [0, 0.25, 0.85, 1], delay: i * 0.35, repeat: Infinity, repeatDelay: 0.5 }}
          />
        ))}
        <motion.rect
          x="190"
          y="140"
          width="3"
          height="14"
          fill="#f2a93b"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.g>
      <motion.ellipse
        cx="120"
        cy="188"
        rx="80"
        ry="6"
        fill="#f2a93b"
        opacity="0.08"
        animate={{ rx: [80, 70, 80] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function ChipIllustration({ className = "" }: { className?: string }) {
  const pins = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Ilustração de processador">
      {pins.map((i) => (
        <g key={i} stroke="#8b93a1" strokeWidth="3" strokeLinecap="round">
          <line x1={60 + i * 20} y1="30" x2={60 + i * 20} y2="50" />
          <line x1={60 + i * 20} y1="150" x2={60 + i * 20} y2="170" />
          <line x1="30" y1={60 + i * 20} x2="50" y2={60 + i * 20} />
          <line x1="150" y1={60 + i * 20} x2="170" y2={60 + i * 20} />
        </g>
      ))}
      <rect x="50" y="50" width="100" height="100" rx="14" fill="#121212" stroke="#242424" strokeWidth="3" />
      <motion.rect
        x="72"
        y="72"
        width="56"
        height="56"
        rx="8"
        fill="none"
        stroke="#f2a93b"
        strokeWidth="3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {pins.map((i) => (
        <motion.circle
          key={i}
          cx={60 + i * 20}
          cy="30"
          r="4"
          fill="#5fd9a4"
          animate={{ cy: [30, 50, 30], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

export function SuccessIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Mensagem enviada">
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#5fd9a4"
        strokeWidth="5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M32 52 L45 64 L69 38"
        fill="none"
        stroke="#5fd9a4"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

export function PlayIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <motion.path
        d="M5 3.5v17l14-8.5z"
        fill="none"
        stroke="#5fd9a4"
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
    </svg>
  );
}
