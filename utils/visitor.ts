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

// ─── État « liké » par appareil ────────────────────────────────────────────
// Les likes étant dédoublonnés par appareil côté serveur, l'état « j'ai liké »
// est une vérité locale : on le garde dans le navigateur. Clé = "TYPE:id".
const CLE_LIKES = "fdedeh:likes";

function lireLikes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const arr = JSON.parse(window.localStorage.getItem(CLE_LIKES) || "[]");
    return new Set(Array.isArray(arr) ? (arr as string[]) : []);
  } catch {
    return new Set();
  }
}

export function aLikeLocal(cle: string): boolean {
  return lireLikes().has(cle);
}

export function marquerLikeLocal(cle: string, like: boolean) {
  if (typeof window === "undefined") return;
  try {
    const set = lireLikes();
    if (like) set.add(cle);
    else set.delete(cle);
    window.localStorage.setItem(CLE_LIKES, JSON.stringify([...set]));
  } catch {
    // stockage indisponible : on ignore.
  }
}
