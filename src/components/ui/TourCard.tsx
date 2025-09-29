import Link from 'next/link'
import Image from 'next/image'
import { MapPinIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Tour } from '@/types'
import { formatPrice } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
  variant?: 'default' | 'compact' | 'detailed'
  showButtons?: boolean
  className?: string
}

export default function TourCard({ 
  tour, 
  variant = 'default', 
  showButtons = true,
  className = ''
}: TourCardProps) {
  const isCompact = variant === 'compact'
  const isDetailed = variant === 'detailed'
  
  
  return (
    <div className={`backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/30 hover:border-white/40 hover:bg-white/20 hover:backdrop-blur-2xl ${className}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${isCompact ? 'h-40' : isDetailed ? 'h-80' : 'h-64'}`}>
        <Image
          src={tour.images?.[0] || '/placeholder-tour.jpg'}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        
        
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
            <MapPinIcon className="h-4 w-4 mr-2 text-green-600" />
            <span className="font-medium">{tour.destinations?.length ? tour.destinations.join(', ') : 'Destination not specified'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <ClockIcon className="h-4 w-4 mr-2 text-green-600" />
            <span className="font-medium">{tour.duration || 'N/A'} days</span>
          </div>
          {!isCompact && tour.groupSize?.min && tour.groupSize?.max && (
            <div className="flex items-center text-sm text-gray-700">
              <UsersIcon className="h-4 w-4 mr-2 text-green-600" />
              <span className="font-medium">{tour.groupSize.min}-{tour.groupSize.max} people</span>
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
              <div className="text-sm text-gray-500 line-through font-medium">
                {formatPrice(tour.originalPrice)}
              </div>
            )}
          </div>
          {!isCompact && (
            <div className="text-sm text-gray-600 font-medium">
              per person
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showButtons && (
          <div className={`flex ${isCompact ? 'space-x-2' : 'space-x-3'}`}>
            <Link
              href={`/tours/${tour.slug}`}
              className={`flex-1 bg-green-600/60 border border-green-600/80 text-white text-center rounded-lg hover:bg-green-600/70 hover:border-green-600/90 hover:text-white transition-all duration-300 font-medium ${isCompact ? 'py-2 px-3 text-sm' : 'py-2 px-4'}`}
            >
              View Details
            </Link>
            <Link
              href={`/booking?tour=${tour.id}`}
              className={`flex-1 bg-red-600/70 border border-red-600/90 text-white text-center rounded-lg hover:bg-red-600/80 hover:border-red-600/100 hover:text-white transition-all duration-300 font-medium ${isCompact ? 'py-2 px-3 text-sm' : 'py-2 px-4'}`}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
