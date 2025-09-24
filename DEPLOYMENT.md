# Deployment Guide

This guide will help you deploy the Jhatika Sofor Travel Agency website to various platforms.

## 🚀 Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas database

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be available at `https://your-project.vercel.app`

## 🌐 Netlify Deployment

### Steps

1. **Build Configuration**
   Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   - Connect GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables in Netlify dashboard

## 🚂 Railway Deployment

### Steps

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Configure Environment**
   - Add environment variables in Railway dashboard
   - Railway will automatically detect Next.js

3. **Deploy**
   - Railway will automatically deploy on push to main branch

## ☁️ DigitalOcean App Platform

### Steps

1. **Create App**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub

2. **Configure Build**
   - Build command: `npm run build`
   - Run command: `npm start`
   - Source directory: `/`

3. **Environment Variables**
   - Add all required environment variables
   - Deploy the application

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t jhatika-sofor .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  -e JWT_SECRET="your-jwt-secret" \
  jhatika-sofor
```

## 🔧 Environment Variables

### Required Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
JWT_SECRET=your-super-secret-jwt-key-here
```

### Optional Variables
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🗄️ Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster
   - Choose your preferred region

2. **Database Access**
   - Create a database user
   - Set appropriate permissions

3. **Network Access**
   - Add your IP address or use 0.0.0.0/0 for all IPs (less secure)

4. **Connection String**
   - Get connection string from Atlas
   - Replace `<password>` with your user password
   - Replace `<dbname>` with your database name

### Local MongoDB (Development)

```bash
# Install MongoDB
brew install mongodb/brew/mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Connection string
MONGODB_URI=mongodb://localhost:27017/jhatika-sofor
```

## 🔐 Security Considerations

### Production Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB authentication
- [ ] Set up proper firewall rules
- [ ] Regular security updates

### JWT Secret Generation

```bash
# Generate strong JWT secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 📊 Monitoring and Analytics

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance and usage

### MongoDB Atlas Monitoring
- Use Atlas built-in monitoring
- Set up alerts for performance issues

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify MongoDB URI format
   - Check network access settings
   - Ensure database user has proper permissions

3. **Environment Variables**
   - Verify all required variables are set
   - Check variable names and values
   - Restart application after changes

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Clear browser cache and localStorage

### Support

For deployment issues:
- Check platform-specific documentation
- Review application logs
- Create an issue in the GitHub repository

---

**Happy Deploying! 🚀**
