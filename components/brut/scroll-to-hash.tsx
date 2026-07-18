"use client";

import { useEffect } from "react";

// Fait défiler vers l'ancre demandée après le montage — utile quand la cible
// (ex. le fil de commentaires) est rendue côté client et n'existe pas encore
// au moment où le navigateur tente le saut d'ancre natif.
export function ScrollToHash({ id }: { id: string }) {
  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== `#${id}`) return;
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(t);
  }, [id]);

  return null;
}

export default ScrollToHash;
