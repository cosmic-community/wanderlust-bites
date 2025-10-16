'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { AuthUser } from '@/types'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push('/login')
        return
      }
      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      })
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-12">
            <div className="flex items-center gap-6">
              {user.profile_photo?.imgix_url ? (
                <img
                  src={`${user.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                  <span className="text-3xl text-primary-600 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-primary-100 mt-1">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">About</h2>
                {user.bio ? (
                  <p className="text-neutral-600 leading-relaxed">{user.bio}</p>
                ) : (
                  <p className="text-neutral-400 italic">No bio added yet</p>
                )}
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Account Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-neutral-500">Email</span>
                    <p className="text-neutral-900">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Name</span>
                    <p className="text-neutral-900">{user.name}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}