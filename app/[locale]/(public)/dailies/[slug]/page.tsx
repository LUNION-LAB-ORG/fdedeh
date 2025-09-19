import DailyDetails from "@/features/dailies/components/daily-details";
import { obtenirUnDailyAction } from '@/features/dailies/dailies.action';
import { prefetchDailyQuery } from '@/features/dailies/query/daily-details.query';
import { IDaily } from '@/features/dailies/types';
import { addDomainToBackendImagePath } from '@/utils/image-utils';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await prefetchDailyQuery(slug);

  const daily = await obtenirUnDailyAction(slug)
    .then(res => res.data as IDaily | null)
    .catch(() => null);


  return daily ? {
    title: daily?.introduction,
    description: 'Retrouve barthelemy sur Fdedeh.info',
    openGraph: {
      title: `${daily?.introduction} - Fdedeh`,
      description: 'Retrouve barthelemy sur Fdedeh.info',
      type: 'article',
      url: `https://fdedeh.com/dailies/${slug}`, // Utilise le slug (date)
      images: addDomainToBackendImagePath(daily?.contents?.[0]?.path_image),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${daily?.introduction} - Fdedeh`,
      description: 'Retrouve barthelemy sur Fdedeh.info',
      images: addDomainToBackendImagePath(daily?.contents?.[0]?.path_image),
    },
  } : {};
}

async function DailyDetailsPage({ params }: Props) {
  const { slug } = await params;
  await prefetchDailyQuery(slug);

  return (
    <div className="page-container">
      <DailyDetails dailyDate={slug} />
    </div>
  );
}

export default DailyDetailsPage;