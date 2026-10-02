import { cache } from "react";
import { Metadata } from "next";
import { obtenirUnArticleAction } from "@/features/articles/actions/article.action";
import ArticleDetails from "@/features/articles/components/article/article-details";
import { prefetchArticleQuery } from "@/features/articles/queries/article-detail.query";
import { couvertureArticle, typeMimeVideo, videoArticle } from "@/utils/article-media";
import { absUrl, excerpt } from "@/lib/seo/content";
import { JsonLd, newsArticleLd, videoObjectLd } from "@/components/seo/json-ld";

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
	// Image de l'article, ou miniature YouTube pour un article vidéo sans image. À défaut
	// (vidéo uploadée sans affiche), l'image du site : cet objet `openGraph` remplace
	// celui du layout, le partage n'aurait sinon aucune vignette.
	const image = couvertureArticle(article) ?? "/og-homepage-info.png";
	const video = videoArticle(article);

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
			// Seul un fichier se déclare ici : un lien YouTube n'est pas un flux vidéo direct.
			videos: video?.kind === "file" ? [{ url: video.src, type: typeMimeVideo(video.src) }] : undefined,
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
	const image = article ? couvertureArticle(article) : null;
	const video = article ? videoArticle(article) : null;

	return (
		<>
			{article && (
				<JsonLd
					data={newsArticleLd({
						headline: article.title,
						description: excerpt(article.content),
						url: absUrl(`/articles/${article.slug}`),
						image: image ?? undefined,
						datePublished: article.created_at,
						dateModified: article.updated_at,
						section: article.category?.name,
					})}
				/>
			)}
			{/* Google refuse un VideoObject sans miniature : on ne le déclare qu'avec une image. */}
			{article && video && image && (
				<JsonLd
					data={videoObjectLd({
						name: article.title,
						description: excerpt(article.content),
						thumbnailUrl: image,
						uploadDate: article.created_at,
						contentUrl: video.kind === "file" ? video.src : undefined,
						embedUrl: video.kind === "youtube" ? video.embed : undefined,
					})}
				/>
			)}
			<ArticleDetails slug={slug} />
		</>
	);
}

export default ArticleDetailPage;
