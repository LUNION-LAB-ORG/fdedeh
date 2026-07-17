"use client";

import { useEffect } from "react";

// Enregistre le service worker en production uniquement (évite les soucis de
// cache en développement). Rend l'application installable (PWA).
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}

export default ServiceWorkerRegister;
