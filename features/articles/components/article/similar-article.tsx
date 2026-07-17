"use client";
import React from "react";
import { useArticleStore } from "@/features/articles/stores/article.store";
import { BrutArticleRow } from "@/components/brut/brut-article-row";

function SimilarArticle() {
  const { getFilteredArticles, allArticles } = useArticleStore();

  if (allArticles.length === 0) return null;

  const articles = getFilteredArticles({ limit: 4 });
  if (articles.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {articles.map((article) => (
        <BrutArticleRow article={article} key={`similar-${article.id}`} />
      ))}
    </div>
  );
}

export default SimilarArticle;
