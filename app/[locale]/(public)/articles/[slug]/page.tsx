import { cache } from "react";
import { Metadata } from "next";
import { obtenirUnArticleAction } from "@/features/articles/actions/article.action";
import ArticleDetails from "@/features/articles/components/article/article-details";
import { prefetchArticleQuery } from "@/features/articles/queries/article-detail.query";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { absUrl, excerpt } from "@/lib/seo/content";
import { JsonLd, newsArticleLd } from "@/components/seo/json-ld";

type Props = {
	params: Promise<{ slug: string }>;
};

// Dédupliqué par requête : generateMetadata et la page partagent un seul appel API.
const getArticle = cache(async (slug: string) =>
	obtenirUnArticleAction(slug)
		.then((res) => res.data)
		.catch(() => null)
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const article = await getArticle(slug);
	if (!article) return {};

	const url = absUrl(`/articles/${article.slug}`);
	const description = excerpt(article.content) || "Actualités et analyses par Fernand Dédeh.";
	const image = article.path_resource ? addDomainToBackendImagePath(article.path_resource) : undefined;

	return {
		title: article.title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title: article.title,
			description,
			type: "article",
			url,
			images: image ? [image] : undefined,
			publishedTime: article.created_at,
			modifiedTime: article.updated_at,
			section: article.category?.name,
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description,
			images: image ? [image] : undefined,
		},
	};
}

async function ArticleDetailPage({ params }: Props) {
	const { slug } = await params;
	await prefetchArticleQuery(slug);
	const article = await getArticle(slug);

	return (
		<>
			{article && (
				<JsonLd
					data={newsArticleLd({
						headline: article.title,
						description: excerpt(article.content),
						url: absUrl(`/articles/${article.slug}`),
						image: article.path_resource ? addDomainToBackendImagePath(article.path_resource) : undefined,
						datePublished: article.created_at,
						dateModified: article.updated_at,
						section: article.category?.name,
					})}
				/>
			)}
			<ArticleDetails slug={slug} />
		</>
	);
}

export default ArticleDetailPage;
