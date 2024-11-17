'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Loader({ size = 'md', color = '#3b82f6' }: LoaderProps) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32
  }

  const circleSize = sizes[size]

  return (
    <motion.svg
      width={circleSize}
      height={circleSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0.2, opacity: 1 }}
        animate={{
          pathLength: [0.2, 0.8, 0.2],
          opacity: [1, 1, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.svg>
  )
}