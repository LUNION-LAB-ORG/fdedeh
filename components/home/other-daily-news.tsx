"use client";

import React from 'react';
import SectionTitle from "@/components/section-title";
import {Link} from "@/i18n/navigation";
import NewsCard from "@/components/news/news-card";
import SkeletonCard from "@/components/media/skeleton-card";
import {useArticleStore} from "@/features/articles/stores/article.store";

function OtherDailyNews() {
	// const {data, isLoading, isError, error, isFetching} = useArticleListQuery({})
	//
	// const articles = React.useMemo(() => data?.data || [], [data]);

	const {isLoading, isError, error, isFetching, getFilteredArticles} = useArticleStore();

	const showLoading = isLoading || isFetching;

	if (isError) {
		return <div className="text-red-500">Error: {error?.message || 'An error occurred'}</div>;
	}

	return (
		<section>
			<div className="flex items-center mb-8">
				<SectionTitle text="Autres actualités du jour"/>
				<Link
					href={`/a-la-une`}
					className="ml-auto text-[#FF8D28] hover:underline uppercase"
				>
					Voir tout
				</Link>
			</div>
			<div className="grid-article-container lg:grid-cols-3">
				{showLoading ? Array.from({length: 3}).map((_, index) => (
					<SkeletonCard key={index}/>
				)) : getFilteredArticles({limit: 6})
					.map((item) => (
						<NewsCard
							key={item.id}
							news={item}
						/>
					))}
			</div>
		</section>
	);
}

export default OtherDailyNews;