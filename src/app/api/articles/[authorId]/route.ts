import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getCurrentUser } from '@/actions/getCurrentUser'

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: { authorId: string } }) {
  const { authorId } = params
  const currentUser = await getCurrentUser()
  const currentUserId = currentUser?.id

  if (!authorId) {
    return NextResponse.json({ error: 'Invalid authorId' }, { status: 400 })
  }

  try {
    const articles = await prisma.article.findMany({
      where: { authorId: authorId, deletedAt: null },
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
    })

    if (!articles || articles.length === 0) {
      return NextResponse.json({ error: 'No articles found for this author' }, { status: 404 })
    }

    if (currentUserId) {
      const userCollections = await prisma.collection.findMany({
        where: { userId: currentUserId },
        select: { articleId: true },
      })

      const collectedArticleIds = new Set(userCollections.map(collection => collection.articleId))

      const articlesWithCollectionStatus = articles.map(article => ({
        ...article,
        isCollected: collectedArticleIds.has(article.id),
      }))

      return NextResponse.json(articlesWithCollectionStatus)
    }

    const articlesWithoutCollectionStatus = articles.map(article => ({
      ...article,
      isCollected: false,
    }))

    return NextResponse.json(articlesWithoutCollectionStatus)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
