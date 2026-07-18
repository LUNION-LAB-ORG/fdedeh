import React from "react";

// Squelette du détail d'une publication PPEF (grand titre + informations).
export default function Loading() {
  return (
    <article className="px-6 py-10 lg:px-11 lg:py-12">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="h-3.5 w-32 rounded bg-brut-raise" />
        <div className="mt-6 h-3 w-64 max-w-full rounded bg-brut-raise" />
        <div className="mt-4 space-y-3">
          <div className="h-9 w-full rounded bg-brut-raise" />
          <div className="h-9 w-4/5 rounded bg-brut-raise" />
        </div>
        <div className="mt-5 h-3.5 w-72 max-w-full rounded bg-brut-raise" />

        <div className="mt-10 space-y-12">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-3 w-8 rounded bg-brut-raise" />
              <div className="h-4 w-full rounded bg-brut-raise" />
              <div className="h-4 w-11/12 rounded bg-brut-raise" />
              <div className="h-4 w-3/4 rounded bg-brut-raise" />
              <div className="mt-2 h-7 w-40 rounded-full bg-brut-raise" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
