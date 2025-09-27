import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import Booking from '@/models/Booking'
import Tour from '@/models/Tour'

// GET - Fetch admin dashboard statistics
export async function GET() {
  try {
    await connectDB()
    
    // Optimized: Use aggregation pipeline to get all counts in a single query
    const [
      tourStats,
      bookingStats,
      messageStats,
      revenueData,
      recentBookings,
      recentContactMessages,
      monthlyRevenue
    ] = await Promise.all([
      // Get tour statistics
      Tour.aggregate([
        {
          $group: {
            _id: null,
            totalTours: { $sum: 1 },
            activeTours: {
              $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
            }
          }
        }
      ]),
      
      // Get booking statistics
      Booking.aggregate([
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            pendingBookings: {
              $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
            },
            pausedBookings: {
              $sum: { $cond: [{ $eq: ['$status', 'paused'] }, 1, 0] }
            },
            confirmedBookings: {
              $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
            },
            completedBookings: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
            }
          }
        }
      ]),
      
      // Get contact message statistics
      ContactMessage.aggregate([
        {
          $group: {
            _id: null,
            totalContactMessages: { $sum: 1 },
            newContactMessages: {
              $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
            }
          }
        }
      ]),
      
      // Get total revenue
      Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),
      
      // Get recent bookings (last 5)
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('customerName customerEmail tourTitle startDate totalPrice status')
        .lean(),
      
      // Get recent contact messages (last 5)
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email subject status createdAt')
        .lean(),
      
      // Get monthly revenue for the last 6 months
      (() => {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
        
        return Booking.aggregate([
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
      })()
    ])

    const stats = {
      overview: {
        totalTours: tourStats[0]?.totalTours || 0,
        activeTours: tourStats[0]?.activeTours || 0,
        totalBookings: bookingStats[0]?.totalBookings || 0,
        pendingBookings: bookingStats[0]?.pendingBookings || 0,
        pausedBookings: bookingStats[0]?.pausedBookings || 0,
        confirmedBookings: bookingStats[0]?.confirmedBookings || 0,
        completedBookings: bookingStats[0]?.completedBookings || 0,
        totalContactMessages: messageStats[0]?.totalContactMessages || 0,
        newContactMessages: messageStats[0]?.newContactMessages || 0,
        totalRevenue: revenueData[0]?.total || 0
      },
      recentBookings,
      recentContactMessages,
      monthlyRevenue
    }

    // Add cache headers for 5 minutes
    const response = NextResponse.json({
      success: true,
      data: stats
    })
    
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
    
    return response
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin statistics' },
      { status: 500 }
    )
  }
}
