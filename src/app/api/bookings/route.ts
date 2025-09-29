import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Tour from '@/models/Tour'

// GET - Fetch all bookings with pagination and caching
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const sort = searchParams.get('sort') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (paymentStatus) query.paymentStatus = paymentStatus
    
    // Build sort options
    const sortOptions: any = {}
    sortOptions[sort] = order === 'desc' ? -1 : 1
    
    // Calculate pagination
    const skip = (page - 1) * limit
    
    // Execute queries in parallel for better performance
    const [bookings, totalCount] = await Promise.all([
      Booking.find(query, null, { 
        sort: sortOptions, 
        limit, 
        skip 
      })
      .populate('tourId', 'title slug')
      .select('customerName customerEmail customerPhone tourId tourTitle numberOfPeople startDate totalPrice status paymentStatus createdAt')
      .lean(),
      Booking.countDocuments(query)
    ])
    
    const totalPages = Math.ceil(totalCount / limit)
    
    const response = NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
    
    // Add cache headers - 5 minutes for bookings
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
    
    return response
    
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST - Create new booking
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['customerName', 'customerPhone', 'tourId', 'numberOfPeople']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Verify tour exists and get price
    const tour = await Tour.findById(body.tourId)
    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      )
    }
    
    // Calculate total price
    const totalPrice = tour.price * body.numberOfPeople
    
    const booking = new Booking({
      ...body,
      tourTitle: tour.title,
      totalPrice,
      status: body.status || 'pending',
      paymentStatus: body.paymentStatus || 'pending'
    })
    
    await booking.save()
    
    // Populate the tour data in response
    await booking.populate('tourId', 'title slug')
    
    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create booking' },
      { status: 500 }
    )
  }
}