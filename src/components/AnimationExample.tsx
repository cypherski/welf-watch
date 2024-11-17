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

export function AnimationExample() {
  return (
    <div className="space-y-12">
      {/* Single animations */}
      <FadeIn className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          Fade In Content
        </div>
      </FadeIn>

      <SlideUp className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          Slide Up Content
        </div>
      </SlideUp>

      {/* Group animations */}
      <AnimationGroup className="space-y-4" stagger={0.2}>
        <Scale>
          <div className="bg-white rounded-lg shadow p-6">
            Item 1
          </div>
        </Scale>
        <Scale>
          <div className="bg-white rounded-lg shadow p-6">
            Item 2
          </div>
        </Scale>
        <Scale>
          <div className="bg-white rounded-lg shadow p-6">
            Item 3
          </div>
        </Scale>
      </AnimationGroup>

      {/* Card grid with animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item, index) => (
          <Animation
            key={item}
            variant="slideUp"
            delay={index * 0.2}
            className="h-full"
          >
            <div className="bg-white rounded-lg shadow p-6 h-full">
              <h3 className="text-lg font-semibold mb-2">Card {item}</h3>
              <p className="text-gray-600">Some content here...</p>
            </div>
          </Animation>
        ))}
      </div>

      {/* Rotate animation */}
      <Rotate className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          Rotate In Content
        </div>
      </Rotate>
    </div>
  )
}