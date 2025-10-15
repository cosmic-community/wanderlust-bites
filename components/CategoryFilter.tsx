'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()
  
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          pathname === '/'
            ? 'bg-primary-600 text-white'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
        }`}
      >
        All Posts
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            pathname === `/categories/${category.slug}`
              ? 'bg-primary-600 text-white'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          {category.metadata.name}
        </Link>
      ))}
    </div>
  )
}