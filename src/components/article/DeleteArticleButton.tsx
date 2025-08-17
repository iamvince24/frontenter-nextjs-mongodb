'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteArticleAction } from '@/app/actions/article'
import { useToast } from '@/hooks/use-toast'
import { useState, useTransition } from 'react'

/**
 * 刪除文章按鈕組件
 * @param articleId 文章 ID
 */
const DeleteArticleButton = ({ articleId }: { articleId: string }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  /**
   * 處理刪除文章
   */
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteArticleAction(articleId)

        toast({
          title: '刪除成功',
          description: '文章已成功刪除',
          duration: 2000,
        })

        setOpen(false)
      } catch (error) {
        console.error('刪除文章時發生錯誤:', error)

        toast({
          title: '刪除失敗',
          description: '無法刪除文章，請稍後再試',
          duration: 2000,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending}>
          <Trash2 className="mr-2 h-4 w-4" />
          {isPending ? '刪除中...' : '刪除'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>確認刪除</DialogTitle>
          <DialogDescription>您確定要刪除這篇文章嗎？此操作無法復原。</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            取消
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? '刪除中...' : '確認刪除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteArticleButton
