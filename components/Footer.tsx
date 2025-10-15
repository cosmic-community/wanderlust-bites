import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌍</span>
              <span className="text-xl font-bold text-white">
                Wanderlust Bites
              </span>
            </div>
            <p className="text-neutral-400">
              Discover culinary adventures from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/categories/street-food"
                  className="hover:text-primary-400 transition-colors"
                >
                  Street Food
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/fine-dining"
                  className="hover:text-primary-400 transition-colors"
                >
                  Fine Dining
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/local-cuisine"
                  className="hover:text-primary-400 transition-colors"
                >
                  Local Cuisine
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-neutral-400">
              Built with Next.js and powered by Cosmic CMS.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-500">
          <p>© {new Date().getFullYear()} Wanderlust Bites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}