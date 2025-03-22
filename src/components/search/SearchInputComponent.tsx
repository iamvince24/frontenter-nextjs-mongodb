'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ placeholder = '搜尋...', onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const justSearched = useRef<boolean>(false)

  useEffect(() => {
    if (justSearched.current) {
      justSearched.current = false
      return
    }

    const currentSearchValue = searchParams.get('search') || ''
    if (currentSearchValue) {
      setSearchValue(currentSearchValue)
      setIsSearchOpen(true)
    }
  }, [searchParams])

  const toggleSearch = (): void => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchValue('')
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (): void => {
    if (searchValue.trim()) {
      justSearched.current = true

      router.push(`/articles?search=${encodeURIComponent(searchValue.trim())}`)

      if (onSearch) {
        onSearch(searchValue)
      }

      setSearchValue('')
      setIsSearchOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  return (
    <div className="flex items-center justify-end relative h-10 w-[300px]">
      <div
        className={`flex items-center transition-all duration-300 absolute right-0 ${
          isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
      >
        {isSearchOpen && (
          <div className="relative w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearch}
              className="h-8 w-8 absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500 rounded-full "
              aria-label="執行搜尋"
              tabIndex={0}
            >
              <Search size={16} />
            </Button>
            <Input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-10 h-10 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-none"
              autoFocus
            />
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSearch}
        className="h-8 w-8 p-2 z-10 mr-1 rounded-full hover:delay-100"
        aria-label={isSearchOpen ? '關閉搜尋' : '開啟搜尋'}
      >
        {isSearchOpen ? <X size={20} /> : <Search size={20} />}
      </Button>
    </div>
  )
}

export default SearchInputComponent
