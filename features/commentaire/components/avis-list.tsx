import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import useCommentaireListQuery from '../queries/commentaire-list.query';
import {
  ChevronLeft, ChevronRight
} from 'lucide-react'

type Props = {
  entityType: string;
  entityId: string;
};

export default function AvisList({ entityType, entityId }: Props) {

  const avisPaginated = useCommentaireListQuery({ entityId, entityType }).data || null;

  const avis = avisPaginated ? avisPaginated.data : [];

  console.log("avis", avisPaginated);

  return (
    <div className="space-y-2">
      {avis.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg border">
          <div className="font-medium">
            {"Anonyme"}
          </div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(item.created_at), {
              addSuffix: true,
              locale: fr
            })}
          </div>
          <div className="mt-2">
            {item.comments}
          </div>
        </div>
      ))}

      {avisPaginated && avisPaginated.meta && (
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
                      const url = new URL(avisPaginated.links.prev);
                      const page = url.searchParams.get('page');
                      if (page) {
                        // Handle page navigation here
                      }
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
                      const url = new URL(avisPaginated.links.next);
                      const page = url.searchParams.get('page');
                      if (page) {
                        // Handle page navigation here
                      }
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
      )}
    </div >
  );
};