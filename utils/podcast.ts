import { youtubeThumbnail } from "@/utils/youtube";
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
