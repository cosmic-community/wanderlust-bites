import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import type { Post } from '@/types'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const categoryId = searchParams.get('category')
    const authorId = searchParams.get('author')

    // Build the search query
    const searchQuery: Record<string, any> = { type: 'posts' }

    // Add category filter if provided
    if (categoryId) {
      searchQuery['metadata.categories'] = categoryId
    }

    // Add author filter if provided
    if (authorId) {
      searchQuery['metadata.author'] = authorId
    }

    // Fetch posts based on filters
    const response = await cosmic.objects
      .find(searchQuery)
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    let posts = response.objects as Post[]

    // Client-side text search if query is provided
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim()
      posts = posts.filter((post) => {
        const titleMatch = post.metadata.title?.toLowerCase().includes(searchTerm)
        const contentMatch = post.metadata.content?.toLowerCase().includes(searchTerm)
        const authorMatch = post.metadata.author?.metadata.name?.toLowerCase().includes(searchTerm)
        
        return titleMatch || contentMatch || authorMatch
      })
    }

    // Sort by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({
        success: true,
        posts: [],
        count: 0
      })
    }

    console.error('Search error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search posts',
        posts: [],
        count: 0
      },
      { status: 500 }
    )
  }
}