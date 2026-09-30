"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LottieSlot } from "@/components/ui/LottieSlot";
import { SuccessIllustration } from "@/components/ui/Illustrations";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none focus:border-accent/50";

export function Contact() {
  const t = useI18n().t.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Falha ao enviar");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  useEffect(() => {
    if (status !== "success") return;
    const id = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(id);
  }, [status]);

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="mx-auto max-w-xl px-6 py-20">
      <motion.p variants={item} className="mb-3 font-mono text-sm text-accent">
        {t.eyebrow}
      </motion.p>
      <motion.h1 variants={item} className="font-display text-2xl font-bold text-text">
        {t.title}
      </motion.h1>
      <motion.p variants={item} className="mt-2 text-sm text-text-muted w-full">
        {t.subtitle}
      </motion.p>

      <motion.form variants={item} onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs text-text-muted">
              {t.name}
            </label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder={t.namePh} />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-xs text-text-muted">
              {t.email}
            </label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder={t.emailPh} />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-xs text-text-muted">
            {t.message}
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder={t.messagePh}
          />
        </div>

        <div className="mt-2 flex justify-end">
          <Button variant="primary" type="submit" className="w-full sm:w-auto px-8" disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.send}
          </Button>
        </div>

        <div className="mt-6 w-full px-2">
          <p className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center text-xs text-text-muted">
            <Lock size={12} className="shrink-0" />
            <span>{t.privacy}</span>
          </p>
        </div>

        {status === "success" && (
          <div className="flex flex-col items-center mt-3">
            <p className="text-sm text-accent-mint mb-3">{t.success}</p>
            <div className="w-40 h-40">
              <LottieSlot src="/lottie/success.json" loop={false} className="w-full h-full" fallback={<SuccessIllustration className="w-full h-full" />} />
            </div>
          </div>
        )}
        {status === "error" && <p className="text-sm text-red-400 text-center">{t.error}</p>}
      </motion.form>
    </motion.main>
  );
}
