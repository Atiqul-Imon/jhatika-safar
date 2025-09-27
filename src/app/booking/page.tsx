'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CalendarDaysIcon, UsersIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
// Static tour import removed - now using only API data
import { Tour, Booking } from '@/types'
import { formatPrice, formatDate } from '@/lib/utils'
import BookingForm from '@/components/forms/BookingForm'

function BookingPageContent() {
  const searchParams = useSearchParams()
  const tourId = searchParams.get('tour')
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [bookingData, setBookingData] = useState<Partial<Booking>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTour = async () => {
      if (tourId) {
        try {
          setLoading(true)
          const response = await fetch(`/api/tours/${tourId}`)
          const result = await response.json()
          
          if (result.success && result.data) {
            const tour = result.data
            setSelectedTour(tour)
            setBookingData({
              tourId: tour.id,
              tour: tour,
              numberOfPeople: 1,
              totalPrice: tour.price
            })
          }
        } catch (error) {
          console.error('Error fetching tour:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchTour()
  }, [tourId])

  const handleBookingSubmit = (formData: any) => {
    // Here you would typically send the booking data to your API
    console.log('Booking submitted:', formData)
    // For now, we'll just show a success message
    alert('আপনার বুকিং সফলভাবে জমা দেওয়া হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">ট্যুর লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (!selectedTour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ট্যুর পাওয়া যায়নি
          </h1>
          <p className="text-gray-600">
            অনুগ্রহ করে একটি বৈধ ট্যুর নির্বাচন করুন।
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ট্যুর বুকিং
          </h1>
          <p className="text-xl text-green-100">
            আপনার স্বপ্নের ভ্রমণ শুরু করুন
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ট্যুরের সারসংক্ষেপ
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedTour.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedTour.shortDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">গন্তব্য</div>
                      <div className="text-sm text-gray-600">
                        {selectedTour.destinations.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">সময়কাল</div>
                      <div className="text-sm text-gray-600">
                        {selectedTour.duration} দিন
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <UsersIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">দলের আকার</div>
                      <div className="text-sm text-gray-600">
                        {selectedTour.groupSize?.min || 1}-{selectedTour.groupSize?.max || 50} জন
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">মূল্য (প্রতি জন)</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(selectedTour.price)}
                    </span>
                  </div>
                  {selectedTour.originalPrice && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">ছাড়</span>
                      <span className="text-green-600 font-semibold">
                        {formatPrice(selectedTour.originalPrice - selectedTour.price)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>মোট মূল্য</span>
                    <span className="text-green-600">
                      {formatPrice(bookingData.totalPrice || selectedTour.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                বুকিং ফর্ম
              </h2>
              
              <BookingForm
                tour={selectedTour}
                onBookingSubmit={handleBookingSubmit}
                bookingData={bookingData}
                setBookingData={setBookingData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking page...</p>
        </div>
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  )
}