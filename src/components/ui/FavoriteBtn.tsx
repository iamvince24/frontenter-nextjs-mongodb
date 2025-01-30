"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";

interface Props {
  id: string;
  authorId: string;
}

export default function FavoriteBtn({
  articleId,
  userId,
  favoriteStatus,
}: {
  articleId: string;
  userId: string;
  favoriteStatus: boolean | undefined;
}) {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    favoriteStatus
  );

  //   useEffect(() => {
  //     // 檢查用戶是否已經將該文章添加到最愛，並設置 `isFavorite` 狀態
  //     const fetchFavoriteStatus = async () => {
  //       try {
  //         const response = await fetch(`/api/users/${userId}/favorite-articles`);
  //         const data = await response.json();
  //         setIsFavorite(data.FavoriteArticles.includes(articleId));
  //       } catch (error) {
  //         console.error("Error fetching favorite articles", error);
  //       }
  //     };

  //     fetchFavoriteStatus();
  //   }, [articleId, userId]);

  const handleFavorite = async () => {
    try {
      const response = await fetch("/api/articles/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, articleId }),
      });

      if (response.ok) {
        setIsFavorite(true);
      } else {
        console.error("Failed to add article to favorites");
      }
    } catch (error) {
      console.error(
        "An error occurred while adding article to favorites",
        error
      );
    }
  };

  const handleUnfavorite = async () => {
    try {
      const response = await fetch("/api/articles/unfavorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, articleId }),
      });

      if (response.ok) {
        setIsFavorite(false);
      } else {
        console.error("Failed to remove article from favorites");
      }
    } catch (error) {
      console.error(
        "An error occurred while removing article from favorites",
        error
      );
    }
  };

  return (
    <button
      //   onClick={() => setIsFavorite(!isFavorite)}
      onClick={isFavorite ? handleUnfavorite : handleFavorite}
    >
      {isFavorite ? (
        <FaBookmark className="text-xl text-black" />
      ) : (
        <FaRegBookmark className="text-xl text-black" />
      )}
    </button>
  );
}
