import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET endpoint to fetch a user's collections
export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Get user's collections with article details
    const collections = await prisma.collection.findMany({
      where: { userId },
      include: {
        article: true,
      },
    });

    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

// POST endpoint to add an article to a user's collection
export async function POST(req: Request) {
  const { userId, articleId } = await req.json();

  if (!userId || !articleId) {
    return NextResponse.json(
      { error: "User ID and Article ID are required" },
      { status: 400 }
    );
  }

  try {
    // Create a new collection entry (or ignore if it already exists)
    const collection = await prisma.collection.upsert({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
      update: {}, // No updates needed if it exists
      create: {
        userId,
        articleId,
      },
    });

    return NextResponse.json({
      message: "Article added to collection",
      collection,
    });
  } catch (error) {
    console.error("Error adding to collection:", error);
    return NextResponse.json(
      { error: "Unable to add article to collection" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove an article from a user's collection
export async function DELETE(req: Request) {
  const { userId, articleId } = await req.json();

  if (!userId || !articleId) {
    return NextResponse.json(
      { error: "User ID and Article ID are required" },
      { status: 400 }
    );
  }

  try {
    // Delete the collection entry
    await prisma.collection.delete({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    return NextResponse.json({
      message: "Article removed from collection",
    });
  } catch (error) {
    console.error("Error removing from collection:", error);
    return NextResponse.json(
      { error: "Unable to remove article from collection" },
      { status: 500 }
    );
  }
}
