import { StarIcon, MapPinIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {

  const values = [
    {
      title: 'Quality Service',
      description: 'We provide the highest quality service and ensure customer satisfaction.',
      icon: StarIcon
    },
    {
      title: 'Local Experience',
      description: 'Our guides are local and experienced, who can provide you with the best experience.',
      icon: MapPinIcon
    },
    {
      title: 'Teamwork',
      description: 'We believe that the best results are achieved through teamwork.',
      icon: UsersIcon
    },
    {
      title: 'Punctuality',
      description: 'We always provide timely service and never delay.',
      icon: ClockIcon
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif text-white">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
            Jhatika Safar - Bangladesh&apos;s Most Trusted Travel Agency
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Established in 2015, Jhatika Safar is a leading travel agency in Bangladesh.
                  Our goal is to take travelers to the most beautiful places in Bangladesh
                  and provide them with memorable experiences.
                </p>
                <p>
                  We believe that travel is not just about seeing places, it is an experience
                  that enriches people&apos;s lives. Our team has traveled to every corner of Bangladesh
                  and gained deep knowledge of local culture, history, and natural beauty.
                </p>
                <p>
                  To date, we have successfully conducted 500+ tours and achieved 1000+ customer
                  satisfaction. The key to our success is our experienced guides, safe transportation,
                  and highest quality service.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/db5yniogx/image/upload/v1/about/about-story.jpg"
                alt="Jhatika Safar Story"
                className="rounded-3xl shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The values we work with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Statistics */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">
              Our Achievements
            </h2>
            <p className="text-xl text-green-100">
              Years of providing the best travel services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">500+</div>
              <div className="text-green-100 mb-2">Successful Tours</div>
              <p className="text-sm text-green-200">
                We have successfully conducted 500+ tours
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">1000+</div>
              <div className="text-green-100 mb-2">Happy Customers</div>
              <p className="text-sm text-green-200">
                Our 1000+ customers are satisfied with our service
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">15+</div>
              <div className="text-green-100 mb-2">Destinations</div>
              <p className="text-sm text-green-200">
                Tours to 15+ beautiful places in Bangladesh
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">98%</div>
              <div className="text-green-100 mb-2">Satisfaction Rate</div>
              <p className="text-sm text-green-200">
                98% satisfaction rate among our customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to take travelers to the most beautiful places in Bangladesh and
                provide them with memorable experiences. We want every traveler to
                become familiar with the natural beauty, rich culture, and traditional
                places of Bangladesh.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be established as a leading travel agency in Bangladesh&apos;s tourism industry.
                We want to contribute to the development of Bangladesh&apos;s tourism industry
                and present Bangladesh as an attractive destination to travelers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
