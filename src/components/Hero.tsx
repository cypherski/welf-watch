import React from 'react'
import { Share2, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative bg-blue-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">$WELF</h1>
          <p className="text-xl text-blue-700 mb-8">
            Uniting Cryptocurrency with Compassion for Animal Welfare
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <TrendingUp size={20} />
              Trade on Pump.fun
            </button>
            <button className="bg-blue-100 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-200 transition flex items-center gap-2">
              <Share2 size={20} />
              Share Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}