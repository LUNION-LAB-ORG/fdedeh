import { obtenirUnArticleAction } from "@/features/articles/actions/article.action";
import ArticleDetails from "@/features/articles/components/article/article-details";
import { prefetchArticleQuery } from "@/features/articles/queries/article-detail.query";
import { addDomainToBackendImagePath } from '@/utils/image-utils';

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	await prefetchArticleQuery(slug);

	const article = await obtenirUnArticleAction(slug)
		.then(res => res.data)
		.catch(() => null);

	return article ? {
		title: article?.title,
		description: 'Lire cet article sur Fdedeh',
		openGraph: {
			title: `${article?.title} - Fdedeh`,
			description: 'Lire cet article sur Fdedeh',
			type: 'article',
			url: `https://fdedeh.com/articles/${article?.slug}`,
			images: addDomainToBackendImagePath(article?.path_resource),
		},
		twitter: {
			card: 'summary_large_image',
			title: `${article?.title} - Fdedeh`,
			description: 'Lire cet article sur Fdedeh',
			images: addDomainToBackendImagePath(article?.path_resource),
		},
	} : {};
}

async function ArticleDetailPage({ params }: Props) {

	const { slug } = await params;
	await prefetchArticleQuery(slug);

	return (
		<ArticleDetails slug={slug} />
	);
}

export default ArticleDetailPage;