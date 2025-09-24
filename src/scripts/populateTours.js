const mongoose = require('mongoose')

// Tour schema (simplified for script)
const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  destinations: [{ type: String }],
  highlights: [{ type: String }],
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive', 'draft'], default: 'active' },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Easy' },
  groupSize: {
    min: { type: Number, default: 2 },
    max: { type: Number, default: 20 }
  },
  season: [{ type: String }],
  includes: [{ type: String }],
  excludes: [{ type: String }],
  itinerary: [{
    day: { type: Number },
    title: { type: String },
    description: { type: String },
    activities: [{ type: String }],
    meals: [{ type: String }],
    accommodation: { type: String }
  }]
}, { timestamps: true })

const Tour = mongoose.model('Tour', tourSchema)

const sampleTours = [
  {
    title: "Sundarbans Wildlife Adventure",
    slug: "sundarbans-wildlife-adventure",
    description: "Experience the mystical beauty of the Sundarbans, the world's largest mangrove forest. This 3-day adventure takes you deep into the heart of the forest where you'll encounter the majestic Royal Bengal Tiger, spotted deer, and countless bird species. Cruise through narrow creeks, walk on wooden walkways, and witness the unique ecosystem that makes this UNESCO World Heritage Site so special.",
    shortDescription: "3-day adventure in the world's largest mangrove forest",
    duration: 3,
    price: 15000,
    originalPrice: 18000,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
    ],
    destinations: ["Sundarbans", "Kotka", "Karamjal"],
    highlights: [
      "Royal Bengal Tiger spotting",
      "Mangrove forest exploration",
      "Wildlife photography",
      "Traditional boat cruise",
      "Local community visit"
    ],
    category: "Nature",
    featured: true,
    difficulty: "Moderate",
    groupSize: { min: 4, max: 15 },
    season: ["October", "November", "December", "January", "February", "March"],
    includes: [
      "Accommodation in forest rest house",
      "All meals (breakfast, lunch, dinner)",
      "Boat transportation",
      "Forest guide",
      "Entry permits",
      "Basic first aid"
    ],
    excludes: [
      "Personal expenses",
      "Camera fees",
      "Tips for guide and staff",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Sundarbans",
        description: "Early morning departure from Dhaka to Khulna, then boat journey to Sundarbans",
        activities: ["Boat cruise", "Wildlife spotting", "Sunset photography"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Forest rest house"
      },
      {
        day: 2,
        title: "Deep Forest Exploration",
        description: "Full day exploration of the mangrove forest and wildlife spotting",
        activities: ["Tiger tracking", "Bird watching", "Mangrove walk"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Forest rest house"
      },
      {
        day: 3,
        title: "Return Journey",
        description: "Morning wildlife spotting and return to Dhaka",
        activities: ["Final wildlife spotting", "Local market visit"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "None"
      }
    ]
  },
  {
    title: "Cox's Bazar Beach Paradise",
    slug: "coxs-bazar-beach-paradise",
    description: "Relax and unwind at the world's longest natural sea beach. This 4-day beach getaway offers pristine sandy beaches, crystal clear waters, and stunning sunsets. Enjoy water sports, beach activities, and explore the local culture of Cox's Bazar. Perfect for families, couples, and solo travelers looking for a peaceful beach vacation.",
    shortDescription: "4-day beach paradise at the world's longest sea beach",
    duration: 4,
    price: 12000,
    originalPrice: 15000,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
    ],
    destinations: ["Cox's Bazar", "Inani Beach", "Himchari"],
    highlights: [
      "World's longest sea beach",
      "Sunset and sunrise views",
      "Water sports activities",
      "Local seafood cuisine",
      "Beach photography"
    ],
    category: "Beach",
    featured: true,
    difficulty: "Easy",
    groupSize: { min: 2, max: 25 },
    season: ["October", "November", "December", "January", "February", "March", "April"],
    includes: [
      "Beach resort accommodation",
      "All meals",
      "Transportation",
      "Beach activities",
      "Local guide",
      "Entry fees"
    ],
    excludes: [
      "Water sports equipment rental",
      "Personal shopping",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Cox's Bazar",
        description: "Arrive at Cox's Bazar and check into beach resort",
        activities: ["Beach walk", "Sunset viewing", "Local market visit"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Beach resort"
      },
      {
        day: 2,
        title: "Beach Activities",
        description: "Full day beach activities and water sports",
        activities: ["Swimming", "Beach volleyball", "Water sports"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beach resort"
      },
      {
        day: 3,
        title: "Inani Beach & Himchari",
        description: "Visit Inani Beach and Himchari waterfall",
        activities: ["Beach exploration", "Waterfall visit", "Photography"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beach resort"
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning beach walk and departure",
        activities: ["Final beach walk", "Shopping"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "None"
      }
    ]
  },
  {
    title: "Sylhet Tea Garden Tour",
    slug: "sylhet-tea-garden-tour",
    description: "Discover the lush green tea gardens of Sylhet, known as the tea capital of Bangladesh. This 3-day tour takes you through rolling hills covered with tea plantations, where you'll learn about tea production, visit local tea factories, and enjoy the serene beauty of the region. Perfect for nature lovers and those interested in learning about Bangladesh's tea industry.",
    shortDescription: "3-day tour of Sylhet's famous tea gardens",
    duration: 3,
    price: 10000,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
    ],
    destinations: ["Sylhet", "Srimangal", "Jaflong"],
    highlights: [
      "Tea garden exploration",
      "Tea factory visit",
      "Seven Sisters Waterfall",
      "Jaflong stone collection",
      "Local tea tasting"
    ],
    category: "Nature",
    featured: false,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    season: ["October", "November", "December", "January", "February", "March", "April"],
    includes: [
      "Hotel accommodation",
      "All meals",
      "Transportation",
      "Tea garden entry",
      "Local guide",
      "Tea factory tour"
    ],
    excludes: [
      "Personal expenses",
      "Tea purchase",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sylhet",
        description: "Arrive in Sylhet and visit local tea gardens",
        activities: ["Tea garden walk", "Tea tasting", "Local market"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Hotel"
      },
      {
        day: 2,
        title: "Srimangal Tea Gardens",
        description: "Full day exploration of Srimangal tea gardens and factory",
        activities: ["Tea factory tour", "Garden exploration", "Photography"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hotel"
      },
      {
        day: 3,
        title: "Jaflong & Departure",
        description: "Visit Jaflong and return journey",
        activities: ["Jaflong visit", "Stone collection", "Waterfall"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "None"
      }
    ]
  }
]

async function populateTours() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://imonatikulislam_db_user:LP94MgwLcJyX40et@cluster0.8dnnvij.mongodb.net/jhatika-sofor?retryWrites=true&w=majority&appName=Cluster0'
    
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // Clear existing tours
    await Tour.deleteMany({})
    console.log('Cleared existing tours')

    // Insert sample tours
    const insertedTours = await Tour.insertMany(sampleTours)
    console.log(`✅ Inserted ${insertedTours.length} tours successfully!`)
    
    insertedTours.forEach(tour => {
      console.log(`- ${tour.title} (${tour.slug})`)
    })

  } catch (error) {
    console.error('Error populating tours:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

// Run the script
populateTours()
