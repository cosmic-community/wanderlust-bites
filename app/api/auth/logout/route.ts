import { NextRequest, NextResponse } from 'next/server'
import { removeTokenCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await removeTokenCookie()
    
    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}