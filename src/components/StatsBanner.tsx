'use client'

import React, { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { getCryptoPrices } from '@/lib/crypto-api'

type CoinData = {
  id: string
  symbol: string
  current_price: number
  price_change_24h_percentage: number
}

export default function StatsBanner() {
  const [cryptoData, setCryptoData] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getCryptoPrices()
      setCryptoData(prices)
      setLoading(false)
    }

    fetchPrices()

    // Update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price)
  }

  const formatPercentage = (percentage: number) => {
    return percentage.toFixed(2) + '%'
  }

  return (
    <div className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center">Loading prices...</div>
          ) : (
            cryptoData.map((coin) => (
              <div key={coin.id} className="text-center group hover:bg-blue-800 rounded-lg p-4 transition-colors duration-200">
                <p className="text-sm uppercase font-medium text-blue-200">{coin.symbol}/USD</p>
                <p className="text-3xl font-bold mb-1">
                  {formatPrice(coin.current_price)}
                </p>
                <div className="flex items-center justify-center gap-1">
                  {coin.price_change_24h_percentage >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={
                      coin.price_change_24h_percentage >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  >
                    {formatPercentage(coin.price_change_24h_percentage)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}