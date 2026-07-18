"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { couverturePodcast } from "@/utils/podcast";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

function estEmbed(url: string) {
  return /spotify\.com|soundcloud\.com|deezer\.com|anchor\.fm|podcasters\.spotify/i.test(url);
}

// Barres de waveform décoratives — motif déterministe (pas de hasard, évite les
// écarts d'hydratation SSR/client).
const BARS = Array.from({ length: 56 }, (_, i) => Math.min(1, 0.32 + Math.abs(Math.sin(i * 1.7)) * 0.55 + (i % 4) * 0.05));

function fmt(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const total = Math.floor(s);
  const m = Math.floor(total / 60);
  const sec = (total % 60).toString().padStart(2, "0");
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}:${(m % 60).toString().padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

export function BrutPodcastPlayer({
  src,
  coverRaw,
  title,
  eyebrow,
  className,
}: {
  src: string;
  coverRaw?: string | null;
  title: string;
  eyebrow?: string;
  className?: string;
}) {
  const url = src.startsWith("http") ? src : addDomainToBackendImagePath(src);

  if (estEmbed(src)) {
    return (
      <iframe
        src={url}
        title={title}
        className={cn("w-full rounded-2xl border border-brut-line", className)}
        style={{ height: 232 }}
        allow="autoplay; encrypted-media; clipboard-write; fullscreen"
        loading="lazy"
      />
    );
  }

  return <PodcastAudioPlayer url={url} coverRaw={coverRaw} title={title} eyebrow={eyebrow} className={className} />;
}

function PodcastAudioPlayer({
  url,
  coverRaw,
  title,
  eyebrow,
  className,
}: {
  url: string;
  coverRaw?: string | null;
  title: string;
  eyebrow?: string;
  className?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const cover = couverturePodcast(coverRaw);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  };
  const skip = (d: number) => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + d));
  };
  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (a && a.duration) a.currentTime = Math.max(0, Math.min(1, ratio)) * a.duration;
  };

  const progress = dur ? cur / dur : 0;

  return (
    <div className={cn("overflow-hidden rounded-2xl bg-brut-ink text-white", className)}>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="relative aspect-square w-full max-w-[124px] shrink-0 self-center overflow-hidden rounded-xl bg-white/10">
          <Image src={cover} alt="" fill className="object-cover" sizes="124px" />
        </div>

        <div className="min-w-0 flex-1">
          {eyebrow && <div className="truncate font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{eyebrow}</div>}
          <div className="mt-0.5 line-clamp-2 font-semibold leading-snug">{title}</div>

          <div className="mt-4 flex items-center gap-3 sm:gap-4">
            <button type="button" onClick={() => skip(-15)} aria-label="Reculer de 15 secondes" className="shrink-0 text-white/60 transition-colors hover:text-white">
              <RotateCcw className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Lecture"}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-brut-ink transition-transform hover:scale-105"
            >
              {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
            </button>
            <button type="button" onClick={() => skip(30)} aria-label="Avancer de 30 secondes" className="shrink-0 text-white/60 transition-colors hover:text-white">
              <RotateCw className="h-[18px] w-[18px]" />
            </button>

            <div
              className="flex h-9 flex-1 cursor-pointer items-center gap-[2px]"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                seek((e.clientX - r.left) / r.width);
              }}
              aria-hidden
            >
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-full"
                  style={{
                    height: `${Math.round(h * 100)}%`,
                    background: i / BARS.length <= progress ? "#fff" : "rgba(255,255,255,0.22)",
                  }}
                />
              ))}
            </div>

            <span className="shrink-0 font-mono text-[12px] tabular-nums text-white/55">-{fmt(dur - cur)}</span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}

export default BrutPodcastPlayer;
