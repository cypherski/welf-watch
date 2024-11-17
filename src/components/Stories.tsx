'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Share2, Twitter, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

interface Story {
  id: number
  title: string
  date: string
  summary: string
  imageUrl?: string
  tags: string[]
  category: 'latest' | 'featured'
}

const ITEMS_PER_PAGE = 10

// Fallback data
const fallbackStories: Story[] = [
  {
    id: 1,
    title: "Injured Sea Turtle's Miraculous Recovery",
    date: "2024-11-17",
    summary: "A heartwarming story of community effort saving a critically injured sea turtle through blockchain-enabled veterinary care coordination.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Success', 'Marine Life'],
    category: 'latest'
  },
  {
    id: 2,
    title: "Wildlife Protection Initiative Launch",
    date: "2024-11-16",
    summary: "New blockchain-based tracking system implemented to protect endangered species in national parks.",
    imageUrl: "/api/placeholder/400/200",
    tags: ['Initiative', 'Wildlife'],
    category: 'featured'
  },
  // Add more fallback stories as needed
]

function PlaceholderImage() {
  return (
    <div className="w-48 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded flex flex-col items-center justify-center border border-gray-200">
      <div className="relative">
        <Search className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
        <div className="absolute -right-1 -bottom-1">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-25"></div>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-gray-500 text-xs font-medium">No Image Found</p>
    </div>
  )
}

export function Stories() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<'latest' | 'featured'>('latest')
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [stories, setStories] = useState<Story[]>(fallbackStories)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/stories?' + new URLSearchParams({
          category: activeTab,
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString()
        }))

        if (!response.ok) {
          throw new Error('Failed to fetch stories')
        }

        const data = await response.json()
        
        // Validate the response data
        if (Array.isArray(data.data)) {
          setStories(data.data)
        } else {
          console.error('Invalid data format received:', data)
          setStories(fallbackStories)
        }
      } catch (err) {
        console.error('Error fetching stories:', err)
        setError('Failed to fetch stories. Using fallback data.')
        setStories(fallbackStories)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [activeTab, currentPage])

  const handleImageError = (storyId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [storyId]: true
    }))
  }

  // Safely filter stories
  const filteredStories = Array.isArray(stories) 
    ? stories.filter(story => story?.category === activeTab)
    : []

  const totalPages = Math.max(1, Math.ceil(filteredStories.length / ITEMS_PER_PAGE))
  const currentStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveTab('latest')
            setCurrentPage(1)
          }}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'latest'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Latest Stories
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveTab('featured')
            setCurrentPage(1)
          }}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'featured'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Featured Cases
        </motion.button>
      </div>

      {/* Stories Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid gap-6"
        >
          {currentStories.length > 0 ? (
            currentStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {story.imageUrl && !imageErrors[story.id] ? (
                        <motion.img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-48 h-32 object-cover rounded"
                          onError={() => handleImageError(story.id)}
                          layoutId={`image-${story.id}`}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          {story.tags.map(tag => (
                            <motion.span
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{story.summary}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{story.date}</span>
                          <div className="flex gap-2">
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Twitter size={20} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Share2 size={20} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No stories found in this category.
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Page Numbers */}
              {(() => {
                const pages = []
                const maxVisible = 10 // Show 10 page buttons
                let startPage = 1
                
                if (currentPage > 6) {
                  startPage = Math.min(currentPage - 5, totalPages - 9)
                }

                const endPage = Math.min(startPage + 9, totalPages)

                // First page if we're showing later pages
                if (startPage > 1) {
                  pages.push(
                    <motion.button
                      key={1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(1)}
                      className={`w-10 h-10 rounded-full font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      1
                    </motion.button>
                  )
                  
                  if (startPage > 2) {
                    pages.push(
                      <span key="dots-1" className="w-10 h-10 flex items-center justify-center">
                        ...
                      </span>
                    )
                  }
                }

                // Page numbers
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(i)}
                      className={`w-10 h-10 rounded-full font-medium transition-colors ${
                        currentPage === i
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {i}
                    </motion.button>
                  )
                }

                // Last page if there are more pages
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="dots-2" className="w-10 h-10 flex items-center justify-center">
                        ...
                      </span>
                    )
                  }
                  pages.push(
                    <motion.button
                      key={totalPages}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-10 h-10 rounded-full font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {totalPages}
                    </motion.button>
                  )
                }

                return pages
              })()}

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
            
            {/* Page Counter */}
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}