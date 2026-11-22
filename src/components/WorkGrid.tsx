"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { automations, featuredWork, moreSites, sites, type WorkItem } from "@/lib/content";
import { GlowCard, Reveal } from "./motion";
import { ArrowUpRight, SectionHeader, Tag } from "./ui";
import { PlayIcon, useVideo } from "./video";

type TabId = "sites" | "autos";
const tabs: { id: TabId; label: string }[] = [
  { id: "sites", label: "Websites & funnels" },
  { id: "autos", label: "AI automations" },
];

// Client links use nofollow so your portfolio never passes ranking signals to (or gets tied into) their search results.
const external = { target: "_blank", rel: "nofollow noopener noreferrer" } as const;

function CardLink({ item, className, children }: { item: WorkItem; className: string; children: React.ReactNode }) {
  const { open } = useVideo();
  if (item.video) {
    return (
      <button type="button" onClick={() => open(item.video!)} className={`${className} text-left`}>
        {children}
      </button>
    );
  }
  return (
    <a href={item.href} {...external} className={className}>
      {children}
    </a>
  );
}

function Cta({ item }: { item: WorkItem }) {
  return (
    <span className="flex items-center gap-2 font-bold text-orange">
      {item.video && <PlayIcon size={14} />}
      {item.cta}
      {!item.video && <ArrowUpRight />}
    </span>
  );
}

function Built({ text }: { text: string }) {
  return (
    <span className="text-base text-soft">
      <strong className="font-bold text-ecru">What I built:</strong> {text}
    </span>
  );
}

export function WorkGrid() {
  const [tab, setTab] = useState<TabId>("sites");
  const items = tab === "sites" ? sites : automations;

  return (
    <section id="work" data-nosnippet className="relative z-[1] mt-20 scroll-mt-24 border-t border-line-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-24 md:py-30">
        <SectionHeader
          eyebrow="Selected work"
          title="Websites, funnels and automations."
          aside={
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5 rounded-full border border-line bg-[#100909] p-1.5">
              {tabs.map((t) => {
                const on = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTab(t.id)}
                    className={`relative min-h-11 rounded-full px-[18px] text-[15px] font-bold transition-colors ${on ? "text-ecru" : "text-body hover:text-ecru"}`}
                  >
                    {on && <motion.span layoutId="work-pill" className="bg-brand absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>
          }
        >
          Real client builds and demo systems. Tap a card to open it.
        </SectionHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {tab === "sites" && (
              <GlowCard className="overflow-hidden rounded-3xl border border-line bg-panel">
                <CardLink item={featuredWork} className="flex flex-wrap">
                  <div className="relative aspect-[16/10] min-w-0 flex-[999_1_560px] overflow-hidden border-line md:border-r">
                    <Image src={featuredWork.img} alt={`${featuredWork.name} website`} fill sizes="(max-width: 900px) 100vw, 760px" className="zoom object-cover object-top" />
                  </div>
                  <div className="flex min-w-0 flex-[1_1_320px] flex-col justify-center gap-4 p-8 md:p-9">
                    <div className="flex flex-wrap gap-2">
                      {featuredWork.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <span className="font-display text-[32px] font-semibold leading-[1.1] text-ecru">{featuredWork.name}</span>
                    <Built text={featuredWork.built} />
                    <Cta item={featuredWork} />
                  </div>
                </CardLink>
              </GlowCard>
            )}

            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5">
              {items.map((item, i) => (
                <Reveal key={item.name} delay={(i % 2) * 0.08}>
                  <GlowCard className="h-full overflow-hidden rounded-[22px] border border-line bg-panel">
                    <CardLink item={item} className="flex h-full w-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                        <Image src={item.img} alt={item.name} fill sizes="(max-width: 760px) 100vw, 580px" className="zoom object-cover object-top" />
                      </div>
                      <div className="flex flex-grow flex-col gap-3 px-[26px] pb-7 pt-6">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                        <span className="font-display text-[25px] font-semibold leading-[1.15] text-ecru">{item.name}</span>
                        <span className="flex-grow">
                          <Built text={item.built} />
                        </span>
                        <Cta item={item} />
                      </div>
                    </CardLink>
                  </GlowCard>
                </Reveal>
              ))}
            </div>

            {tab === "sites" && (
              <div className="flex flex-col gap-3.5 pt-3">
                <span className="font-display text-[22px] font-semibold text-ecru">More sites</span>
                <ul className="overflow-hidden rounded-[20px] border border-line bg-panel-2">
                  {moreSites.map((s, i) => (
                    <li key={s.name} className={i < moreSites.length - 1 ? "border-b border-line-soft" : ""}>
                      <a
                        href={s.href}
                        {...external}
                        className="group flex flex-wrap items-center justify-between gap-3 px-6 py-5 transition-all duration-300 hover:bg-[#140b0b] hover:pl-7"
                      >
                        <span className="flex flex-col gap-0.5">
                          <span className="font-display text-[19px] font-semibold text-ecru">{s.name}</span>
                          <span className="text-[15px] text-muted">{s.desc}</span>
                        </span>
                        <span className="flex items-center gap-2 text-sm font-bold text-orange">
                          {s.host}
                          <ArrowUpRight />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
