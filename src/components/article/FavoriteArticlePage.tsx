"use client";

import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

interface Article {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  className: string;
  introduction: string;
  classLocation: string;
  classType: string;
  fee: number;
  teachingMethod: string;
  technology: string;
  totalDays: number;
  weeklyHours: number;
  content: string;
  imageUrl?: string;
}

const FavoriteArticlePage = ({
  favoriteArticles,
}: {
  favoriteArticles: string[] | undefined;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await fetch("/api/articles/all");
        const data: Article[] = await response.json();
        const filteredArticles = data.filter((article) =>
          favoriteArticles?.includes(article.id)
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles", error);
      }
    };

    fetchAllArticles();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {articles &&
          articles?.map((article) => {
            return (
              <ArticleCard
                key={article.id}
                articleData={article}
                isFavorite={favoriteArticles?.includes(article.id)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FavoriteArticlePage;
