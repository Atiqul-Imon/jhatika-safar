'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'

interface Booking {
  _id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  tourId: string
  tourTitle: string
  numberOfPeople: number
  startDate: string
  endDate?: string
  totalPrice: number
  status: 'pending' | 'paused' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
  createdAt: string
  updatedAt: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bookings')
      const result = await response.json()
      
      if (result.success) {
        setBookings(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const result = await response.json()

      if (result.success) {
        await fetchBookings()
      } else {
        alert(result.message || 'Failed to update booking')
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      alert('Error updating booking')
    }
  }

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
      const result = await response.json()

      if (result.success) {
        await fetchBookings()
      } else {
        alert(result.message || 'Failed to delete booking')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Error deleting booking')
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'status-pending',
      paused: 'status-paused',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    }
    return colors[status as keyof typeof colors] || 'status-pending'
  }

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      refunded: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ClockIcon className="h-4 w-4" />
      case 'paused': return <ClockIcon className="h-4 w-4" />
      case 'confirmed': return <CheckCircleIcon className="h-4 w-4" />
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />
      case 'cancelled': return <XCircleIcon className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.tourTitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPaymentStatus = paymentStatusFilter === 'all' || booking.paymentStatus === paymentStatusFilter
    
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowDetails(true)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Bookings Management" subtitle="Manage all tour bookings">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AdminLayout title="Bookings Management" subtitle="Manage all tour bookings">
        <div className="admin-card-lg p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold admin-text">All Bookings</h2>
              <p className="admin-text-muted mt-1">{filteredBookings.length} bookings found</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-input pl-10 pr-4 py-2 w-full sm:w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-select px-4 py-2"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paused">Paused</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="admin-select px-4 py-2"
              >
                <option value="all">All Payment</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="admin-table min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Date & People
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium admin-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium admin-text">{booking.customerName}</div>
                        <div className="text-sm admin-text-muted">{booking.customerEmail}</div>
                        <div className="text-sm admin-text-muted">{booking.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm admin-text">{booking.tourTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm admin-text">
                        {formatDate(new Date(booking.startDate))}
                      </div>
                      <div className="text-sm admin-text-muted">
                        {booking.numberOfPeople} people
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm admin-text">
                      {formatPrice(booking.totalPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`admin-badge ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">{booking.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`admin-badge ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                          className="admin-select text-xs px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="paused">Pause</option>
                          <option value="confirmed">Confirm</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Booking"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium admin-text mb-2">No bookings found</h3>
              <p className="admin-text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Booking Details Modal */}
        {showDetails && selectedBooking && (
          <div className="admin-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="admin-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium admin-text">Booking Details</h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedBooking.customerName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedBooking.customerEmail}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedBooking.customerPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tour</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedBooking.tourTitle}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(new Date(selectedBooking.startDate))}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of People</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedBooking.numberOfPeople}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Price</label>
                      <p className="mt-1 text-sm text-gray-900">{formatPrice(selectedBooking.totalPrice)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                        {getStatusIcon(selectedBooking.status)}
                        <span className="ml-1 capitalize">{selectedBooking.status}</span>
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                        {selectedBooking.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created At</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(new Date(selectedBooking.createdAt))}</p>
                    </div>
                  </div>
                  
                  {selectedBooking.specialRequests && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedBooking.specialRequests}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  )
}
