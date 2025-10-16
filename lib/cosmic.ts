import { createBucketClient } from '@cosmicjs/sdk'
import type { Post, Author, Category, User, NewsletterSubscriber } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Server-side cosmic client with write access
export const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Get all posts with author and category data
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    const posts = (response.objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
    
    return posts
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

// Get a single post by slug
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'posts',
        slug 
      })
      .depth(1)
    
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch post')
  }
}

// Get posts by category
export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.categories': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    const posts = (response.objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
    
    return posts
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by category')
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Get a single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'categories',
        slug 
      })
    
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Get all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

// Get a single author by slug
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'authors',
        slug 
      })
    
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch author')
  }
}

// Get posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    const posts = (response.objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
    
    return posts
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by author')
  }
}

// User authentication functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    const users = response.objects as User[]
    // Changed: Use type assertion to explicitly convert undefined to null
    return (users[0] as User | undefined) ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'users',
        id: userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

export async function createUser(name: string, email: string, passwordHash: string): Promise<User> {
  try {
    const response = await cosmicWrite.objects.insertOne({
      title: name,
      type: 'users',
      metadata: {
        name,
        email,
        password_hash: passwordHash
      }
    })
    
    return response.object as User
  } catch (error) {
    throw new Error('Failed to create user')
  }
}

export async function updateUser(userId: string, updates: { name?: string; bio?: string }): Promise<User> {
  try {
    const response = await cosmicWrite.objects.updateOne(userId, {
      title: updates.name,
      metadata: updates
    })
    
    return response.object as User
  } catch (error) {
    throw new Error('Failed to update user')
  }
}

// Newsletter subscription functions
export async function getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'newsletter-subscribers',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    const subscribers = response.objects as NewsletterSubscriber[]
    return (subscribers[0] as NewsletterSubscriber | undefined) ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch newsletter subscriber')
  }
}

export async function createNewsletterSubscriber(name: string, email: string): Promise<NewsletterSubscriber> {
  try {
    const response = await cosmicWrite.objects.insertOne({
      title: `${name} - ${email}`,
      type: 'newsletter-subscribers',
      metadata: {
        name,
        email,
        subscribed_at: new Date().toISOString()
      }
    })
    
    return response.object as NewsletterSubscriber
  } catch (error) {
    throw new Error('Failed to create newsletter subscriber')
  }
}