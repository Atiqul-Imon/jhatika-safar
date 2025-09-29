import ImageKit from 'imagekit'

// Initialize ImageKit with fallback values for build time
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_ZyHB3Ka9x2WiciE1FFoVlpTjk60=',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_suajtDe9wiY91EopFtf6Zbslu54=',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/nntiarb8cp'
})

export default imagekit

// Helper function to get authentication parameters for client-side uploads
export const getImageKitAuth = () => {
  return imagekit.getAuthenticationParameters()
}

// Helper function to upload file from server-side
export const uploadToImageKit = async (file: Buffer, fileName: string, folder: string = 'tours') => {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: fileName,
      folder: folder,
      useUniqueFileName: true,
      overwriteFile: false,
      isPrivateFile: false // Ensure images are public
    })
    return result
  } catch (error) {
    console.error('ImageKit upload error:', error)
    throw error
  }
}

// Helper function to delete image from ImageKit
export const deleteFromImageKit = async (fileId: string) => {
  try {
    const result = await imagekit.deleteFile(fileId)
    return result
  } catch (error) {
    console.error('ImageKit delete error:', error)
    throw error
  }
}
