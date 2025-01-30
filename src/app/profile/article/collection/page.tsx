import * as React from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";
import ArticleCard from "@/components/article/ArticleCard";
import { getCurrentUser } from "@/actions/getCurrentUser";
import FavoriteArticlePage from "@/components/article/FavoriteArticlePage";

const ArticleCollection: React.FC = async () => {
  const currentUser = await getCurrentUser();
  const authorId = currentUser?.id;
  const favoriteArticles = currentUser?.favoriteArticles;

  return (
    <div>
      文章搜集
      <FavoriteArticlePage
        // authorId={authorId}
        favoriteArticles={favoriteArticles}
      />
    </div>
  );
};

export default ArticleCollection;
