import { StarIcon } from '@heroicons/react/24/solid'

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Rahima Khatun',
      location: 'Dhaka',
      rating: 5,
      text: 'The Sundarbans tour with Jhatika Safar was amazing. Our guide was very experienced and managed everything beautifully.',
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
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Customer Testimonials
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            What our customers say about our services and their travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/80 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50 hover:bg-white/90 hover:backdrop-blur-2xl hover:border-white/70"
            >
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-800 mb-6 italic text-lg leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Tour */}
              <div className="text-sm text-green-600 font-semibold mb-4 bg-green-100 px-3 py-1 rounded-full inline-block">
                {testimonial.tour}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
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
