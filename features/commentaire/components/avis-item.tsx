import React from 'react'
import { ICommentaire } from '../commentaire.type'
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function AvisItem({avis}: {avis: ICommentaire}) {
  return (
    <div key={avis.id} className="bg-white p-4 rounded-lg border">
      <div className="font-medium">
        {avis.fullname || 'Utilisateur anonyme'}
      </div>
      <div className="text-sm text-gray-500">
        {formatDistanceToNow(avis.created_at, {
          addSuffix: false,
          locale: fr
        })}
      </div>
      <div className="mt-2">
        {avis.comments}
      </div>
    </div>
  )
}

export default AvisItem