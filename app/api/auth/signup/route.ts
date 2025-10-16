import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createUser, getUserByEmail } from '@/lib/cosmic'
import { createToken, setTokenCookie } from '@/lib/auth'

interface SignupData {
  name: string
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Validate password length
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await getUserByEmail(body.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 10)
    
    // Create user in Cosmic
    const user = await createUser(body.name, body.email, passwordHash)
    
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
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again later.' },
      { status: 500 }
    )
  }
}