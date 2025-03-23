import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET endpoint to fetch a user's collections
export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const collections = await prisma.collection.findMany({
      where: { userId, article: { deletedAt: null } },
      include: {
        article: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    // Map the collections to return articles with isCollected flag
    const articles = collections.map(collection => ({
      ...collection.article,
      isCollected: true,
    }))

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 })
  }
}

// POST endpoint to add an article to a user's collection
export async function POST(req: Request) {
  const { userId, articleId } = await req.json()

  if (!userId || !articleId) {
    return NextResponse.json({ error: 'User ID and Article ID are required' }, { status: 400 })
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
      update: {},
      create: {
        userId,
        articleId,
      },
    })

    return NextResponse.json({
      message: 'Article added to collection',
      collection,
    })
  } catch (error) {
    console.error('Error adding to collection:', error)
    return NextResponse.json({ error: 'Unable to add article to collection' }, { status: 500 })
  }
}

// DELETE endpoint to remove an article from a user's collection
export async function DELETE(req: Request) {
  const { userId, articleId } = await req.json()

  try {
    await prisma.collection.delete({
      where: {
        userId_articleId: {
          userId: userId,
          articleId: articleId,
        },
      },
    })

    return NextResponse.json({ message: 'Article removed from favorites' })
  } catch (error) {
    console.error('Error removing article from favorites:', error)
    return NextResponse.json({ error: 'Unable to remove article from favorites' }, { status: 500 })
  }
}
