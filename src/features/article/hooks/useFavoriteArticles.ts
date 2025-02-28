import { useQuery } from "@tanstack/react-query";

interface Article {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  imageUrl?: string;
  className?: string;
  introduction?: string;
  classLocation?: string;
  classType?: string;
  fee?: number;
  teachingMethod?: string;
  technology?: string;
  totalDays?: number;
  weeklyHours?: number;
  authorId?: string;
}

interface Collection {
  id: string;
  createdAt: string;
  userId: string;
  articleId: string;
  article: Article;
}

interface CollectionsResponse {
  collections: Collection[];
}

const fetchUserCollections = async (userId: string): Promise<Collection[]> => {
  if (!userId) return [];

  const response = await fetch(`/api/articles/favorite?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch collections");
  }
  const data: CollectionsResponse = await response.json();
  return data.collections;
};

export const useFavoriteArticles = (userId: string) => {
  return useQuery({
    queryKey: ["collections", userId],
    queryFn: () => fetchUserCollections(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export type { Article, Collection };
