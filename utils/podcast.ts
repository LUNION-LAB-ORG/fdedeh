import { youtubeThumbnail, youtubeEmbed } from "@/utils/youtube";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

// Pochette d'un podcast : image uploadée (nouveau modèle) ou miniature YouTube
// (anciens podcasts vidéo), avec repli.
export function couverturePodcast(pathResource?: string | null): string {
  if (!pathResource) return "/images/default-image.png";
  if (pathResource.includes("youtu")) {
    return youtubeThumbnail(pathResource) ?? "/images/default-image.png";
  }
  return addDomainToBackendImagePath(pathResource);
}

// Média jouable d'un podcast. Un podcast fd.info peut être :
//  - AUDIO : `path_audio` (fichier MP3 ou lien Spotify/SoundCloud) → lecteur waveform,
//  - VIDÉO : `path_resource` = lien YouTube (anciens podcasts) → lecture de la vidéo.
// L'audio prime. Sert à décider quel lecteur monter, en tête comme en détail.
export type MediaPodcast =
  | { kind: "audio"; src: string }
  | { kind: "video"; embed: string }
  | { kind: "none" };

export function mediaPodcast(p: { path_audio?: string | null; path_resource?: string | null }): MediaPodcast {
  if (p.path_audio) return { kind: "audio", src: p.path_audio };
  const embed = youtubeEmbed(p.path_resource);
  if (embed) return { kind: "video", embed };
  return { kind: "none" };
}

// Un podcast est-il lisible (audio ou vidéo) ? Pratique pour filtrer/mettre en avant.
export function podcastLisible(p: { path_audio?: string | null; path_resource?: string | null }): boolean {
  return mediaPodcast(p).kind !== "none";
}
