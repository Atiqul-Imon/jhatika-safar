import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// GET - Fetch single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    
    const user = await User.findById(id).select('-password').lean()
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: user
    })
    
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const body = await request.json()
    
    // Check if user exists
    const existingUser = await User.findById(id)
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check if email is being changed and if it already exists
    if (body.email && body.email !== existingUser.email) {
      const emailExists = await User.findOne({ 
        email: body.email, 
        _id: { $ne: id } 
      })
      if (emailExists) {
        return NextResponse.json(
          { success: false, message: 'Email already exists' },
          { status: 400 }
        )
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        ...body,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select('-password')
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    })
    
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    
    // Check if user exists
    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }
    
    // Prevent deletion of the last admin user
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' })
      if (adminCount <= 1) {
        return NextResponse.json(
          { success: false, message: 'Cannot delete the last admin user' },
          { status: 400 }
        )
      }
    }
    
    await User.findByIdAndDelete(id)
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
