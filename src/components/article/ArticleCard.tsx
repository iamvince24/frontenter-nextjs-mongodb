'use client'

import * as React from 'react'
import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import FavoriteBtn from '../ui/FavoriteBtn'
import { Button } from '../ui/button'
import { Article } from '@/features/article/hooks/useFavoriteArticles'
import { useFavorite } from '@/features/article/hooks/useFavorite'
import { LoadingSpinner } from '../loading/LoadingSpinner'
import Link from 'next/link'
import dayjs from 'dayjs'

const ArticleCardStyle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[330px] h-[410px] mx-8 my-0 text-[var(--text-size-h3)] flex flex-col items-center justify-between">
      {children}
    </div>
  )
}

export default function ArticleCard({
  articleData,
  userId,
  isEditorAble,
  onSuccess,
}: {
  articleData: Article
  userId?: string
  isEditorAble?: boolean
  onSuccess?: () => Promise<void>
}) {
  const { id: articleId, updatedAt, imageUrl, className, title, isCollected, author } = articleData

  const { toggleFavorite, isLoading } = useFavorite({
    userId: userId || '',
    articleId,
    isCollected,
    onSuccess,
  })

  if (isLoading) {
    return (
      <ArticleCardStyle>
        <LoadingSpinner />
      </ArticleCardStyle>
    )
  }

  return (
    <ArticleCardStyle>
      <div className="flex flex-col justify-between items-center text-center flex-grow cursor-pointer hover:opacity-70">
        <div className="w-full flex flex-col gap-4">
          <div className="w-[350px] h-[200px] overflow-hidden">
            {imageUrl && (
              <Link href={`/article/${articleId}`}>
                <Image
                  className="w-full h-full transition-transform duration-1000 ease-in-out hover:scale-110"
                  width={1000}
                  height={1000}
                  src={imageUrl}
                  alt={className || articleData.title}
                />
              </Link>
            )}
          </div>
          <div className="w-full flex justify-between items-start text-left">
            <Link href={`/article/${articleId}`} className="mr-3">
              <h2 className="inline tracking-[0.5px] text-left text-[20px] font-bold">{title}</h2>
            </Link>
            <div className="mt-1">
              {userId && <FavoriteBtn isCollected={isCollected ?? false} toggleFavorite={toggleFavorite} />}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-start mb-[50px] text-left">
          {author?.username && (
            <div className="inline tracking-[0.5px] text-left text-[16px] text-gray-500">作者：{author?.username}</div>
          )}
          <div className="inline tracking-[0.5px] text-left text-[16px] text-gray-500">
            更新日期：{dayjs(updatedAt).format('YYYY-MM-DD')}
          </div>
          <div className="w-full flex flex-row items-center group">
            <Link href={`/article/${articleId}`}>
              <div className="mr-[5px]">read more</div>
            </Link>
            <IoIosArrowForward className="transition-transform duration-600 ease-linear group-hover:translate-x-[15px]" />
          </div>
        </div>

        {isEditorAble && (
          <Button variant="outline" size="sm" asChild onClick={e => e.stopPropagation()}>
            <Link href={`/profile/article/edit/${articleId}`}>編輯</Link>
          </Button>
        )}
      </div>
    </ArticleCardStyle>
  )
}
