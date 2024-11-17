'use client'

import React from 'react'
import { Animation, AnimationGroup, FadeIn, SlideUp } from '@/components/ui/Animation'
import { Stories } from '@/components/Stories'
import { GlobalImpactMap } from '@/components/GlobalImpactMap'
import { EducationalResources } from '@/components/EducationalResources'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Making a Difference in Animal Welfare
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Join us in creating positive change through blockchain technology
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors">
              Get Started
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Latest Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationGroup>
            <SlideUp>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Stories</h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <Stories />
            </SlideUp>
          </AnimationGroup>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationGroup>
            <SlideUp>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Global Impact</h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <GlobalImpactMap />
            </SlideUp>
          </AnimationGroup>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationGroup>
            <SlideUp>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Educational Resources</h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <EducationalResources />
            </SlideUp>
          </AnimationGroup>
        </div>
      </section>
    </div>
  )
}