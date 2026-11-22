"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "@/lib/content";
import { btnGhost, btnPrimary } from "./ui";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease },
        };

  return (
    <section ref={ref} id="top" className="relative -mt-[76px] pt-[76px]">
      <div aria-hidden="true" className="animate-drift-a pointer-events-none absolute -right-32 -top-20 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(193,8,1,0.42),rgba(74,0,0,0)_70%)] blur-[40px]" />
      <div aria-hidden="true" className="animate-drift-b pointer-events-none absolute -bottom-20 -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(241,96,1,0.28),rgba(32,14,14,0)_70%)] blur-[50px]" />
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-16 px-6 pb-22 pt-20 md:pt-24">
        <div className="flex min-w-0 flex-[999_1_540px] flex-col items-start gap-[26px]">
          <motion.span {...item(0)} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-[#100909] px-3.5 py-[7px] text-sm font-medium text-body">
            <span className="animate-pulse-ring h-2 w-2 rounded-full bg-orange" />
            Available for projects
          </motion.span>
          <motion.h1 {...item(1)} className="font-display text-[clamp(40px,5.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.025em] text-ecru">
            I build GoHighLevel funnels and the <span className="text-brand">AI systems</span> that run them.
          </motion.h1>
          <motion.p {...item(2)} className="max-w-[540px] text-[19px] text-soft">
            I build the page, the CRM and the follow-up as one system, then add AI where it saves your team real work.
          </motion.p>
          <motion.div {...item(3)} className="flex flex-wrap gap-3">
            <a href="#work" className={`group ${btnPrimary}`}>
              See my work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#systems" className={btnGhost}>
              View AI automations
            </a>
          </motion.div>
        </div>

        <motion.div
          className="flex min-w-0 flex-[1_1_340px] justify-center"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
        >
          <motion.div style={{ y: photoY }} className="relative w-full max-w-[400px]">
            <div className="rounded-[28px] bg-gradient-to-br from-orange via-oxblood to-tamarind p-px shadow-[0_40px_120px_-30px_rgba(241,96,1,0.5)]">
              <Image
                src="/images/shan-portrait.jpg"
                alt={profile.name}
                width={832}
                height={1040}
                priority
                className="block aspect-[4/5] w-full rounded-[27px] object-cover"
              />
            </div>
            <div className="animate-float-y absolute bottom-10 left-3 flex items-center gap-3 rounded-2xl border border-[#3a1a18] bg-ink/90 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur sm:-left-6 sm:bottom-12">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-orange/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F16001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[15px] font-semibold text-ecru">{profile.name}</span>
                <span className="text-[13px] text-muted">{profile.title}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
