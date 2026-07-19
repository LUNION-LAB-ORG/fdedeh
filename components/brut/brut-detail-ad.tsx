"use client";

import React from "react";
import { AdSlot } from "@/components/ad-slot";
import { cn } from "@/lib/utils";

/**
 * Publicité inline des pages de détail (juste après la description). Reprend la
 * zone « header ». Le contexte (type de page + slug) est déduit automatiquement
 * de l'URL par AdSlot, ce qui permet le ciblage par page.
 */
export function BrutDetailAd({ className }: { className?: string }) {
  return <AdSlot zone="header" className={cn("my-8 max-w-3xl", className)} />;
}

export default BrutDetailAd;
