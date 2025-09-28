/* eslint-disable @typescript-eslint/no-require-imports */
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
  },
  {
    title: "Bandarban Hill Station Adventure",
    slug: "bandarban-hill-station-adventure",
    description: "Explore the breathtaking hill stations of Bandarban, home to the highest peaks in Bangladesh. This 4-day adventure takes you through lush green hills, tribal villages, and stunning waterfalls. Experience the unique culture of indigenous communities and enjoy panoramic views from hilltops. Perfect for adventure seekers and nature enthusiasts.",
    shortDescription: "4-day hill station adventure in Bandarban",
    duration: 4,
    price: 18000,
    originalPrice: 22000,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
    ],
    destinations: ["Bandarban", "Nilgiri", "Chimbuk Hill", "Boga Lake"],
    highlights: [
      "Highest peaks in Bangladesh",
      "Tribal village visits",
      "Boga Lake exploration",
      "Nilgiri hill station",
      "Indigenous culture experience"
    ],
    category: "Adventure",
    featured: true,
    difficulty: "Challenging",
    groupSize: { min: 4, max: 12 },
    season: ["October", "November", "December", "January", "February", "March"],
    includes: [
      "Hill resort accommodation",
      "All meals",
      "Transportation",
      "Local guide",
      "Entry permits",
      "Trekking equipment"
    ],
    excludes: [
      "Personal expenses",
      "Camera fees",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Bandarban",
        description: "Travel from Dhaka to Bandarban and check into hill resort",
        activities: ["Scenic drive", "Local market visit", "Sunset viewing"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Hill resort"
      },
      {
        day: 2,
        title: "Nilgiri Hill Station",
        description: "Visit Nilgiri hill station and enjoy panoramic views",
        activities: ["Hill trekking", "Photography", "Local culture"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hill resort"
      },
      {
        day: 3,
        title: "Boga Lake & Chimbuk Hill",
        description: "Explore Boga Lake and trek to Chimbuk Hill",
        activities: ["Lake exploration", "Hill trekking", "Tribal village visit"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hill resort"
      },
      {
        day: 4,
        title: "Return Journey",
        description: "Morning exploration and return to Dhaka",
        activities: ["Final hill walk", "Local shopping"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "None"
      }
    ]
  },
  {
    title: "Rangamati Lake City Tour",
    slug: "rangamati-lake-city-tour",
    description: "Discover the beautiful lake city of Rangamati, surrounded by hills and water. This 3-day tour offers boat rides on Kaptai Lake, visits to tribal villages, and exploration of the unique floating market. Experience the peaceful atmosphere and learn about the local Chakma culture. Perfect for those seeking tranquility and cultural immersion.",
    shortDescription: "3-day lake city tour in Rangamati",
    duration: 3,
    price: 14000,
    originalPrice: 17000,
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    destinations: ["Rangamati", "Kaptai Lake", "Hanging Bridge", "Tribal Museum"],
    highlights: [
      "Kaptai Lake boat ride",
      "Floating market visit",
      "Hanging Bridge walk",
      "Chakma culture experience",
      "Tribal museum tour"
    ],
    category: "Cultural",
    featured: false,
    difficulty: "Easy",
    groupSize: { min: 2, max: 18 },
    season: ["October", "November", "December", "January", "February", "March", "April"],
    includes: [
      "Lake resort accommodation",
      "All meals",
      "Boat transportation",
      "Local guide",
      "Entry fees",
      "Cultural show"
    ],
    excludes: [
      "Personal expenses",
      "Handicraft purchase",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rangamati",
        description: "Arrive in Rangamati and check into lake resort",
        activities: ["Lake view", "Local market", "Cultural show"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Lake resort"
      },
      {
        day: 2,
        title: "Kaptai Lake Exploration",
        description: "Full day boat ride on Kaptai Lake and floating market",
        activities: ["Boat ride", "Floating market", "Island visit"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Lake resort"
      },
      {
        day: 3,
        title: "Cultural Sites & Departure",
        description: "Visit hanging bridge, tribal museum and return",
        activities: ["Hanging bridge", "Museum tour", "Local shopping"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "None"
      }
    ]
  },
  {
    title: "Saint Martin's Island Paradise",
    slug: "saint-martins-island-paradise",
    description: "Escape to the only coral island of Bangladesh, Saint Martin's Island. This 3-day island getaway offers pristine beaches, crystal clear waters, and amazing coral reefs. Enjoy snorkeling, beach activities, and fresh seafood. Experience the unique island life and witness stunning sunrises and sunsets. Perfect for beach lovers and water sports enthusiasts.",
    shortDescription: "3-day coral island paradise at Saint Martin's",
    duration: 3,
    price: 16000,
    originalPrice: 20000,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
    ],
    destinations: ["Saint Martin's Island", "Coral Reef", "Chera Dwip"],
    highlights: [
      "Only coral island in Bangladesh",
      "Snorkeling and diving",
      "Fresh seafood cuisine",
      "Coral reef exploration",
      "Island sunset views"
    ],
    category: "Beach",
    featured: true,
    difficulty: "Easy",
    groupSize: { min: 2, max: 20 },
    season: ["October", "November", "December", "January", "February", "March"],
    includes: [
      "Island resort accommodation",
      "All meals",
      "Boat transportation",
      "Snorkeling equipment",
      "Local guide",
      "Entry permits"
    ],
    excludes: [
      "Diving equipment rental",
      "Personal shopping",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Saint Martin's",
        description: "Travel from Cox's Bazar to Saint Martin's Island",
        activities: ["Boat journey", "Island exploration", "Sunset viewing"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Island resort"
      },
      {
        day: 2,
        title: "Coral Reef & Chera Dwip",
        description: "Snorkeling, coral reef exploration and Chera Dwip visit",
        activities: ["Snorkeling", "Coral viewing", "Island hopping"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Island resort"
      },
      {
        day: 3,
        title: "Return Journey",
        description: "Morning beach activities and return to mainland",
        activities: ["Beach walk", "Final snorkeling", "Shopping"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "None"
      }
    ]
  },
  {
    title: "Dhaka Heritage Walk",
    slug: "dhaka-heritage-walk",
    description: "Explore the rich history and culture of Dhaka, the capital city of Bangladesh. This 2-day heritage tour takes you through ancient monuments, historical sites, and cultural landmarks. Visit Lalbagh Fort, Ahsan Manzil, and experience the vibrant Old Dhaka. Perfect for history enthusiasts and cultural explorers.",
    shortDescription: "2-day heritage walk through historical Dhaka",
    duration: 2,
    price: 8000,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
    ],
    destinations: ["Lalbagh Fort", "Ahsan Manzil", "Old Dhaka", "Star Mosque"],
    highlights: [
      "Lalbagh Fort exploration",
      "Ahsan Manzil palace tour",
      "Old Dhaka street food",
      "Star Mosque visit",
      "Historical architecture"
    ],
    category: "Cultural",
    featured: false,
    difficulty: "Easy",
    groupSize: { min: 2, max: 15 },
    season: ["October", "November", "December", "January", "February", "March", "April"],
    includes: [
      "Hotel accommodation",
      "All meals",
      "Transportation",
      "Local guide",
      "Entry fees",
      "Cultural experiences"
    ],
    excludes: [
      "Personal expenses",
      "Shopping",
      "Tips",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Historical Monuments",
        description: "Visit Lalbagh Fort, Ahsan Manzil and historical sites",
        activities: ["Fort exploration", "Palace tour", "Historical walk"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Hotel"
      },
      {
        day: 2,
        title: "Old Dhaka & Departure",
        description: "Explore Old Dhaka, Star Mosque and local culture",
        activities: ["Old Dhaka walk", "Mosque visit", "Street food"],
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
