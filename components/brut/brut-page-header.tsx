import React from "react";

export function BrutPageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b-[3px] border-brut-ink px-6 py-10 lg:px-11 lg:py-12">
      {eyebrow && (
        <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-brut-signal">{eyebrow}</p>
      )}
      <h1 className="font-display text-[clamp(34px,6vw,66px)] font-black -tracking-[0.04em] text-balance">
        {title}
      </h1>
      {subtitle && <p className="mt-4 max-w-[62ch] text-[16px] text-brut-muted">{subtitle}</p>}
    </div>
  );
}

export default BrutPageHeader;
