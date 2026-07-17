"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoFd from "@/components/logo-fd";
import { RUBRIQUES, MEDIA, NavItem } from "./nav-data";
import { BrutThemeToggle } from "./brut-theme-toggle";

function Group({ label, items, onNavigate, pathname }: { label: string; items: NavItem[]; onNavigate: () => void; pathname: string }) {
  return (
    <div className="flex flex-col gap-px">
      <div className="px-2.5 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-brut-muted">{label}</div>
      {items.map((item) => (
        <Link
          key={item.name + item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-[9px] px-2.5 py-2.5 text-[15px] font-semibold",
            "[&_svg]:w-[19px] [&_svg]:h-[19px] [&_svg]:shrink-0 [&_svg]:stroke-current [&_svg]:fill-none [&_svg]:[stroke-width:1.7]",
            pathname === item.href ? "bg-brut-raise text-brut-ink" : "text-brut-ink-soft"
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export function BrutMobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 lg:hidden">
      <div className="flex items-center justify-between border-b border-brut-line bg-brut-surface px-4 py-3">
        <Link href="/" aria-label="fd.info — accueil" onClick={() => setOpen(false)}>
          <LogoFd width={78} />
        </Link>
        <div className="flex items-center gap-2">
          <BrutThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="rounded-lg p-2 text-brut-ink transition-colors hover:bg-brut-raise"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-56px)] overflow-y-auto border-b border-brut-line bg-brut-surface px-3 pb-4 shadow-lg">
          <Group label="Rubriques" items={RUBRIQUES} onNavigate={() => setOpen(false)} pathname={pathname} />
          <Group label="Le média" items={MEDIA} onNavigate={() => setOpen(false)} pathname={pathname} />
        </nav>
      )}
    </header>
  );
}

export default BrutMobileHeader;
