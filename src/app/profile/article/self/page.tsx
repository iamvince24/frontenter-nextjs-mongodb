import * as React from "react";
import { CurrentUser, getCurrentUser } from "@/actions/getCurrentUser";
import SelfArticlePage from "@/features/article/pages/SelfArticlePage";

const ArticleSelf: React.FC = async () => {
  const currentUser = await getCurrentUser();
  const authorId = currentUser?.id;
  // const favoriteArticles = currentUser?.collections

  return (
    <div>
      <SelfArticlePage
        currentUser={currentUser as CurrentUser}
        // authorId={authorId}
        // favoriteArticles={favoriteArticles}
      />
    </div>
  );
};

export default ArticleSelf;
