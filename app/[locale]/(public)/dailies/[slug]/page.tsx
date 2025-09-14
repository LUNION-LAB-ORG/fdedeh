import React from 'react';
import DailyDetails from "@/features/dailies/components/daily-details";
import { prefetchDailyQuery } from '@/features/dailies/query/daily-details.query';
import { dehydrate } from '@tanstack/react-query';
import { IDaily } from '@/features/dailies/types';
import { addDomainToBackendImagePath } from '@/utils/image-utils';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { prefetch, queryClient } = prefetchDailyQuery(slug);
  await prefetch;

  const daily = (dehydrate(queryClient).queries[0].state.data as any) as IDaily;


  return {
    title: daily?.introduction,
    description: 'Retrouve barthelemy sur Fdedeh.info',
    openGraph: {
      title: `${daily?.introduction} - Fdedeh`,
      description: 'Retrouve barthelemy sur Fdedeh.info',
      type: 'article',
      url: `https://fdedeh.com/dailies/${slug}`, // Utilise le slug (date)
      image: addDomainToBackendImagePath(daily?.contents?.[0]?.path_image),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${daily?.introduction} - Fdedeh`,
      description: 'Retrouve barthelemy sur Fdedeh.info',
      image: addDomainToBackendImagePath(daily?.contents?.[0]?.path_image),
    },
  };
}

async function DailyDetailsPage({ params }: Props) {
  const { slug } = await params;
  const { prefetch } = prefetchDailyQuery(slug);
  await prefetch;

  return (
    <div className="page-container">
      <DailyDetails dailyDate={slug} />
    </div>
  );
}

export default DailyDetailsPage;