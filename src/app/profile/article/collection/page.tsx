import * as React from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";
import ArticleCard from "@/components/article/ArticleCard";
import { CurrentUser, getCurrentUser } from "@/actions/getCurrentUser";
import FavoriteArticlePage from "@/features/article/pages/FavoriteArticlePage";

const ArticleCollection: React.FC = async () => {
  const currentUser = await getCurrentUser();
  const authorId = currentUser?.id;
  const favoriteArticles = [""];
  // const favoriteArticles = currentUser?.collections || [];

  return (
    <div>
      文章搜集
      <FavoriteArticlePage
        currentUser={currentUser as CurrentUser}
        // authorId={authorId}
        // favoriteArticles={favoriteArticles}
      />
    </div>
  );
};

export default ArticleCollection;
