'use client'

import * as React from 'react'
import { FaBookmark } from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'

export default function FavoriteBtn({
  isCollected,
  toggleFavorite,
}: {
  isCollected: boolean | undefined
  toggleFavorite: () => Promise<void>
}) {
  return (
    <button onClick={toggleFavorite}>
      {isCollected ? <FaBookmark className="text-xl text-black" /> : <FaRegBookmark className="text-xl text-black" />}
    </button>
  )
}
