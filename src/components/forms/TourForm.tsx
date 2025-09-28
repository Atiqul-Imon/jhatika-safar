'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface TourFormProps {
  tour?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function TourForm({ tour, onSubmit, onCancel, loading = false }: TourFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    duration: 0,
    price: 0,
    originalPrice: 0,
    images: [] as string[],
    destinations: [] as string[],
    highlights: [] as string[],
    category: '',
    featured: false,
    status: 'active',
    difficulty: '',
    groupSize: {
      min: 0,
      max: 0
    },
    season: '',
    includes: '',
    excludes: '',
    itinerary: [] as Array<{
      day: number
      title: string
      description: string
      activities: string[]
      meals: string
    }>
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title || '',
        description: tour.description || '',
        shortDescription: tour.shortDescription || '',
        duration: tour.duration || 0,
        price: tour.price || 0,
        originalPrice: tour.originalPrice || 0,
        images: tour.images || [],
        destinations: tour.destinations || [],
        highlights: tour.highlights || [],
        category: tour.category || '',
        featured: tour.featured || false,
        status: tour.status || 'active',
        difficulty: tour.difficulty || '',
        groupSize: tour.groupSize || { min: 0, max: 0 },
        season: tour.season || '',
        includes: tour.includes || '',
        excludes: tour.excludes || '',
        itinerary: tour.itinerary?.length ? tour.itinerary.map((item: any) => ({
          ...item,
          activities: Array.isArray(item.activities) ? item.activities : [item.activities || ''],
          meals: typeof item.meals === 'string' ? item.meals : (Array.isArray(item.meals) ? item.meals.join(', ') : '')
        })) : []
      })
    }
  }, [tour])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any || {}),
          [child]: type === 'number' ? parseInt(value) || 0 : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                type === 'number' ? parseInt(value) || 0 : value
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), '']
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_: string, i: number) => i !== index)
    }))
  }

  const handleItineraryChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        day: prev.itinerary.length + 1,
        title: '',
        description: '',
        activities: [''],
        meals: ''
      }]
    }))
  }

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Only validate essential fields
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (formData.duration && formData.duration < 1) newErrors.duration = 'Duration must be at least 1 day'
    if (formData.price && formData.price < 0) newErrors.price = 'Price cannot be negative'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Clean up empty values and arrays
      const cleanedData: any = {
        title: formData.title.trim()
      }

      // Only include fields that have values
      if (formData.description.trim()) cleanedData.description = formData.description.trim()
      if (formData.shortDescription.trim()) cleanedData.shortDescription = formData.shortDescription.trim()
      if (formData.duration > 0) cleanedData.duration = formData.duration
      if (formData.price > 0) cleanedData.price = formData.price
      if (formData.originalPrice > 0) cleanedData.originalPrice = formData.originalPrice
      if (formData.category.trim()) cleanedData.category = formData.category.trim()
      if (formData.difficulty.trim()) cleanedData.difficulty = formData.difficulty.trim()
      if (formData.season.trim()) cleanedData.season = formData.season.trim()
      if (formData.includes.trim()) cleanedData.includes = formData.includes.trim()
      if (formData.excludes.trim()) cleanedData.excludes = formData.excludes.trim()
      
      // Handle arrays - only include if they have content
      const filteredImages = formData.images.filter(img => img.trim())
      if (filteredImages.length > 0) cleanedData.images = filteredImages
      
      const filteredDestinations = formData.destinations.filter(dest => dest.trim())
      if (filteredDestinations.length > 0) cleanedData.destinations = filteredDestinations
      
      const filteredHighlights = formData.highlights.filter(highlight => highlight.trim())
      if (filteredHighlights.length > 0) cleanedData.highlights = filteredHighlights
      
      // Handle group size - only include if both values are set
      if (formData.groupSize.min > 0 && formData.groupSize.max > 0) {
        cleanedData.groupSize = formData.groupSize
      }
      
      // Handle itinerary - only include if it has content
      if (formData.itinerary.length > 0) {
        cleanedData.itinerary = formData.itinerary.map((day, index) => ({
          ...day,
          day: index + 1,
          activities: day.activities.filter(act => act.trim())
        }))
      }
      
      // Always include these fields
      cleanedData.featured = formData.featured
      cleanedData.status = formData.status

      onSubmit(cleanedData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {tour ? 'Edit Tour' : 'Create New Tour'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Essential Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Essential Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tour Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter tour title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nature">Nature</option>
                  <option value="Religious">Religious</option>
                  <option value="Beach">Beach</option>
                  <option value="Historical">Historical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description for tour cards"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Detailed tour description"
              />
            </div>
          </div>

          {/* Optional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Optional Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 15000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (৳)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 18000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Group Size
                </label>
                <input
                  type="number"
                  name="groupSize.min"
                  value={formData.groupSize.min || ''}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Group Size
                </label>
                <input
                  type="number"
                  name="groupSize.max"
                  value={formData.groupSize.max || ''}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Tour</span>
              </label>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Destinations</h3>
              <button
                type="button"
                onClick={() => addArrayItem('destinations')}
                className="flex items-center text-green-600 hover:text-green-700 text-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Destination
              </button>
            </div>
            {formData.destinations.map((destination, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => handleArrayChange('destinations', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter destination"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('destinations', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            {formData.destinations.length === 0 && (
              <p className="text-gray-500 text-sm">No destinations added yet. Click "Add Destination" to add some.</p>
            )}
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Highlights</h3>
              <button
                type="button"
                onClick={() => addArrayItem('highlights')}
                className="flex items-center text-green-600 hover:text-green-700 text-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Highlight
              </button>
            </div>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter highlight"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('highlights', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            {formData.highlights.length === 0 && (
              <p className="text-gray-500 text-sm">No highlights added yet. Click "Add Highlight" to add some.</p>
            )}
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Images</h3>
              <button
                type="button"
                onClick={() => addArrayItem('images')}
                className="flex items-center text-green-600 hover:text-green-700 text-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Image
              </button>
            </div>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('images', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            {formData.images.length === 0 && (
              <p className="text-gray-500 text-sm">No images added yet. Click "Add Image" to add some.</p>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Best Season to Visit
              </label>
              <input
                type="text"
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., October to March, All year round"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's Included
              </label>
              <textarea
                name="includes"
                value={formData.includes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="List what's included in the tour (one per line)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's Excluded
              </label>
              <textarea
                name="excludes"
                value={formData.excludes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="List what's not included in the tour (one per line)"
              />
            </div>
          </div>

          {/* Itinerary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Itinerary</h3>
              <button
                type="button"
                onClick={addItineraryDay}
                className="flex items-center text-green-600 hover:text-green-700 text-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Day
              </button>
            </div>
            {formData.itinerary.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Day {day.day}</h4>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day Title
                    </label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Arrival in Dhaka"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={day.description}
                      onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe the day's activities"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activities
                    </label>
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => {
                            const newActivities = [...day.activities]
                            newActivities[actIndex] = e.target.value
                            handleItineraryChange(index, 'activities', newActivities)
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter activity"
                        />
                        {day.activities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newActivities = day.activities.filter((_, i) => i !== actIndex)
                              handleItineraryChange(index, 'activities', newActivities)
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newActivities = [...day.activities, '']
                        handleItineraryChange(index, 'activities', newActivities)
                      }}
                      className="flex items-center text-green-600 hover:text-green-700 text-sm"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Activity
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meals
                    </label>
                    <input
                      type="text"
                      value={day.meals}
                      onChange={(e) => handleItineraryChange(index, 'meals', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Breakfast, Lunch, Dinner"
                    />
                  </div>
                </div>
              </div>
            ))}
            {formData.itinerary.length === 0 && (
              <p className="text-gray-500 text-sm">No itinerary days added yet. Click "Add Day" to add some.</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (tour ? 'Update Tour' : 'Create Tour')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
