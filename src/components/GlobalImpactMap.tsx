'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { X } from 'lucide-react'

interface ImpactMarker {
  id: number
  title: string
  location: string
  coordinates: [number, number]  // [latitude, longitude]
  description: string
  animalsSaved: number
  imageUrl?: string
  date: string
}

const impactData: ImpactMarker[] = [
  {
    id: 1,
    title: "Shelter Modernization Initiative",
    location: "New York, USA",
    coordinates: [40.7128, -74.0060],
    description: "Revolutionary blockchain-based tracking system implemented in local animal shelters, improving adoption rates and care coordination.",
    animalsSaved: 250,
    imageUrl: "/api/placeholder/600/400",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Advanced Veterinary Network",
    location: "London, UK",
    coordinates: [51.5074, -0.1278],
    description: "Decentralized veterinary care program connecting multiple clinics for better resource sharing and emergency response.",
    animalsSaved: 180,
    imageUrl: "/api/placeholder/600/400",
    date: "2024-03-14"
  },
  {
    id: 3,
    title: "Digital Rescue Network",
    location: "Tokyo, Japan",
    coordinates: [35.6762, 139.6503],
    description: "Innovative rescue network using blockchain to coordinate emergency responses and track animal welfare cases.",
    animalsSaved: 320,
    imageUrl: "/api/placeholder/600/400",
    date: "2024-03-13"
  },
  {
    id: 4,
    title: "Wildlife Protection System",
    location: "Nairobi, Kenya",
    coordinates: [-1.2921, 36.8219],
    description: "Blockchain-enabled wildlife tracking and protection system deployed across national parks.",
    animalsSaved: 450,
    imageUrl: "/api/placeholder/600/400",
    date: "2024-03-12"
  },
  {
    id: 5,
    title: "Marine Life Conservation",
    location: "Sydney, Australia",
    coordinates: [-33.8688, 151.2093],
    description: "Smart contract system for coordinating marine life rescue operations and habitat protection.",
    animalsSaved: 280,
    imageUrl: "/api/placeholder/600/400",
    date: "2024-03-11"
  }
]

export function GlobalImpactMap() {
  const [selectedMarker, setSelectedMarker] = useState<ImpactMarker | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const globeRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startPosition = useRef({ x: 0, y: 0 })

  // Convert geographic coordinates to 3D coordinates
  const coordsTo3D = (lat: number, long: number, radius: number = 180): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (long + 180) * (Math.PI / 180)
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    return [x, y, z]
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startPosition.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return

    const deltaX = e.clientX - startPosition.current.x
    const deltaY = e.clientY - startPosition.current.y

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }))

    startPosition.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-50 to-white rounded-xl overflow-hidden shadow-lg">
      {/* Interactive Globe */}
      <div 
        ref={globeRef}
        className="absolute inset-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {/* Globe sphere */}
          <div 
            className="absolute left-1/2 top-1/2 w-[360px] h-[360px] rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #93c5fd, #1d4ed8)',
              boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.2)',
            }}
          />

          {/* Impact markers */}
          {impactData.map((marker) => {
            const [x, y, z] = coordsTo3D(marker.coordinates[0], marker.coordinates[1])
            return (
              <motion.button
                key={marker.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
                }}
                onClick={() => setSelectedMarker(marker)}
                whileHover={{ scale: 1.2 }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                  <div className="absolute inset-0 animate-ping bg-white rounded-full opacity-75" />
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Article Popup */}
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 p-4"
          >
            <Card className="w-full max-w-2xl">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedMarker.title}</h3>
                    <p className="text-sm text-gray-500">{selectedMarker.location} • {selectedMarker.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedMarker(null)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {selectedMarker.imageUrl ? (
                  <img 
                    src={selectedMarker.imageUrl} 
                    alt={selectedMarker.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/api/placeholder/600/400'
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>No Image Found</span>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 mb-4">{selectedMarker.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {selectedMarker.animalsSaved} Animals Helped
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read Full Story →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}