"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/** Fades and lifts content in as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "article" ? motion.article : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Red glow that follows the cursor across the whole page. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(560px circle at var(--mx, 70%) var(--my, 20%), rgba(241,80,10,0.13), transparent 65%)",
      }}
    />
  );
}

/** Thin progress bar at the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-sangria via-scotch to-orange"
      style={{ scaleX }}
    />
  );
}

/** Card that lifts on hover, with an orange glow that follows the cursor. */
export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
