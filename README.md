# Jhatika Sofor Travel Agency

A modern, full-stack travel agency website built with Next.js 15, featuring tour management, booking system, and admin panel.

## 🚀 Features

### Public Features
- **Tour Discovery**: Browse and search through available tours
- **Tour Details**: Detailed tour information with images, itineraries, and pricing
- **Booking System**: Easy tour booking with customer information
- **Contact Form**: Get in touch with the travel agency
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Authentication**: Secure admin login with JWT tokens
- **Dashboard**: Comprehensive admin dashboard with statistics
- **Tour Management**: Create, edit, delete, and manage tours
- **Booking Management**: View and manage customer bookings
- **Contact Management**: Handle customer inquiries and messages
- **Real-time Statistics**: Track bookings, tours, and customer interactions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary (configurable)
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Cloudinary account (optional, for image storage)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jhatika-sofor-travel-agency
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Database Setup

#### Create Admin User
```bash
npm run create-admin
```

#### Populate Sample Tours (Optional)
```bash
npm run populate-tours
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Default Admin Credentials

- **Email**: `admin@jhatikasofor.com`
- **Password**: `admin123`

**⚠️ Important**: Change these credentials in production!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── tours/         # Tour management
│   │   ├── bookings/      # Booking management
│   │   └── contact-messages/ # Contact form handling
│   ├── tours/             # Public tour pages
│   ├── booking/           # Booking page
│   ├── contact/           # Contact page
│   └── about/             # About page
├── components/            # Reusable components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   ├── ui/                # UI components
│   └── auth/              # Authentication components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── models/                # Mongoose models
├── types/                 # TypeScript type definitions
└── scripts/               # Database scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run create-admin` - Create default admin user
- `npm run populate-tours` - Add sample tour data

## 🗄️ Database Models

### Tour
- Title, description, pricing
- Images, destinations, highlights
- Itinerary with day-by-day details
- Category, difficulty, group size
- Status (active/inactive/draft)

### Booking
- Customer information
- Tour details and pricing
- Booking status and payment status
- Special requests and notes

### ContactMessage
- Customer inquiry details
- Status tracking (new/read/replied)
- Timestamps and metadata

### User
- Admin user management
- Authentication and authorization
- Role-based access control

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration
- `GET /api/auth/verify` - Verify JWT token

### Tours
- `GET /api/tours` - Get all tours (with filters)
- `POST /api/tours` - Create new tour
- `GET /api/tours/[id]` - Get tour by ID
- `PUT /api/tours/[id]` - Update tour
- `DELETE /api/tours/[id]` - Delete tour
- `GET /api/tours/slug/[slug]` - Get tour by slug

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking by ID
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Delete booking

### Contact Messages
- `GET /api/contact-messages` - Get all messages
- `POST /api/contact-messages` - Create new message
- `GET /api/contact-messages/[id]` - Get message by ID
- `PUT /api/contact-messages/[id]` - Update message
- `DELETE /api/contact-messages/[id]` - Delete message

### Admin
- `GET /api/admin/stats` - Get dashboard statistics

## 🎨 Customization

### Styling
The project uses Tailwind CSS v4. Customize the design by:
- Modifying `src/app/globals.css`
- Updating `tailwind.config.ts`
- Adding custom components in `src/components/`

### Tour Categories
Update tour categories in:
- `src/components/forms/TourForm.tsx`
- `src/data/tours.ts` (if using static data)

### Email Templates
Customize email templates in the contact form handler.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Protected admin routes
- CORS configuration
- Environment variable protection

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: admin@jhatikasofor.com

## 🔄 Version History

- **v1.0.0** - Initial release with basic tour management
- **v1.1.0** - Added booking system and admin panel
- **v1.2.0** - Enhanced UI/UX and mobile responsiveness
- **v1.3.0** - Added authentication and security features

---

**Made with ❤️ for Jhatika Sofor Travel Agency**