# 🚀 Vercel Deployment - Environment Variables Guide

## 📋 Required Environment Variables for Production

### 🔑 **CRITICAL VARIABLES (Must Set)**

#### 1. **MongoDB Connection** ⚠️ REQUIRED
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jhatika-sofor?retryWrites=true&w=majority
```
- **Purpose**: Database connection for all data operations
- **Where to get**: MongoDB Atlas Dashboard → Connect → Connect your application
- **Example**: `mongodb+srv://admin:password123@cluster0.abc123.mongodb.net/jhatika-sofor?retryWrites=true&w=majority`

#### 2. **JWT Secret Key** ⚠️ REQUIRED
```bash
JWT_SECRET=your-super-secure-jwt-secret-key-here
```
- **Purpose**: Signing and verifying JWT tokens for authentication
- **Generate**: Use `openssl rand -base64 32` or any secure random generator
- **Example**: `Kx9mP2vL8qR5nT3wY7uI1oE6sA4dF9gH2jK5lZ8xV`

### 🌐 **OPTIONAL VARIABLES (Recommended)**

#### 3. **Site URL** (For SEO & Sitemap)
```bash
SITE_URL=https://your-domain.vercel.app
```
- **Purpose**: Used for sitemap generation and SEO
- **Example**: `https://jhatika-sofor.vercel.app`

#### 4. **Base URL** (For API calls)
```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```
- **Purpose**: Frontend API calls and image URLs
- **Example**: `https://jhatika-sofor.vercel.app`

### 📸 **Cloudinary Configuration** (For Image Management)

#### 5. **Cloudinary Cloud Name** (Public)
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```
- **Purpose**: Public cloud name for frontend image URLs
- **Where to get**: Cloudinary Dashboard → Settings → General

#### 6. **Cloudinary API Key** (Server-side)
```bash
CLOUDINARY_API_KEY=your-api-key
```
- **Purpose**: Server-side image uploads and transformations

#### 7. **Cloudinary API Secret** (Server-side)
```bash
CLOUDINARY_API_SECRET=your-api-secret
```
- **Purpose**: Secure server-side image operations

### 📧 **Email Configuration** (Optional - For Contact Forms)

#### 8. **Email Server Settings**
```bash
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@jhatikasafar.com
```

## 🔧 **How to Set Environment Variables in Vercel**

### **Method 1: Vercel Dashboard (Recommended)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://username:password@cluster.mongodb.net/jhatika-sofor`
   - **Environment**: Select `Production`, `Preview`, `Development` as needed
5. Click **Save**

### **Method 2: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add SITE_URL
# ... add other variables

# Deploy
vercel --prod
```

## 📝 **Complete Environment Variables List**

### **For Production Deployment:**
```bash
# Database (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jhatika-sofor?retryWrites=true&w=majority

# Authentication (REQUIRED)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Site Configuration (RECOMMENDED)
SITE_URL=https://jhatika-sofor.vercel.app
NEXT_PUBLIC_BASE_URL=https://jhatika-sofor.vercel.app

# Cloudinary (OPTIONAL - For image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (OPTIONAL - For contact forms)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@jhatikasafar.com
```

## 🚨 **Security Best Practices**

### **1. JWT Secret Generation**
```bash
# Generate a secure JWT secret
openssl rand -base64 32
```

### **2. MongoDB Security**
- Use a dedicated database user (not admin)
- Enable IP whitelisting in MongoDB Atlas
- Use strong passwords
- Enable MongoDB authentication

### **3. Environment Variable Security**
- Never commit `.env` files to git
- Use different secrets for development/production
- Regularly rotate secrets
- Use Vercel's environment variable encryption

## 🔍 **Verification Checklist**

### **Before Deployment:**
- [ ] MongoDB URI is valid and accessible
- [ ] JWT_SECRET is generated securely
- [ ] SITE_URL matches your Vercel domain
- [ ] Cloudinary credentials are correct (if using)
- [ ] Email settings are configured (if using)

### **After Deployment:**
- [ ] Test database connection
- [ ] Test authentication (login/register)
- [ ] Test image uploads (if using Cloudinary)
- [ ] Test contact form (if using email)
- [ ] Check sitemap generation

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### 1. **MongoDB Connection Failed**
```bash
Error: connect ECONNREFUSED
```
**Solution**: Check MongoDB URI and network access in Atlas

#### 2. **JWT Verification Failed**
```bash
Error: invalid token
```
**Solution**: Ensure JWT_SECRET is set correctly

#### 3. **Image Upload Failed**
```bash
Error: Cloudinary configuration missing
```
**Solution**: Set all Cloudinary environment variables

#### 4. **Build Failed**
```bash
Error: Environment variable not found
```
**Solution**: Ensure all required variables are set in Vercel

## 📚 **Additional Resources**

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Cloudinary Setup](https://cloudinary.com/documentation/node_integration)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Last Updated**: January 2025
**Version**: 1.0.0
