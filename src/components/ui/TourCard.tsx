import Link from 'next/link'
import Image from 'next/image'
import { MapPinIcon, ClockIcon, UsersIcon, CalendarDaysIcon, StarIcon } from '@heroicons/react/24/outline'
import { Tour } from '@/types'
import { formatPrice } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
  variant?: 'default' | 'compact' | 'detailed'
  showButtons?: boolean
  className?: string
  showUpcomingBadge?: boolean
}

export default function TourCard({ 
  tour, 
  variant = 'default', 
  showButtons = true,
  className = '',
  showUpcomingBadge = false
}: TourCardProps) {
  const isCompact = variant === 'compact'
  const isDetailed = variant === 'detailed'
  
  // Check if tour is upcoming (created within last 30 days)
  const isUpcoming = showUpcomingBadge && tour.createdAt && 
    (new Date().getTime() - new Date(tour.createdAt).getTime()) < (30 * 24 * 60 * 60 * 1000)
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 hover:border-green-200 ${className}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${isCompact ? 'h-40' : isDetailed ? 'h-80' : 'h-64'}`}>
        <Image
          src={tour.images?.[0] || '/placeholder-tour.jpg'}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Upcoming Badge */}
        {isUpcoming && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
            <CalendarDaysIcon className="h-3 w-3 mr-1" />
            New
          </div>
        )}
        
        {/* Featured Badge */}
        {tour.featured && !isUpcoming && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
            <StarIcon className="h-3 w-3 mr-1" />
            Featured
          </div>
        )}
        
        {/* Price Badge */}
        {tour.originalPrice && tour.originalPrice > tour.price && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
        {/* Title */}
        <div className="mb-3">
          <h3 className={`font-bold text-gray-900 line-clamp-2 font-serif ${isCompact ? 'text-lg' : 'text-xl'}`}>
            {tour.title}
          </h3>
        </div>

        {/* Description */}
        {!isCompact && (
          <p className={`text-gray-700 mb-4 line-clamp-2 font-medium ${isDetailed ? 'text-base' : 'text-sm'}`}>
            {isDetailed ? (tour.description || 'No description available') : (tour.shortDescription || 'No description available')}
          </p>
        )}

        {/* Tour Details */}
        <div className={`space-y-2 ${isCompact ? 'mb-3' : 'mb-4'}`}>
          <div className="flex items-center text-sm text-gray-700">
            <MapPinIcon className="h-4 w-4 mr-2 text-green-500" />
            <span className="font-medium">{tour.destinations?.length ? tour.destinations.join(', ') : 'Destination not specified'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
            <span className="font-medium">{tour.duration || 'N/A'} days</span>
          </div>
          {!isCompact && tour.groupSize?.min && tour.groupSize?.max && (
            <div className="flex items-center text-sm text-gray-700">
              <UsersIcon className="h-4 w-4 mr-2 text-green-500" />
              <span className="font-medium">{tour.groupSize.min}-{tour.groupSize.max} people</span>
            </div>
          )}
          {isUpcoming && tour.createdAt && (
            <div className="flex items-center text-sm text-green-600">
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              <span className="font-medium">
                Added {Math.ceil((new Date().getTime() - new Date(tour.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className={`flex items-center justify-between ${isCompact ? 'mb-3' : 'mb-4'}`}>
          <div>
            <div className={`font-bold text-green-600 ${isCompact ? 'text-lg' : 'text-2xl'}`}>
              {formatPrice(tour.price)}
            </div>
            {tour.originalPrice && (
              <div className="text-sm text-gray-600 line-through font-medium">
                {formatPrice(tour.originalPrice)}
              </div>
            )}
          </div>
          {!isCompact && (
            <div className="text-sm text-gray-700 font-medium">
              per person
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showButtons && (
          <div className={`flex ${isCompact ? 'space-x-2' : 'space-x-3'}`}>
            <Link
              href={`/tours/${tour.slug}`}
              className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center rounded-lg hover:shadow-lg transition-all duration-200 font-medium hover:from-green-600 hover:to-green-700 ${isCompact ? 'py-2 px-3 text-sm' : 'py-2 px-4'}`}
            >
              View Details
            </Link>
            <Link
              href={`/booking?tour=${tour.id}`}
              className={`flex-1 border-2 border-red-500 text-red-500 text-center rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 font-medium ${isCompact ? 'py-2 px-3 text-sm' : 'py-2 px-4'}`}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
