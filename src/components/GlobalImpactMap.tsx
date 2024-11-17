'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { X } from 'lucide-react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface ImpactMarker {
  id: number
  title: string
  location: string
  coordinates: [number, number]
  description: string
  animalsSaved: number
  imageUrl?: string
  date: string
}

const impactData: ImpactMarker[] = [
  // Your existing impact data array
]

export function GlobalImpactMap() {
  const [selectedMarker, setSelectedMarker] = useState<ImpactMarker | null>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const markersRef = useRef<THREE.Sprite[]>([])
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const frameIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Optimized renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setClearColor(0xffffff, 0)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Camera setup with optimized FOV
    const camera = new THREE.PerspectiveCamera(
      60, // Wider FOV for better performance
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Optimized controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.minDistance = 3
    controls.maxDistance = 7
    controls.enableZoom = true
    controls.zoomSpeed = 0.5
    controls.panSpeed = 0.5
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controlsRef.current = controls

    // Optimized lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Create optimized earth texture
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 256  // Reduced texture size
      canvas.height = 256
      const ctx = canvas.getContext('2d')!
      
      const gradient = ctx.createLinearGradient(0, 0, 256, 256)
      gradient.addColorStop(0, '#1e40af')
      gradient.addColorStop(1, '#3b82f6')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 256, 256)
      
      // Simplified noise
      const imageData = ctx.getImageData(0, 0, 256, 256)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 16) { // Reduced noise sampling
        const noise = (Math.random() - 0.5) * 10
        data[i] += noise
        data[i + 1] += noise
        data[i + 2] += noise
      }
      ctx.putImageData(imageData, 0, 0)

      const texture = new THREE.CanvasTexture(canvas)
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      return texture
    }

    // Optimized marker texture
    const createMarkerTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32  // Reduced size
      canvas.height = 32
      const ctx = canvas.getContext('2d')!
      
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      return texture
    }

    // Optimized earth geometry and material
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32) // Reduced segments
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: createEarthTexture(),
      shininess: 10,
    })
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Optimized atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 32, 32)
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.1,
      color: 0x93c5fd,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Optimized markers
    const markerMaterial = new THREE.SpriteMaterial({
      map: createMarkerTexture(),
      transparent: true,
      opacity: 0.8,
    })

    impactData.forEach((marker) => {
      const [lat, lon] = marker.coordinates
      const position = latLonToVector3(lat, lon, 2.1)
      
      const sprite = new THREE.Sprite(markerMaterial)
      sprite.position.copy(position)
      sprite.scale.set(0.2, 0.2, 1)
      sprite.userData = marker
      
      scene.add(sprite)
      markersRef.current.push(sprite)
    })

    // Optimized animation loop with RAF
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)
      controls.update()

      // Batch marker updates
      if (markersRef.current.length > 0) {
        const scale = 0.2 + Math.sin(Date.now() * 0.002) * 0.02
        markersRef.current.forEach(marker => {
          marker.scale.set(scale, scale, 1)
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    // Optimized resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (!mountRef.current) return
        const width = mountRef.current.clientWidth
        const height = mountRef.current.clientHeight
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }, 100)
    }
    window.addEventListener('resize', handleResize)

    // Optimized click handler
    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current) return
      
      const rect = mountRef.current.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(markersRef.current)

      if (intersects.length > 0) {
        const marker = intersects[0].object.userData as ImpactMarker
        setSelectedMarker(marker)
      }
    }
    renderer.domElement.addEventListener('click', handleClick)

    return () => {
      clearTimeout(resizeTimeout)
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current)
      }
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', handleClick)
      mountRef.current?.removeChild(renderer.domElement)
      
      // Clean up THREE.js resources
      earthGeometry.dispose()
      earthMaterial.dispose()
      atmosphereGeometry.dispose()
      atmosphereMaterial.dispose()
      markerMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    )
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-50 to-white rounded-xl overflow-hidden shadow-lg">
      <div ref={mountRef} className="absolute inset-0" />
      
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 p-4"
          >
            <Card className="w-full max-w-2xl">
              <CardContent className="p-6">
                {/* Your existing card content */}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}