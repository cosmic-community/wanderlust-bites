import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/lib/cosmic'
import { createToken, setTokenCookie } from '@/lib/auth'

interface LoginData {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginData = await request.json()
    
    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get user by email
    const user = await getUserByEmail(body.email)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(body.password, user.metadata.password_hash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.metadata.email
    })
    
    // Set cookie
    await setTokenCookie(token)
    
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.metadata.name,
          email: user.metadata.email,
          bio: user.metadata.bio,
          profile_photo: user.metadata.profile_photo
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login. Please try again later.' },
      { status: 500 }
    )
  }
}