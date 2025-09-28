'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MapIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import TourForm from '@/components/forms/TourForm'

interface Tour {
  _id?: string
  id?: string
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
    meals: string
  }>
  includes: string
  excludes: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  groupSize: { min: number; max: number }
  season: string
  category: string
  featured: boolean
  status: 'active' | 'inactive' | 'draft'
  slug: string
  createdAt: string
  updatedAt: string
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showTourForm, setShowTourForm] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [tourFormLoading, setTourFormLoading] = useState(false)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tours')
      const result = await response.json()
      
      if (result.success) {
        setTours(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching tours:', error)
    } finally {
      setLoading(false)
    }
  }

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
      const url = editingTour ? `/api/tours/${editingTour.id || editingTour._id}` : '/api/tours'
      const method = editingTour ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData)
      })

      const result = await response.json()

      if (result.success) {
        await fetchTours()
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
        await fetchTours()
      } else {
        alert(result.message || 'Failed to delete tour')
      }
    } catch (error) {
      console.error('Error deleting tour:', error)
      alert('Error deleting tour')
    }
  }

  const toggleTourStatus = async (tourId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    
    try {
      const response = await fetch(`/api/tours/${tourId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      const result = await response.json()

      if (result.success) {
        await fetchTours()
      } else {
        alert(result.message || 'Failed to update tour status')
      }
    } catch (error) {
      console.error('Error updating tour status:', error)
      alert('Error updating tour status')
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon className="h-4 w-4" />
      case 'inactive': return <XCircleIcon className="h-4 w-4" />
      case 'draft': return <ClockIcon className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (tour.destinations?.some(dest => dest.toLowerCase().includes(searchQuery.toLowerCase())) || false) ||
                         (tour.category?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
    
    const matchesStatus = statusFilter === 'all' || tour.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const categories = [...new Set(tours.map(tour => tour.category).filter(Boolean))]

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Tours Management" subtitle="Manage all tour packages">
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
      <AdminLayout title="Tours Management" subtitle="Manage all tour packages">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Tours</h2>
              <p className="text-gray-600 mt-1">{filteredTours.length} tours found</p>
            </div>
            
            <button
              onClick={handleCreateTour}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Tour
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <div key={tour._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Tour Image */}
                <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  {tour.images && tour.images.length > 0 ? (
                    <img
                      src={tour.images[0]}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {tour.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <StarIcon className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tour.status)}`}>
                      {getStatusIcon(tour.status)}
                      <span className="ml-1 capitalize">{tour.status}</span>
                    </span>
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {tour.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {tour.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{tour.duration} days</span>
                      <span className="text-gray-300">•</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(tour.difficulty)}`}>
                        {tour.difficulty}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(tour.price)}
                      </div>
                      {tour.originalPrice && tour.originalPrice > tour.price && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(tour.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    <span className="font-medium">Destinations:</span> {tour.destinations?.length ? tour.destinations.join(', ') : 'Not specified'}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Group Size:</span> {tour.groupSize?.min && tour.groupSize?.max ? `${tour.groupSize.min}-${tour.groupSize.max} people` : 'Not specified'}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(`/tours/${tour.slug}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Tour"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditTour(tour)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Edit Tour"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTour(tour.id || tour._id || '')}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete Tour"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => toggleTourStatus(tour.id || tour._id || '', tour.status)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        tour.status === 'active'
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {tour.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <MapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
              <button
                onClick={handleCreateTour}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center mx-auto"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Your First Tour
              </button>
            </div>
          )}
        </div>

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
