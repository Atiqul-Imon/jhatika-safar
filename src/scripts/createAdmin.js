/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User schema (simplified for script)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

async function createAdminUser() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://imonatikulislam_db_user:LP94MgwLcJyX40et@cluster0.8dnnvij.mongodb.net/jhatika-sofor?retryWrites=true&w=majority&appName=Cluster0'
    
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@jhatikasofor.com' })
    
    if (existingAdmin) {
      console.log('Admin user already exists!')
      console.log('Email: admin@jhatikasofor.com')
      console.log('Password: admin123')
      return
    }

    // Create admin user
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash('admin123', salt)

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@jhatikasofor.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    })

    await adminUser.save()
    
    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@jhatikasofor.com')
    console.log('Password: admin123')
    console.log('Role: admin')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

// Run the script
createAdminUser()
