import { useQuery } from '@tanstack/react-query';
import { obtenirUnDailyAction } from '../dailies.action';
import { dailiesKeyQuery } from './index.query';
import { IDaily } from '../types';

// Le store ne contient que la première page de dailies (les 10 plus récents), alors que le
// sélecteur de date autorise n'importe quelle date passée. Sans cette requête, toute date
// antérieure affiche « Aucun daily disponible » alors que l'API, elle, l'a bien.
//
// Clé distincte de `("detail", id)` : ici une date sans daily est un cas normal (l'API répond
// 404) et vaut `null`, là où la page de détail traite ce même 404 comme une erreur.
export const useDailyParDateQuery = (dateISO: string) => {
	return useQuery<IDaily | null>({
		queryKey: dailiesKeyQuery("par-date", dateISO),
		queryFn: async () => {
			const resultat = await obtenirUnDailyAction(dateISO);
			return resultat.success ? resultat.data ?? null : null;
		},
		enabled: !!dateISO,
		staleTime: 5 * 60 * 1000,
		retry: false,
	});
};
