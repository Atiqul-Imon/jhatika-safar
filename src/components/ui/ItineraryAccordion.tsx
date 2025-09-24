'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { ItineraryDay } from '@/types'

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[]
}

export default function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  const [openDay, setOpenDay] = useState<number | null>(0) // First day open by default

  return (
    <div className="space-y-4">
      {itinerary.map((day, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
            onClick={() => setOpenDay(openDay === index ? null : index)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                দিন {day.day}: {day.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {day.description}
              </p>
            </div>
            {openDay === index ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {openDay === index && (
            <div className="px-6 py-4 bg-white">
              <div className="space-y-4">
                {/* Activities */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">কর্মসূচি:</h4>
                  <ul className="space-y-1">
                    {day.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meals */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">খাবার:</h4>
                  <ul className="space-y-1">
                    {day.meals.map((meal, mealIndex) => (
                      <li key={mealIndex} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{meal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accommodation */}
                {day.accommodation && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">আবাসন:</h4>
                    <p className="text-gray-700 text-sm">{day.accommodation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
