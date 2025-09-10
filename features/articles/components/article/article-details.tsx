"use client";

import React from 'react';
import Image from "next/image";
import SectionTitle from "@/components/section-title";
import Publicite from "@/components/publicite";
import {addDomainToBackendImagePath} from "@/utils/image-utils";
import SimilarArticle from "@/features/articles/components/article/similar-article";
import {useArticleStore} from "@/features/articles/stores/article.store";
import SocialShare from "@/features/articles/components/social-share";
import {sendGAEvent} from "@next/third-parties/google";
import AvisForm from "@/features/commentaire/components/avis-form";

function ArticleDetails({slug}: { slug: string }) {

	const {getArticleBySlug} = useArticleStore()
	const article = getArticleBySlug(slug);

	sendGAEvent(
		'page_view',
		'article_view',
		{
			article_id: article?.id,
			article_title: article?.title,
			article_slug: slug,
		}
	)

	return (
		<article className="page-container">
			<figure className="relative mt-6">
				{article ? (
					<>
						<Image
							src={addDomainToBackendImagePath(article?.path_resource)}
							alt={article.title}
							width={1200}
							height={600}
							className="w-full max-h-[500px] object-cover object-center rounded-xl"
						/>
						<div
							className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent px-3 lg:px-6 pb-3 md:pb-5 lg:pb-10 rounded-b-xl"
						>
							<h1 className="text-white text-sm sm:text-lg md:text-xl lg:text-3xl font-bold transition duration-200">
								{article.title}
							</h1>
						</div>
					</>
				) : (
					<div className="w-full h-64 bg-gray-300 animate-pulse rounded-xl"></div>
				)}
			</figure>
			<section className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr,minmax(100px,25%)] grid-rows-2 gap-16">
				{article ? (
					<div className="prose max-w-none row-span-2">
						<div className="text-justify text-sm md:text-base"
						     dangerouslySetInnerHTML={{__html: article.content}}>
						</div>
						<SocialShare/>
						<div className="mt-5 ">
							<AvisForm
								data={article}
							/>
						</div>
						<div className="mt-14">
							<div>
								<SectionTitle
									text="A suivre aussi"
									className="w-2/3"
								/>
								<SimilarArticle/>
							</div>
						</div>
					</div>
				) : (
					<p>Article non trouvé.</p>
				)}
				<Publicite bannerPosition="SIDEBAR_RIGHT"/>
			</section>
		</article>
	);
}

export default ArticleDetails;