'use client'

import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4 font-serif">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Sorry, the page you are looking for could not be found. 
            The page may have been moved or you may have used an incorrect URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          
          <div>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            For assistance, please visit our{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact
            </Link>{' '}
            page
          </p>
        </div>
      </div>
    </div>
  )
}
