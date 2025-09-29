# 🚀 Vercel Deployment Guide for Jhatika Safar

This guide will help you deploy the Jhatika Safar travel agency website to Vercel.

## 📋 Prerequisites

- [ ] GitHub repository with your code
- [ ] Vercel account (free tier available)
- [ ] MongoDB Atlas database
- [ ] Domain name (optional, Vercel provides free subdomain)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Environment Variables
Create a `.env.local` file locally with these variables:

```bash
# Required Variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
JWT_SECRET=your-super-secret-jwt-key-here

# Optional Variables
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 1.2 Test Build Locally
```bash
npm run build
npm run start
```

## 🌐 Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository: `Atiqul-Imon/jhatika-safar`
5. Vercel will automatically detect it's a Next.js project

### 2.2 Configure Environment Variables

In the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/database-name` | Production, Preview, Development |
| `JWT_SECRET` | `your-super-secret-jwt-key-here` | Production, Preview, Development |
| `CLOUDINARY_CLOUD_NAME` | `your-cloud-name` | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | `your-api-key` | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | `your-api-secret` | Production, Preview, Development |

### 2.3 Deploy Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be available at `https://your-project-name.vercel.app`

## 🔐 Step 3: Database Setup

### 3.1 Create Admin User

After deployment, you need to create an admin user:

1. Go to your Vercel function logs
2. Or run locally with production environment variables:

```bash
# Set production environment variables
export MONGODB_URI="your-production-mongodb-uri"
export JWT_SECRET="your-production-jwt-secret"

# Create admin user
npm run create-admin
```

### 3.2 Populate Sample Data

```bash
# Populate with sample tours
npm run populate-tours
```

## 🌍 Step 4: Domain Configuration (Optional)

### 4.1 Custom Domain

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

### 4.2 SSL Certificate

Vercel automatically provides SSL certificates for all domains.

## 📊 Step 5: Monitoring & Analytics

### 5.1 Vercel Analytics

- Built-in analytics available in Vercel dashboard
- Real-time performance monitoring
- Error tracking and debugging

### 5.2 Database Monitoring

- Monitor MongoDB Atlas dashboard
- Set up alerts for connection issues
- Monitor database performance

## 🔧 Step 6: Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test admin login functionality
- [ ] Test tour creation and editing
- [ ] Test booking form submission
- [ ] Test contact form submission
- [ ] Verify all images load properly
- [ ] Test responsive design on mobile
- [ ] Check page load speeds
- [ ] Verify SSL certificate is active

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify MongoDB Atlas network access allows Vercel IPs
   - Check connection string format
   - Ensure database user has proper permissions

3. **Authentication Issues**
   - Verify JWT_SECRET is set correctly
   - Check token expiration settings
   - Clear browser cache and cookies

4. **Image Loading Issues**
   - Verify image URLs are accessible
   - Check Next.js image configuration
   - Ensure proper CORS settings

### Getting Help

- Check Vercel function logs in dashboard
- Use browser developer tools for client-side errors
- Monitor MongoDB Atlas logs
- Check GitHub repository for latest updates

## 📈 Performance Optimization

### Vercel Optimizations

- **Edge Functions**: API routes run on Vercel Edge Network
- **Image Optimization**: Automatic WebP/AVIF conversion
- **CDN**: Global content delivery
- **Caching**: Automatic static asset caching

### Database Optimizations

- Use MongoDB indexes for frequently queried fields
- Implement connection pooling
- Monitor query performance
- Use MongoDB Atlas monitoring tools

## 🔄 Continuous Deployment

### Automatic Deployments

- Every push to `main` branch triggers production deployment
- Pull requests create preview deployments
- Branch deployments for testing

### Manual Deployments

- Use Vercel CLI: `vercel --prod`
- Trigger from Vercel dashboard
- Use GitHub Actions for custom workflows

## 📞 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **MongoDB Support**: [support.mongodb.com](https://support.mongodb.com)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 Success!

Your Jhatika Safar travel agency website is now live on Vercel! 

**Next Steps:**
1. Test all functionality
2. Set up monitoring
3. Configure custom domain
4. Set up analytics
5. Create backup strategies

**Live URL**: `https://your-project-name.vercel.app`
**Admin Panel**: `https://your-project-name.vercel.app/admin`
**Login**: Use the admin credentials you created
