export default function StatsSection() {
  const stats = [
    {
      number: '৫০০+',
      label: 'সফল ট্যুর',
      description: 'আমরা সফলভাবে ৫০০+ ট্যুর পরিচালনা করেছি'
    },
    {
      number: '১০০০+',
      label: 'সন্তুষ্ট গ্রাহক',
      description: 'আমাদের ১০০০+ গ্রাহক আমাদের সেবায় সন্তুষ্ট'
    },
    {
      number: '১৫+',
      label: 'গন্তব্য',
      description: 'বাংলাদেশের ১৫+ সুন্দর জায়গায় ট্যুর'
    },
    {
      number: '৯৮%',
      label: 'সন্তুষ্টি হার',
      description: 'আমাদের গ্রাহকদের ৯৮% সন্তুষ্টি হার'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আমাদের অর্জন
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            বছরের পর বছর ধরে আমরা সেরা ভ্রমণ সেবা প্রদান করে আসছি
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
