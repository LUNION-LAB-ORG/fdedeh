import React from 'react';
import Image from "next/image";
import ArticleCard, { IMedia, MediaCardProps } from "@/components/media/article-card";
import CategoryBadge from "@/components/category-badge";
import { IArticle } from "@/features/articles/types/article.type";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

type NewsCardProps = {
	news: IArticle;
} & MediaCardProps

function NewsCard({ news, ...props }: NewsCardProps) {
	const media: IMedia = {
		title: news.title,
		url: `/articles/${news.slug}`,
		createdAt: news.created_at,
	}

	return (
		<ArticleCard {...props} media={media}>
			<Image
				src={addDomainToBackendImagePath(news.path_resource)}
				alt={news.title}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-300"
			/>
			<CategoryBadge
				category={news.category}
				className="absolute top-2 left-2"
			/>
		</ArticleCard>
	);
}

export default NewsCard;