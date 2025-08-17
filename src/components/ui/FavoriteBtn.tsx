'use client'

import * as React from 'react'
import { FaBookmark } from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'
import { toggleFavoriteAction } from '@/app/actions/favorite'
import { useToast } from '@/hooks/use-toast'
import { useState, useTransition } from 'react'

/**
 * 收藏按鈕組件
 * @param userId 使用者 ID
 * @param articleId 文章 ID
 * @param isCollected 是否已收藏
 */
export default function FavoriteBtn({
  userId,
  articleId,
  isCollected,
}: {
  userId: string
  articleId: string
  isCollected: boolean
}) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [optimisticCollected, setOptimisticCollected] = useState(isCollected)

  /**
   * 處理收藏切換
   */
  const handleToggleFavorite = () => {
    // 樂觀更新 UI
    setOptimisticCollected(prev => !prev)

    startTransition(async () => {
      try {
        const result = await toggleFavoriteAction(userId, articleId)

        // 顯示成功提示
        toast({
          title: result.message,
          description: result.action === 'added' ? '文章已成功加入您的收藏列表' : '文章已從您的收藏列表中移除',
          duration: 2000,
        })

        // 更新實際狀態
        setOptimisticCollected(result.action === 'added')
      } catch (error) {
        // 發生錯誤時恢復原狀態
        setOptimisticCollected(isCollected)
        console.error('切換收藏狀態時發生錯誤:', error)

        toast({
          title: '操作失敗',
          description: '無法更新收藏狀態，請稍後再試',
          duration: 2000,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isPending}
      className={`${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {optimisticCollected ? (
        <FaBookmark className="text-xl text-black" />
      ) : (
        <FaRegBookmark className="text-xl text-black" />
      )}
    </button>
  )
}
