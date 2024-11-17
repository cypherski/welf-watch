'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Video, FileText, Link, ExternalLink, Filter, ChevronRight, Clock, Trophy, X } from 'lucide-react'

interface Resource {
  id: number
  title: string
  description: string
  type: 'article' | 'video' | 'course' | 'guide'
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  link: string
  chapters?: { title: string; duration: string }[]
}

// Enhanced resources with additional data
const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Animal Welfare",
    description: "Comprehensive introduction to animal welfare principles and practices using blockchain technology",
    type: "course",
    duration: "2 hours",
    level: "beginner",
    link: "#",
    chapters: [
      { title: "Introduction to Animal Welfare", duration: "30 min" },
      { title: "Blockchain Fundamentals", duration: "30 min" },
      { title: "Digital Identity for Animals", duration: "30 min" },
      { title: "Implementation Strategies", duration: "30 min" }
    ]
  },
  // ... your existing resources
]

export function EducationalResources() {
  const [activeType, setActiveType] = useState<string>('all')
  const [activeLevel, setActiveLevel] = useState<string>('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const types = ['all', 'article', 'video', 'course', 'guide']
  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  const filteredResources = resources.filter(resource => 
    (activeType === 'all' || resource.type === activeType) &&
    (activeLevel === 'all' || resource.level === activeLevel)
  )

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700'
      case 'intermediate':
        return 'bg-blue-100 text-blue-700'
      case 'advanced':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

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
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 bg-white rounded-xl shadow-sm p-6 sticky top-4 z-10 backdrop-blur-sm bg-white/80"
      >
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-medium">Type</label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                    activeType === type
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {getIcon(type)}
                  <span className="ml-2">{type}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-medium">Level</label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm capitalize transition-all flex items-center ${
                    activeLevel === level
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {level}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getIcon(resource.type)}
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {resource.duration}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedResource(resource)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group-hover:shadow-md"
                  >
                    Start Learning
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Resource Details Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b sticky top-0 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedResource.title}</h2>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getLevelColor(selectedResource.level)}`}>
                        {selectedResource.level}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                        {selectedResource.duration}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedResource(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">{selectedResource.description}</p>
                
                {selectedResource.chapters && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Course Content</h3>
                    {selectedResource.chapters.map((chapter, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <span>{chapter.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{chapter.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Begin {selectedResource.type}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}