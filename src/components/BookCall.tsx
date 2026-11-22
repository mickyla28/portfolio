"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/lib/content";
import { GlowCard } from "./motion";
import { ArrowUpRight } from "./ui";

/** Contact tile that opens your GoHighLevel booking calendar in a pop-up. */
export function BookCallTile() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <GlowCard className="rounded-[22px] border border-[#7a3a1e] bg-gradient-to-br from-[#2a0f0a] to-panel">
        <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="flex w-full items-center gap-5 px-7 py-[26px] text-left">
          <span className="bg-brand flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-ecru">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </span>
          <span className="flex min-w-0 flex-auto flex-col gap-0.5">
            <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-orange">Book a call</span>
            <span className="font-display text-[clamp(18px,2vw,24px)] font-semibold text-ecru">Pick a time that works for you</span>
          </span>
          <span className="flex-none text-ecru">
            <ArrowUpRight size={20} />
          </span>
        </button>
      </GlowCard>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Book a call"
                className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="flex h-[min(860px,92vh)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-line-strong bg-panel shadow-[0_40px_120px_-30px_rgba(241,96,1,0.5)]"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.97, y: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                    <span className="font-display text-lg font-semibold text-ecru">Book a call with {profile.name}</span>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line-strong text-ecru transition hover:border-orange"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <iframe src={profile.booking} title="Booking calendar" className="w-full flex-1 bg-white" />
                  <a href={profile.booking} target="_blank" rel="noopener noreferrer" className="border-t border-line px-6 py-3 text-center text-sm text-muted transition hover:text-ecru">
                    Calendar not loading? Open it in a new tab
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
