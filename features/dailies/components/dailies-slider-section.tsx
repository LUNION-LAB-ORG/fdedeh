"use client";

import React from 'react';
import SectionTitle from "@/components/section-title";
import Slider from "@/features/dailies/components/slider";
import {Link} from "@/i18n/navigation";
import {ChevronRight} from "lucide-react";
import {useDailyStore} from "@/features/dailies/store/dailiesStore";
import {getDailyImages} from "@/features/dailies/utils/images";
import {cn} from "@/lib/utils";
import {parseAsIsoDate, useQueryState} from "nuqs";
import LoadingIndicator from "@/components/loading-indicator";
import DailyContent from "@/features/dailies/components/daily-content";
import DailyIntroduction from "@/features/dailies/components/daily-introduction";

function DailiesSliderSection() {
    const { isLoading, isFetching, getDailyByDate, getLastDaily } = useDailyStore();
    const today = new Date();

    // Get last daily to use as default
    const lastDaily = getLastDaily();
    const defaultDate = lastDaily?.published_at
        ? new Date(lastDaily.published_at)
        : new Date();

    const [selectedDate, setSelectedDate] = useQueryState(
        'date',
        parseAsIsoDate.withDefault(defaultDate)
    );

    if (isLoading || isFetching) {
        return <LoadingIndicator/>;
    }

    // Filtrage par date si une date est sélectionnée
    const daily = getDailyByDate(selectedDate);

    let images: string[] = [];
    if (daily) {
        images = getDailyImages(daily);
    }

    const dailyDate = daily ? new Date(daily.published_at).toISOString().split('T')[0] : null;

    return (
        <div className="mb-5">
            <SectionTitle text="A Barthelemy Zouzoua Inabo" className="mb-4"/>
            {images.length > 0 && <Slider
                images={images}
            />}
            <div className="relative min-h-64 mt-8">
                <div
                    className={cn("absolute  bg-white rounded-xl w-full max-w-screen-lg left-1/2 transform -translate-x-1/2 py-5 lg:py-8 px-5 lg:px-10 shadow-sm h-72 overflow-hidden", images.length > 0 && "-top-12 md:-top-20")}
                >
                    <div className="flex items-center justify-between mb-5">
                        <input
                            type="date"
                            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                const newDate = e.target.value ? new Date(e.target.value) : null;
                                setSelectedDate(newDate);
                            }}
                            max={today.toISOString().split('T')[0]}
                            className="rounded-full border py-2 px-4 text-sm md:w-56"
                        />
                        {daily && <Link href={`/dailies/${dailyDate}`}
                               className="text-[#FF7710] flex items-center gap-2 hover:underline text-sm md:text-base">
                            <span>Lire la suite</span> <ChevronRight className="size-4"/>
                        </Link>}
                    </div>
                    {daily ? <article className="text-justify text-sm pt-4 space-y-4">
                        <DailyIntroduction introduction={daily.introduction} />
                        {
                            daily.contents.map((content, index) => {
                                return <DailyContent content={content} index={index} key={`daily_${index}`}/>;
                            })
                        }
                    </article> : <p className="text-center text-gray-500">Aucun daily disponible pour cette date.</p>}
                    <div className="absolute h-16 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"/>
                </div>
            </div>
        </div>
    );
}

export default DailiesSliderSection;