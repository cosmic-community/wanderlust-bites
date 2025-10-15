import Link from 'next/link'
import type { Post } from '@/types'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  const featuredImage = post.metadata.featured_image
  const author = post.metadata.author
  const categories = post.metadata.categories || []
  
  return (
    <div className="relative h-[600px] overflow-hidden">
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-neutral-900/20" />
        </div>
      )}
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
        <div className="max-w-3xl">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  {category.metadata.name}
                </Link>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {post.metadata.title}
          </h1>
          
          {author && (
            <div className="flex items-center gap-3 mb-6">
              {author.metadata.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white"
                />
              )}
              <div>
                <p className="text-white font-semibold">
                  {author.metadata.name}
                </p>
                <p className="text-neutral-300 text-sm">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
          
          <Link
            href={`/posts/${post.slug}`}
            className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}