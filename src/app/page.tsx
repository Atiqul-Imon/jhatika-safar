'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRightIcon, StarIcon, MapPinIcon, ClockIcon, UsersIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
// Removed static tour import - now using only API data
import { formatPrice } from '@/lib/utils'
import HeroSection from '@/components/ui/HeroSection'
import TourCardGrid from '@/components/ui/TourCardGrid'
import TestimonialSection from '@/components/ui/TestimonialSection'
import { Tour } from '@/types'

export default function Home() {
  const [upcomingTours, setUpcomingTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpcomingTours = async () => {
      try {
        setLoading(true)
        // Fetch all active tours from API
        const response = await fetch('/api/tours?status=active&sort=createdAt&order=desc', {
          headers: {
            'Cache-Control': 'max-age=300' // Client-side caching for 5 minutes
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch tours')
        }
        
        const data = await response.json()
        console.log('API Response:', data)
        
        // Check if data.data exists and is an array
        if (!data.data || !Array.isArray(data.data)) {
          console.error('Invalid API response structure:', data)
          throw new Error('Invalid API response structure')
        }
        
        setUpcomingTours(data.data)
      } catch (err) {
        console.error('Error fetching upcoming tours:', err)
        setError('Failed to load upcoming tours')
        // No fallback - show empty state if API fails
        setUpcomingTours([])
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingTours()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Upcoming Tours */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <CalendarDaysIcon className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
                Our Tour Packages
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exciting tour packages. Book now and create unforgettable memories.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to load tours
              </h3>
              <p className="text-gray-600 mb-6">
                {error}. Please try again later.
              </p>
            </div>
          ) : upcomingTours.length > 0 ? (
            <TourCardGrid tours={upcomingTours} showUpcomingBadge={true} />
          ) : (
            <div className="text-center py-12">
              <CalendarDaysIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tours available
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon for new tour packages!
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/tours"
              className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              View All Tours
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide you with the best travel experience backed by years of expertise and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <StarIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">Best Service</h3>
              <p className="text-gray-600 leading-relaxed">
                We provide the highest quality service and ensure customer satisfaction with our premium offerings.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPinIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">Expert Guides</h3>
              <p className="text-gray-600 leading-relaxed">
                Our experienced local guides will show you the most beautiful and authentic places in Bangladesh.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ClockIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">Timely Service</h3>
              <p className="text-gray-600 leading-relaxed">
                We always provide timely service and never delay, ensuring your travel plans go smoothly.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <UsersIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">Group Travel</h3>
              <p className="text-gray-600 leading-relaxed">
                Travel in small groups for a better experience and make new friends along the journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Start Your Dream Journey Now
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Travel to the most beautiful places in Bangladesh and create unforgettable memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center px-10 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              View Tour Packages
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
