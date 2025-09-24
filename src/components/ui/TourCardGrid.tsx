import { Tour } from '@/types'
import TourCard from './TourCard'

interface TourCardGridProps {
  tours: Tour[]
  variant?: 'default' | 'compact' | 'detailed'
  showButtons?: boolean
  className?: string
  gridCols?: '1' | '2' | '3' | '4'
}

export default function TourCardGrid({ 
  tours, 
  variant = 'default',
  showButtons = true,
  className = '',
  gridCols = '3'
}: TourCardGridProps) {
  const getGridCols = () => {
    switch (gridCols) {
      case '1':
        return 'grid-cols-1'
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case '4':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tours found
        </h3>
        <p className="text-gray-600">
          No tours match your search criteria. Please try different keywords.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid ${getGridCols()} gap-8 ${className}`}>
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          variant={variant}
          showButtons={showButtons}
        />
      ))}
    </div>
  )
}
