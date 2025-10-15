'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          
          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories/street-food" 
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Street Food
              </Link>
              <Link 
                href="/categories/fine-dining" 
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fine Dining
              </Link>
              <Link 
                href="/categories/local-cuisine" 
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Local Cuisine
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}