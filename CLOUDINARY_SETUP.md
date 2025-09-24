# Cloudinary Setup Guide

## Cloudinary Configuration

Cloudinary is now integrated into the website for cloud image storage and optimization. To set it up:

### 1. Create Cloudinary Account
1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Complete the setup process

### 2. Get Your Credentials
1. Go to your Cloudinary dashboard
2. Navigate to "Dashboard" or "Settings"
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret

### 3. Environment Variables
Create a `.env.local` file in the project root and add:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=db5yniogx
CLOUDINARY_API_KEY=895323618914816
CLOUDINARY_API_SECRET=xXtgLm9RpcBvzQxuwx3ppO_BCKU

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Upload Images
1. Go to "Media Library" in your Cloudinary dashboard
2. Create folders for organization:
   - `tours/` - for tour images
   - `hero/` - for hero section images
   - `team/` - for team member photos
   - `about/` - for about page images
3. Upload your images to the appropriate folders

### 5. Image URLs in Code
The website is already configured to use Cloudinary URLs. Example:
```typescript
images: [
  'https://res.cloudinary.com/your_cloud_name/image/upload/v1/tours/sundarban-1.jpg',
  'https://res.cloudinary.com/your_cloud_name/image/upload/v1/tours/sundarban-2.jpg'
]
```

### 6. Image Optimization Features
Cloudinary automatically provides:
- **Responsive Images**: Different sizes for different devices
- **Format Optimization**: Automatic WebP/AVIF conversion
- **Quality Optimization**: Automatic quality adjustment
- **Lazy Loading**: Built-in lazy loading support
- **CDN Delivery**: Global CDN for fast image delivery
- **Transformations**: On-the-fly image transformations

### 7. Current Image Structure
Replace these placeholder URLs with your actual uploaded images:

#### Tour Images:
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/tours/sundarban-1.jpg`
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/tours/cox-bazar-1.jpg`
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/tours/sylhet-1.jpg`
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/tours/rajshahi-1.jpg`

#### Hero Images:
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/hero/bangladesh-hero.jpg`

#### Team Images:
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/team/team-1.jpg`
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/team/team-2.jpg`
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/team/team-3.jpg`

#### About Page Images:
- `https://res.cloudinary.com/jhatika-sofor/image/upload/v1/about/about-story.jpg`

### 8. Advanced Features
The Cloudinary integration includes:

#### Responsive Images:
```typescript
import { getResponsiveImageUrls } from '@/lib/cloudinary'

const urls = getResponsiveImageUrls('tours/sundarban-1')
// Returns: { mobile: '...', tablet: '...', desktop: '...', large: '...' }
```

#### Custom Transformations:
```typescript
import { getCloudinaryImageUrl } from '@/lib/cloudinary'

const optimizedUrl = getCloudinaryImageUrl('tours/sundarban-1', {
  width: 800,
  height: 600,
  quality: 'auto',
  format: 'auto',
  crop: 'fill'
})
```

### 9. Benefits of Cloudinary
- **Free Tier**: 25GB storage, 25GB bandwidth per month
- **Automatic Optimization**: Images are automatically optimized
- **Global CDN**: Fast delivery worldwide
- **Advanced Transformations**: Resize, crop, filter, and more
- **AI-Powered**: Automatic background removal, object detection
- **Video Support**: Also supports video optimization
- **Analytics**: Detailed usage analytics

### 10. Migration from ImageKit
The website has been updated to use Cloudinary instead of ImageKit:
- ✅ All image URLs updated to Cloudinary format
- ✅ ImageKit dependencies removed
- ✅ Cloudinary configuration added
- ✅ Utility functions created for image optimization

### 11. Next Steps
1. Create your Cloudinary account
2. Set up environment variables
3. Upload your images to Cloudinary
4. Update the image URLs in the code with your actual Cloudinary URLs
5. Test the website to ensure all images load correctly

## Support
For Cloudinary support, visit their [documentation](https://cloudinary.com/documentation) or [community forum](https://support.cloudinary.com/hc/en-us/community/topics).
