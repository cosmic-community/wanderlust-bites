import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="text-xl font-bold text-neutral-900">
              Wanderlust Bites
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories/street-food" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Street Food
            </Link>
            <Link 
              href="/categories/fine-dining" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Fine Dining
            </Link>
            <Link 
              href="/categories/local-cuisine" 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Local Cuisine
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}