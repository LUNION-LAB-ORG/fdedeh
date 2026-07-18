"use client";

import React, { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Home, Newspaper, LayoutGrid, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoFd from "@/components/logo-fd";
import { RUBRIQUES, MEDIA, NavItem, estItemActif } from "./nav-data";
import { BrutThemeToggle } from "./brut-theme-toggle";

const TABS = [
  { name: "Accueil", href: "/", Icon: Home },
  { name: "Articles", href: "/a-la-une", match: ["/articles"], Icon: Newspaper },
  { name: "Inabo", href: "/dailies", Icon: LayoutGrid },
];

function SheetLink({ item, active, onClose }: { item: NavItem; active: boolean; onClose: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-semibold",
        "[&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:shrink-0 [&_svg]:stroke-current [&_svg]:fill-none [&_svg]:[stroke-width:1.7]",
        active ? "bg-brut-raise text-brut-ink" : "text-brut-ink-soft"
      )}
    >
      {item.icon}
      {item.name}
    </Link>
  );
}

export function BrutBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Verrouille le défilement de l'arrière-plan quand le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const tabClass = (active: boolean) =>
    cn(
      "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
      active ? "text-brut-signal" : "text-brut-muted"
    );

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brut-line bg-brut-surface/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch">
          {TABS.map((tab) => {
            const { name, href, Icon } = tab;
            const active = estItemActif(tab, pathname);
            return (
              <Link key={href} href={href} className={tabClass(active)}>
                <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 2} />
                <span>{name}</span>
              </Link>
            );
          })}
          <button type="button" onClick={() => setOpen(true)} className={tabClass(open)} aria-label="Ouvrir le menu">
            <Menu className="h-[22px] w-[22px]" />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navigation">
          <div
            className="absolute inset-0 bg-black/50 duration-200 animate-in fade-in"
            onClick={close}
          />
          <div
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl border-t border-brut-line bg-brut-surface duration-300 animate-in slide-in-from-bottom"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-brut-line" />
            <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-3">
              <LogoFd width={78} />
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="rounded-full p-2 text-brut-ink transition-colors hover:bg-brut-raise"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 pb-6">
              <div className="px-1 pb-2 pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-brut-muted">Rubriques</div>
              <div className="grid grid-cols-2 gap-1">
                {RUBRIQUES.map((item) => (
                  <SheetLink key={item.name} item={item} active={estItemActif(item, pathname)} onClose={close} />
                ))}
              </div>

              <div className="px-1 pb-2 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-brut-muted">Le média</div>
              <div className="grid grid-cols-2 gap-1">
                {MEDIA.map((item) => (
                  <SheetLink key={item.name + item.href} item={item} active={estItemActif(item, pathname)} onClose={close} />
                ))}
              </div>

              <div className="mt-5 border-t border-brut-line pt-4">
                <BrutThemeToggle className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BrutBottomNav;
