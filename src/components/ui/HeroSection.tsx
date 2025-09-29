'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const locations = [
    'Sundarbans',
    'Cox\'s Bazar',
    'Sylhet',
    'Rajshahi',
    'Chittagong',
    'Rangpur'
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedLocation || !selectedDate) {
      alert('Please select both destination and date to search for tours.')
      return
    }

    setIsSearching(true)
    
    try {
      // Build search URL with parameters
      const searchParams = new URLSearchParams({
        destination: selectedLocation,
        date: selectedDate,
        status: 'active'
      })
      
      // Navigate to tours page with search parameters
      window.location.href = `/tours?${searchParams.toString()}`
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section className="relative h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden hero-section">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/db5yniogx/image/upload/v1758743084/jhatisafarimage01_axndpk.jpg"
          alt="Natural Beauty of Bangladesh"
          className="w-full h-full object-cover object-center hero-image"
          style={{
            objectPosition: 'center center'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center hero-content">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight hero-title font-sans">
            <span className="text-red-800">Discover</span>
            <span className="block text-green-800 mt-1 sm:mt-2">Bangladesh's</span>
            <span className="text-red-800">Beautiful Places</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6 md:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-4 font-sans leading-relaxed">
            Travel with Jhatika Safar and create unforgettable memories
          </p>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl mx-2 sm:mx-4 hero-form">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {/* Location Search */}
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Select Destination</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
              </div>

              {/* Date Selection */}
              <div className="relative">
                <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-1 sm:mr-2"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Search Tours</span>
                    <span className="xs:hidden">Search</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-3 sm:px-4">
            <div className="text-center bg-green-600 rounded-xl p-3 sm:p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-3">500+</div>
              <div className="text-green-100 text-xs xs:text-sm sm:text-base font-medium">Successful Tours</div>
            </div>
            <div className="text-center bg-red-600 rounded-xl p-3 sm:p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-3">1000+</div>
              <div className="text-red-100 text-xs xs:text-sm sm:text-base font-medium">Happy Customers</div>
            </div>
            <div className="text-center bg-amber-600 rounded-xl p-3 sm:p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-3">15+</div>
              <div className="text-amber-100 text-xs xs:text-sm sm:text-base font-medium">Destinations</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
