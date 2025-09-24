import { StarIcon } from '@heroicons/react/24/solid'

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Rahima Khatun',
      location: 'Dhaka',
      rating: 5,
      text: 'The Sundarbans tour with Jhatika Sofor was amazing. Our guide was very experienced and managed everything beautifully.',
      tour: 'Sundarbans Tour'
    },
    {
      name: 'Karim Uddin',
      location: 'Chittagong',
      rating: 5,
      text: 'We had a wonderful time with our family on the Cox\'s Bazar tour. Everything was on time and beautifully organized.',
      tour: 'Cox\'s Bazar Tour'
    },
    {
      name: 'Fatema Begum',
      location: 'Sylhet',
      rating: 5,
      text: 'The Sylhet tea garden tour was fantastic. We enjoyed the natural beauty and got acquainted with the local culture.',
      tour: 'Sylhet Tea Garden Tour'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Customer Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            What our customers say about our services and their travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Tour */}
              <div className="text-sm text-blue-600 font-semibold mb-4 bg-blue-50 px-3 py-1 rounded-full inline-block">
                {testimonial.tour}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
