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

function DailyDetails({ dailyDate }: { dailyDate: string }) {
	const { isLoading, isFetching, getDailyByDate } = useDailyStore();
	const router = useRouter();

	const daily = getDailyByDate(dailyDate);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	useEffect(() => {
		sendGAEvent('page_view', 'daily', { daily_id: daily?.id });
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
			<div className="flex flex-wrap gap-10 mt-12">
				<div>
					<input
						type="date"
						className="mb-4 p-2 border border-gray-300 rounded-full w-full min-w-64"
						placeholder="selectionner une date"
						value={selectedDate || ''}
						onChange={(e) => handleDateChange(e.target.value)}
						max={new Date().toISOString().split('T')[0]}
					/>
				</div>
				{daily ? <div className="prose flex-1 space-y-8">
					<DailyIntroduction introduction={daily.introduction} />
					{daily.contents.map((content: IDailyContent, index: number) => {
						return (
							<DailyContent key={content.id} content={content} index={index} />
						);
					})}
					<SocialShare />
					<AvisForm
						data={daily}
						type="daily"
					/>
				</div> : <p>Aucun article trouvé pour cette date.</p>}
			</div>
		</article>
	);
}

export default DailyDetails;