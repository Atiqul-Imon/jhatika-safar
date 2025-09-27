export interface Tour {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  duration: number // in days
  price: number
  originalPrice?: number
  images: string[]
  destinations: string[]
  highlights: string[]
  itinerary: ItineraryDay[]
  includes: string
  excludes: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  groupSize: {
    min: number
    max: number
  }
  season: string
  category: string
  featured: boolean
  status: 'active' | 'inactive' | 'draft'
  createdAt: Date
  updatedAt: Date
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string
}

export interface Booking {
  id: string
  tourId: string
  tour: Tour
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  numberOfPeople: number
  startDate: Date
  endDate: Date
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  specialRequests?: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface NewsletterForm {
  email: string
}
