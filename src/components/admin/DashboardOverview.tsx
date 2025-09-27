'use client'

import { useState, useEffect } from 'react'
import {
  CalendarDaysIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalBookings: number
  totalTours: number
  totalMessages: number
  totalRevenue: number
  activeTours: number
  pendingBookings: number
  monthlyRevenue: number
  revenueGrowth: number
}

const statsCards = [
  {
    name: 'Total Bookings',
    value: '0',
    icon: CalendarDaysIcon,
    change: '+12%',
    changeType: 'positive',
    color: 'blue'
  },
  {
    name: 'Active Tours',
    value: '0',
    icon: MapIcon,
    change: '+3',
    changeType: 'positive',
    color: 'green'
  },
  {
    name: 'New Messages',
    value: '0',
    icon: ChatBubbleLeftRightIcon,
    change: '+5',
    changeType: 'positive',
    color: 'purple'
  },
  {
    name: 'Total Revenue',
    value: '৳0',
    icon: CurrencyDollarIcon,
    change: '+18%',
    changeType: 'positive',
    color: 'emerald'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'booking',
    message: 'New booking for Sundarbans Adventure',
    time: '2 minutes ago',
    icon: CalendarDaysIcon,
    color: 'blue'
  },
  {
    id: 2,
    type: 'message',
    message: 'Customer inquiry about Cox\'s Bazar tour',
    time: '15 minutes ago',
    icon: ChatBubbleLeftRightIcon,
    color: 'purple'
  },
  {
    id: 3,
    type: 'tour',
    message: 'Sylhet Tea Gardens tour updated',
    time: '1 hour ago',
    icon: MapIcon,
    color: 'green'
  },
  {
    id: 4,
    type: 'booking',
    message: 'Booking confirmed for Rajshahi Mango Gardens',
    time: '2 hours ago',
    icon: CalendarDaysIcon,
    color: 'blue'
  }
]

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalTours: 0,
    totalMessages: 0,
    totalRevenue: 0,
    activeTours: 0,
    pendingBookings: 0,
    monthlyRevenue: 0,
    revenueGrowth: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      
      // Fetch bookings
      const bookingsResponse = await fetch('/api/bookings')
      const bookingsData = await bookingsResponse.json()
      
      // Fetch tours
      const toursResponse = await fetch('/api/tours')
      const toursData = await toursResponse.json()
      
      // Fetch messages
      const messagesResponse = await fetch('/api/contact-messages')
      const messagesData = await messagesResponse.json()

      if (bookingsData.success && toursData.success && messagesData.success) {
        const bookings = bookingsData.data || []
        const tours = toursData.data || []
        const messages = messagesData.data || []

        // Calculate revenue
        const totalRevenue = bookings.reduce((sum: number, booking: any) => 
          sum + (booking.totalPrice || 0), 0
        )

        // Calculate monthly revenue (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        
        const monthlyRevenue = bookings
          .filter((booking: any) => new Date(booking.createdAt) >= thirtyDaysAgo)
          .reduce((sum: number, booking: any) => sum + (booking.totalPrice || 0), 0)

        setStats({
          totalBookings: bookings.length,
          totalTours: tours.length,
          totalMessages: messages.length,
          totalRevenue,
          activeTours: tours.filter((tour: any) => tour.status === 'active').length,
          pendingBookings: bookings.filter((booking: any) => booking.status === 'pending').length,
          monthlyRevenue,
          revenueGrowth: 18 // This would be calculated based on previous month
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            ...statsCards[0],
            value: stats.totalBookings.toString(),
            change: `+${stats.pendingBookings} pending`
          },
          {
            ...statsCards[1],
            value: stats.activeTours.toString(),
            change: `${stats.totalTours} total`
          },
          {
            ...statsCards[2],
            value: stats.totalMessages.toString(),
            change: 'New inquiries'
          },
          {
            ...statsCards[3],
            value: formatCurrency(stats.totalRevenue),
            change: `+${stats.revenueGrowth}%`
          }
        ].map((stat) => (
          <div key={stat.name} className="admin-stats-card hover-lift">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color).split(' ')[0]}`}>
                  <stat.icon className={`h-6 w-6 ${getColorClasses(stat.color).split(' ')[1]}`} />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium admin-text-muted truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold admin-text">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm">
                <span className={`font-medium ${getColorClasses(stat.color).split(' ')[1]}`}>
                  {stat.change}
                </span>
                <span className="admin-text-muted ml-1">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="admin-card-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium admin-text">Revenue Overview</h3>
            <div className="flex items-center text-sm text-green-600">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              +18% from last month
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="admin-text-muted">Chart will be implemented here</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card-lg p-6">
          <h3 className="text-lg font-medium admin-text mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getColorClasses(activity.color).split(' ')[0]}`}>
                          <activity.icon className={`h-4 w-4 ${getColorClasses(activity.color).split(' ')[1]}`} />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-900">{activity.message}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card-lg p-6">
        <h3 className="text-lg font-medium admin-text mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 admin-card hover-lift transition-all duration-200">
            <MapIcon className="h-6 w-6 text-green-600 mr-3" />
            <span className="text-sm font-medium admin-text">Add New Tour</span>
          </button>
          <button className="flex items-center p-4 admin-card hover-lift transition-all duration-200">
            <CalendarDaysIcon className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-sm font-medium admin-text">View Bookings</span>
          </button>
          <button className="flex items-center p-4 admin-card hover-lift transition-all duration-200">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-purple-600 mr-3" />
            <span className="text-sm font-medium admin-text">Check Messages</span>
          </button>
          <button className="flex items-center p-4 admin-card hover-lift transition-all duration-200">
            <ChartBarIcon className="h-6 w-6 text-emerald-600 mr-3" />
            <span className="text-sm font-medium admin-text">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  )
}
