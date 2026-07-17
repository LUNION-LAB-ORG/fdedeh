"use client";

import { useStats } from "@/hooks/use-stats";

// Enregistre une vue (et une lecture au scroll) pour un contenu. À poser dans
// une page serveur (podcast, PPEF…) qui ne peut pas appeler le hook directement.
// N'affiche rien.
export function StatsTracker({ type, id }: { type: string; id?: string | number }) {
  useStats({ type, id });
  return null;
}

export default StatsTracker;
