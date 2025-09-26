"use client";
import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import { useDailyStore } from "@/features/dailies/store/dailiesStore";
import SectionTitle from "@/components/section-title";
import { IDailyContent } from "@/features/dailies/types";
import LoadingIndicator from "@/components/loading-indicator";
import DailyCarouselWithPagination from "@/features/dailies/components/carousel/daily-carousel-with-pagination";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SocialShare from "@/features/articles/components/social-share";
import { sendGAEvent } from '@next/third-parties/google'
import AvisForm from "@/features/commentaire/components/avis-form";
import { useRouter } from "next/navigation";
import DailyContent from "@/features/dailies/components/daily-content";
import DailyIntroduction from "@/features/dailies/components/daily-introduction";
import AvisList from '@/features/commentaire/components/avis-list';
import { useStats } from "@/hooks/use-stats";

function DailyDetails({ dailyDate }: { dailyDate: string }) {
  const { isLoading, isFetching, getDailyByDate } = useDailyStore();
  const router = useRouter();

  const daily = getDailyByDate(dailyDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useStats({
    type: "DAILY",
    id: daily?.id,
  })

  useEffect(() => {
    const date = new Date(dailyDate);
    if (!isNaN(date.getTime())) {
      setSelectedDate(new Date().toISOString())
    }
    setSelectedDate(new Date(date).toISOString().split('T')[0]);
  }, [daily, dailyDate]);

  const handleDateChange = async (date: string) => {
    const shortDate = date.split('T')[0];
    router.push(`/dailies/${shortDate}`);
  }

  if (isLoading || isFetching) {
    return <LoadingIndicator />;
  }

  return (
    <article>
      <SectionTitle text="A Barthelemy Zouzoua Inabo" className="my-6" />
      {daily && <DailyCarouselWithPagination
        daily={daily}
      />}
      <div className="grid md:grid-cols-6 gap-10 mt-12">
        <div className="md:col-span-2 flex flex-col items-start space-y-4">
          <input
            type="date"
            className="mb-4 p-2 border border-gray-300 rounded-full w-full min-w-64"
            placeholder="selectionner une date"
            value={selectedDate || ''}
            onChange={(e) => handleDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        {daily ? <div className="prose flex-1 space-y-8 md:col-span-4">
          <DailyIntroduction introduction={daily.introduction} />
          {daily.contents.map((content: IDailyContent, index: number) => {
            return (
              <DailyContent key={content.id} content={content} index={index} />
            );
          })}
          <SocialShare />
          <div className="mt-5 ">
            <AvisForm
              data={daily}
              type="daily"
            />
          </div>
          <div className="mt-10">
            <AvisList
              entityId={daily.id.toLocaleString()}
              entityType="DAILY"
            />
          </div>
        </div> : <p>Aucun article trouvé pour cette date.</p>}
      </div>
    </article>
  );
}

export default DailyDetails;