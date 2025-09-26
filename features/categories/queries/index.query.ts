import { useQueryClient } from '@tanstack/react-query';

// 1- Clé de cache pour les catégories
export const categoriesKeyQuery = (...params: any[]) => {
	if (params.length === 0) {
		return ['categories'];
	}
	return ['categories', ...params];
};

// 2. Hook personnalisé pour l'invalidation des catégories
export const useInvalidateCategoriesQuery = () => {
	const queryClient = useQueryClient();

	return async (...params: any[]) => {
		await queryClient.invalidateQueries({
			queryKey: categoriesKeyQuery(...params),
			exact: false
		});

		await queryClient.refetchQueries({
			queryKey: categoriesKeyQuery(),
			type: 'active'
		});
	};
};