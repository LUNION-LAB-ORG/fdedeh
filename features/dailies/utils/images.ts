import {addDomainToBackendImagePath} from "@/utils/image-utils";
import {IDaily} from "@/features/dailies/types";

export function getDailyImages(daily: IDaily) {
	return daily.contents?.map(content => addDomainToBackendImagePath(content.path_image)) || [];
}

// Chemin brut de la couverture (miniature) d'une diffusion : image principale,
// sinon 1ʳᵉ image de section — repli pour les diffusions créées avant l'image
// principale. À passer à addDomainToBackendImagePath au moment du rendu.
export function getDailyCoverPath(daily: IDaily): string | null | undefined {
	return (
		daily.path_image ||
		daily.contents?.[0]?.images?.[0]?.path_image ||
		daily.contents?.[0]?.path_image
	);
}