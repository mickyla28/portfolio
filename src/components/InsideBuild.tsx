"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { buildSlides } from "@/lib/content";


function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M19 12H5M11 18l-6-6 6-6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

export function InsideBuild() {
  const track = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (zoom === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") setZoom((z) => (z === null ? z : Math.min(buildSlides.length - 1, z + 1)));
      if (e.key === "ArrowLeft") setZoom((z) => (z === null ? z : Math.max(0, z - 1)));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  const current = zoom === null ? null : buildSlides[zoom];

  return (
    <section id="build" className="relative z-[1] scroll-mt-24">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-5 px-6 pb-7 pt-8">
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-orange">Inside the build</span>
          <h3 className="font-display text-[30px] font-semibold tracking-[-0.015em] text-ecru">GLOW, one workflow at a time.</h3>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Previous workflow" className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-ecru transition hover:border-orange disabled:opacity-30">
            <Arrow dir="left" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Next workflow" className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-ecru transition hover:border-orange disabled:opacity-30">
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        onScroll={updateEdges}
        className="no-scrollbar flex snap-x snap-mandatory gap-[18px] overflow-x-auto pb-7"
        style={{ paddingInline: "max(24px, calc((100vw - 1152px) / 2))", scrollPaddingInline: "max(24px, calc((100vw - 1152px) / 2))" }}
      >
        {buildSlides.map((s, i) => (
          <motion.figure
            key={s.n}
            className="card group flex w-[min(500px,84vw)] flex-none snap-start flex-col overflow-hidden rounded-[20px] border border-line bg-panel"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <button
              type="button"
              onClick={() => setZoom(i)}
              aria-label={`Enlarge step ${s.n}: ${s.title}`}
              className={`relative block aspect-video cursor-zoom-in overflow-hidden ${s.dark ? "bg-[#1e1e1e]" : "bg-[#f7f7f8]"}`}
            >
              <Image src={s.img} alt={s.title} width={s.w} height={s.h} sizes="(max-width: 640px) 1200px, 2000px" className="zoom h-full w-full object-cover object-left" />
              <span className="absolute left-3.5 top-3.5 bg-brand rounded-full px-2.5 py-1 text-xs font-bold tracking-[0.06em] text-ecru">STEP {s.n}</span>
              <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink/80 text-ecru opacity-0 transition group-hover:opacity-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
            <figcaption className="flex flex-col gap-2.5 px-6 pb-6 pt-5">
              <span className="font-display text-xl font-semibold text-ecru">{s.title}</span>
              <span className="font-mono text-[13px] leading-relaxed text-ember">{s.chain}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="mx-auto max-w-[1200px] px-6 text-[15px] text-muted">
        Swipe or use the arrows to follow a lead through the system. Tap any screenshot to enlarge it.
      </p>

      {mounted && createPortal(
      <AnimatePresence>
        {current && zoom !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
          >
            {/* Top bar: step title on the left, close on the right. Fixed height so nothing below shifts. */}
            <div className="flex h-20 flex-none items-center justify-between gap-4 px-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
              <span className="min-w-0 truncate font-display text-lg font-semibold text-ecru">
                <span className="text-orange">{current.n}</span> · {current.title}
              </span>
              <button ref={closeRef} type="button" onClick={() => setZoom(null)} aria-label="Close" className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-line-strong bg-tamarind text-ecru transition hover:border-orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Screenshot area: takes all the remaining space, image centered inside it. */}
            <div className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-8">
              <motion.div
                key={current.n}
                className={`max-h-full w-full max-w-6xl overflow-auto rounded-xl ${current.dark ? "bg-[#1e1e1e]" : "bg-[#f7f7f8]"}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={current.img} alt={current.title} width={current.w} height={current.h} sizes="100vw" className="h-auto w-full" />
              </motion.div>
            </div>

            {/* Bottom controls: always in the same spot, same width, whatever the screenshot or title. */}
            <div className="flex h-24 flex-none items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
              <div className="grid w-[260px] grid-cols-[48px_1fr_48px] items-center gap-3 rounded-full border border-line bg-panel/90 p-1.5">
                <button type="button" onClick={() => setZoom(Math.max(0, zoom - 1))} disabled={zoom === 0} aria-label="Previous workflow" className="flex h-12 w-12 items-center justify-center rounded-full bg-tamarind text-ecru transition hover:bg-oxblood disabled:opacity-30 disabled:hover:bg-tamarind">
                  <Arrow dir="left" />
                </button>
                <span className="text-center font-mono text-sm text-body" aria-live="polite">
                  {zoom + 1} / {buildSlides.length}
                </span>
                <button type="button" onClick={() => setZoom(Math.min(buildSlides.length - 1, zoom + 1))} disabled={zoom === buildSlides.length - 1} aria-label="Next workflow" className="bg-brand flex h-12 w-12 items-center justify-center rounded-full text-ecru transition disabled:opacity-30">
                  <Arrow dir="right" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </section>
  );
}
