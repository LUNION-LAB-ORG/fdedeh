import React from 'react';
import Image from "next/image";
import ArticleCard, { IMedia, MediaCardProps } from "@/components/media/article-card";
import { Badge } from "@/components/ui/badge";
import { IDaily } from "@/features/dailies/types";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

type DailyCardProps = {
	daily: IDaily;
} & MediaCardProps;

function DailyCard({ daily, ...props }: DailyCardProps) {
	// Un daily s'adresse par sa date de publication, pas par un slug.
	const date = new Date(daily.published_at).toISOString().split('T')[0];

	const media: IMedia = {
		title: daily.introduction,
		url: `/dailies/${date}`,
		createdAt: daily.published_at,
	};

	const image = daily.contents?.[0]?.path_image;
	const rubriques = Array.from(
		new Set(daily.contents?.map((content) => content.hashtag?.hashtag).filter(Boolean))
	).slice(0, 3);

	return (
		<ArticleCard {...props} media={media}>
			<Image
				src={addDomainToBackendImagePath(image)}
				alt=""
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-300"
			/>
			{rubriques.length > 0 && (
				<div className="absolute top-2 left-2 flex flex-wrap gap-1">
					{rubriques.map((rubrique) => (
						<Badge key={rubrique} className="bg-white/90 text-gray-800 hover:bg-white">
							{rubrique}
						</Badge>
					))}
				</div>
			)}
		</ArticleCard>
	);
}

export default DailyCard;
