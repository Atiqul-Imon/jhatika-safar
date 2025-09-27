const mongoose = require('mongoose')

// Database optimization script to create indexes for better performance
async function optimizeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jhatika-sofor')
    console.log('Connected to MongoDB')

    const db = mongoose.connection.db

    // Create compound indexes for Tours collection
    console.log('Creating indexes for Tours collection...')
    
    await db.collection('tours').createIndex({ status: 1, category: 1 })
    await db.collection('tours').createIndex({ status: 1, featured: 1 })
    await db.collection('tours').createIndex({ status: 1, createdAt: -1 })
    await db.collection('tours').createIndex({ category: 1, price: 1 })
    
    console.log('✅ Tour indexes created successfully')

    // Create compound indexes for Bookings collection
    console.log('Creating indexes for Bookings collection...')
    
    await db.collection('bookings').createIndex({ status: 1, paymentStatus: 1 })
    await db.collection('bookings').createIndex({ status: 1, createdAt: -1 })
    await db.collection('bookings').createIndex({ tourId: 1, status: 1 })
    await db.collection('bookings').createIndex({ customerEmail: 1, status: 1 })
    
    console.log('✅ Booking indexes created successfully')

    // Create compound indexes for ContactMessages collection
    console.log('Creating indexes for ContactMessages collection...')
    
    await db.collection('contactmessages').createIndex({ status: 1, createdAt: -1 })
    await db.collection('contactmessages').createIndex({ email: 1, status: 1 })
    
    console.log('✅ ContactMessage indexes created successfully')

    // Display index information
    console.log('\n📊 Database Indexes Summary:')
    
    const tourIndexes = await db.collection('tours').indexes()
    console.log(`Tours collection: ${tourIndexes.length} indexes`)
    
    const bookingIndexes = await db.collection('bookings').indexes()
    console.log(`Bookings collection: ${bookingIndexes.length} indexes`)
    
    const messageIndexes = await db.collection('contactmessages').indexes()
    console.log(`ContactMessages collection: ${messageIndexes.length} indexes`)

    console.log('\n🚀 Database optimization completed successfully!')
    
  } catch (error) {
    console.error('❌ Error optimizing database:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// Run the optimization
if (require.main === module) {
  optimizeDatabase()
}

module.exports = optimizeDatabase
