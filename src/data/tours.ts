import { Tour } from '@/types'

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Sundarbans Adventure',
    slug: 'sundarban-adventure',
    description: 'Explore the mysterious world of Sundarbans, the world\'s largest mangrove forest. Encounter Royal Bengal Tigers, crocodiles, and countless bird species.',
    shortDescription: 'Adventure in the world\'s largest mangrove forest',
    duration: 3,
    price: 15000,
    originalPrice: 18000,
        images: [
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center'
        ],
    destinations: ['Khulna', 'Sundarbans', 'Kotka'],
    highlights: [
      'Royal Bengal Tiger spotting opportunity',
      'Boat journey through mangrove forest',
      'Crocodile and deer watching experience',
      'Natural beauty of Sundarbans'
    ],
    itinerary: [
      {
        day: 1,
        title: 'From Khulna to Sundarbans',
        description: 'Journey from Khulna to Sundarbans by boat',
        activities: ['Boat journey', 'Enjoy natural beauty'],
        meals: ['Lunch', 'Dinner']
      },
      {
        day: 2,
        title: 'Sundarbans Adventure',
        description: 'Deep exploration of Sundarbans',
        activities: ['Tiger spotting', 'Bird watching', 'Crocodile watching'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'Return to Khulna',
        description: 'Return from Sundarbans to Khulna',
        activities: ['Memory sharing', 'Khulna city tour'],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    includes: [
      'Transportation from Khulna to Sundarbans',
      '2 nights accommodation',
      'All meals',
      'Boat journey',
      'Guide service',
      'Sundarbans entry fee'
    ],
    excludes: [
      'Personal expenses',
      'Tips',
      'Extra meals'
    ],
    difficulty: 'Moderate',
    groupSize: { min: 2, max: 12 },
    season: ['November', 'March'],
    category: 'Nature',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Cox\'s Bazar Beach',
    slug: 'cox-bazar-beach',
    description: 'Visit Cox\'s Bazar, the world\'s longest sea beach. Experience ocean waves, sunsets, and local culture.',
    shortDescription: 'Visit the world\'s longest sea beach',
    duration: 4,
    price: 12000,
    originalPrice: 15000,
        images: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center'
        ],
    destinations: ['Cox\'s Bazar', 'Himchari', 'Inani Beach'],
    highlights: [
      'World\'s longest sea beach',
      'Sunset viewing experience',
      'Local Rohingya culture',
      'Fresh seafood dining'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Cox\'s Bazar',
        description: 'Arrive at Cox\'s Bazar from Dhaka',
        activities: ['Hotel check-in', 'Beach visit'],
        meals: ['Lunch', 'Dinner']
      },
      {
        day: 2,
        title: 'Cox\'s Bazar Beach',
        description: 'Spend the day at the sea beach',
        activities: ['Beach walking', 'Sunset viewing', 'Local market visit'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'Himchari & Inani Beach',
        description: 'Visit Himchari Waterfall and Inani Beach',
        activities: ['Himchari Waterfall', 'Inani Beach', 'Local food'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 4,
        title: 'Return from Cox\'s Bazar',
        description: 'Return from Cox\'s Bazar to Dhaka',
        activities: ['Memory sharing', 'Shopping'],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    includes: [
      'Dhaka-Cox\'s Bazar-Dhaka transportation',
      '3 nights accommodation',
      'All meals',
      'Guide service',
      'All sightseeing entry fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips',
      'Extra meals'
    ],
    difficulty: 'Easy',
    groupSize: { min: 2, max: 20 },
    season: ['October', 'April'],
    category: 'Beach',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Sylhet Tea Gardens',
    slug: 'sylhet-tea-gardens',
    description: 'Visit the green tea gardens of Sylhet. Experience the aroma of tea leaves, mountain beauty, and local indigenous culture.',
    shortDescription: 'Sylhet tea gardens and mountain beauty',
    duration: 3,
    price: 10000,
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center'
        ],
    destinations: ['Sylhet', 'Sundarban Tea Garden', 'Jaflong'],
    highlights: [
      'Tea garden tour',
      'Tea leaf collection viewing',
      'Beauty of Jaflong',
      'Local indigenous culture'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Sylhet',
        description: 'Arrive at Sylhet from Dhaka',
        activities: ['Hotel check-in', 'Sylhet city tour'],
        meals: ['Lunch', 'Dinner']
      },
      {
        day: 2,
        title: 'Tea Garden Tour',
        description: 'Visit Sundarban Tea Garden',
        activities: ['Tea garden tour', 'Tea leaf collection', 'Tea processing viewing'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'Jaflong & Return',
        description: 'Visit Jaflong and return to Dhaka',
        activities: ['Jaflong visit', 'Enjoy mountain beauty'],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    includes: [
      'Dhaka-Sylhet-Dhaka transportation',
      '2 nights accommodation',
      'All meals',
      'Guide service',
      'All sightseeing entry fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips',
      'Extra meals'
    ],
    difficulty: 'Easy',
    groupSize: { min: 2, max: 15 },
    season: ['November', 'March'],
    category: 'Nature',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Rajshahi Mango Gardens',
    slug: 'rajshahi-mango-gardens',
    description: 'Visit the famous mango gardens of Rajshahi. Experience the taste of juicy mangoes, historical sites, and North Bengal culture.',
    shortDescription: 'Rajshahi mango gardens and historical sites',
    duration: 2,
    price: 8000,
        images: [
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center'
        ],
    destinations: ['Rajshahi', 'Puthia', 'Bagha Mosque'],
    highlights: [
      'Mango garden tour',
      'Fresh mango tasting',
      'Puthia Palace',
      'Bagha Mosque'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Rajshahi',
        description: 'Arrive at Rajshahi from Dhaka',
        activities: ['Hotel check-in', 'Mango garden tour'],
        meals: ['Lunch', 'Dinner']
      },
      {
        day: 2,
        title: 'Puthia & Return',
        description: 'Visit Puthia Palace and return to Dhaka',
        activities: ['Puthia Palace', 'Bagha Mosque', 'Local market'],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    includes: [
      'Dhaka-Rajshahi-Dhaka transportation',
      '1 night accommodation',
      'All meals',
      'Guide service',
      'All sightseeing entry fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips',
      'Extra meals'
    ],
    difficulty: 'Easy',
    groupSize: { min: 2, max: 12 },
    season: ['মে', 'জুন'],
    category: 'Cultural',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const featuredTours = tours.filter(tour => tour.featured)
export const getTourBySlug = (slug: string) => tours.find(tour => tour.slug === slug)
export const getToursByCategory = (category: string) => tours.filter(tour => tour.category === category)
