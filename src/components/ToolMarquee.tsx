import Image from "next/image";
import { tools, type Tool } from "@/lib/tools";

function Logo({ tool }: { tool: Tool }) {
  if (tool.type === "image") {
    return <Image src={tool.src} alt="" width={28} height={28} className="h-7 w-7 object-contain" />;
  }
  if (tool.type === "webhook") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={tool.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
        <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
        <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <path d={tool.path} fill={tool.color} />
    </svg>
  );
}

export function ToolMarquee() {
  const loop = [...tools, ...tools];
  return (
    <div className="marquee relative overflow-hidden border-y border-line-soft py-5" aria-label="Tools I work with">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <ul className="animate-marquee flex w-max gap-14 pl-14">
        {loop.map((t, i) => (
          <li key={`${t.name}-${i}`} aria-hidden={i >= tools.length} className="flex items-center gap-3 whitespace-nowrap">
            <Logo tool={t} />
            <span className="font-display text-xl font-medium text-[#cfc6b8]">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
