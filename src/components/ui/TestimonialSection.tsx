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
    <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 relative overflow-hidden">
      {/* Enhanced Glass Effect Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Customer Testimonials
          </h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            What our customers say about our services and their travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/30 hover:bg-white/15 hover:backdrop-blur-2xl hover:border-white/40"
            >
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-white mb-6 italic text-lg leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Tour */}
              <div className="text-sm text-amber-200 font-semibold mb-4 bg-white/20 px-3 py-1 rounded-full inline-block backdrop-blur-sm border border-white/20">
                {testimonial.tour}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-amber-200">
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
