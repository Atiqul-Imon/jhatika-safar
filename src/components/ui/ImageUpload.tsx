'use client'

import { useState, useRef } from 'react'
import { CloudArrowUpIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10, 
  className = '' 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    const remainingSlots = maxImages - images.length
    const filesToUpload = filesArray.slice(0, remainingSlots)

    if (filesToUpload.length === 0) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const uploadPromises = filesToUpload.map(async (file, index) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image file`)
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} is too large. Maximum size is 5MB`)
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'tours')

        const response = await fetch('/api/imagekit/upload', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.message || 'Upload failed')
        }

        // Update progress
        setUploadProgress(((index + 1) / filesToUpload.length) * 100)

        return result.data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedUrls])
      
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.message || 'Failed to upload images')
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onClick={openFileDialog}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${uploading 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />
        
        {uploading ? (
          <div className="space-y-2">
            <CloudArrowUpIcon className="h-12 w-12 text-blue-500 mx-auto animate-bounce" />
            <p className="text-blue-600 font-medium">Uploading images...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{Math.round(uploadProgress)}% complete</p>
          </div>
        ) : (
          <div className="space-y-2">
            <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-gray-600 font-medium">
                {images.length >= maxImages 
                  ? `Maximum ${maxImages} images reached`
                  : 'Click to upload images'
                }
              </p>
              <p className="text-sm text-gray-500">
                {images.length}/{maxImages} images • Max 5MB each
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Tour image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image URLs Display (for debugging) */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Image URLs:</p>
          <div className="space-y-1">
            {images.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">#{index + 1}</span>
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 text-xs bg-gray-100 border border-gray-200 rounded px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(url)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
