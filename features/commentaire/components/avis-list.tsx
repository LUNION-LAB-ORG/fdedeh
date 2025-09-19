"use client";

import { parseAsInteger, useQueryState } from 'nuqs';
import useCommentaireListQuery from '../queries/commentaire-list.query';
import AvisPagination from './avis-pagination';
import AvisItem from './avis-item';
import AvisSkeleton from './avis-skeleton';

type Props = {
  entityType: string;
  entityId: string;
};

export default function AvisList({ entityType, entityId }: Props) {

  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const { data: avisPaginated, isFetching, isLoading, isError, refetch } = useCommentaireListQuery({ entityId, entityType, page: currentPage });

  const showLoader = isLoading || isFetching;

  const avis = avisPaginated ? avisPaginated.data : [];

  if (isError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Une erreur est survenue lors du chargement des avis. <button className="underline" onClick={() => refetch()}>Réessayer</button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {!showLoader && avis.map((item) => (
        <AvisItem key={item.id} avis={item} />
      ))}

      {showLoader && Array.from({ length: 5 }).map((_, index) => (
        <AvisSkeleton key={index} />
      ))}

      <AvisPagination
        avisPaginated={avisPaginated!}
        changePage={(newPage) => {
          setCurrentPage(newPage);
          console.log('Change to page:', newPage);
        }}
      />
    </div >
  );
};