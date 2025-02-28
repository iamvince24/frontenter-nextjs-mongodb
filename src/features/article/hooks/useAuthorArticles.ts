import { useQuery } from "@tanstack/react-query";
import { Article } from "./useFavoriteArticles";

export function useAuthorArticles(authorId: string) {
  return useQuery<Article[]>({
    queryKey: ["articles", authorId],
    queryFn: async () => {
      const response = await fetch(`/api/articles/${authorId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch articles");
      }

      return response.json();
    },
    enabled: !!authorId, // 只有當 authorId 存在時才執行查詢
  });
}
