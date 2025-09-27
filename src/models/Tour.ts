import mongoose, { Document, Schema } from 'mongoose'

export interface ITour extends Document {
  title: string
  slug: string
  description: string
  shortDescription: string
  duration: number
  price: number
  originalPrice?: number
  images: string[]
  destinations: string[]
  highlights: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    activities: string[]
    meals: string
  }>
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

const TourSchema = new Schema<ITour>({
  title: {
    type: String,
    required: [true, 'Tour title is required'],
    trim: true,
    maxlength: [200, 'Tour title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Tour slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Tour description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Short description cannot be more than 300 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 day'],
    max: [30, 'Duration cannot be more than 30 days']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  images: [{
    type: String,
    required: true
  }],
  destinations: [{
    type: String,
    required: true,
    trim: true
  }],
  highlights: [{
    type: String,
    required: true,
    trim: true
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true,
      min: 1
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    activities: [{
      type: String,
      required: true,
      trim: true
    }],
    meals: {
      type: String,
      required: true,
      trim: true
    }
  }],
  includes: {
    type: String,
    required: [true, 'Includes information is required'],
    trim: true
  },
  excludes: {
    type: String,
    required: [true, 'Excludes information is required'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty level is required']
  },
  groupSize: {
    min: {
      type: Number,
      required: [true, 'Minimum group size is required'],
      min: [1, 'Minimum group size must be at least 1']
    },
    max: {
      type: Number,
      required: [true, 'Maximum group size is required'],
      min: [1, 'Maximum group size must be at least 1']
    }
  },
  season: {
    type: String,
    required: [true, 'Season information is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  }
}, {
  timestamps: true
})

// Create indexes for better performance
TourSchema.index({ category: 1 })
TourSchema.index({ featured: 1 })
TourSchema.index({ status: 1 })
TourSchema.index({ price: 1 })
TourSchema.index({ createdAt: -1 })
// Compound indexes for complex queries
TourSchema.index({ status: 1, category: 1 })
TourSchema.index({ status: 1, featured: 1 })
TourSchema.index({ status: 1, createdAt: -1 })
TourSchema.index({ category: 1, price: 1 })

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema)
