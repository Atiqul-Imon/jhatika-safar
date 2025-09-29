import { NextRequest, NextResponse } from 'next/server'
import { uploadToImageKit } from '@/lib/imagekit'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'tours'

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to ImageKit
    const result = await uploadToImageKit(buffer, file.name, folder)

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        fileId: result.fileId,
        name: result.name,
        size: result.size
      }
    })
  } catch (error: any) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
