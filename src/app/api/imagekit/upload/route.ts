import { NextRequest, NextResponse } from 'next/server'
import { uploadToImageKit } from '@/lib/imagekit'

export async function POST(request: NextRequest) {
  try {
    console.log('ImageKit upload endpoint called')
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'tours'

    console.log('File received:', file ? { name: file.name, size: file.size, type: file.type } : 'No file')
    console.log('Folder:', folder)

    if (!file) {
      console.log('No file provided')
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    console.log('Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('Buffer size:', buffer.length)

    // Upload to ImageKit
    console.log('Uploading to ImageKit...')
    const result = await uploadToImageKit(buffer, file.name, folder)
    console.log('Upload result:', result)

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
