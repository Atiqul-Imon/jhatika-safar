import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tour from '@/models/Tour'

// GET - Fetch all tours
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (category) query.category = category
    if (featured) query.featured = featured === 'true'
    
    // Build options
    const options: any = { sort: { createdAt: -1 } }
    if (limit) options.limit = parseInt(limit)
    
    const tours = await Tour.find(query, null, options).lean()
    
    return NextResponse.json({
      success: true,
      data: tours,
      count: tours.length
    })
    
  } catch (error) {
    console.error('Error fetching tours:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}

// POST - Create new tour
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'shortDescription', 'duration', 'price', 'destinations', 'highlights', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Create slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    // Check if slug already exists
    const existingTour = await Tour.findOne({ slug })
    if (existingTour) {
      return NextResponse.json(
        { success: false, message: 'A tour with this title already exists' },
        { status: 400 }
      )
    }
    
    const tour = new Tour({
      ...body,
      slug,
      status: body.status || 'active',
      featured: body.featured || false,
      images: body.images || []
    })
    
    await tour.save()
    
    return NextResponse.json({
      success: true,
      message: 'Tour created successfully',
      data: tour
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating tour:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create tour' },
      { status: 500 }
    )
  }
}