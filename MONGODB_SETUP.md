# MongoDB Atlas Setup Guide

## 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

## 2. Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Set privileges to "Read and write to any database"

## 3. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Add your current IP address or use "0.0.0.0/0" for all IPs (less secure but easier for development)

## 4. Get Connection String
1. Go to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## 5. Set Environment Variables
Create a `.env.local` file in your project root with:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/jhatika-sofor?retryWrites=true&w=majority
```

Replace:
- `<username>` with your database username
- `<password>` with your database password
- `<cluster-url>` with your cluster URL

## 6. Database Collections
The application will automatically create these collections:
- `contactmessages` - Contact form submissions
- `bookings` - Tour bookings
- `tours` - Tour packages

## 7. Admin Panel Features
Once set up, the admin panel will allow you to:
- View dashboard statistics
- Manage contact messages (mark as read, replied, archived)
- Manage bookings (confirm, complete, cancel)
- Manage tour packages (create, edit, delete)
- View real-time data from MongoDB Atlas

## 8. Testing the Setup
1. Start your development server: `npm run dev`
2. Go to `/admin` to access the admin panel
3. Submit a contact form to test the database connection
4. Check the admin panel to see the new contact message

## Troubleshooting
- Make sure your IP address is whitelisted in Network Access
- Verify your database user has read/write permissions
- Check that the connection string is correct in `.env.local`
- Ensure the database name in the connection string matches your project
