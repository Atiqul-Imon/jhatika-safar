import { Tour } from '@/types'

export const featuredTours: Tour[] = [
  {
    id: '1',
    title: 'Sundarbans Adventure',
    slug: 'sundarbans-adventure',
    description: 'Explore the world\'s largest mangrove forest and witness the majestic Royal Bengal Tiger in its natural habitat.',
    shortDescription: 'A 3-day adventure in the Sundarbans mangrove forest to see tigers, crocodiles, and diverse wildlife.',
    duration: 3,
    price: 15000,
    originalPrice: 18000,
    images: [
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg',
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg'
    ],
    destinations: ['Sundarbans', 'Khulna'],
    highlights: [
      'Royal Bengal Tiger spotting',
      'Mangrove forest exploration',
      'Wildlife photography',
      'Traditional boat journey',
      'Local culture experience'
    ],
    itinerary: [
      {
        day: 1,
        title: 'From Khulna to Sundarbans',
        description: 'Journey from Khulna to Sundarbans by boat',
        activities: ['Boat journey', 'Enjoy natural beauty'],
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Sundarbans Adventure',
        description: 'Deep exploration of Sundarbans',
        activities: ['Tiger spotting', 'Bird watching', 'Crocodile watching'],
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Return Journey',
        description: 'Return from Sundarbans to Khulna',
        activities: ['Memory sharing', 'Khulna city tour'],
        meals: 'Breakfast, Lunch'
      }
    ],
    includes: 'Transportation from Khulna to Sundarbans\n2 nights accommodation\nAll meals\nBoat journey\nGuide service\nSundarbans entry fee',
    excludes: 'Personal expenses\nTips\nExtra meals',
    difficulty: 'Moderate',
    groupSize: { min: 2, max: 12 },
    season: 'November, March',
    category: 'Nature',
    featured: true,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Cox\'s Bazar Beach Paradise',
    slug: 'coxs-bazar-beach-paradise',
    description: 'Experience the longest sea beach in the world with golden sands, crystal clear water, and amazing sunset views.',
    shortDescription: 'A relaxing 4-day beach vacation at Cox\'s Bazar, the world\'s longest natural sea beach.',
    duration: 4,
    price: 12000,
    originalPrice: 15000,
    images: [
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg',
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg'
    ],
    destinations: ['Cox\'s Bazar', 'Dhaka'],
    highlights: [
      'World\'s longest sea beach',
      'Sunset and sunrise views',
      'Beach activities',
      'Local seafood',
      'Relaxing atmosphere'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Cox\'s Bazar',
        description: 'Arrive at Cox\'s Bazar and check-in',
        activities: ['Beach walk', 'Evening relaxation'],
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Beach Day',
        description: 'Full day beach activities',
        activities: ['Swimming', 'Beach games', 'Photography'],
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Local Exploration',
        description: 'Explore local attractions',
        activities: ['Himchari Waterfall', 'Inani Beach', 'Shopping'],
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Return from Cox\'s Bazar to Dhaka',
        activities: ['Memory sharing', 'Shopping'],
        meals: 'Breakfast, Lunch'
      }
    ],
    includes: 'Dhaka-Cox\'s Bazar-Dhaka transportation\n3 nights accommodation\nAll meals\nGuide service\nAll sightseeing entry fees',
    excludes: 'Personal expenses\nTips\nExtra meals',
    difficulty: 'Easy',
    groupSize: { min: 2, max: 20 },
    season: 'October, April',
    category: 'Beach',
    featured: true,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Sylhet Tea Gardens',
    slug: 'sylhet-tea-gardens',
    description: 'Discover the beautiful tea gardens of Sylhet and experience the rich culture of tea cultivation.',
    shortDescription: 'A 3-day journey through the scenic tea gardens of Sylhet with cultural experiences.',
    duration: 3,
    price: 18000,
    originalPrice: 20000,
    images: [
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg',
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg'
    ],
    destinations: ['Sylhet', 'Srimangal'],
    highlights: [
      'Tea garden tours',
      'Tea tasting',
      'Hill station views',
      'Local culture',
      'Natural beauty'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Sylhet',
        description: 'Arrive at Sylhet and visit tea gardens',
        activities: ['Tea garden tour', 'Tea tasting'],
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Srimangal Exploration',
        description: 'Explore Srimangal tea gardens',
        activities: ['Garden walk', 'Local market visit'],
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Return Journey',
        description: 'Return from Sylhet to Dhaka',
        activities: ['Memory sharing', 'Shopping'],
        meals: 'Breakfast, Lunch'
      }
    ],
    includes: 'Dhaka-Sylhet-Dhaka transportation\n2 nights accommodation\nAll meals\nGuide service\nTea garden entry fees',
    excludes: 'Personal expenses\nTips\nExtra meals',
    difficulty: 'Easy',
    groupSize: { min: 2, max: 15 },
    season: 'November, March',
    category: 'Nature',
    featured: true,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Bandarban Hill Station',
    slug: 'bandarban-hill-station',
    description: 'Experience the beautiful hill stations of Bandarban with tribal culture and natural beauty.',
    shortDescription: 'A 4-day adventure in the hill stations of Bandarban with tribal experiences.',
    duration: 4,
    price: 20000,
    originalPrice: 22000,
    images: [
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg',
      'https://res.cloudinary.com/db5yniogx/image/upload/v1758746643/manujhatikasofor_gbbhs6.jpg'
    ],
    destinations: ['Bandarban', 'Chittagong'],
    highlights: [
      'Hill station views',
      'Tribal culture',
      'Natural waterfalls',
      'Adventure activities',
      'Photography'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Bandarban',
        description: 'Arrive at Bandarban and check-in',
        activities: ['Hill station tour', 'Local culture'],
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Tribal Village Visit',
        description: 'Visit tribal villages',
        activities: ['Cultural exchange', 'Traditional food'],
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Waterfall Adventure',
        description: 'Visit natural waterfalls',
        activities: ['Waterfall trek', 'Swimming'],
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Return Journey',
        description: 'Return from Bandarban to Dhaka',
        activities: ['Memory sharing', 'Shopping'],
        meals: 'Breakfast, Lunch'
      }
    ],
    includes: 'Dhaka-Bandarban-Dhaka transportation\n3 nights accommodation\nAll meals\nGuide service\nAll entry fees',
    excludes: 'Personal expenses\nTips\nExtra meals',
    difficulty: 'Hard',
    groupSize: { min: 2, max: 10 },
    season: 'মে, জুন',
    category: 'Adventure',
    featured: true,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
