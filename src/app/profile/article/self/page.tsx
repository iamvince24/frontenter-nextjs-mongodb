import * as React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SelfArticlePage from "@/components/article/SelfArticlePage";

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

const ArticleSelf: React.FC = async () => {
  const currentUser = await getCurrentUser();
  const authorId = currentUser?.id;
  const favoriteArticles = currentUser?.favoriteArticles;

  return (
    <div>
      <SelfArticlePage
        authorId={authorId}
        favoriteArticles={favoriteArticles}
      />
    </div>
  );
};

export default ArticleSelf;
