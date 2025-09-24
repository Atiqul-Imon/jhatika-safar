import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Utility function to generate optimized image URLs
export function getCloudinaryImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string | number
    format?: string
    crop?: string
    gravity?: string
  } = {}
) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options

  const transformations = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  if (crop) transformations.push(`c_${crop}`)
  if (gravity) transformations.push(`g_${gravity}`)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'db5yniogx'
  const transformationString = transformations.join(',')
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`
}

// Predefined image sizes for different use cases
export const imageSizes = {
  thumbnail: { width: 300, height: 200, crop: 'fill' },
  card: { width: 400, height: 300, crop: 'fill' },
  hero: { width: 1200, height: 600, crop: 'fill' },
  gallery: { width: 800, height: 600, crop: 'fill' },
  profile: { width: 200, height: 200, crop: 'fill', gravity: 'face' }
}

// Helper function to get responsive image URLs
export function getResponsiveImageUrls(publicId: string) {
  return {
    mobile: getCloudinaryImageUrl(publicId, { ...imageSizes.card, width: 400 }),
    tablet: getCloudinaryImageUrl(publicId, { ...imageSizes.card, width: 600 }),
    desktop: getCloudinaryImageUrl(publicId, { ...imageSizes.card, width: 800 }),
    large: getCloudinaryImageUrl(publicId, { ...imageSizes.card, width: 1200 })
  }
}
