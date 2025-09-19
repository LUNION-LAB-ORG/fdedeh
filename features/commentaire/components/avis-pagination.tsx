import { LaravelPaginatedResponse } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'
import { ICommentaire } from '../commentaire.type';

type Props = {
  avisPaginated: LaravelPaginatedResponse<ICommentaire>;
  changePage?: (page: number) => void;
};

export default function AvisPagination({ avisPaginated, changePage }: Props) {
  if (!avisPaginated?.data.length || !avisPaginated.meta) {
    return null;
  }

  const totalPages = avisPaginated.meta.last_page;
  if (totalPages <= 1) {
    return null; // Pas de pagination si une seule page
  }

  const handlePageChange = (link: string) => {
    const url = new URL(link);
    const page = url.searchParams.get('page');
    if (page) {
      changePage?.(parseInt(page));
    }
  }


  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Affichage de <span className="font-medium">{avisPaginated.meta.from}</span> à <span className="font-medium">{avisPaginated.meta.to}</span> sur <span className="font-medium">{avisPaginated.meta.total}</span> avis
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => {
                if (avisPaginated.links.prev) {
                  handlePageChange(avisPaginated.links.prev);
                }
              }}
              disabled={!avisPaginated.links.prev}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium ${!avisPaginated.links.prev
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-50'
                }`}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="px-4 py-2 text-sm text-gray-700">
              Page {avisPaginated.meta.current_page} sur {avisPaginated.meta.last_page}
            </span>

            <button
              onClick={() => {
                if (avisPaginated.links.next) {
                  handlePageChange(avisPaginated.links.next);
                }
              }}
              disabled={!avisPaginated.links.next}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium ${!avisPaginated.links.next
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-50'
                }`}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
