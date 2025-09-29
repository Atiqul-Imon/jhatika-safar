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
    const requiredFields = ['name', 'phone', 'subject', 'message']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Validate email format if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { success: false, message: 'Invalid email format' },
          { status: 400 }
        )
      }
    }
    
    // Only include email if it's provided and not empty
    const messageData: any = {
      name: body.name,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      status: 'new'
    }
    
    if (body.email && body.email.trim()) {
      messageData.email = body.email
    }
    
    const message = new ContactMessage(messageData)
    
    await message.save()
    
    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully',
      data: message
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send contact message', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}