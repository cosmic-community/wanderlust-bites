'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import PostGrid from '@/components/PostGrid'
import type { Post, Category, Author } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedAuthor, setSelectedAuthor] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch filters on mount
  useEffect(() => {
    fetchFilters()
  }, [])

  // Perform search when query or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch()
    }, 300) // Debounce search by 300ms

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedAuthor])

  const fetchFilters = async () => {
    try {
      const [categoriesRes, authorsRes] = await Promise.all([
        fetch('/api/search/filters?type=categories'),
        fetch('/api/search/filters?type=authors')
      ])

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData.data || [])
      }

      if (authorsRes.ok) {
        const authorsData = await authorsRes.json()
        setAuthors(authorsData.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch filters:', err)
    }
  }

  const performSearch = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('q', searchQuery)
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedAuthor) params.append('author', selectedAuthor)

      const response = await fetch(`/api/search?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setPosts(data.posts || [])
    } catch (err) {
      setError('Failed to search posts. Please try again.')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedAuthor('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Search Posts
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for posts by title or content..."
              className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
              Filter by Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.metadata.name}
                </option>
              ))}
            </select>
          </div>

          {/* Author Filter */}
          <div className="flex-1">
            <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-2">
              Filter by Author
            </label>
            <select
              id="author"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.metadata.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || selectedCategory || selectedAuthor) && (
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors whitespace-nowrap"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory || selectedAuthor) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                Category: {categories.find(c => c.id === selectedCategory)?.metadata.name}
              </span>
            )}
            {selectedAuthor && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                Author: {authors.find(a => a.id === selectedAuthor)?.metadata.name}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Searching...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="mb-4 text-neutral-600">
            Found {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </div>
          <PostGrid posts={posts} />
        </>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto w-16 h-16 text-neutral-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-xl text-neutral-600">
            {searchQuery || selectedCategory || selectedAuthor
              ? 'No posts found matching your criteria.'
              : 'Enter a search term or select filters to find posts.'}
          </p>
        </div>
      )}
    </div>
  )
}