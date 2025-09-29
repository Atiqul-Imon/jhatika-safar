import mongoose, { Document, Schema } from 'mongoose'

export interface IBooking extends Document {
  customerName: string
  customerEmail: string
  customerPhone: string
  tourId: string
  tourTitle: string
  numberOfPeople: number
  startDate: Date
  endDate?: Date
  totalPrice: number
  status: 'pending' | 'paused' | 'confirmed' | 'completed' | 'cancelled'
  specialRequests?: string
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Customer name cannot be more than 100 characters']
  },
  customerEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot be more than 20 characters'],
    match: [/^(\+880|880|0)?1[3-9]\d{8}$/, 'Please enter a valid Bangladeshi phone number']
  },
  tourId: {
    type: String,
    required: [true, 'Tour ID is required']
  },
  tourTitle: {
    type: String,
    required: [true, 'Tour title is required'],
    trim: true
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Number of people is required'],
    min: [1, 'At least 1 person is required'],
    max: [50, 'Maximum 50 people allowed']
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'paused', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requests cannot be more than 500 characters']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
})

// Create indexes for better performance
BookingSchema.index({ customerEmail: 1 })
BookingSchema.index({ tourId: 1 })
BookingSchema.index({ status: 1 })
BookingSchema.index({ startDate: 1 })
BookingSchema.index({ createdAt: -1 })
// Compound indexes for complex queries
BookingSchema.index({ status: 1, paymentStatus: 1 })
BookingSchema.index({ status: 1, createdAt: -1 })
BookingSchema.index({ tourId: 1, status: 1 })
BookingSchema.index({ customerEmail: 1, status: 1 })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
