import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon, 
  StarIcon,
  CheckIcon,
  XMarkIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'
import TourGallery from '@/components/ui/TourGallery'
import ItineraryAccordion from '@/components/ui/ItineraryAccordion'

interface TourDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tours?status=active`)
    const result = await response.json()
    
    if (result.success) {
      return result.data.map((tour: any) => ({
        slug: tour.slug,
      }))
    }
  } catch (error) {
    console.error('Error generating static params:', error)
  }
  
  return []
}

async function getTourBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tours/slug/${slug}`, {
      cache: 'no-store'
    })
    const result = await response.json()
    
    if (result.success) {
      return result.data
    }
  } catch (error) {
    console.error('Error fetching tour:', error)
  }
  
  return null
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {tour.title}
          </h1>
          <p className="text-xl text-gray-200">
            {tour.shortDescription}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ট্যুর বিবরণ
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Tour Highlights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ট্যুরের বিশেষত্ব
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <TourGallery images={tour.images} title={tour.title} />

            {/* Itinerary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ট্যুরের দিনপঞ্জি
              </h2>
              <ItineraryAccordion itinerary={tour.itinerary} />
            </div>

            {/* Includes & Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  অন্তর্ভুক্ত
                </h3>
                <ul className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckIcon className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />
                  অন্তর্ভুক্ত নয়
                </h3>
                <ul className="space-y-2">
                  {tour.excludes.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <XMarkIcon className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPrice(tour.price)}
                  </div>
                  {tour.originalPrice && (
                    <div className="text-lg text-gray-500 line-through mb-2">
                      {formatPrice(tour.originalPrice)}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    প্রতি জনের জন্য
                  </div>
                </div>

                <Link
                  href={`/booking?tour=${tour.id}`}
                  className="w-full bg-gradient-primary text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-center block mb-4"
                >
                  এখনই বুক করুন
                </Link>

                <div className="text-center text-sm text-gray-600">
                  নিশ্চিতকরণের জন্য ২৪ ঘন্টা সময় লাগে
                </div>
              </div>

              {/* Tour Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ট্যুরের তথ্য
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">সময়কাল</div>
                      <div className="text-sm text-gray-600">{tour.duration} দিন</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <UsersIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">দলের আকার</div>
                      <div className="text-sm text-gray-600">
                        {tour.groupSize.min}-{tour.groupSize.max} জন
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">গন্তব্য</div>
                      <div className="text-sm text-gray-600">
                        {tour.destinations.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <StarIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">কঠিনতা</div>
                      <div className="text-sm text-gray-600">{tour.difficulty}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CalendarDaysIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">সেরা সময়</div>
                      <div className="text-sm text-gray-600">
                        {tour.season.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-primary rounded-2xl p-6 text-white mt-6">
                <h3 className="text-xl font-bold mb-4">
                  আরও তথ্যের জন্য
                </h3>
                <p className="text-green-100 mb-4">
                  ট্যুর সম্পর্কে আরও জানতে আমাদের সাথে যোগাযোগ করুন
                </p>
                <div className="space-y-2 text-sm">
                  <div>📞 +৮৮০ ১৭১৭-১৫১৬৩৬</div>
                  <div>✉️ info@jhatikasofor.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
