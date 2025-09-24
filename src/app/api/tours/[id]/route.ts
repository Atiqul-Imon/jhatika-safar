import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Tour from '@/models/Tour'

// GET - Fetch single tour by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const tour = await Tour.findById(id).lean()
    
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
    console.error('Error fetching tour:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tour' },
      { status: 500 }
    )
  }
}

// PUT - Update tour
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const body = await request.json()
    
    // If title is being updated, create new slug
    if (body.title) {
      const slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      // Check if slug already exists (excluding current tour)
      const existingTour = await Tour.findOne({ slug, _id: { $ne: id } })
      if (existingTour) {
        return NextResponse.json(
          { success: false, message: 'A tour with this title already exists' },
          { status: 400 }
        )
      }
      
      body.slug = slug
    }
    
    const tour = await Tour.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tour updated successfully',
      data: tour
    })
    
  } catch (error) {
    console.error('Error updating tour:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update tour' },
      { status: 500 }
    )
  }
}

// DELETE - Delete tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const tour = await Tour.findByIdAndDelete(id)
    
    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tour deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting tour:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete tour' },
      { status: 500 }
    )
  }
}