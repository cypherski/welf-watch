type CoinPrice = {
    current_price: number
    price_change_percentage_24h: number
  }
  
  type CoinData = {
    id: string
    symbol: string
    current_price: number
    price_change_24h_percentage: number
  }
  
  export async function getCryptoPrices(): Promise<CoinData[]> {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto prices')
      }
  
      const data = await response.json()
      
      return [
        {
          id: 'bitcoin',
          symbol: 'BTC',
          current_price: data.bitcoin.usd,
          price_change_24h_percentage: data.bitcoin.usd_24h_change
        },
        {
          id: 'ethereum',
          symbol: 'ETH',
          current_price: data.ethereum.usd,
          price_change_24h_percentage: data.ethereum.usd_24h_change
        },
        {
          id: 'solana',
          symbol: 'SOL',
          current_price: data.solana.usd,
          price_change_24h_percentage: data.solana.usd_24h_change
        }
      ]
    } catch (error) {
      console.error('Error fetching crypto prices:', error)
      return []
    }
  }