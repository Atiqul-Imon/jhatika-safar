'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import DashboardOverview from '@/components/admin/DashboardOverview'
import TourForm from '@/components/forms/TourForm'

// Types
interface ContactMessage {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  updatedAt: string
}

interface Booking {
  _id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  tourId: string
  tourTitle: string
  numberOfPeople: number
  startDate: string
  totalPrice: number
  status: 'pending' | 'paused' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
  createdAt: string
  updatedAt: string
}

interface Tour {
  _id: string
  title: string
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
    meals: string[]
    accommodation: string
  }>
  includes: string[]
  excludes: string[]
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  groupSize: { min: number; max: number }
  season: string[]
  category: string
  featured: boolean
  status: 'active' | 'inactive' | 'draft'
  slug: string
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [, setLoading] = useState(true)
  const [showTourForm, setShowTourForm] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [tourFormLoading, setTourFormLoading] = useState(false)

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Optimized: Fetch with pagination and caching
      const [bookingsRes, toursRes, messagesRes] = await Promise.all([
        fetch('/api/bookings?limit=100', {
          headers: { 'Cache-Control': 'max-age=300' }
        }),
        fetch('/api/tours?limit=100', {
          headers: { 'Cache-Control': 'max-age=600' }
        }),
        fetch('/api/contact-messages?limit=100', {
          headers: { 'Cache-Control': 'max-age=300' }
        })
      ])

      const [bookingsData, toursData, messagesData] = await Promise.all([
        bookingsRes.json(),
        toursRes.json(),
        messagesRes.json()
      ])

      if (bookingsData.success) setBookings(bookingsData.data || [])
      if (toursData.success) setTours(toursData.data || [])
      if (messagesData.success) setMessages(messagesData.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Tour management functions
  const handleCreateTour = () => {
    setEditingTour(null)
    setShowTourForm(true)
  }

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour)
    setShowTourForm(true)
  }

  const handleTourSubmit = async (tourData: Partial<Tour>) => {
    try {
      setTourFormLoading(true)
      const url = editingTour ? `/api/tours/${editingTour._id}` : '/api/tours'
      const method = editingTour ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData)
      })

      const result = await response.json()

      if (result.success) {
        await fetchData()
        setShowTourForm(false)
        setEditingTour(null)
      } else {
        alert(result.message || 'Failed to save tour')
      }
    } catch (error) {
      console.error('Error saving tour:', error)
      alert('Error saving tour')
    } finally {
      setTourFormLoading(false)
    }
  }

  const handleCancelTourForm = () => {
    setShowTourForm(false)
    setEditingTour(null)
  }

  const deleteTour = async (tourId: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return

    try {
      const response = await fetch(`/api/tours/${tourId}`, { method: 'DELETE' })
      const result = await response.json()

      if (result.success) {
        await fetchData()
      } else {
        alert(result.message || 'Failed to delete tour')
      }
    } catch (error) {
      console.error('Error deleting tour:', error)
      alert('Error deleting tour')
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
        await fetchData()
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
        await fetchData()
      } else {
        alert(result.message || 'Failed to delete booking')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Error deleting booking')
    }
  }

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const response = await fetch(`/api/contact-messages/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const result = await response.json()

      if (result.success) {
        await fetchData()
      } else {
        alert(result.message || 'Failed to update message')
      }
    } catch (error) {
      console.error('Error updating message:', error)
      alert('Error updating message')
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/contact-messages/${messageId}`, { method: 'DELETE' })
      const result = await response.json()

      if (result.success) {
        await fetchData()
      } else {
        alert(result.message || 'Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Error deleting message')
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paused: 'bg-orange-100 text-orange-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      new: 'bg-purple-100 text-purple-800',
      read: 'bg-gray-100 text-gray-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const tabButtons = [
    { id: 'dashboard', name: 'Dashboard', count: null },
    { id: 'bookings', name: 'Bookings', count: bookings.length },
    { id: 'tours', name: 'Tours', count: tours.length },
    { id: 'messages', name: 'Messages', count: messages.length }
  ]

  return (
    <ProtectedRoute>
      <AdminLayout 
        title="Admin Dashboard"
        subtitle="Manage your travel agency operations"
        actions={
          <button
            onClick={handleCreateTour}
            className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Tour
          </button>
        }
      >
        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabButtons.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className={`
                      ml-2 py-0.5 px-2 rounded-full text-xs
                      ${activeTab === tab.id
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <DashboardOverview />
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Bookings Management</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      People
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                          <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                          <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.tourTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.numberOfPeople} people
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(new Date(booking.startDate))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(booking.totalPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="paused">Pause</option>
                            <option value="confirmed">Confirm</option>
                            <option value="completed">Complete</option>
                            <option value="cancelled">Cancel</option>
                          </select>
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            className="text-red-600 hover:text-red-900"
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
          </div>
        )}

        {/* Tours Tab */}
        {activeTab === 'tours' && (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Tours Management</h2>
              <button
                onClick={handleCreateTour}
                className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Tour
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tours.map((tour) => (
                    <tr key={tour._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                          <div className="text-sm text-gray-500">{tour.destinations.join(', ')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(tour.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tour.duration} days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tour.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tour.status)}`}>
                          {getStatusText(tour.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`/tours/${tour.slug}`, '_blank')}
                            className="text-green-600 hover:text-green-900"
                            title="View Tour"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditTour(tour)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Tour"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteTour(tour._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Tour"
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
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{message.subject}</h3>
                      <p className="text-sm text-gray-500">
                        From: {message.name} ({message.email}) • {message.phone}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                        {getStatusText(message.status)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(new Date(message.createdAt))}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{message.message}</p>
                  <div className="flex space-x-2">
                    <select
                      value={message.status}
                      onChange={(e) => updateMessageStatus(message._id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="text-red-600 hover:text-red-900 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tour Form Modal */}
        {showTourForm && (
          <TourForm
            tour={editingTour}
            onSubmit={handleTourSubmit}
            onCancel={handleCancelTourForm}
            loading={tourFormLoading}
          />
        )}
      </AdminLayout>
    </ProtectedRoute>
  )
}