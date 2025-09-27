import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// GET - Fetch all users
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const isActive = searchParams.get('isActive')
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort') || '-createdAt'
    
    // Build query
    const query: any = {}
    if (role) query.role = role
    if (isActive !== null) query.isActive = isActive === 'true'
    
    // Build options
    const options: any = { sort }
    if (limit) options.limit = parseInt(limit)
    
    const users = await User.find(query, null, options)
      .select('-password') // Exclude password from response
      .lean()
    
    return NextResponse.json({
      success: true,
      data: users,
      count: users.length
    })
    
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
    const user = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || 'user',
      isActive: body.isActive !== undefined ? body.isActive : true
    })
    
    await user.save()
    
    // Return user without password
    const userResponse = user.toObject()
    delete userResponse.password
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    )
  }
}
