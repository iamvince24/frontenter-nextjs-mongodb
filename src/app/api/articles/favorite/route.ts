import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   const { userId, articleId } = await req.json();

//   try {
//     const userArticleLike = await prisma.userArticleLike.create({
//       data: {
//         userId: userId,
//         articleId: articleId,
//       },
//     });

//     return NextResponse.json(userArticleLike);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Unable to like article" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: Request) {
  const { userId, articleId } = await req.json();

  try {
    // 獲取用戶的現有最愛文章列表
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoriteArticles: true },
    });

    let updatedFavoriteArticles = user?.favoriteArticles || [];
    // 如果文章 id 不在最愛文章列表中，則添加到列表中
    if (!updatedFavoriteArticles.includes(articleId)) {
      updatedFavoriteArticles.push(articleId);
    }

    // 更新用戶的最愛文章列表
    await prisma.user.update({
      where: { id: userId },
      data: { favoriteArticles: updatedFavoriteArticles },
    });

    return NextResponse.json({ message: "Article added to favorites" });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to add article to favorites" },
      { status: 500 }
    );
  }
}
