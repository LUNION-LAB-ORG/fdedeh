import React from 'react';

import { useQuery } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { obtenirUnDailyAction } from '../dailies.action';
import { toast } from 'sonner';
import { dailiesKeyQuery } from './index.query';

const queryClient = getQueryClient();

// 1- Option de requête
export const dailyQueryOption = (id: string) => {
    return {
        queryKey: dailiesKeyQuery("detail", id),
        queryFn: async () => {
            if (!id) throw new Error("L'identifiant du daily est requis");

            const result = await obtenirUnDailyAction(id);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data;
        },
        enabled: !!id,
    };
};

// 2- Hook pour récupérer un daily
export const useDailyDetailsQuery = (id: string) => {
    const query = useQuery(dailyQueryOption(id));

    // Gestion des erreurs dans le hook
    React.useEffect(() => {
        if (query.isError && query.error) {
            toast.error("Erreur lors de la récupération du daily :", {
                description: query.error.message,
            });
        }
    }, [query.isError, query.error]);

    return query;
};

// 3- Fonction pour précharger un daily
export const prefetchDailyQuery = (id: string) => {
    const prefetch = queryClient.prefetchQuery(dailyQueryOption(id));
    return { prefetch, queryClient };
};