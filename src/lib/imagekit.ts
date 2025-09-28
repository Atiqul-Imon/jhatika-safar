import ImageKit from 'imagekit'

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
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
      overwriteFile: false
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
