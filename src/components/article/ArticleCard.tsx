'use client'

import * as React from 'react'
import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import { Button } from '../ui/button'
import { Article } from '@/features/article/hooks/useFavoriteArticles'
import { useFavorite } from '@/features/article/hooks/useFavorite'
import { LoadingSpinner } from '../loading/LoadingSpinner'
import Link from 'next/link'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import DeleteArticleButton from './DeleteArticleButton'
import { useDeleteArticle } from '@/features/article/hooks/useDeleteArticle'

const FavoriteBtn = dynamic(() => import('../ui/FavoriteBtn'), { ssr: false })

const ArticleCardStyle = ({ children, isEditorAble }: { children: React.ReactNode; isEditorAble?: boolean }) => {
  return (
    <div
      className={`w-[330px] ${isEditorAble ? 'h-[400px]' : 'h-[350px]'} text-[var(--text-size-h3)] flex flex-col items-center justify-between`}
    >
      {children}
    </div>
  )
}

const ArticleLink = ({
  article,
  children,
  className,
}: {
  article: Article
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Link href={`/article/${article.id}`} prefetch={true} className={className} aria-label={article.title}>
      {children}
    </Link>
  )
}

export default function ArticleCard({
  articleData,
  userId,
  isEditorAble,
  onSuccess,
  index,
}: {
  articleData: Article
  userId?: string
  isEditorAble?: boolean
  onSuccess?: () => Promise<void>
  index?: number
}) {
  const { id: articleId, updatedAt, imageUrl, className: articleClassName, title, isCollected, author } = articleData

  const { toggleFavorite, isLoading } = useFavorite({
    userId: userId || '',
    articleId,
    isCollected,
    onSuccess,
  })

  const { deleteArticle, isDeleting } = useDeleteArticle({
    // onSuccess: async () => {
    //   if (onSuccess) {
    //     await onSuccess()
    //   }
    // },
  })

  if (isLoading) {
    return (
      <ArticleCardStyle>
        <LoadingSpinner />
      </ArticleCardStyle>
    )
  }

  const generateBlurDataURL = (src: string) => {
    return src.replace('/upload/', '/upload/w_10,h_6,q_30,c_fill,e_blur:1000/')
  }

  return (
    <ArticleCardStyle isEditorAble={isEditorAble}>
      <div className="flex flex-col justify-between items-center text-center flex-grow cursor-pointer hover:opacity-70">
        <div className="w-full flex flex-col gap-4">
          <div className="w-[350px] h-[200px] overflow-hidden">
            {imageUrl && (
              <ArticleLink article={articleData}>
                <Image
                  className="w-full h-full transition-transform duration-1000 ease-in-out hover:scale-110"
                  width={350}
                  height={200}
                  src={imageUrl}
                  alt={`${title} 的文章封面圖片`}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 350px"
                  blurDataURL={generateBlurDataURL(imageUrl)}
                  priority={index !== undefined && index < 3}
                />
              </ArticleLink>
            )}
          </div>
          <div className="w-full flex justify-between items-start text-left">
            <ArticleLink article={articleData} className="mr-3">
              <h2 className="inline tracking-[0.5px] text-left text-[20px] font-bold">{title}</h2>
            </ArticleLink>
            <div className="mt-1">
              {userId && <FavoriteBtn isCollected={isCollected ?? false} toggleFavorite={toggleFavorite} />}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 self-start w-full">
          <div className="w-full flex flex-col  self-start">
            {author?.username && (
              <div className="inline tracking-[0.5px] text-left text-[16px] text-gray-500">
                作者：{author?.username}
              </div>
            )}

            <div className="inline tracking-[0.5px] text-left text-[16px] text-gray-500">
              更新日期：{dayjs(updatedAt).format('YYYY-MM-DD')}
            </div>

            {/* <div className="w-full flex flex-row items-center group">
            <ArticleLink article={articleData} aria-label={`閱讀更多關於 ${articleData.title} 的內容`}>
              <div className="mr-[5px]">read more</div>
            </ArticleLink>
            <IoIosArrowForward className="transition-transform duration-600 ease-linear group-hover:translate-x-[15px]" />
          </div> */}
          </div>

          {isEditorAble && (
            <div className="flex flex-row gap-4 justify-center">
              <Button variant="default" size="sm" asChild className="w-fit" onClick={e => e.stopPropagation()}>
                <Link href={`/profile/article/edit/${articleId}`}>編輯</Link>
              </Button>

              <DeleteArticleButton articleId={articleId} onDeleteConfirm={() => deleteArticle(articleId)} />
            </div>
          )}
        </div>
      </div>
    </ArticleCardStyle>
  )
}
