'use client'

import { EmptyState } from '@/components/feedback/EmptyState'
import { Article } from '../hooks/useArticles'
import Image from 'next/image'
import { ArticleContent } from '../components/ArticleContent'
import dayjs from 'dayjs'
interface ArticleContentPageProps {
  article: Article | null
}

export default function ArticleContentPage({ article }: ArticleContentPageProps) {
  if (!article) {
    return <EmptyState message="文章不存在" />
  }

  const { title, imageUrl, author, content, updatedAt } = article

  return (
    <div className="flex flex-col gap-4 items-center px-10 md:px-40 lg:px-60 mb-10">
      <div className="flex flex-col gap-4 items-start mt-16">
        <h1 className="text-[28px] sm:text-[40px] font-bold mb-1 sm:mb-0">{title}</h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
          <div className="text-[16px] mt-[-10px]">作者：{author?.username}</div>
          <div className="text-[16px] mt-[-10px]">更新日期：{dayjs(updatedAt).format('YYYY-MM-DD')}</div>
        </div>

        {imageUrl && (
          <div className="w-full md:w-[700px] lg:w-[900px] xl:w-[1080px] aspect-[16/9] relative overflow-hidden">
            <Image src={imageUrl} alt={title} width={1200} height={675} />
          </div>
        )}
      </div>
      <div className="w-full md:w-[700px] lg:w-[900px] xl:w-[1080px] flex gap-4 text-justify justify-start mt-0 md:mt-8">
        <ArticleContent content={content} />
      </div>
    </div>
  )
}
