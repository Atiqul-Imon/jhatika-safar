import { NextRequest, NextResponse } from 'next/server'
import { getImageKitAuth } from '@/lib/imagekit'

export async function GET(request: NextRequest) {
  try {
    const authParams = getImageKitAuth()
    
    return NextResponse.json({
      success: true,
      data: authParams
    })
  } catch (error: any) {
    console.error('ImageKit auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to get ImageKit authentication' },
      { status: 500 }
    )
  }
}
