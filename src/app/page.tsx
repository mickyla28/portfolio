import { GlowSystem } from "@/components/GlowSystem";
import { Hero } from "@/components/Hero";
import { InsideBuild } from "@/components/InsideBuild";
import { ScrollProgress, Spotlight } from "@/components/motion";
import { Nav } from "@/components/Nav";
import { Contact, Process, Services } from "@/components/Sections";
import { Statement } from "@/components/Statement";
import { ToolMarquee } from "@/components/ToolMarquee";
import { VideoProvider } from "@/components/video";
import { WorkGrid } from "@/components/WorkGrid";
import { Faq } from "@/components/Faq";
import { profile } from "@/lib/content";
import { buildSchema } from "@/lib/schema";

const footerLinks = [
  { href: "#systems", label: "Systems" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <VideoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()).replace(/</g, "\\u003c") }}
      />
      <ScrollProgress />
      <Spotlight />
      <a href="#systems" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-sangria focus:px-4 focus:py-2 focus:text-ecru">
        Skip to content
      </a>
      <div className="relative overflow-x-clip">
        <Nav />
        <main>
          <Hero />
          <ToolMarquee />
          <Statement />
          <GlowSystem />
          <InsideBuild />
          <WorkGrid />
          <Process />
          <Services />
          <Faq />
          <Contact />
        </main>
        <footer className="relative z-[1] border-t border-line-soft">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-7 text-sm text-muted">
            <span>
              © 2026 {profile.name} · {profile.title} · {profile.location}
            </span>
            <nav aria-label="Footer" className="flex flex-wrap gap-5">
              {footerLinks.map((l) => (
                <a key={l.href} href={l.href} className="transition hover:text-ecru">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </VideoProvider>
  );
}
