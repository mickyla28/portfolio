import { pillars } from "@/lib/content";
import { GlowCard, Reveal } from "./motion";
import { IconTile } from "./ui";

export function Statement() {
  return (
    <section className="relative z-[1]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-6 py-24 md:py-30">
        <Reveal>
          <p className="max-w-[980px] font-display text-[clamp(26px,3.2vw,40px)] font-medium leading-[1.25] tracking-[-0.015em] text-dim">
            Most leads aren&apos;t lost to bad ads.{" "}
            <span className="text-ecru">They&apos;re lost in the gap between the form and the follow-up.</span> I close that gap
            with <span className="text-brand">one connected system:</span>{" "}
            <span className="text-ecru">the page, the CRM and the automations behind it.</span>
          </p>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <GlowCard className="flex h-full flex-col gap-3.5 rounded-[20px] border border-line bg-panel p-7">
                <IconTile name={p.icon} />
                <span className="font-display text-[21px] font-semibold text-ecru">{p.title}</span>
                <span className="text-base text-muted">{p.desc}</span>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
