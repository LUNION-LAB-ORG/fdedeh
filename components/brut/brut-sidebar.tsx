"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import LogoFd from "@/components/logo-fd";
import { RUBRIQUES, MEDIA, NavItem, estItemActif } from "./nav-data";
import { BrutThemeToggle } from "./brut-theme-toggle";

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-2.5 py-2 rounded-[9px] text-[15px] font-semibold -tracking-[0.01em] transition-colors",
        "[&_svg]:w-[19px] [&_svg]:h-[19px] [&_svg]:shrink-0 [&_svg]:stroke-current [&_svg]:fill-none [&_svg]:[stroke-width:1.7]",
        active
          ? "bg-brut-raise text-brut-ink shadow-[inset_3px_0_0_var(--brut-signal)]"
          : "text-brut-ink-soft hover:bg-brut-raise hover:text-brut-ink"
      )}
    >
      {item.icon}
      {item.name}
    </Link>
  );
}

export function BrutSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[244px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-brut-line bg-brut-surface px-[18px] pb-5 pt-[26px]">
      <Link href="/" className="px-1" aria-label="fd.info — accueil">
        <LogoFd width={92} />
      </Link>

      <nav className="flex flex-col gap-px" aria-label="Rubriques">
        <div className="px-2.5 pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brut-muted">Rubriques</div>
        {RUBRIQUES.map((item) => (
          <NavLink key={item.name} item={item} active={estItemActif(item, pathname)} />
        ))}
      </nav>

      <div className="mx-1.5 h-px bg-brut-line" />

      <nav className="flex flex-col gap-px" aria-label="Le média">
        <div className="px-2.5 pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brut-muted">Le média</div>
        {MEDIA.map((item) => (
          <NavLink key={item.name + item.href} item={item} active={estItemActif(item, pathname)} />
        ))}
      </nav>

      <BrutThemeToggle className="mt-auto w-full" />
    </aside>
  );
}

export default BrutSidebar;
