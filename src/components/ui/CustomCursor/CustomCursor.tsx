'use client'

import React, { useState, useEffect } from 'react'

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseover', onMouseOver)
      document.addEventListener('click', onClick)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup', onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable: boolean = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.hasAttribute('role') ||
        target.classList.contains('clickable')
        
      setIsHovered(Boolean(isClickable))
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 1000)
    }

    addEventListeners()
    return () => removeEventListeners()
  }, [])

  return (
    <>
      <div 
        className={`
          fixed pointer-events-none z-[9999] mix-blend-difference
          ${!isVisible ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-150
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`
            relative bg-white rounded-full
            transition-all duration-150 ease-out
            flex items-center justify-center
            ${isHovered ? 'w-12 h-12' : 'w-6 h-6'}
            ${isClicking ? 'scale-75' : 'scale-100'}
          `}
        >
          <span 
            className={`
              text-black font-bold transition-all duration-150
              ${isHovered ? 'text-xl' : 'text-sm'}
              ${isClicking ? 'scale-75' : 'scale-100'}
            `}
          >
            {isHovered ? '×' : '+'}
          </span>
        </div>
      </div>

      <style jsx global>{`
        .cursor-ripple {
          position: fixed;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          animation: ripple 1s ease-out;
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        /* Hide default cursor when custom cursor is visible */
        html, body {
          cursor: none !important;
        }

        /* Optional: Show default cursor on text for better UX */
        input,
        textarea {
          cursor: text !important;
        }
      `}</style>
    </>
  )
}