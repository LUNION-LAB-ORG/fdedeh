"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrutThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en thème clair" : "Passer en thème sombre"}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full border border-brut-line px-3 py-2 text-[13px] font-semibold text-brut-ink-soft transition-colors hover:bg-brut-raise hover:text-brut-ink",
        className
      )}
    >
      {/* Avant le montage, le thème résolu est inconnu : on rend une icône neutre pour éviter un décalage d'hydratation. */}
      {mounted && isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
      <span>{mounted ? (isDark ? "Clair" : "Sombre") : "Thème"}</span>
    </button>
  );
}

export default BrutThemeToggle;
