# Authentication System Setup Guide

## Overview
This guide will help you set up the authentication system for the Jhatika Sofor travel agency website. The system includes:

- **JWT-based authentication** with localStorage
- **Protected admin routes** with role-based access
- **User management** with MongoDB
- **Secure password hashing** with bcrypt
- **Login/logout functionality**

## Prerequisites
- MongoDB Atlas connection configured
- Node.js 18+ installed
- All dependencies installed

## Setup Steps

### 1. Install Dependencies
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 2. Environment Variables
Add these variables to your `.env.local` file:

```env
# MongoDB Connection (already configured)
MONGODB_URI=mongodb+srv://imonatikulislam_db_user:LP94MgwLcJyX40et@cluster0.8dnnvij.mongodb.net/jhatika-sofor?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (IMPORTANT: Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Next.js Environment
NODE_ENV=development
```

### 3. Create Admin User
Run the following command to create the default admin user:

```bash
npm run create-admin
```

This will create an admin user with:
- **Email:** admin@jhatikasofor.com
- **Password:** admin123
- **Role:** admin

### 4. Start the Application
```bash
npm run dev
```

## Authentication Features

### 🔐 Login System
- **Login Page:** `/login`
- **Protected Routes:** `/admin/*`
- **JWT Tokens:** Stored in localStorage
- **Auto-redirect:** Authenticated users redirected to admin panel

### 👤 User Management
- **User Model:** MongoDB schema with validation
- **Password Hashing:** bcrypt with salt rounds
- **Role-based Access:** admin/user roles
- **Session Management:** JWT with 7-day expiration

### 🛡️ Security Features
- **Password Validation:** Minimum 6 characters
- **Email Validation:** Proper email format
- **Token Verification:** Server-side JWT validation
- **Protected Routes:** Middleware-based protection
- **Logout Functionality:** Clear localStorage and redirect

## Usage

### Accessing Admin Panel
1. Navigate to `http://localhost:3000/login`
2. Use the demo credentials:
   - **Email:** admin@jhatikasofor.com
   - **Password:** admin123
3. You'll be redirected to `/admin` upon successful login

### Admin Panel Features
- **Dashboard Overview:** Statistics and recent activity
- **Contact Messages:** Manage customer inquiries
- **Bookings:** Handle tour bookings
- **Tours:** Manage tour packages
- **User Info:** Display logged-in user details
- **Logout:** Secure logout functionality

### API Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/register` - User registration

## File Structure
```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx   # Route protection component
├── models/
│   └── User.ts                  # User database model
├── app/
│   ├── api/auth/
│   │   ├── login/route.ts       # Login API
│   │   ├── verify/route.ts      # Token verification
│   │   └── register/route.ts    # Registration API
│   ├── login/
│   │   └── page.tsx             # Login page
│   └── admin/
│       └── page.tsx             # Protected admin panel
├── middleware.ts                # Route protection middleware
└── scripts/
    └── createAdmin.js           # Admin user creation script
```

## Security Considerations

### Production Deployment
1. **Change JWT Secret:** Use a strong, random secret
2. **HTTPS Only:** Ensure all communication is encrypted
3. **Environment Variables:** Never commit secrets to version control
4. **Rate Limiting:** Implement API rate limiting
5. **Input Validation:** Validate all user inputs
6. **Error Handling:** Don't expose sensitive information in errors

### Best Practices
- **Password Policy:** Enforce strong passwords
- **Session Timeout:** Implement automatic logout
- **Audit Logging:** Log authentication events
- **Regular Updates:** Keep dependencies updated
- **Security Headers:** Implement security headers

## Troubleshooting

### Common Issues

1. **"User not found" Error**
   - Ensure admin user was created successfully
   - Check MongoDB connection
   - Verify email spelling

2. **"Invalid token" Error**
   - Clear localStorage and login again
   - Check JWT_SECRET environment variable
   - Verify token expiration

3. **"Access Denied" Error**
   - Ensure user has admin role
   - Check user.isActive status
   - Verify route protection

4. **Database Connection Issues**
   - Verify MONGODB_URI in .env.local
   - Check MongoDB Atlas network access
   - Ensure database user has proper permissions

### Debug Steps
1. Check browser console for errors
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas logs
5. Validate JWT token manually

## Support
If you encounter any issues:
1. Check the troubleshooting section
2. Verify all setup steps were completed
3. Check the browser console for errors
4. Ensure all dependencies are installed
5. Verify MongoDB connection is working

## Next Steps
- Customize the login page design
- Add user registration functionality
- Implement password reset feature
- Add user profile management
- Set up email notifications
- Implement audit logging
