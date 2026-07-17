"use client";

import React, { useState } from "react";
import { Send, Check } from "lucide-react";

export function BrutNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // Pas d'endpoint côté API pour l'instant : confirmation côté client uniquement.
  // À brancher sur un vrai service (collecte des adresses) plus tard.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="pt-16">
      <div className="rounded-2xl bg-brut-raise p-8 text-center lg:p-12">
        <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-brut-signal">Newsletter</p>
        <h2 className="font-display text-[clamp(23px,3.2vw,34px)] font-black -tracking-[0.03em]">
          Restez informé chaque jour
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-brut-muted">
          Recevez le Daily et les actualités qui comptent, directement dans votre boîte mail.
        </p>

        {done ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-full bg-brut-surface px-5 py-3 text-[15px] font-semibold text-brut-ink">
            <Check className="h-5 w-5 text-brut-signal" /> Merci ! Votre inscription est enregistrée.
          </div>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              aria-label="Votre adresse e-mail"
              className="min-w-0 flex-1 rounded-full border border-brut-line bg-brut-surface px-5 py-3 text-[15px] text-brut-ink outline-none focus:border-brut-signal"
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-brut-ink px-5 py-3 text-[15px] font-bold text-brut-ground"
            >
              <Send className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">S&apos;inscrire</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default BrutNewsletter;
