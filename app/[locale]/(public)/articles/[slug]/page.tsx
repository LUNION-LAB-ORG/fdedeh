import ArticleDetails from "@/features/articles/components/article/article-details";
import { prefetchArticleQuery } from "@/features/articles/queries/article-detail.query";
import { IArticle } from '@/features/articles/types/article.type';
import { addDomainToBackendImagePath } from '@/utils/image-utils';
import { dehydrate } from "@tanstack/react-query";

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const { prefetch, queryClient } = prefetchArticleQuery(slug);
	await prefetch;

	const article = (dehydrate(queryClient).queries[0].state.data as any).data as IArticle;
	

	return {
		title: article?.title,
		description: 'Lire cet article sur Fdedeh',
		openGraph: {
			title: `${article?.title} - Fdedeh`,
			description: 'Lire cet article sur Fdedeh',
			type: 'article',
			url: `https://fdedeh.com/articles/${article?.id}`,
			image: addDomainToBackendImagePath(article?.path_resource),
		},
		twitter: {
			card: 'summary_large_image',
			title: `${article?.title} - Fdedeh`,
			description: 'Lire cet article sur Fdedeh',
			image: addDomainToBackendImagePath(article?.path_resource),
		},
	};
}

async function ArticleDetailPage({ params }: Props) {

	const { slug } = await params;
	const { prefetch } = prefetchArticleQuery(slug);
	await prefetch;

	return (
		<ArticleDetails slug={slug} />
	);
}

export default ArticleDetailPage;