import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const { userId, articleId } = await req.json();

  try {
    // 獲取用戶的現有最愛文章列表
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoriteArticles: true },
    });

    let updatedFavoriteArticles = user?.favoriteArticles || [];
    // 如果文章 id 在最愛文章列表中，則從列表中移除
    if (updatedFavoriteArticles.includes(articleId)) {
      updatedFavoriteArticles = updatedFavoriteArticles.filter(
        (id) => id !== articleId
      );
    }

    // 更新用戶的最愛文章列表
    await prisma.user.update({
      where: { id: userId },
      data: { favoriteArticles: updatedFavoriteArticles },
    });

    return NextResponse.json({ message: "Article removed from favorites" });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to remove article from favorites" },
      { status: 500 }
    );
  }
}
