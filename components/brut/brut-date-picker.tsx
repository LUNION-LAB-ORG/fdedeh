"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { fr } from "date-fns/locale";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Sélecteur de date moderne (calendrier), pour parcourir les dailies par jour.
// Remplace l'input date natif : à la sélection, navigue vers /dailies/{date}.
export function BrutDatePicker({
  selected,
  label = "Choisir une date",
  variant = "light",
  className,
}: {
  selected?: string;
  label?: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const selectedDate = selected ? new Date(selected) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-semibold transition-colors",
            variant === "dark"
              ? "border-white/25 text-white hover:bg-white/10"
              : "border-brut-line bg-brut-surface text-brut-ink hover:bg-brut-raise",
            className
          )}
        >
          <CalendarDays className="h-[18px] w-[18px]" />
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          locale={fr}
          defaultMonth={selectedDate}
          selected={selectedDate}
          disabled={{ after: new Date() }}
          onSelect={(d) => {
            if (!d) return;
            setOpen(false);
            router.push(`/dailies/${toISO(d)}`);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default BrutDatePicker;
