"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { videos, type VideoKey } from "@/lib/content";

type Ctx = { open: (key: VideoKey) => void };
const VideoContext = createContext<Ctx>({ open: () => {} });

export function useVideo() {
  return useContext(VideoContext);
}

/** Holds the YouTube player modal. Wrap the page in this once. */
export function VideoProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<VideoKey | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((key: VideoKey) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setCurrent(key);
  }, []);
  const close = useCallback(() => {
    setCurrent(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!current) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close]);

  const video = current ? videos[current] : null;

  return (
    <VideoContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {video && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-display text-lg font-semibold text-ecru">{video.title}</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-tamarind text-ecru transition hover:bg-oxblood"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-video overflow-hidden rounded-2xl border border-line-strong bg-black shadow-[0_40px_120px_-30px_rgba(244,44,29,0.5)]">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoContext.Provider>
  );
}

export function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5v14l12-7z" />
    </svg>
  );
}

/** Button that opens a video in the modal. */
export function VideoButton({
  video,
  children,
  variant = "primary",
}: {
  video: VideoKey;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const { open } = useVideo();
  const styles =
    variant === "primary"
      ? "bg-brand text-ecru hover:shadow-[0_12px_30px_-8px_rgba(241,96,1,0.6)]"
      : "border border-line-strong text-ecru hover:border-orange";
  return (
    <button
      type="button"
      onClick={() => open(video)}
      className={`inline-flex min-h-12 items-center gap-2.5 rounded-full px-[22px] font-bold transition hover:-translate-y-0.5 ${styles}`}
    >
      <PlayIcon />
      {children}
    </button>
  );
}

/** Looping preview clip that opens a video when clicked. */
export function VideoPreview({ video, src, alt, label }: { video: VideoKey; src: string; alt: string; label: string }) {
  const { open } = useVideo();
  return (
    <button
      type="button"
      onClick={() => open(video)}
      aria-label={`Play ${videos[video].title}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-line-strong shadow-[0_30px_80px_-30px_rgba(241,96,1,0.45)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- animated webp stays unoptimized */}
      <img src={src} alt={alt} className="block aspect-video w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition group-hover:bg-ink/40">
        <span className="flex h-16 w-16 items-center justify-center bg-brand rounded-full text-ecru shadow-[0_0_0_10px_rgba(241,96,1,0.22)] transition group-hover:scale-110">
          <PlayIcon size={24} />
        </span>
      </span>
      <span className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-full bg-ink/75 px-2.5 py-1 font-mono text-xs text-ecru">
        <span className="animate-pulse-ring h-1.5 w-1.5 rounded-full bg-orange" />
        {label}
      </span>
    </button>
  );
}
