"use client";

import React from "react";

// Bloc descriptif en bas des pages de rubrique (façon maquette Brut) :
// titre à gauche, texte de contexte à droite, lien « Remonter ». Utile au SEO.
export function BrutSeoBlock({ title, description }: { title: string; description: string }) {
  return (
    <section className="mt-16 border-t border-brut-line pt-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
        <h2 className="font-display text-[clamp(22px,2.8vw,32px)] font-black -tracking-[0.03em]">{title}</h2>
        <div>
          <p className="text-[15px] leading-relaxed text-brut-muted">{description}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-5 font-mono text-[12px] uppercase tracking-[0.1em] text-brut-signal transition-opacity hover:opacity-70"
          >
            Remonter ↑
          </button>
        </div>
      </div>
    </section>
  );
}

export default BrutSeoBlock;
