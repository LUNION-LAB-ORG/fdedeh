"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isSameDay,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["lu", "ma", "me", "je", "ve", "sa", "di"];

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Sélecteur de date moderne, calendrier custom aux couleurs Brut (pas d'input
// natif). À la sélection d'un jour, navigue vers /dailies/{date}. Les jours
// futurs sont désactivés ; aujourd'hui est cerclé, le jour choisi en orange.
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
  const today = startOfDay(new Date());
  const selectedDate = selected ? startOfDay(new Date(selected)) : undefined;
  const [view, setView] = useState<Date>(() => startOfMonth(selectedDate ?? today));

  const monthStart = startOfMonth(view);
  const days = eachDayOfInterval({ start: monthStart, end: endOfMonth(view) });
  const leading = (getDay(monthStart) + 6) % 7; // lundi en tête
  const nextDisabled = format(view, "yyyy-MM") >= format(today, "yyyy-MM");

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
      <PopoverContent align="start" className="w-[304px] rounded-2xl border-brut-line bg-brut-surface p-4 text-brut-ink shadow-base2">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            aria-label="Mois précédent"
            onClick={() => setView(subMonths(view, 1))}
            className="rounded-full p-1.5 text-brut-ink transition-colors hover:bg-brut-raise"
          >
            <ChevronLeft className="h-[18px] w-[18px]" />
          </button>
          <span className="font-display text-[15px] font-black capitalize -tracking-[0.02em]">
            {format(view, "MMMM yyyy", { locale: fr })}
          </span>
          <button
            type="button"
            aria-label="Mois suivant"
            disabled={nextDisabled}
            onClick={() => setView(addMonths(view, 1))}
            className="rounded-full p-1.5 text-brut-ink transition-colors hover:bg-brut-raise disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <div key={w} className="pb-1 font-mono text-[11px] uppercase tracking-wide text-brut-muted">
              {w}
            </div>
          ))}
          {Array.from({ length: leading }).map((_, i) => (
            <div key={`b${i}`} />
          ))}
          {days.map((d) => {
            const future = isAfter(d, today);
            const isToday = isSameDay(d, today);
            const isSel = selectedDate && isSameDay(d, selectedDate);
            return (
              <button
                key={d.toISOString()}
                type="button"
                disabled={future}
                onClick={() => {
                  setOpen(false);
                  router.push(`/dailies/${toISO(d)}`);
                }}
                className={cn(
                  "flex h-9 items-center justify-center rounded-lg text-[13.5px] font-semibold transition-colors",
                  future && "cursor-not-allowed text-brut-muted/40",
                  !future && isSel && "bg-custom-gradient text-[#1A0F00]",
                  !future && !isSel && isToday && "text-brut-signal ring-1 ring-inset ring-brut-signal",
                  !future && !isSel && !isToday && "text-brut-ink hover:bg-brut-raise"
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default BrutDatePicker;
