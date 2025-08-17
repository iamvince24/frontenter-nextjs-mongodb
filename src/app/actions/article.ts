'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

/**
 * 刪除文章的 Server Action
 * @param articleId 文章 ID
 * @returns 操作結果
 */
export async function deleteArticleAction(articleId: string) {
  if (!articleId) {
    throw new Error('文章 ID 為必填項目')
  }

  try {
    // 軟刪除文章 - 設置 deletedAt 時間戳
    await prisma.article.update({
      where: { id: articleId },
      data: { deletedAt: new Date() },
    })

    // 重新驗證相關頁面
    revalidatePath('/articles')
    revalidatePath('/profile')

    return { success: true, message: '文章已成功刪除' }
  } catch (error) {
    console.error('刪除文章時發生錯誤:', error)
    throw new Error('無法刪除文章')
  }
}
