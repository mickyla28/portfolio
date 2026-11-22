import { glow } from "@/lib/content";
import { Reveal } from "./motion";
import { SectionHeader, Tag } from "./ui";
import { VideoButton, VideoPreview } from "./video";

export function GlowSystem() {
  return (
    <section id="systems" className="relative z-[1] scroll-mt-24 border-t border-line-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pb-16 pt-24 md:pt-30">
        <SectionHeader eyebrow="Featured system" title="Not just pages. The system behind them.">
          When native GHL isn&apos;t enough, I extend it with n8n and AI. Here&apos;s a full system, end to end.
        </SectionHeader>

        <Reveal as="article" className="overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-[#1a0c0c] to-[#0f0909]">
          <div className="flex flex-wrap">
            <div className="flex min-w-0 flex-[999_1_500px] flex-col gap-5 p-8 md:p-11">
              <div className="flex flex-wrap gap-2">
                {glow.tags.map((t, i) => (
                  <Tag key={t} solid={i === 0}>
                    {t}
                  </Tag>
                ))}
              </div>
              <h3 className="font-display text-[clamp(30px,3.2vw,38px)] font-semibold leading-[1.05] tracking-[-0.02em] text-ecru">
                {glow.title}
              </h3>
              <p className="text-[17px] text-soft">{glow.description}</p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <VideoButton video="glowFull">Full walkthrough</VideoButton>
                <a href="#build" className="btn-glow inline-flex min-h-12 items-center rounded-full border border-line-strong px-[22px] font-bold text-ecru hover:border-orange">
                  See inside the build
                </a>
              </div>
            </div>
            <div className="flex min-w-0 flex-[1_1_440px] flex-col justify-center p-6 md:p-7">
              <VideoPreview video="glowHighlight" src="/images/glow-highlight.webp" alt="GLOW highlight: what the system does" label="Highlight · 80s" />
            </div>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8 gap-y-4 border-t border-line px-8 py-8 md:px-11">
            {glow.wins.map((w) => (
              <li key={w} className="flex items-start gap-3 text-[#e6ddd0]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F16001" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none">
                  <path d="m5 12 5 5L20 7" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
