import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

// GET - Fetch single contact message by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const message = await ContactMessage.findById(id).lean()
    
    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Contact message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: message
    })
    
  } catch (error) {
    console.error('Error fetching contact message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact message' },
      { status: 500 }
    )
  }
}

// PUT - Update contact message
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const body = await request.json()
    
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Contact message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact message updated successfully',
      data: message
    })
    
  } catch (error) {
    console.error('Error updating contact message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update contact message' },
      { status: 500 }
    )
  }
}

// DELETE - Delete contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const message = await ContactMessage.findByIdAndDelete(id)
    
    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Contact message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact message deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete contact message' },
      { status: 500 }
    )
  }
}