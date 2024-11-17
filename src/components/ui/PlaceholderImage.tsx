'use client'

import React from 'react'
import { Search } from 'lucide-react'

interface PlaceholderImageProps {
  className?: string
  message?: string
}

export function PlaceholderImage({ 
  className = "w-full h-64", 
  message = "No Image Found" 
}: PlaceholderImageProps) {
  return (
    <div className={`
      ${className}
      bg-gradient-to-br from-gray-50 to-gray-100
      rounded-lg
      flex flex-col items-center justify-center
      border border-gray-200
    `}>
      <div className="transform transition-transform group-hover:scale-110">
        <div className="relative">
          <Search className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          <div className="absolute -right-1 -bottom-1">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <div className="w-3 h-3 bg-blue-400 rounded-full opacity-25"></div>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-500 text-sm font-medium">{message}</p>
    </div>
  )
}