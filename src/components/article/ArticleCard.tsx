import Image from 'next/image'
import { Button } from '../ui/button'
import { Article } from '@/lib/articles'
import Link from 'next/link'
import dayjs from 'dayjs'
import FavoriteBtn from '../ui/FavoriteBtn'
import DeleteArticleButton from './DeleteArticleButton'

const ArticleCardStyle = ({ children, isEditorAble }: { children: React.ReactNode; isEditorAble?: boolean }) => {
  return (
    <div
      className={`w-[280px] sm:w-[330px] ${isEditorAble ? 'h-[350px]' : 'h-[320px]'} text-[var(--text-size-h3)] flex flex-col items-center justify-between`}
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

/**
 * 文章卡片組件
 * @param articleData 文章資料
 * @param userId 使用者 ID
 * @param isEditorAble 是否可編輯
 * @param index 文章索引
 */
export default function ArticleCard({
  articleData,
  userId,
  isEditorAble,
  index,
}: {
  articleData: Article
  userId?: string
  isEditorAble?: boolean
  index?: number
}) {
  const { id: articleId, updatedAt, imageUrl, title, isCollected, author } = articleData

  /**
   * 生成模糊圖片的 Data URL
   * @param src 原始圖片 URL
   * @returns 模糊處理後的圖片 URL
   */
  const generateBlurDataURL = (src: string) => {
    return src.replace('/upload/', '/upload/w_10,h_6,q_30,c_fill,e_blur:1000/')
  }

  return (
    <ArticleCardStyle isEditorAble={isEditorAble}>
      <div className="flex flex-col justify-between items-center text-center w-full flex-grow">
        <div className="w-full flex flex-col gap-4 cursor-pointer hover:opacity-70">
          <div className="w-full aspect-[16/9] relative overflow-hidden rounded-md">
            {imageUrl && (
              <ArticleLink article={articleData} className="w-full h-full block">
                <Image
                  className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                  fill
                  src={imageUrl}
                  alt={`${title} 的文章封面圖片`}
                  loading="eager"
                  sizes="(max-width: 768px) 280px, 330px"
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
              {userId && <FavoriteBtn userId={userId} articleId={articleId} isCollected={isCollected ?? false} />}
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
              <Button variant="default" size="sm" asChild className="w-fit">
                <Link href={`/profile/article/edit/${articleId}`}>編輯</Link>
              </Button>

              <DeleteArticleButton articleId={articleId} />
            </div>
          )}
        </div>
      </div>
    </ArticleCardStyle>
  )
}
