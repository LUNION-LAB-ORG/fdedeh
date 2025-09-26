import { useQueryClient } from '@tanstack/react-query';

// 1- Clé de cache pour les stats
export const statsKeyQuery = (...params: any[]) => {
	if (params.length === 0) {
		return ['stats'];
	}
	return ['stats', ...params];
};

// 2. Hook personnalisé pour l'invalidation des stats
export const useInvalidateStatsQuery = () => {
	const queryClient = useQueryClient();

	return async (...params: any[]) => {
		await queryClient.invalidateQueries({
			queryKey: statsKeyQuery(...params),
			exact: false
		});

		await queryClient.refetchQueries({
			queryKey: statsKeyQuery(),
			type: 'active'
		});
	};
};
