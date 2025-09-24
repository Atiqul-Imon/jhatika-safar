import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Tour from '@/models/Tour'

// GET - Fetch all bookings
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort') || '-createdAt'
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (paymentStatus) query.paymentStatus = paymentStatus
    
    // Build options
    const options: any = { sort }
    if (limit) options.limit = parseInt(limit)
    
    const bookings = await Booking.find(query, null, options)
      .populate('tourId', 'title slug')
      .lean()
    
    return NextResponse.json({
      success: true,
      data: bookings,
      count: bookings.length
    })
    
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
    const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'tourId', 'numberOfPeople', 'startDate']
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