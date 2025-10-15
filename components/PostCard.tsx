import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata.featured_image
  const author = post.metadata.author
  const categories = post.metadata.categories || []
  
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.metadata.title}
              width={400}
              height={225}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </Link>
      
      <div className="p-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium hover:bg-primary-200 transition-colors"
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-neutral-900 mb-3 hover:text-primary-600 transition-colors">
            {post.metadata.title}
          </h2>
        </Link>
        
        {author && (
          <Link 
            href={`/authors/${author.slug}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-medium text-neutral-900">
                {author.metadata.name}
              </p>
              <p className="text-xs text-neutral-600">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </Link>
        )}
      </div>
    </article>
  )
}