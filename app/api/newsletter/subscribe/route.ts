import { NextRequest, NextResponse } from 'next/server'
import { createNewsletterSubscriber, getNewsletterSubscriberByEmail } from '@/lib/cosmic'

interface SubscribeFormData {
  name: string
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    // Check if email already exists
    const existingSubscriber = await getNewsletterSubscriberByEmail(body.email)
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    // Create new subscriber
    await createNewsletterSubscriber(body.name, body.email)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}