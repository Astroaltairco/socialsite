import { useState } from 'react'
import TokenCard from '../components/TokenCard'
import { TokenMetrics } from '../../../../shared/types'

const mockTokens: TokenMetrics[] = [
  {
    name: 'Creator DAO',
    symbol: 'CREATE',
    price: 2.45,
    change24h: 12.34,
    marketCap: '12.5M',
    volume: '1.2M',
    sparkline: [2.1, 2.2, 2.3, 2.1, 2.4, 2.45],
    logo: '/token-logos/create.png',
  },
  {
    name: 'Social Club',
    symbol: 'CLUB',
    price: 1.78,
    change24h: -3.21,
    marketCap: '8.9M',
    volume: '890K',
    sparkline: [1.9, 1.85, 1.82, 1.78, 1.75, 1.78],
    logo: '/token-logos/club.png',
  },
  {
    name: 'Community Token',
    symbol: 'CMTY',
    price: 3.12,
    change24h: 5.67,
    marketCap: '15.2M',
    volume: '2.1M',
    sparkline: [2.9, 3.0, 3.1, 3.05, 3.15, 3.12],
    logo: '/token-logos/cmty.png',
  },
]

export default function Tokens() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name')

  const filteredTokens = mockTokens
    .filter(token => 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'change':
          return b.change24h - a.change24h
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My Tokens</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'change')}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="change">Sort by Change</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map((token) => (
          <TokenCard
            key={token.symbol}
            name={token.name}
            symbol={token.symbol}
            price={token.price}
            change={token.change24h}
            volume={parseFloat(token.volume.replace(/[KM]/g, '')) * (token.volume.includes('K') ? 1000 : 1000000)}
          />
        ))}
      </div>

      {filteredTokens.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No tokens found matching your search.
        </div>
      )}
    </div>
  )
} 