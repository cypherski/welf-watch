'use client'

import React from 'react'
import { motion, HTMLMotionProps, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InteractiveCardProps extends Omit<HTMLMotionProps<'div'>, 'onMouseMove'> {
  children: React.ReactNode
  gradient?: boolean
  hover3D?: boolean
  className?: string
}

export function InteractiveCard({ 
  children, 
  gradient = true, 
  hover3D = true,
  className,
  ...props 
}: InteractiveCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-white/10 bg-white shadow-lg transition-colors hover:border-white/20",
        className
      )}
      onMouseMove={onMouseMove}
      style={{
        perspective: hover3D ? "1000px" : undefined,
      }}
      {...props}
    >
      {gradient && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 130, 246, 0.1),
                transparent 80%
              )
            `
          }}
        />
      )}
      {children}
    </motion.div>
  )
}