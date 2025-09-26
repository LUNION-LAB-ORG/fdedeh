'use client';

import {Link} from '@/i18n/navigation';
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 bg-background">
            <Image
              src="/images/illustrations/page-not-found.svg"
              alt="illustrations 404"
              width={300}
              height={300}
              className="mb-8"
            />
            <h1 className="text-4xl font-bold mt-6 mb-2">Page non trouvée</h1>
            <p className="text-lg mb-6">Désolé, la page que vous recherchez n&#39;existe pas.</p>
            <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                Retour à l&#39;accueil
            </Link>
        </div>
    );
}