import React from "react";
import { cn } from "@/lib/utils";

type BrutBadgeVariant = "signal" | "outline" | "soft";

const base =
  "inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.09em] px-2.5 py-1 rounded-full whitespace-nowrap";

const variants: Record<BrutBadgeVariant, string> = {
  // Mise en avant : le dégradé maison, l'unique couleur de signal.
  signal: "bg-custom-gradient text-[#1A0F00]",
  // Type de contenu : contour encre, volontairement sobre.
  outline: "border-[1.5px] border-brut-ink text-brut-ink",
  // Secondaire : sourdine.
  soft: "bg-brut-raise text-brut-ink-soft",
};

export function BrutBadge({
  variant = "outline",
  dot = false,
  className,
  children,
}: {
  variant?: BrutBadgeVariant;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn(base, variants[variant], className)}>
      {dot && <span className="text-current">●</span>}
      {children}
    </span>
  );
}

export default BrutBadge;
