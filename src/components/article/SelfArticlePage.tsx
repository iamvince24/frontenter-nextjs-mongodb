"use client";

import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

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

interface Props {
  authorId: string | undefined;
  favoriteArticles: string[] | undefined;
}

const SelfArticlePage: React.FC<Props> = ({ authorId, favoriteArticles }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEditorAble = pathname.includes("self");

  useEffect(() => {
    if (authorId) {
      fetch(`/api/articles/${authorId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            setArticles(data);
          }
        });
    }
  }, [authorId]);

  if (articles.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.id}
              articleData={article}
              isEditorAble={isEditorAble}
              isFavorite={favoriteArticles?.includes(article.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelfArticlePage;
