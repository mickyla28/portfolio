import type { ReactNode } from "react";
import type { IconName } from "@/lib/content";
import { Reveal } from "./motion";

const iconPaths: Record<IconName, string> = {
  page: "M4 4h16v16H4zM4 9h16M9 9v11",
  flow: "M5 6h6v4H5zM13 14h6v4h-6zM8 10v2a2 2 0 0 0 2 2h3",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
};

export function IconTile({ name }: { name: IconName }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-tamarind">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F16001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={iconPaths[name]} />
      </svg>
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[#100909] px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] text-orange">
      <span className="h-1.5 w-1.5 rounded-full bg-orange" />
      {children}
    </span>
  );
}

export function Tag({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`rounded-full px-[11px] py-1 text-xs font-bold uppercase tracking-[0.06em] ${
        solid ? "bg-brand text-ecru" : "border border-line-strong text-ember"
      }`}
    >
      {children}
    </span>
  );
}

export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex max-w-[720px] flex-col items-start gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[clamp(32px,3.8vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-ecru">
          {title}
        </h2>
        {children && <p className="text-lg text-soft">{children}</p>}
      </div>
      {aside}
    </Reveal>
  );
}

export const btnPrimary =
  "btn-glow inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-brand px-[26px] font-bold text-ecru";
export const btnGhost =
  "btn-glow inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-line-strong px-[26px] font-bold text-ecru hover:border-orange";
