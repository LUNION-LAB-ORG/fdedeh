import React from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type FilterPill = { name: string; href: string; active?: boolean };

// Pills de filtre par rubrique, en haut des pages de listing (façon maquette Brut).
export function BrutFilterPills({ pills }: { pills: FilterPill[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {pills.map((pill) => (
        <Link
          key={pill.href + pill.name}
          href={pill.href}
          className={cn(
            "rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors",
            pill.active
              ? "border-brut-ink bg-brut-ink text-brut-ground"
              : "border-brut-line text-brut-ink-soft hover:border-brut-ink hover:text-brut-ink"
          )}
        >
          {pill.name}
        </Link>
      ))}
    </div>
  );
}

export default BrutFilterPills;
