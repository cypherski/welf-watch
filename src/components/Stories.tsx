'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Share2, Twitter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Story {
  id: number
  title: string
  date: string
  summary: string
  imageUrl?: string
  tags: string[]
  category: 'latest' | 'featured'
}

const ITEMS_PER_PAGE = 3

export default function Stories() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<'latest' | 'featured'>('latest')

  const stories: Story[] = [
    {
      id: 1,
      title: "Injured Sea Turtle's Miraculous Recovery",
      date: "2024-11-17",
      summary: "A heartwarming story of community effort saving a critically injured sea turtle...",
      imageUrl: "/api/placeholder/400/200",
      tags: ['Success', 'Marine Life'],
      category: 'featured'
    },
    {
      id: 2,
      title: "Local Shelter Achieves 100% Adoption Rate",
      date: "2024-11-16",
      summary: "Community support leads to unprecedented adoption success...",
      imageUrl: "/api/placeholder/400/200",
      tags: ['Success', 'Community'],
      category: 'latest'
    },
    // Add more stories...
  ]

  const filteredStories = stories.filter(story => story.category === activeTab)
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE)
  const currentStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => {
            setActiveTab('latest')
            setCurrentPage(1)
          }}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'latest'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Latest Stories
        </button>
        <button
          onClick={() => {
            setActiveTab('featured')
            setCurrentPage(1)
          }}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'featured'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Featured Cases
        </button>
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
          {currentStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {story.imageUrl ? (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-48 h-32 object-cover rounded"
                      />
                    ) : (
                      <MagnifyingGlass />
                    )}
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        {story.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                      <p className="text-gray-600 mb-4">{story.summary}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{story.date}</span>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Twitter size={20} />
                          </button>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

function MagnifyingGlass() {
  return (
    <div className="w-48 h-32 bg-gray-100 rounded flex items-center justify-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-400"
      >
        <path
          d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}