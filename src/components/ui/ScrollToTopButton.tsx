'use client'

import Image from 'next/image'
import * as React from 'react'

interface ScrollToTopButtonProps {
  imageSrc: string
  imageAlt: string
  width: number
  height: number
  className?: string
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  imageSrc,
  imageAlt,
  width,
  height,
  className = '',
}) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={imageSrc}
      alt={imageAlt}
      onClick={handleScrollToTop}
      onKeyDown={e => e.key === 'Enter' && handleScrollToTop()}
      tabIndex={0}
      role="button"
      aria-label="回到頁面頂部"
    />
  )
}
