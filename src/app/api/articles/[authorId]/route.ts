import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { authorId: string } }
) {
  const { authorId } = params;

  if (!authorId) {
    return NextResponse.json({ error: "Invalid authorId" }, { status: 400 });
  }

  try {
    const articles = await prisma.article.findMany({
      where: { authorId: authorId },
    });

    if (!articles || articles.length === 0) {
      return NextResponse.json(
        { error: "No articles found for this author" },
        { status: 404 }
      );
    }

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
