import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import Booking from '@/models/Booking'
import Tour from '@/models/Tour'

// GET - Fetch admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get counts for different entities
    const [
      totalTours,
      activeTours,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalContactMessages,
      newContactMessages,
      totalRevenue
    ] = await Promise.all([
      Tour.countDocuments(),
      Tour.countDocuments({ status: 'active' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'completed' }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: 'new' }),
      Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ])
    ])

    // Get recent bookings (last 5)
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('customerName customerEmail tourTitle startDate totalPrice status')
      .lean()

    // Get recent contact messages (last 5)
    const recentContactMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt')
      .lean()

    // Get monthly revenue for the last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'completed'] },
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalPrice' },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ])

    const stats = {
      overview: {
        totalTours,
        activeTours,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        totalContactMessages,
        newContactMessages,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentBookings,
      recentContactMessages,
      monthlyRevenue
    }

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin statistics' },
      { status: 500 }
    )
  }
}
