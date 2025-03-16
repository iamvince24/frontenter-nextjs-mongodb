import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getCurrentUser } from '@/actions/getCurrentUser'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '8')
    const skip = (page - 1) * limit

    const currentUser = await getCurrentUser()
    const currentUserId = currentUser?.id

    const totalCount = await prisma.article.count({
      where: {
        isPublic: true,
      },
    })

    const articles = await prisma.article.findMany({
      where: {
        isPublic: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalPages = Math.ceil(totalCount / limit)

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

      return NextResponse.json({
        articles: articlesWithCollectionStatus,
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
      })
    }

    const articlesWithoutCollectionStatus = articles.map(article => ({
      ...article,
      isCollected: false,
    }))

    return NextResponse.json({
      articles: articlesWithoutCollectionStatus,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    })
  } catch (error) {
    console.error('Error fetching public articles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
