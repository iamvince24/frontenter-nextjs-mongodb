'use client'

import { useRouter } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getPageNumbers } from '@/features/article/utils/getPageNumbers'

interface ArticlePaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

const ArticlePagination = ({ currentPage, totalPages, basePath, className = '' }: ArticlePaginationProps) => {
  const router = useRouter()
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  const handlePageChange = (page: number, e?: React.MouseEvent) => {
    if (page < 1 || page > totalPages) return
    e?.preventDefault()
    router.push(`${basePath}?page=${page}`)
  }

  return (
    <Pagination className={`mb-5 ${className}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
            onClick={e => handlePageChange(currentPage - 1, e)}
            className={`text-lg ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          />
        </PaginationItem>

        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`${basePath}?page=${page}`}
              onClick={e => handlePageChange(page, e)}
              isActive={currentPage === page}
              className="text-lg cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
            onClick={e => handlePageChange(currentPage + 1, e)}
            className={`text-lg ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ArticlePagination
