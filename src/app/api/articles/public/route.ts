import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentUser } from '@/actions/getCurrentUser'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const searchTitle = searchParams.get('search')
    const skip = (page - 1) * limit

    const currentUser = await getCurrentUser()
    const currentUserId = currentUser?.id

    const whereCondition: Prisma.ArticleWhereInput = {
      isPublic: true,
      ...(searchTitle !== null && searchTitle.trim() !== ''
        ? {
            OR: [
              {
                title: {
                  contains: searchTitle,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
              {
                content: {
                  contains: searchTitle,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            ],
          }
        : undefined),
    }

    const totalCount = await prisma.article.count({
      where: whereCondition,
    })

    const articles = await prisma.article.findMany({
      where: whereCondition,
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
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
