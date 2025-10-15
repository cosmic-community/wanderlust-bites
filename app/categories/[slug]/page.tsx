// app/categories/[slug]/page.tsx
import { getCategory, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostGrid from '@/components/PostGrid'

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.metadata.name} - Wanderlust Bites`,
    description: category.metadata.description || `Browse ${category.metadata.name} posts`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(category.id)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          {category.metadata.name}
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-neutral-600">
            {category.metadata.description}
          </p>
        )}
      </div>
      
      {posts.length > 0 ? (
        <PostGrid posts={posts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600">
            No posts found in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}