'use client'

import React from 'react'
import { 
  Animation, 
  AnimationGroup, 
  FadeIn, 
  SlideUp, 
  Scale, 
  Rotate 
} from './ui/Animation'

export function AnimationExamples() {
  return (
    <div className="space-y-8">
      {/* Basic animations */}
      <Animation variant="fade" className="p-6">
        <div className="bg-white rounded-lg shadow p-4">
          Fade Animation
        </div>
      </Animation>

      <Animation variant="slideUp" delay={0.2} className="p-6">
        <div className="bg-white rounded-lg shadow p-4">
          Slide Animation
        </div>
      </Animation>

      <Animation variant="scale" delay={0.4} className="p-6">
        <div className="bg-white rounded-lg shadow p-4">
          Scale Animation
        </div>
      </Animation>

      {/* Using convenience components */}
      <FadeIn className="p-6">
        <div className="bg-white rounded-lg shadow p-4">
          Using FadeIn Component
        </div>
      </FadeIn>

      <SlideUp className="p-6">
        <div className="bg-white rounded-lg shadow p-4">
          Using SlideUp Component
        </div>
      </SlideUp>

      {/* Animation group example */}
      <AnimationGroup className="space-y-4" stagger={0.2}>
        <Scale>
          <div className="bg-white rounded-lg shadow p-4">
            Group Item 1
          </div>
        </Scale>
        <Scale>
          <div className="bg-white rounded-lg shadow p-4">
            Group Item 2
          </div>
        </Scale>
        <Scale>
          <div className="bg-white rounded-lg shadow p-4">
            Group Item 3
          </div>
        </Scale>
      </AnimationGroup>

      {/* Grid with animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item, index) => (
          <Animation
            key={item}
            variant="slideUp"
            delay={index * 0.2}
            className="h-full"
          >
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h3 className="text-lg font-semibold mb-2">Card {item}</h3>
              <p className="text-gray-600">Some content here...</p>
            </div>
          </Animation>
        ))}
      </div>

      {/* Rotate animation example */}
      <Rotate className="p-6">
        <div className="bg-white rounded-lg shadow p-4">
          Using Rotate Component
        </div>
      </Rotate>
    </div>
  )
}

// List page example
export function AnimatedList() {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`
  }))

  return (
    <AnimationGroup className="space-y-4" stagger={0.1}>
      {items.map(item => (
        <SlideUp key={item.id}>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </SlideUp>
      ))}
    </AnimationGroup>
  )
}

// Card grid example
export function AnimatedGrid() {
  const cards = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    content: `Content for card ${i + 1}`
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Animation
          key={card.id}
          variant="scale"
          delay={index * 0.1}
          className="h-full"
        >
          <div className="bg-white rounded-lg shadow p-6 h-full">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.content}</p>
          </div>
        </Animation>
      ))}
    </div>
  )
}