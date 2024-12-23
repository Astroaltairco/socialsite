interface TokenCardProps {
  name: string
  symbol: string
  price: number
  change: number
  volume: number
}

export default function TokenCard({ name, symbol, price, change, volume }: TokenCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  const formattedVolume = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(volume)

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-gray-400">{symbol}</p>
        </div>
        <span className={`px-2 py-1 rounded ${change >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Price</span>
          <span className="text-white font-medium">{formattedPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">24h Volume</span>
          <span className="text-white font-medium">{formattedVolume}</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button 
          className="btn-primary"
          aria-label={`Trade ${symbol} token`}
        >
          Trade
        </button>
        <button 
          className="btn-secondary"
          aria-label={`Stake ${symbol} token`}
        >
          Stake
        </button>
      </div>
    </div>
  )
} 