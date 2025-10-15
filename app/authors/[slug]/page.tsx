// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostGrid from '@/components/PostGrid'

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.metadata.name} - Wanderlust Bites`,
    description: author.metadata.bio || `Posts by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    notFound()
  }
  
  const posts = await getPostsByAuthor(author.id)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row items-start gap-8">
        {author.metadata.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.metadata.name}
            width={160}
            height={160}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {author.metadata.name}
          </h1>
          {author.metadata.bio && (
            <p className="text-xl text-neutral-700 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Articles by {author.metadata.name}
        </h2>
      </div>
      
      {posts.length > 0 ? (
        <PostGrid posts={posts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600">
            No posts published yet.
          </p>
        </div>
      )}
    </div>
  )
}