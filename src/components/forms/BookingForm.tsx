'use client'

import { useState } from 'react'
import { CalendarDaysIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Tour, Booking } from '@/types'
import { formatPrice } from '@/lib/utils'

interface BookingFormProps {
  tour: Tour
  onBookingSubmit: (data: any) => void
  bookingData: Partial<Booking>
  setBookingData: (data: Partial<Booking>) => void
}

export default function BookingForm({ tour, onBookingSubmit, bookingData, setBookingData }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    numberOfPeople: 1,
    startDate: '',
    endDate: '',
    specialRequests: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Update booking data for price calculation
    if (name === 'numberOfPeople') {
      const people = parseInt(value) || 1
      const totalPrice = tour.price * people
      setBookingData({
        ...bookingData,
        numberOfPeople: people,
        totalPrice: totalPrice
      })
    }

    if (name === 'startDate') {
      const startDate = new Date(value)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + tour.duration - 1)
      setFormData(prev => ({
        ...prev,
        endDate: endDate.toISOString().split('T')[0]
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required'
    } else if (!/^(\+880|880|0)?1[3-9]\d{8}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = 'Please enter a valid Bangladeshi phone number (e.g., 01712345678, +8801712345678)'
    }

    if (formData.numberOfPeople < (tour.groupSize?.min || 1) || formData.numberOfPeople > (tour.groupSize?.max || 50)) {
      newErrors.numberOfPeople = `Must be between ${tour.groupSize?.min || 1}-${tour.groupSize?.max || 50} people`
    }

    // Optional field validations
    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email'
    }

    if (formData.startDate) {
      const startDate = new Date(formData.startDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (startDate < today) {
        newErrors.startDate = 'Start date must be after today'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      try {
        // Submit booking to API
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: formData.customerName,
            customerEmail: formData.customerEmail || undefined,
            customerPhone: formData.customerPhone,
            customerAddress: formData.customerAddress || undefined,
            tourId: tour.id,
            numberOfPeople: formData.numberOfPeople,
            startDate: formData.startDate || undefined,
            specialRequests: formData.specialRequests || undefined
          }),
        })

        const result = await response.json()

        if (result.success) {
          const bookingSubmission = {
            ...formData,
            tourId: tour.id,
            tour: tour,
            totalPrice: bookingData.totalPrice || tour.price,
            status: 'pending' as const,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          onBookingSubmit(bookingSubmission)
        } else {
          setErrors({ submit: result.message || 'Failed to submit booking' })
        }
      } catch (error) {
        console.error('Error submitting booking:', error)
        setErrors({ submit: 'Network error. Please try again.' })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.customerEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email (optional)"
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
            )}
          </div>

          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.customerPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="01712345678 or +8801712345678"
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
            )}
          </div>

          <div>
            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
              Number of People *
            </label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                min={tour.groupSize?.min || 1}
                max={tour.groupSize?.max || 50}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.numberOfPeople ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.numberOfPeople && (
              <p className="text-red-500 text-sm mt-1">{errors.numberOfPeople}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.customerAddress ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your complete address (optional)"
          />
          {errors.customerAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
          )}
        </div>
      </div>

      {/* Travel Dates */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Travel Dates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                readOnly
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Automatically calculated ({tour.duration} days)
            </p>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Special Requests</h3>
        
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests or Comments <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="If you have any special requests (e.g., dietary requirements, physical limitations, etc.)"
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Price per person</span>
            <span className="font-medium">{formatPrice(tour.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Number of people</span>
            <span className="font-medium">{formData.numberOfPeople} people</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Price</span>
              <span className="text-green-600">
                {formatPrice(bookingData.totalPrice || tour.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gradient-primary text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  )
}
