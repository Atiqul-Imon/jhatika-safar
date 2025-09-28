import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tour from '@/models/Tour'

// GET - Fetch all tours with pagination and caching
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const sort = searchParams.get('sort') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (category) query.category = category
    if (featured) query.featured = featured === 'true'
    
    // Build sort options
    const sortOptions: any = {}
    sortOptions[sort] = order === 'desc' ? -1 : 1
    
    // Calculate pagination
    const skip = (page - 1) * limit
    
    // Execute queries in parallel for better performance
    const [tours, totalCount] = await Promise.all([
      Tour.find(query, null, { 
        sort: sortOptions, 
        limit, 
        skip 
      })
      .select('title slug shortDescription duration price images destinations highlights category featured status groupSize createdAt')
      .lean(),
      Tour.countDocuments(query)
    ])
    
    const totalPages = Math.ceil(totalCount / limit)
    
    // Transform MongoDB _id to id for frontend compatibility
    const transformedTours = tours.map(tour => ({
      ...tour,
      id: (tour as any)._id.toString(),
      _id: undefined
    }))

    const response = NextResponse.json({
      success: true,
      data: transformedTours,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
    
    // Add cache headers - 10 minutes for active tours, 1 hour for others
    const cacheTime = status === 'active' ? 600 : 3600
    response.headers.set('Cache-Control', `public, s-maxage=${cacheTime}, stale-while-revalidate=300`)
    
    return response
    
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
    
    // Validate required fields - only title is required
    if (!body.title) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 }
      )
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
    
  } catch (error: any) {
    console.error('Error creating tour:', error)
    console.error('Error details:', error.message)
    return NextResponse.json(
      { success: false, message: 'Failed to create tour', error: error.message },
      { status: 500 }
    )
  }
}