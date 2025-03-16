'use client'

import * as React from 'react'
import Image from 'next/image'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import FavoriteBtn from '../ui/FavoriteBtn'
import { Button } from '../ui/button'
import { Article } from '@/features/article/hooks/useFavoriteArticles'
import { useFavorite } from '@/features/article/hooks/useFavorite'
import { LoadingSpinner } from '../loading/LoadingSpinner'
import Link from 'next/link'

const ArticleCardStyle = ({ children, articleId }: { children: React.ReactNode; articleId?: string }) => {
  return (
    <Link href={`/article/${articleId}`}>
      <div className="w-[330px] h-[430px] m-2.5 p-3 text-[var(--text-size-h3)] border border-[var(--primary-color)] rounded-md flex flex-col items-center justify-between">
        {children}
      </div>
    </Link>
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
  const { id: articleId, authorId, classLocation, imageUrl, className, title, isCollected } = articleData

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
    <ArticleCardStyle articleId={articleId}>
      <div className="w-full flex flex-row justify-between items-center my-[30px] mt-0 mb-[20px]">
        <div></div>
        <div className="flex flex-row">
          <FaLocationDot color="lightgreen" className="w-6 h-6 mx-5" />
          <div>{classLocation}</div>
        </div>
        <div>{userId && <FavoriteBtn isCollected={isCollected ?? false} toggleFavorite={toggleFavorite} />}</div>
      </div>
      <div className="flex flex-col justify-between items-center text-center flex-grow cursor-pointer hover:opacity-70">
        <div className="w-[250px] h-[150px] overflow-hidden ">
          {imageUrl && (
            <Image
              className="w-full h-full rounded-md transition-transform duration-1000 ease-in-out hover:scale-110 object-cover"
              width={1000}
              height={1000}
              src={imageUrl}
              alt={className || articleData.title}
            />
          )}
        </div>
        <p className="inline m-0 whitespace-nowrap tracking-[1.5px]">{title}</p>
        <div className="w-full flex justify-center items-center my-[5px] mb-[50px] px-[20px] py-0">
          <div className="mr-[5px] transition-transform duration-[600ms] ease-linear hover:-translate-x-[15px]">
            read more
          </div>
          <IoIosArrowForward />
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
