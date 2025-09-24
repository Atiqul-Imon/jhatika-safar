import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

// GET - Fetch all contact messages
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort') || '-createdAt'
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    
    // Build options
    const options: any = { sort }
    if (limit) options.limit = parseInt(limit)
    
    const messages = await ContactMessage.find(query, null, options).lean()
    
    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length
    })
    
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}

// POST - Create new contact message
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    const message = new ContactMessage({
      ...body,
      status: 'new'
    })
    
    await message.save()
    
    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully',
      data: message
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send contact message' },
      { status: 500 }
    )
  }
}