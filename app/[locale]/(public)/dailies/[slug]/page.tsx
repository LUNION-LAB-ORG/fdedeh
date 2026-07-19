import { cache } from "react";
import { Metadata } from "next";
import DailyDetails from "@/features/dailies/components/daily-details";
import { obtenirUnDailyAction } from "@/features/dailies/dailies.action";
import { prefetchDailyQuery } from "@/features/dailies/query/daily-details.query";
import { IDaily } from "@/features/dailies/types";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { absUrl, excerpt } from "@/lib/seo/content";
import { JsonLd, newsArticleLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

const getDaily = cache(async (slug: string) =>
  obtenirUnDailyAction(slug)
    .then((res) => res.data as IDaily | null)
    .catch(() => null)
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const daily = await getDaily(slug);
  if (!daily) return {};

  const url = absUrl(`/dailies/${slug}`);
  const title = daily.introduction ? excerpt(daily.introduction, 70) : "A Barthelemy Inabo";
  const description = excerpt(daily.introduction) || "A Barthelemy Inabo — la chronique quotidienne de Fernand Dédeh.";
  const image = daily.contents?.[0]?.path_image ? addDomainToBackendImagePath(daily.contents[0].path_image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: image ? [image] : undefined,
      publishedTime: (daily as { published_at?: string }).published_at,
      section: "A Barthelemy Inabo",
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

async function DailyDetailsPage({ params }: Props) {
  const { slug } = await params;
  await prefetchDailyQuery(slug);
  const daily = await getDaily(slug);

  return (
    <div className="page-container">
      {daily && (
        <JsonLd
          data={newsArticleLd({
            headline: daily.introduction ? excerpt(daily.introduction, 100) : "A Barthelemy Inabo",
            description: excerpt(daily.introduction),
            url: absUrl(`/dailies/${slug}`),
            image: daily.contents?.[0]?.path_image ? addDomainToBackendImagePath(daily.contents[0].path_image) : undefined,
            datePublished: (daily as { published_at?: string }).published_at || new Date().toISOString(),
            section: "A Barthelemy Inabo",
          })}
        />
      )}
      <DailyDetails dailyDate={slug} />
    </div>
  );
}

export default DailyDetailsPage;
