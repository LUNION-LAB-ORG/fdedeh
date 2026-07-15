const IMAGE_PAR_DEFAUT = '/images/default-image.png';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081";

function sertLesImages(url: string): boolean {
		// next/image lève sur un hôte absent des `remotePatterns` de next.config.mjs, et
		// l'exception fait tomber toute la page entière via l'error boundary. Seul le backend
		// sert nos images : tout autre hôte est écarté.
		try {
				return new URL(url).hostname === new URL(BACKEND_URL).hostname;
		} catch {
				return false;
		}
}

export function addDomainToBackendImagePath(imagePath: string | null | undefined): string {
		if (!imagePath) {
				return IMAGE_PAR_DEFAUT;
		}

		if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
				// `path_resource` ne contient pas toujours une image : le podcast y stocke son lien
				// YouTube. Un seul enregistrement de ce genre suffit à faire planter une page entière,
				// d'où le repli plutôt que la confiance aveugle.
				return sertLesImages(imagePath) ? imagePath : IMAGE_PAR_DEFAUT;
		}

		// S'Assurer qu'il n'y a pas de double slash
		if (imagePath.startsWith('/')) {
				imagePath = imagePath.substring(1);
		}

		// Concaténation de l'URL de base et du chemin de l'image
		return `${BACKEND_URL}/${imagePath}`;
}
