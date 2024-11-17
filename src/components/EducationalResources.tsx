'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Video, FileText, Link, ExternalLink, Filter } from 'lucide-react'

interface Resource {
  id: number
  title: string
  description: string
  type: 'article' | 'video' | 'course' | 'guide'
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  link: string
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Animal Welfare",
    description: "Comprehensive introduction to animal welfare principles and practices",
    type: "course",
    duration: "2 hours",
    level: "beginner",
    link: "#"
  },
  {
    id: 2,
    title: "Wildlife Conservation Basics",
    description: "Learn about the fundamentals of wildlife conservation",
    type: "video",
    duration: "45 minutes",
    level: "beginner",
    link: "#"
  },
  // Add more resources...
]

export default function EducationalResources() {
  const [activeType, setActiveType] = useState<string>('all')
  const [activeLevel, setActiveLevel] = useState<string>('all')

  const types = ['all', 'article', 'video', 'course', 'guide']
  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  const filteredResources = resources.filter(resource => 
    (activeType === 'all' || resource.type === activeType) &&
    (activeLevel === 'all' || resource.level === activeLevel)
  )

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />
      case 'course':
        return <Book className="w-5 h-5" />
      case 'guide':
        return <FileText className="w-5 h-5" />
      default:
        return <Link className="w-5 h-5" />
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Filters */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Type</label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
                    activeType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Level</label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
                    activeLevel === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getIcon(resource.type)}
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="capitalize">{resource.level}</span>
                  <span>{resource.duration}</span>
                </div>
                <button
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Access Resource
                  <ExternalLink className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}