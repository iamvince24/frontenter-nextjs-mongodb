'use client'

import { EmptyState } from '@/components/feedback/EmptyState'
import { Article } from '../hooks/useArticles'

interface ArticleContentPageProps {
  article: Article | null
}

export default function ArticleContentPage({ article }: ArticleContentPageProps) {
  if (!article) {
    return <EmptyState message="文章不存在" />
  }

  return <div>{article.title}</div>
}
