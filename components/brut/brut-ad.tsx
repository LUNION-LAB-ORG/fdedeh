"use client";

import React from "react";
import { AdSlot } from "@/components/ad-slot";
import { cn } from "@/lib/utils";

/** Pub façon Brut pour un emplacement donné. Délègue à AdSlot (serveur de diffusion). */
export function BrutAd({ position, className }: { position: string; className?: string }) {
  return <AdSlot zone={position.toLowerCase()} className={cn("pt-16", className)} />;
}

export default BrutAd;
