import { youtubeEmbed, youtubeId, youtubeThumbnail } from "@/utils/youtube";

// Média principal d'un article : une image (`path_resource`) OU une vidéo
// (`path_video`). Fonctions pures, utilisables côté serveur comme côté client.

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081").replace(/\/+$/, "");

// Seuls ces hôtes sont reconnus comme YouTube : `utils/youtube.ts` se contente d'un
// `includes`, trop large pour décider de ce qu'on intègre dans une page.
const HOTES_YOUTUBE = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be"];
const ID_YOUTUBE = /^[A-Za-z0-9_-]{11}$/;

export type ArticleMedia = {
  path_resource?: string | null;
  path_video?: string | null;
};

export type VideoArticle =
  | { kind: "youtube"; embed: string; thumbnail: string }
  | { kind: "file"; src: string };

function memeHoteQueLeBackend(url: string): boolean {
  try {
    return new URL(url).hostname === new URL(BACKEND_URL).hostname;
  } catch {
    return false;
  }
}

function estAbsolue(valeur: string): boolean {
  return /^https?:\/\//i.test(valeur);
}

function videoYoutube(valeur: string): VideoArticle | null {
  // Le back-office enregistre un lien complet ; on tolère l'oubli du protocole.
  const url = estAbsolue(valeur) ? valeur : `https://${valeur}`;
  try {
    if (!HOTES_YOUTUBE.includes(new URL(url).hostname.toLowerCase())) return null;
  } catch {
    return null;
  }

  const id = youtubeId(url);
  if (!id || !ID_YOUTUBE.test(id)) return null;

  const embed = youtubeEmbed(url);
  const thumbnail = youtubeThumbnail(url);
  return embed && thumbnail ? { kind: "youtube", embed, thumbnail } : null;
}

function videoFichier(valeur: string): VideoArticle | null {
  if (estAbsolue(valeur)) {
    return memeHoteQueLeBackend(valeur) ? { kind: "file", src: valeur } : null;
  }

  // Un fichier uploadé vit sous `storage/` : tout autre chemin est refusé. `..` est
  // testé comme segment : un nom de fichier peut contenir des points consécutifs.
  const chemin = valeur.replace(/^\/+/, "");
  if (!chemin.startsWith("storage/") || chemin.split("/").includes("..")) return null;

  return { kind: "file", src: `${BACKEND_URL}/${chemin}` };
}

// Vidéo d'un article : lien YouTube ou fichier servi par le backend. `null` si
// l'article n'a pas de vidéo, ou si `path_video` pointe ailleurs.
export function videoArticle(article: ArticleMedia | null | undefined): VideoArticle | null {
  const valeur = article?.path_video?.trim();
  if (!valeur) return null;

  return videoYoutube(valeur) ?? videoFichier(valeur);
}

// Image de couverture d'un article, sûre pour `next/image` : l'image du backend si
// elle existe, sinon la miniature YouTube. `null` quand il n'y a rien à montrer
// (vidéo uploadée sans affiche, par exemple) — à l'appelant de choisir son repli.
export function couvertureArticle(article: ArticleMedia | null | undefined): string | null {
  const image = article?.path_resource?.trim();

  if (image) {
    if (!estAbsolue(image)) return `${BACKEND_URL}/${image.replace(/^\/+/, "")}`;
    // next/image fait tomber la page sur un hôte hors `remotePatterns` : on écarte.
    if (memeHoteQueLeBackend(image)) return image;
  }

  const video = videoArticle(article);
  return video?.kind === "youtube" ? video.thumbnail : null;
}

const TYPES_MIME: Record<string, string> = {
  mp4: "video/mp4",
  m4v: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

// Type MIME d'un fichier vidéo d'après son extension (balises OpenGraph).
export function typeMimeVideo(src: string): string | undefined {
  const extension = src.split(/[?#]/)[0].split(".").pop()?.toLowerCase();
  return extension ? TYPES_MIME[extension] : undefined;
}
