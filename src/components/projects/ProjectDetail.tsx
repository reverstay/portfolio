"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlayIllustration } from "@/components/ui/Illustrations";
import type { Project, ProjectMedia } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

type ZoomTarget = { src: string; alt: string; heading: string };

function DiagramModal({ src, alt, heading, onClose }: ZoomTarget & { onClose: () => void }) {
  const { t } = useI18n();
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const pinchDist = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Escape fecha; o foco volta ao elemento que abriu o diálogo
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, []);

  const setClampedZoom = (fn: (z: number) => number) =>
    setZoom((z) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, fn(z)));
      if (next === MIN_ZOOM) setPos({ x: 0, y: 0 });
      return next;
    });
  const reset = () => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  };
  const beginDrag = (x: number, y: number) => {
    setDragging(true);
    dragStart.current = { x: x - pos.x, y: y - pos.y };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="zoom-modal-title"
        className="relative max-w-6xl w-full bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border gap-2 flex-wrap">
          <h3 id="zoom-modal-title" className="font-display text-base sm:text-lg font-medium text-text">
            {heading}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/20 border border-border rounded-xl p-1 gap-1">
              <button
                type="button"
                aria-label={t.projects.zoomOut}
                onClick={() => setClampedZoom((z) => z - 0.5)}
                className="px-2.5 py-1 text-xs text-text-muted hover:text-accent rounded-lg"
              >
                -
              </button>
              <button type="button" aria-label={t.projects.zoomReset} onClick={reset} className="px-2 py-1 text-xs text-text-muted hover:text-accent rounded-lg">
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                aria-label={t.projects.zoomIn}
                onClick={() => setClampedZoom((z) => z + 0.5)}
                className="px-2.5 py-1 text-xs text-text-muted hover:text-accent rounded-lg"
              >
                +
              </button>
            </div>
            <button ref={closeRef} type="button" aria-label={t.projects.close} onClick={onClose} className="p-2 rounded-xl text-text-muted hover:text-accent">
              ✕
            </button>
          </div>
        </div>

        <div
          onMouseDown={(e) => zoom > 1 && beginDrag(e.clientX, e.clientY)}
          onMouseMove={(e) => dragging && setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y })}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onWheel={(e) => setClampedZoom((z) => z + (e.deltaY < 0 ? 0.5 : -0.5))}
          onTouchStart={(e) => {
            if (e.touches.length === 1 && zoom > 1) beginDrag(e.touches[0].clientX, e.touches[0].clientY);
            if (e.touches.length === 2)
              pinchDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
          }}
          onTouchMove={(e) => {
            if (e.touches.length === 1 && dragging) {
              setPos({ x: e.touches[0].clientX - dragStart.current.x, y: e.touches[0].clientY - dragStart.current.y });
            } else if (e.touches.length === 2 && pinchDist.current !== null) {
              const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
              const delta = d - pinchDist.current;
              if (Math.abs(delta) > 5) {
                setClampedZoom((z) => z + (delta > 0 ? 0.08 : -0.08));
                pinchDist.current = d;
              }
            }
          }}
          onTouchEnd={() => {
            setDragging(false);
            pinchDist.current = null;
          }}
          className={`overflow-hidden my-4 flex-1 flex items-center justify-center bg-black/40 rounded-2xl relative touch-none select-none ${zoom > 1 ? "cursor-grab" : "cursor-default"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`, transition: dragging ? "none" : "transform 0.1s ease-out" }}
            className="max-h-full max-w-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

function MediaFigure({ media, wide, onOpen }: { media: ProjectMedia; wide: boolean; onOpen: () => void }) {
  const { t } = useI18n();
  return (
    <figure className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t.projects.enlarge}: ${media.alt}`}
        className={`group relative w-full overflow-hidden border border-border/60 bg-surface cursor-zoom-in transition-colors hover:border-accent/50 ${
          wide ? "rounded-2xl" : "rounded-3xl aspect-780/1688"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.src} alt={media.alt} loading="lazy" className={`w-full ${wide ? "h-auto" : "h-full object-cover object-top"}`} />
      </button>
      <figcaption className="text-xs sm:text-sm leading-relaxed text-text-muted">{media.caption}</figcaption>
    </figure>
  );
}

function MediaGallery({ media, onOpen }: { media: ProjectMedia[]; onOpen: (m: ProjectMedia, heading: string) => void }) {
  const { t: dict } = useI18n();
  const t = dict.projects;
  const architecture = media.filter((m) => m.kind === "architecture");
  const desktop = media.filter((m) => m.kind === "screenshot" && m.device !== "mobile");
  const mobile = media.filter((m) => m.kind === "screenshot" && m.device === "mobile");

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {architecture.length > 0 && (
        <section>
          <h2 className="mb-1 font-display text-base sm:text-lg font-medium text-text">{t.architecture}</h2>
          <p className="mb-4 text-xs text-text-muted/80">{t.architectureNote}</p>
          <div className="flex flex-col gap-6">
            {architecture.map((m) => (
              <MediaFigure key={m.src} media={m} wide onOpen={() => onOpen(m, t.architecture)} />
            ))}
          </div>
        </section>
      )}

      {(desktop.length > 0 || mobile.length > 0) && (
        <section>
          <h2 className="mb-1 font-display text-base sm:text-lg font-medium text-text">{t.gallery}</h2>
          <p className="mb-5 text-xs text-text-muted/80">{t.galleryNote}</p>

          {desktop.length > 0 && (
            <>
              {mobile.length > 0 && <h3 className="mb-3 font-mono text-xs text-accent">// {t.desktopScreens.toLowerCase()}</h3>}
              <div className="flex flex-col gap-8">
                {desktop.map((m) => (
                  <MediaFigure key={m.src} media={m} wide onOpen={() => onOpen(m, t.desktopScreens)} />
                ))}
              </div>
            </>
          )}

          {mobile.length > 0 && (
            <>
              <h3 className={`mb-3 font-mono text-xs text-accent ${desktop.length > 0 ? "mt-10" : ""}`}>// {t.mobileScreens.toLowerCase()}</h3>
              <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-5 pb-4 snap-x snap-mandatory scrollbar-thin">
                {mobile.map((m) => (
                  <div key={m.src} className="shrink-0 w-[70%] sm:w-auto snap-center">
                    <MediaFigure media={m} wide={false} onOpen={() => onOpen(m, t.mobileScreens)} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

export function ProjectDetail({ project, fromHome }: { project: Project; fromHome: boolean }) {
  const { t: dict, href } = useI18n();
  const t = dict.projects;
  const [zoomed, setZoomed] = useState<ZoomTarget | null>(null);
  const isWeb = !!project.isWeb;
  const wideVideo = project.videoLayout ? project.videoLayout === "wide" : isWeb;

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      <motion.div variants={item}>
        <Link
          href={href(fromHome ? "/" : "/projetos")}
          className="mb-6 sm:mb-8 inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors"
        >
          {fromHome ? dict.common.backHome : dict.common.backProjects}
        </Link>
      </motion.div>

      {project.logo && (
        <motion.div variants={item} className="mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.logo} alt={`Logo ${project.cardTitle ?? project.title}`} className="h-14 sm:h-16 w-auto object-contain" />
        </motion.div>
      )}
      <motion.p variants={item} className="mb-3 font-mono text-xs sm:text-sm text-accent">
        // {project.category.toLowerCase()}
      </motion.p>
      <motion.div variants={item} className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">{project.title}</h1>
        {project.inDevelopment && (
          <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
            {t.configuring}
          </span>
        )}
      </motion.div>
      <motion.p variants={item} className="mt-3 max-w-xl text-sm sm:text-base text-text-muted leading-relaxed">
        {project.description}
      </motion.p>

      {/* Resumo do caso antes da mídia: contexto → atuação → resultados */}
      <motion.div variants={item} className="mt-8 sm:mt-10">
        <h2 className="mb-2 sm:mb-3 font-display text-base sm:text-lg font-medium text-text">{t.about}</h2>
        <p className="text-sm sm:text-base leading-relaxed text-text-muted">{project.longDescription}</p>
      </motion.div>

      {project.role && (
        <motion.div variants={item} className="mt-8">
          <h2 className="mb-2 sm:mb-3 font-display text-base sm:text-lg font-medium text-text">{t.role}</h2>
          <p className="text-sm sm:text-base leading-relaxed text-text-muted">{project.role}</p>
        </motion.div>
      )}

      {project.results && project.results.length > 0 && (
        <motion.div variants={item} className="mt-8">
          <h2 className="mb-2 sm:mb-3 font-display text-base sm:text-lg font-medium text-text">{t.results}</h2>
          <ul className="flex flex-col gap-2">
            {project.results.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                <span className="mt-0.5 text-accent shrink-0">→</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {project.media && project.media.length > 0 ? (
        <motion.div variants={item} className="mt-12 sm:mt-14">
          <MediaGallery media={project.media} onOpen={(m, heading) => setZoomed({ src: m.src, alt: m.alt, heading })} />
        </motion.div>
      ) : (
        project.images.length > 0 && (
        <motion.div variants={item}>
          {isWeb ? (
            <div className="mt-8 sm:mt-10 flex flex-col gap-4">
              {project.images.map((src, i) => (
                <div key={i} className="relative w-full overflow-hidden rounded-2xl border border-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} - ${t.screenshot} ${i + 1}`} className="w-full h-auto object-contain" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 sm:mt-10 flex overflow-x-auto sm:grid sm:grid-cols-3 gap-6 pb-4 snap-x snap-mandatory scrollbar-thin">
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-[75%] sm:w-auto snap-center aspect-9/19 overflow-hidden bg-transparent flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} - ${t.screen} ${i + 1}`} className="object-contain w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
        )
      )}

      {project.diagramUrl && (
        <motion.div variants={item} className="mt-8 sm:mt-10">
          <h2 className="mb-3 font-display text-base sm:text-lg font-medium text-text">{t.diagram}</h2>
          <button
            type="button"
            onClick={() => project.diagramUrl && setZoomed({ src: project.diagramUrl, alt: t.diagram, heading: `${t.diagram} - ${project.title}` })}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border/80 bg-surface px-6 text-sm font-medium text-text-muted hover:text-accent hover:border-accent/40 hover:bg-surface/80 shadow-sm transition-all duration-200 cursor-pointer outline-none active:scale-[0.98]"
          >
            {t.viewDiagram}
          </button>
        </motion.div>
      )}

      {project.storeImageUrl && (
        <motion.div variants={item} className="mt-10 sm:mt-12">
          <h2 className="mb-3 flex items-center gap-2 font-display text-base sm:text-lg font-medium text-text">
            <PlayIllustration className="h-6 w-6" />
            {t.googlePlay}
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.storeImageUrl} alt={`${project.title} ${t.inStore}`} className="object-contain w-full max-w-3xl" />
        </motion.div>
      )}

      {project.videoUrl && (
        <motion.div variants={item} className="mt-12 sm:mt-16 flex flex-col items-center w-full">
          <h2 className="mb-2 font-display text-base sm:text-lg font-medium text-text text-center">
            {project.videoTitle ?? t.demo(isWeb)}
          </h2>
          <div className="w-16 h-1 bg-zinc-600 rounded-full mb-6" />
          {wideVideo ? (
            <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-black shadow-2xl">
              <video src={project.videoUrl} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
            </div>
          ) : (
            // Moldura de celular
            <div className="relative w-full max-w-70 sm:max-w-[320px] aspect-9/19 overflow-hidden rounded-[42px] border-10 border-zinc-800 bg-black shadow-2xl">
              <div className="absolute inset-0 overflow-hidden rounded-4xl">
                <video src={project.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-fill pointer-events-none" />
              </div>
            </div>
          )}
          {project.videoCaption && (
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text-muted text-center">{project.videoCaption}</p>
          )}
        </motion.div>
      )}

      {project.youtubeEmbedUrl && (
        <motion.div variants={item} className="mt-10 sm:mt-12">
          <h2 className="mb-2 sm:mb-3 font-display text-base sm:text-lg font-medium text-text">{t.manual}</h2>
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-md">
            <iframe
              src={project.youtubeEmbedUrl}
              title={t.manual}
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}

      <motion.div variants={item} className="mt-10 sm:mt-12">
        <h2 className="mb-2 sm:mb-3 font-display text-base sm:text-lg font-medium text-text">{t.highlights}</h2>
        <ul className="flex flex-col gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-text-muted leading-relaxed">
              <span className="mt-0.5 text-accent-mint shrink-0">✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </motion.div>

      <motion.div variants={item} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
        {project.demoUrl && (
          <Button variant="primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center rounded-xl">
            {project.demoIsLogin ? t.login : t.visit}
          </Button>
        )}
        {project.isNda ? (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-surface text-xs sm:text-sm text-text font-medium w-full sm:w-auto shadow-sm">
            <span className="text-accent shrink-0">🔒</span>
            <span>{t.nda}</span>
          </div>
        ) : (
          project.githubUrl && (
            <Button variant="secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center rounded-xl">
              {t.code}
            </Button>
          )
        )}
      </motion.div>

      {zoomed && <DiagramModal {...zoomed} onClose={() => setZoomed(null)} />}
    </motion.main>
  );
}
