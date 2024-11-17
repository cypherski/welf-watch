'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

// Basic animation props
interface BaseAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

// Animation variants
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 }
  }
}

type AnimationVariant = keyof typeof variants

// Props type
interface AnimationProps extends BaseAnimationProps {
  variant: AnimationVariant
}

// Main Animation Component
export function Animation({
  children,
  className,
  variant,
  delay = 0,
  duration = 0.5
}: AnimationProps) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Animation Group Component
interface AnimationGroupProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

export function AnimationGroup({
  children,
  className,
  stagger = 0.1
}: AnimationGroupProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            delay: index * stagger,
            ...child.props
          })
        }
        return child
      })}
    </div>
  )
}

// Specialized Components for common use cases
export function FadeIn(props: Omit<AnimationProps, 'variant'>) {
  return <Animation variant="fade" {...props} />
}

export function SlideUp(props: Omit<AnimationProps, 'variant'>) {
  return <Animation variant="slideUp" {...props} />
}

export function SlideDown(props: Omit<AnimationProps, 'variant'>) {
  return <Animation variant="slideDown" {...props} />
}

export function Scale(props: Omit<AnimationProps, 'variant'>) {
  return <Animation variant="scale" {...props} />
}

export function Rotate(props: Omit<AnimationProps, 'variant'>) {
  return <Animation variant="rotate" {...props} />
}