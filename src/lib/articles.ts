import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentUser } from '@/actions/getCurrentUser'

const prisma = new PrismaClient()

export interface Article {
  id: string
  title: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  isCollected: boolean
  imageUrl?: string
  author?: {
    id: string
    username: string
  }
}

export interface PaginationInfo {
  total: number
  totalPages: number
  currentPage: number
  limit: number
}

export interface ArticlesResponse {
  articles: Article[]
  pagination: PaginationInfo
  search: string | null
}

/**
 * 獲取所有公開文章的 Server 函數
 * @param page 頁碼，預設為 1
 * @param limit 每頁顯示數量，預設為 9
 * @param search 搜尋關鍵字，預設為 null
 * @returns 文章列表和分頁資訊
 */
export async function getPublicArticles(
  page: number = 1,
  limit: number = 9,
  search: string | null = null,
): Promise<ArticlesResponse> {
  try {
    const skip = (page - 1) * limit
    const currentUser = await getCurrentUser()
    const currentUserId = currentUser?.id

    // 建立搜尋條件
    const whereCondition: Prisma.ArticleWhereInput = {
      isPublic: true,
      deletedAt: null,
      ...(search !== null && search.trim() !== ''
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
              {
                content: {
                  contains: search,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            ],
          }
        : undefined),
    }

    // 獲取總數
    const totalCount = await prisma.article.count({
      where: whereCondition,
    })

    // 獲取文章列表
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

    // 如果使用者已登入，檢查文章的收藏狀態
    if (currentUserId) {
      const userCollections = await prisma.collection.findMany({
        where: { userId: currentUserId },
        select: { articleId: true },
      })

      const collectedArticleIds = new Set(userCollections.map(collection => collection.articleId))

      const articlesWithCollectionStatus = articles.map(article => ({
        ...article,
        isCollected: collectedArticleIds.has(article.id),
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
        imageUrl: article.imageUrl || undefined,
      }))

      return {
        articles: articlesWithCollectionStatus,
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
        search,
      }
    }

    // 如果使用者未登入，所有文章的收藏狀態都為 false
    const articlesWithoutCollectionStatus = articles.map(article => ({
      ...article,
      isCollected: false,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      imageUrl: article.imageUrl || undefined,
    }))

    return {
      articles: articlesWithoutCollectionStatus,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
      search,
    }
  } catch (error) {
    console.error('獲取公開文章時發生錯誤:', error)
    throw new Error('無法獲取文章列表')
  }
}

/**
 * 獲取使用者收藏文章的 Server 函數（支援分頁）
 * @param userId 使用者 ID
 * @param page 頁碼，預設為 1
 * @param limit 每頁顯示數量，預設為 9
 * @returns 收藏的文章列表和分頁資訊
 */
export async function getFavoriteArticles(
  userId: string,
  page: number = 1,
  limit: number = 9,
): Promise<ArticlesResponse> {
  if (!userId) {
    return {
      articles: [],
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: page,
        limit,
      },
      search: null,
    }
  }

  try {
    const skip = (page - 1) * limit

    // 獲取總收藏數量
    const totalCount = await prisma.collection.count({
      where: { userId, article: { deletedAt: null } },
    })

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
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    const totalPages = Math.ceil(totalCount / limit)

    // 將收藏記錄轉換為文章列表，所有文章都標記為已收藏
    const articles = collections.map(collection => ({
      ...collection.article,
      isCollected: true,
      createdAt: collection.article.createdAt.toISOString(),
      updatedAt: collection.article.updatedAt.toISOString(),
      imageUrl: collection.article.imageUrl || undefined,
    }))

    return {
      articles,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
      search: null,
    }
  } catch (error) {
    console.error('獲取收藏文章時發生錯誤:', error)
    throw new Error('無法獲取收藏文章列表')
  }
}

/**
 * 獲取作者的文章列表 Server 函數（支援分頁）
 * @param authorId 作者 ID
 * @param currentUserId 當前使用者 ID（可選，用於檢查收藏狀態）
 * @param page 頁碼，預設為 1
 * @param limit 每頁顯示數量，預設為 9
 * @returns 作者的文章列表和分頁資訊
 */
export async function getAuthorArticles(
  authorId: string,
  currentUserId?: string,
  page: number = 1,
  limit: number = 9,
): Promise<ArticlesResponse> {
  if (!authorId) {
    return {
      articles: [],
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: page,
        limit,
      },
      search: null,
    }
  }

  try {
    const skip = (page - 1) * limit

    // 獲取總文章數量
    const totalCount = await prisma.article.count({
      where: { authorId: authorId, deletedAt: null },
    })

    const articles = await prisma.article.findMany({
      where: { authorId: authorId, deletedAt: null },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    const totalPages = Math.ceil(totalCount / limit)

    if (!articles || articles.length === 0) {
      return {
        articles: [],
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
        search: null,
      }
    }

    // 如果有當前使用者 ID，檢查收藏狀態
    if (currentUserId) {
      const userCollections = await prisma.collection.findMany({
        where: { userId: currentUserId },
        select: { articleId: true },
      })

      const collectedArticleIds = new Set(userCollections.map(collection => collection.articleId))

      const articlesWithCollectionStatus = articles.map(article => ({
        ...article,
        isCollected: collectedArticleIds.has(article.id),
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
        imageUrl: article.imageUrl || undefined,
      }))

      return {
        articles: articlesWithCollectionStatus,
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
        search: null,
      }
    }

    // 如果沒有當前使用者 ID，所有文章的收藏狀態都為 false
    const articlesWithoutCollectionStatus = articles.map(article => ({
      ...article,
      isCollected: false,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      imageUrl: article.imageUrl || undefined,
    }))

    return {
      articles: articlesWithoutCollectionStatus,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
      search: null,
    }
  } catch (error) {
    console.error('獲取作者文章時發生錯誤:', error)
    throw new Error('無法獲取作者文章列表')
  }
}
