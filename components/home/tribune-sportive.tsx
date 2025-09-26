"use client";
import React from 'react';
import SectionTitle from "@/components/section-title";
import { Link } from "@/i18n/navigation";
// import {newsList} from "@/app/api/news";
import NewsCard from "@/components/news/news-card";
import { useArticleStore } from "@/features/articles/stores/article.store";
import LoadingIndicator from "@/components/loading-indicator";

function TribuneSportive({ className = '' }: { className?: string }) {

    const { getFilteredArticles, isLoading, isFetching } = useArticleStore();

    const showLoading = isLoading || isFetching;

    if (showLoading) {
        return (
            <LoadingIndicator />
        );
    }

    const articles = getFilteredArticles({ category: 'sport', limit: 4 });

    return (
        <section className={className}>
            <div className="flex items-center mb-8">
                <SectionTitle text="Tribune sportive" />
                <Link
                    href={`/sports`}
                    className="ml-auto text-[#FF8D28] hover:underline uppercase"
                >
                    Voir tout
                </Link>
            </div>
            <div className="grid-article-container md:grid-cols-1 lg:grid-cols-2">
                {articles.map((item) => (
                    <NewsCard key={item.id} news={item} />
                ))}
            </div>
        </section>
    );
}

export default TribuneSportive;