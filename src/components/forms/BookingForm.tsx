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
      setBookingData(prev => ({
        ...prev,
        numberOfPeople: people,
        totalPrice: totalPrice
      }))
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
      newErrors.customerName = 'নাম প্রয়োজন'
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'ইমেইল প্রয়োজন'
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'বৈধ ইমেইল দিন'
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'ফোন নম্বর প্রয়োজন'
    } else if (!/^[0-9+\-\s]+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'বৈধ ফোন নম্বর দিন'
    }

    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'ঠিকানা প্রয়োজন'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'শুরুর তারিখ প্রয়োজন'
    } else {
      const startDate = new Date(formData.startDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (startDate < today) {
        newErrors.startDate = 'শুরুর তারিখ আজকের তারিখের পর হতে হবে'
      }
    }

    if (formData.numberOfPeople < tour.groupSize.min || formData.numberOfPeople > tour.groupSize.max) {
      newErrors.numberOfPeople = `${tour.groupSize.min}-${tour.groupSize.max} জনের মধ্যে হতে হবে`
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
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            customerAddress: formData.customerAddress,
            tourId: tour._id,
            numberOfPeople: formData.numberOfPeople,
            startDate: formData.startDate,
            specialRequests: formData.specialRequests
          }),
        })

        const result = await response.json()

        if (result.success) {
          const bookingSubmission = {
            ...formData,
            tourId: tour._id,
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
        <h3 className="text-lg font-semibold text-gray-900">ব্যক্তিগত তথ্য</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
              পুরো নাম *
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
              placeholder="আপনার পুরো নাম লিখুন"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল *
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
              placeholder="আপনার ইমেইল লিখুন"
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
            )}
          </div>

          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
              ফোন নম্বর *
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
              placeholder="+৮৮০ ১৭১৭-১৫১৬৩৬"
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
            )}
          </div>

          <div>
            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
              লোক সংখ্যা *
            </label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                min={tour.groupSize.min}
                max={tour.groupSize.max}
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
            ঠিকানা *
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
            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
          />
          {errors.customerAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
          )}
        </div>
      </div>

      {/* Travel Dates */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">ভ্রমণের তারিখ</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              শুরুর তারিখ *
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
              শেষের তারিখ
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
              স্বয়ংক্রিয়ভাবে গণনা করা হয়েছে ({tour.duration} দিন)
            </p>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">বিশেষ অনুরোধ</h3>
        
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            বিশেষ অনুরোধ বা মন্তব্য
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="যদি আপনার কোনো বিশেষ অনুরোধ থাকে (যেমন: খাদ্য সংক্রান্ত, শারীরিক সীমাবদ্ধতা ইত্যাদি)"
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">মূল্যের সারসংক্ষেপ</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">প্রতি জনের মূল্য</span>
            <span className="font-medium">{formatPrice(tour.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">লোক সংখ্যা</span>
            <span className="font-medium">{formData.numberOfPeople} জন</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>মোট মূল্য</span>
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
          বুকিং নিশ্চিত করুন
        </button>
      </div>
    </form>
  )
}
