'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tour Packages', href: '/tours' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-serif">Jhatika Safar</h1>
                <p className="text-sm text-gray-700 font-medium">Bangladesh Travel</p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-semibold transition-colors duration-200',
                  pathname === item.href && 'text-green-600 border-b-2 border-green-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Panel Button - Only show for admin users */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium"
              >
                <Cog6ToothIcon className="h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            )}
            
            <a
              href="tel:+8801717151636"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 hover:text-green-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-gray-800 hover:text-green-600 block px-3 py-2 text-base font-semibold',
                  pathname === item.href && 'text-green-600 bg-green-50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {/* Admin Panel Button - Only show for admin users */}
              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              )}
              
              <a
                href="tel:+8801717151636"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PhoneIcon className="h-4 w-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
