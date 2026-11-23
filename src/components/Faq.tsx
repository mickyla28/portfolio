import { faqs } from "@/lib/content";
import { Reveal } from "./motion";
import { SectionHeader } from "./ui";

/** FAQ accordion. Uses native <details> so every answer is in the page HTML for search engines and AI tools. */
export function Faq() {
  return (
    <section id="faq" className="relative z-[1] scroll-mt-24 border-t border-line-soft bg-panel-2">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-12 px-6 py-24 md:py-30">
        <div className="min-w-0 flex-[1_1_320px]">
          <SectionHeader eyebrow="FAQ" title="Questions clients ask.">
            Quick answers about how I work. Still curious? Book a call or send a message.
          </SectionHeader>
        </div>
        <Reveal className="min-w-0 flex-[999_1_560px]">
          <div className="overflow-hidden rounded-[22px] border border-line bg-ink">
            {faqs.map((f, i) => (
              <details key={f.q} className={`group ${i < faqs.length - 1 ? "border-b border-line-soft" : ""}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 transition hover:bg-[#140b0b] [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[19px] font-semibold text-ecru">{f.q}</h3>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line-strong text-orange transition duration-300 group-open:rotate-45 group-open:border-orange">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-base leading-relaxed text-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
