// Identité anonyme du visiteur, conservée dans SON navigateur (aucun compte, aucun
// login). But : ne plus lui redemander son nom/email à chaque commentaire, et lui
// donner un jeton d'appareil stable pour dédoublonner ses likes et reconnaître ses
// propres contributions.

const CLE_IDENTITE = "fdedeh:commentateur"; // { fullName, email }
const CLE_JETON = "fdedeh:visitor-token"; // UUID d'appareil

export type IdentiteVisiteur = { fullName: string; email: string };

export function lireIdentiteVisiteur(): IdentiteVisiteur | null {
  if (typeof window === "undefined") return null;
  try {
    const brut = window.localStorage.getItem(CLE_IDENTITE);
    if (!brut) return null;
    const v = JSON.parse(brut);
    return v?.fullName && v?.email ? { fullName: v.fullName, email: v.email } : null;
  } catch {
    return null;
  }
}

export function memoriserIdentiteVisiteur(identite: IdentiteVisiteur) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLE_IDENTITE, JSON.stringify(identite));
  } catch {
    // stockage indisponible (mode privé, quota) : on ignore, le visiteur ressaisira.
  }
}

// Jeton d'appareil anonyme : créé à la première demande, stable ensuite.
// Servira aux likes PPEF (1 like par appareil) et à reconnaître ses commentaires.
export function jetonVisiteur(): string {
  if (typeof window === "undefined") return "";
  try {
    let jeton = window.localStorage.getItem(CLE_JETON);
    if (!jeton) {
      jeton =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(CLE_JETON, jeton);
    }
    return jeton;
  } catch {
    return "";
  }
}
