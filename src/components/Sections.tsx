import { profile, services, steps } from "@/lib/content";
import { GlowCard, Reveal } from "./motion";
import { BookCallTile } from "./BookCall";
import { ArrowUpRight, IconTile, SectionHeader } from "./ui";

export function Process() {
  return (
    <section id="process" className="relative z-[1] scroll-mt-24 border-t border-line-soft bg-panel-2">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24 md:py-30">
        <SectionHeader eyebrow="Process" title="How a project actually runs." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <GlowCard className="flex h-full flex-col gap-3 rounded-[20px] border border-line bg-ink p-7">
                <span className="font-mono text-[13px] text-orange">{s.n}</span>
                <span className="font-display text-[22px] font-semibold text-ecru">{s.title}</span>
                <span className="text-base text-muted">{s.desc}</span>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="relative z-[1] scroll-mt-24 border-t border-line-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-24 md:py-30">
        <SectionHeader eyebrow="Services" title="What I can build for you." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <GlowCard className="flex h-full flex-col gap-3.5 rounded-[20px] border border-line bg-panel p-7">
                <IconTile name={s.icon} />
                <span className="font-display text-[21px] font-semibold text-ecru">{s.title}</span>
                <span className="text-base text-muted">{s.desc}</span>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactTile({ href, label, value, icon, newTab = false }: { href: string; label: string; value: string; icon: React.ReactNode; newTab?: boolean }) {
  return (
    <GlowCard className="rounded-[22px] border border-line bg-panel/90">
      <a
        href={href}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-5 px-7 py-[26px]"
      >
        <span className="bg-brand flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-ecru">{icon}</span>
        <span className="flex min-w-0 flex-auto flex-col gap-0.5">
          <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-orange">{label}</span>
          <span className="font-display text-[clamp(18px,2vw,24px)] font-semibold text-ecru [overflow-wrap:anywhere]">{value}</span>
        </span>
        <span className="flex-none text-ecru">
          <ArrowUpRight size={20} />
        </span>
      </a>
    </GlowCard>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative z-[1] scroll-mt-24 overflow-hidden border-t border-line-soft">
      <div aria-hidden="true" className="animate-drift-a pointer-events-none absolute left-1/2 top-[35%] -ml-80 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(193,8,1,0.28),rgba(74,0,0,0)_70%)] blur-[60px]" />
      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-6 py-24 md:py-30">
        <Reveal className="flex min-w-0 flex-[1_1_400px] flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-[#100909] px-3.5 py-[7px] text-sm font-medium text-body">
            <span className="animate-pulse-ring h-2 w-2 rounded-full bg-orange" />
            Available for projects
          </span>
          <h2 className="font-display text-[clamp(34px,4.2vw,54px)] font-semibold leading-[1.02] tracking-[-0.025em] text-ecru">
            Have a funnel or automation you want built?
          </h2>
          <p className="text-lg text-soft">Book a call, email me, or message me on WhatsApp. I reply within 24 hours.</p>
          <div className="flex flex-wrap gap-2.5 pt-1.5">
            {[
              { href: profile.linkedin, label: "LinkedIn" },
              { href: profile.onlinejobs, label: "OnlineJobs.ph" },
              { href: profile.resume, label: "Resume" },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-glow inline-flex min-h-11 items-center rounded-full border border-line-strong px-[18px] text-[15px] font-bold text-ecru hover:border-orange">
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <BookCallTile />
          <ContactTile
            href={`mailto:${profile.email}`}
            label="Email"
            value={profile.email}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18v12H3z" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            }
          />
          <ContactTile
            href={profile.whatsappLink}
            newTab
            label="WhatsApp"
            value={profile.whatsappDisplay}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 21l1.7-4.6A8.5 8.5 0 1 1 8 19.7z" />
                <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.6-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" />
              </svg>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
