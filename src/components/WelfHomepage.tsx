'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Globe, Twitter, TrendingUp, BookOpen, Share2 } from 'lucide-react'
import Hero from './Hero'
import LiveFeed from './LiveFeed'
import StatsBanner from './StatsBanner'
import GlobalMap from './GlobalMap'
import TokenInfo from './TokenInfo'

export default function WelfHomepage() {
  const [selectedTab, setSelectedTab] = useState('latest')

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue={selectedTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="latest">Latest Stories</TabsTrigger>
            <TabsTrigger value="featured">Featured Cases</TabsTrigger>
            <TabsTrigger value="map">Global Impact</TabsTrigger>
            <TabsTrigger value="learn">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="latest">
            <LiveFeed />
          </TabsContent>

          <TabsContent value="map">
            <GlobalMap />
          </TabsContent>

          <TabsContent value="learn">
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <BookOpen className="mx-auto text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
              <p className="text-gray-600">
                Learn about animal welfare, rights, and how you can make a difference.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <TokenInfo />
      <StatsBanner />
    </div>
  )
}