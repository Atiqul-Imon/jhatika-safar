import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tour from '@/models/Tour'

// GET - Fetch tour by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    
    const { slug } = await params
    const tour = await Tour.findOne({ slug, status: 'active' }).lean()
    
    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: tour
    })
    
  } catch (error) {
    console.error('Error fetching tour by slug:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tour' },
      { status: 500 }
    )
  }
}
