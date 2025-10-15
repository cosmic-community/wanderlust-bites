import { getPosts, getCategories } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import PostGrid from '@/components/PostGrid'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()
  
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)
  
  return (
    <div>
      {featuredPost && <Hero post={featuredPost} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Latest Stories
          </h2>
          <CategoryFilter categories={categories} />
        </div>
        
        <PostGrid posts={remainingPosts} />
      </div>
    </div>
  )
}