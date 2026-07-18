"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

// Un embed connu (Spotify, SoundCloud…) → iframe. Sinon, lecteur audio HTML5
// pour un fichier uploadé ou une URL directe (MP3).
function estEmbed(url: string) {
  return /spotify\.com|soundcloud\.com|deezer\.com|anchor\.fm|podcasters\.spotify/i.test(url);
}

export function BrutAudioPlayer({ src, className }: { src?: string | null; className?: string }) {
  if (!src) return null;

  const url = src.startsWith("http") ? src : addDomainToBackendImagePath(src);

  if (estEmbed(src)) {
    return (
      <iframe
        src={url}
        title="Lecteur audio"
        className={cn("w-full rounded-2xl border border-brut-line", className)}
        style={{ height: 160 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    );
  }

  return (
    <audio controls preload="metadata" src={url} className={cn("w-full", className)}>
      Votre navigateur ne prend pas en charge la lecture audio.
    </audio>
  );
}

export default BrutAudioPlayer;
