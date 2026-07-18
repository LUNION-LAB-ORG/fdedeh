import React from "react";

// Squelette du fil PPEF (affiché pendant le chargement de la liste).
function FeedCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-brut-line bg-brut-surface">
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="h-11 w-11 shrink-0 rounded-full bg-brut-raise" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-40 rounded bg-brut-raise" />
          <div className="h-2.5 w-56 max-w-full rounded bg-brut-raise" />
        </div>
      </div>
      <div className="space-y-2.5 px-4 pb-4 pt-4">
        <div className="h-5 w-11/12 rounded bg-brut-raise" />
        <div className="h-5 w-3/4 rounded bg-brut-raise" />
        <div className="mt-3 h-3.5 w-full rounded bg-brut-raise" />
        <div className="h-3.5 w-5/6 rounded bg-brut-raise" />
      </div>
      <div className="grid grid-cols-3 border-t border-brut-line">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-center py-3">
            <div className="h-4 w-16 rounded bg-brut-raise" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <div className="animate-pulse border-b border-brut-line px-6 py-10 lg:px-11">
        <div className="h-3 w-52 max-w-full rounded bg-brut-raise" />
        <div className="mt-4 h-10 w-40 rounded bg-brut-raise" />
        <div className="mt-4 h-3.5 w-80 max-w-full rounded bg-brut-raise" />
      </div>
      <div className="px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-[600px] flex-col gap-5">
          {[0, 1, 2].map((i) => (
            <FeedCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
