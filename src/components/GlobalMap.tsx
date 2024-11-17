'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, MapPin, Info } from 'lucide-react'

interface ImpactPoint {
  id: number
  lat: number
  lng: number
  title: string
  description: string
  category: string
  impact: string
  date: string
}

const impactPoints: ImpactPoint[] = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.0060,
    title: "NYC Wildlife Rehabilitation Center",
    description: "Major rehabilitation center helping urban wildlife",
    category: "Rehabilitation",
    impact: "Over 5,000 animals helped annually",
    date: "2024-present"
  },
  // Add more impact points...
]

export default function GlobalImpactMap() {
  const [selectedPoint, setSelectedPoint] = useState<ImpactPoint | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', 'rehabilitation', 'sanctuary', 'conservation']

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-[600px]">
          {/* Map Visualization */}
          <div className="relative flex-1 bg-blue-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe2 className="w-16 h-16 text-blue-200" />
              <div className="absolute inset-0">
                {impactPoints
                  .filter(point => activeCategory === 'all' || point.category.toLowerCase() === activeCategory)
                  .map((point) => (
                    <motion.button
                      key={point.id}
                      className="absolute"
                      style={{
                        left: `${((point.lng + 180) / 360) * 100}%`,
                        top: `${((90 - point.lat) / 180) * 100}%`
                      }}
                      onClick={() => setSelectedPoint(point)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MapPin className="w-6 h-6 text-blue-600 -translate-x-1/2 -translate-y-1/2" />
                    </motion.button>
                  ))}
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="w-full lg:w-96 border-l border-gray-200">
            {/* Category Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Point Details */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                {selectedPoint ? (
                  <motion.div
                    key={selectedPoint.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold">{selectedPoint.title}</h3>
                    <p className="text-gray-600">{selectedPoint.description}</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Impact</h4>
                      <p className="text-blue-700">{selectedPoint.impact}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{selectedPoint.category}</span>
                      <span>{selectedPoint.date}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center text-gray-500"
                  >
                    <Info className="w-12 h-12 mb-4" />
                    <p>Select a point on the map to view impact details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}