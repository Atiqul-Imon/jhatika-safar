'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: false },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, current: false },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarDaysIcon, current: false },
  { name: 'Tours', href: '/admin/tours', icon: MapIcon, current: false },
  { name: 'Messages', href: '/admin/messages', icon: ChatBubbleLeftRightIcon, current: false },
  { name: 'Users', href: '/admin/users', icon: UserGroupIcon, current: false },
  { name: 'Reports', href: '/admin/reports', icon: DocumentTextIcon, current: false },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, current: false },
]

const quickActions = [
  { name: 'Add New Tour', href: '/admin/tours/new', icon: MapIcon },
  { name: 'View Bookings', href: '/admin/bookings', icon: CalendarDaysIcon },
  { name: 'Check Messages', href: '/admin/messages', icon: ChatBubbleLeftRightIcon },
]

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNavigation = navigation.map(item => ({
    ...item,
    current: pathname === item.href
  }))

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-60 admin-sidebar shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 lg:w-60
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 admin-gradient rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-serif">Jhatika Safar</h1>
                <p className="text-sm text-gray-300">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-600/30 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-300" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-600/30">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    admin-sidebar-item
                    ${item.current ? 'active' : ''}
                  `}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.current && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="admin-sidebar-item"
                  >
                    <action.icon className="h-4 w-4" />
                    <span className="text-sm">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-600/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 admin-gradient rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-300 truncate">
                  {user?.email || 'info@jhatikasafar.com'}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-600/30 rounded-lg transition-colors">
                <BellIcon className="h-4 w-4 mr-2" />
                Notifications
              </button>
              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
