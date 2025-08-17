'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

/**
 * 切換文章收藏狀態的 Server Action
 * @param userId 使用者 ID
 * @param articleId 文章 ID
 * @returns 操作結果
 */
export async function toggleFavoriteAction(userId: string, articleId: string) {
  if (!userId || !articleId) {
    throw new Error('使用者 ID 和文章 ID 為必填項目')
  }

  try {
    // 檢查文章是否已經在收藏列表中
    const existingCollection = await prisma.collection.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    })

    if (existingCollection) {
      // 從收藏中移除
      await prisma.collection.delete({
        where: {
          userId_articleId: {
            userId,
            articleId,
          },
        },
      })

      // 重新驗證文章頁面以反映變更
      revalidatePath('/articles')

      return { success: true, action: 'removed', message: '已移除收藏' }
    } else {
      // 加入收藏
      await prisma.collection.create({
        data: {
          userId,
          articleId,
        },
      })

      // 重新驗證文章頁面以反映變更
      revalidatePath('/articles')

      return { success: true, action: 'added', message: '已加入收藏' }
    }
  } catch (error) {
    console.error('切換收藏狀態時發生錯誤:', error)
    throw new Error('無法更新收藏狀態')
  }
}
