// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status: string
  thumbnail?: string
  published_at: string
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    title: string
    content: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: Author
    categories?: Category[]
  }
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name: string
    bio?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
  }
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name: string
    description?: string
  }
}

// User interface
export interface User extends CosmicObject {
  type: 'users'
  metadata: {
    name: string
    email: string
    password_hash: string
    bio?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Auth types
export interface AuthUser {
  id: string
  name: string
  email: string
  bio?: string
  profile_photo?: {
    url: string
    imgix_url: string
  }
}

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts'
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users'
}