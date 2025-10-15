// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.metadata.title} - Wanderlust Bites`,
    description: post.metadata.content.substring(0, 160),
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }
  
  const author = post.metadata.author
  const categories = post.metadata.categories || []
  const featuredImage = post.metadata.featured_image
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
      )}
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
        {post.metadata.title}
      </h1>
      
      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-neutral-200">
        {author && (
          <Link 
            href={`/authors/${author.slug}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-neutral-900">
                {author.metadata.name}
              </p>
              <p className="text-sm text-neutral-600">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </Link>
        )}
        
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.metadata.content}
        </ReactMarkdown>
      </div>
      
      {/* Author Bio */}
      {author && author.metadata.bio && (
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex items-start gap-4">
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                About {author.metadata.name}
              </h3>
              <p className="text-neutral-700 mb-4">
                {author.metadata.bio}
              </p>
              <Link
                href={`/authors/${author.slug}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View all posts by {author.metadata.name} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}