'use client'

import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminLayout({ 
  children, 
  title = "Admin Dashboard", 
  subtitle,
  actions 
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen admin-bg flex">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-60">
        {/* Top bar */}
        <div className="sticky top-0 z-30 admin-card border-b border-gray-200/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold admin-text font-serif">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm admin-text-muted mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            {actions && (
              <div className="flex items-center space-x-4">
                {actions}
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 py-6 lg:px-8">
            <div className="fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
