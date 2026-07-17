"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import LogoFd from "@/components/logo-fd";

// Barre de marque en haut sur mobile. La navigation est assurée par la bottom nav.
export function BrutMobileHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-brut-line bg-brut-surface/95 backdrop-blur lg:hidden">
      <div className="flex h-14 items-center justify-center px-4">
        <Link href="/" aria-label="fd.info — accueil">
          <LogoFd width={78} />
        </Link>
      </div>
    </header>
  );
}

export default BrutMobileHeader;
