'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'

interface AnalyticsData {
  overview: {
    totalTours: number
    activeTours: number
    totalBookings: number
    pendingBookings: number
    pausedBookings: number
    confirmedBookings: number
    completedBookings: number
    totalContactMessages: number
    newContactMessages: number
    totalRevenue: number
  }
  recentBookings: any[]
  recentContactMessages: any[]
  monthlyRevenue: any[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('6months')

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/stats')
      const result = await response.json()
      
      if (result.success) {
        setAnalyticsData(result.data)
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Analytics" subtitle="Detailed analytics and insights">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AdminLayout title="Analytics" subtitle="Detailed analytics and insights">
        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {analyticsData?.overview.totalBookings || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 px-5 py-3 border-t border-blue-200">
              <div className="text-sm">
                <span className="font-medium text-blue-600">
                  {analyticsData?.overview.pendingBookings || 0} pending
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {formatCurrency(analyticsData?.overview.totalRevenue || 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-green-50 px-5 py-3 border-t border-green-200">
              <div className="text-sm">
                <span className="font-medium text-green-600">
                  {analyticsData?.overview.completedBookings || 0} completed
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Tours</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {analyticsData?.overview.activeTours || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 px-5 py-3 border-t border-purple-200">
              <div className="text-sm">
                <span className="font-medium text-purple-600">
                  {analyticsData?.overview.totalTours || 0} total
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">New Messages</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {analyticsData?.overview.newContactMessages || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 px-5 py-3 border-t border-orange-200">
              <div className="text-sm">
                <span className="font-medium text-orange-600">
                  {analyticsData?.overview.totalContactMessages || 0} total
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                +12% from last month
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart will be implemented here</p>
                <p className="text-sm text-gray-400 mt-1">
                  {analyticsData?.monthlyRevenue?.length || 0} data points available
                </p>
              </div>
            </div>
          </div>

          {/* Booking Status Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Status Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {analyticsData?.overview.pendingBookings || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Paused</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {analyticsData?.overview.pausedBookings || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Confirmed</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {analyticsData?.overview.confirmedBookings || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {analyticsData?.overview.completedBookings || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Bookings</h3>
            <div className="space-y-4">
              {analyticsData?.recentBookings?.map((booking, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                    <p className="text-xs text-gray-500">{booking.tourTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(booking.totalPrice)}</p>
                    <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No recent bookings</p>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
            <div className="space-y-4">
              {analyticsData?.recentContactMessages?.map((message, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{message.name}</p>
                    <p className="text-xs text-gray-500">{message.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      message.status === 'new' ? 'bg-purple-100 text-purple-800' :
                      message.status === 'read' ? 'bg-gray-100 text-gray-800' :
                      message.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(message.createdAt)}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No recent messages</p>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
