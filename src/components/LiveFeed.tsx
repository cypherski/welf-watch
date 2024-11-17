'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Twitter, Share2, Search } from 'lucide-react'
import { motion } from 'framer-motion'

type Article = {
  id: number
  title: string
  date: string
  summary: string
  imageUrl?: string
  tags: string[]
}

export default function LiveFeed() {
  const shareOnTwitter = (article: Article) => {
    const tweetText = `${article.title}\n\nRead more about animal welfare: #WELF #AnimalWelfare`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(url, '_blank')
  }

  const articles: Article[] = [
    {
      id: 1,
      title: "Pnut the Squirrel's Story Touches Hearts Worldwide",
      date: "2024-11-17",
      summary: "Community rallies to save injured squirrel found in local park...",
      imageUrl: "/api/placeholder/400/200",
      tags: ['Featured', 'Success Story']
    },
    {
      id: 2,
      title: "Remembering Harambe: Legacy Continues to Impact Animal Welfare",
      date: "2024-11-16",
      summary: "Five years later, Harambe's story continues to influence zoo policies...",
      tags: ['Featured', 'Legacy']
    }
  ]

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-48 h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-48 h-32 bg-gray-100 rounded flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">No Image</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    {article.tags.map(tag => (
                      <motion.span
                        key={tag}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => shareOnTwitter(article)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Twitter size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
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
      ))}
    </div>
  )
}