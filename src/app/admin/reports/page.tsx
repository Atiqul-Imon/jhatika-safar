'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'

interface ReportData {
  overview: {
    totalTours: number
    activeTours: number
    totalBookings: number
    pendingBookings: number
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

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('6months')
  const [reportType, setReportType] = useState('overview')

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/stats')
      const result = await response.json()
      
      if (result.success) {
        setReportData(result.data)
      }
    } catch (error) {
      console.error('Error fetching report data:', error)
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

  const generateReport = () => {
    // This would generate a PDF or CSV report
    alert('Report generation feature will be implemented here')
  }

  const exportData = (format: 'csv' | 'pdf') => {
    // This would export data in the specified format
    alert(`Export ${format.toUpperCase()} feature will be implemented here`)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Reports & Analytics" subtitle="Generate detailed reports and analytics">
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
      <AdminLayout title="Reports & Analytics" subtitle="Generate detailed reports and analytics">
        {/* Report Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Report Controls</h2>
              <p className="text-gray-600 mt-1">Configure and generate reports</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="overview">Overview Report</option>
                <option value="bookings">Bookings Report</option>
                <option value="revenue">Revenue Report</option>
                <option value="tours">Tours Report</option>
                <option value="customers">Customer Report</option>
              </select>
              
              <button
                onClick={generateReport}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
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
                      {reportData?.overview.totalBookings || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 px-5 py-3 border-t border-blue-200">
              <div className="text-sm">
                <span className="font-medium text-blue-600">
                  {reportData?.overview.completedBookings || 0} completed
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
                      {formatCurrency(reportData?.overview.totalRevenue || 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-green-50 px-5 py-3 border-t border-green-200">
              <div className="text-sm">
                <span className="font-medium text-green-600">
                  {reportData?.overview.confirmedBookings || 0} confirmed
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
                      {reportData?.overview.activeTours || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 px-5 py-3 border-t border-purple-200">
              <div className="text-sm">
                <span className="font-medium text-purple-600">
                  {reportData?.overview.totalTours || 0} total
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
                      {reportData?.overview.newContactMessages || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 px-5 py-3 border-t border-orange-200">
              <div className="text-sm">
                <span className="font-medium text-orange-600">
                  {reportData?.overview.totalContactMessages || 0} total
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
              <button
                onClick={() => exportData('csv')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Export CSV
              </button>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart will be implemented here</p>
                <p className="text-sm text-gray-400 mt-1">
                  {reportData?.monthlyRevenue?.length || 0} data points available
                </p>
              </div>
            </div>
          </div>

          {/* Booking Status Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Booking Status Distribution</h3>
              <button
                onClick={() => exportData('pdf')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Export PDF
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {reportData?.overview.pendingBookings || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Confirmed</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {reportData?.overview.confirmedBookings || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {reportData?.overview.completedBookings || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings Report */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
              <button
                onClick={() => exportData('csv')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
            <div className="space-y-4">
              {reportData?.recentBookings?.slice(0, 5).map((booking, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                    <p className="text-xs text-gray-500">{booking.tourTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatPrice(booking.totalPrice)}</p>
                    <p className="text-xs text-gray-500">{formatDate(new Date(booking.createdAt))}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No recent bookings</p>
              )}
            </div>
          </div>

          {/* Recent Messages Report */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
              <button
                onClick={() => exportData('csv')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
            <div className="space-y-4">
              {reportData?.recentContactMessages?.slice(0, 5).map((message, index) => (
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
                    <p className="text-xs text-gray-500 mt-1">{formatDate(new Date(message.createdAt))}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No recent messages</p>
              )}
            </div>
          </div>
        </div>

        {/* Report Actions */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Report Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => exportData('pdf')}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <DocumentTextIcon className="h-6 w-6 text-red-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Export PDF</span>
            </button>
            <button
              onClick={() => exportData('csv')}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowDownTrayIcon className="h-6 w-6 text-green-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Export CSV</span>
            </button>
            <button
              onClick={generateReport}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChartBarIcon className="h-6 w-6 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Generate Report</span>
            </button>
            <button
              onClick={() => setReportType('custom')}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-6 w-6 text-purple-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Custom Report</span>
            </button>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
