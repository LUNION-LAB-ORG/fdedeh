import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brut-ground px-6 text-center text-brut-ink">
      <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-brut-signal">Erreur 404</p>
      <div className="mt-3 font-display text-[clamp(96px,22vw,220px)] font-black leading-none -tracking-[0.06em] text-brut-signal">
        404
      </div>
      <h1 className="mt-2 font-display text-[clamp(26px,5vw,42px)] font-black -tracking-[0.03em]">Page introuvable</h1>
      <p className="mt-5 max-w-md text-[16px] text-brut-muted">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brut-ink px-6 py-3 text-[15px] font-bold text-brut-ground"
      >
        Retour à l&apos;accueil →
      </Link>
    </div>
  );
}
