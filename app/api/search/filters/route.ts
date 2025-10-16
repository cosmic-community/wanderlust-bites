import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')

    if (!type || (type !== 'categories' && type !== 'authors')) {
      return NextResponse.json(
        { success: false, error: 'Invalid filter type' },
        { status: 400 }
      )
    }

    const response = await cosmic.objects
      .find({ type })
      .props(['id', 'title', 'slug', 'metadata'])

    return NextResponse.json({
      success: true,
      data: response.objects
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({
        success: true,
        data: []
      })
    }

    console.error('Filter fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch filters' },
      { status: 500 }
    )
  }
}