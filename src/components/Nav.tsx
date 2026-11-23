"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#systems", label: "Systems" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#services", label: "Services" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-full border py-2.5 pl-3.5 pr-2.5 transition-colors duration-300 ${
          scrolled ? "border-line bg-[#100909]/85 backdrop-blur-md" : "border-line bg-[#100909]/60 backdrop-blur-sm"
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
          <Image src="/images/logo-mark.png" alt="Shan Mickyla logo" width={40} height={40} priority className="h-10 w-10" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-ecru">{profile.name}</span>
            <span className="text-[13px] text-muted">{profile.title}</span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-2.5 text-[15px] font-medium text-body transition hover:text-ecru">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-glow ml-1.5 inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-[15px] font-bold text-ecru">
            Let&apos;s talk
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ecru md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-3xl border border-line bg-[#100909]/95 px-6 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col py-2">
              {[...links, { href: "#contact", label: "Let's talk" }].map((l, i, arr) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-4 font-display text-xl font-semibold text-ecru ${i < arr.length - 1 ? "border-b border-line-soft" : ""}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
