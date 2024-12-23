import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock data - replace with real data later
const mockCategories = [
  'All Creators',
  'DeFi',
  'NFTs',
  'Gaming',
  'Web3 Development',
  'Content Creation',
  'Research',
  'Community',
]

const mockCreators = [
  {
    handle: 'emmawilson',
    name: 'Emma Wilson',
    avatar: 'EW',
    role: 'Web3 Developer & Content Creator',
    category: 'Web3 Development',
    staked: '15,000',
    socials: { farcaster: '@emmawilson', x: '@emmawilson' },
    color: 'from-[#E15A46] to-[#E15A46]',
  },
  {
    handle: 'alexc',
    name: 'Alex Chen',
    avatar: 'AC',
    role: 'DeFi Researcher & Crypto Analyst',
    category: 'DeFi',
    staked: '25,000',
    socials: { farcaster: '@alexc', x: '@alexc' },
    color: 'from-[#E6A144] to-[#E6A144]',
  },
  {
    handle: 'sarahj',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'NFT Artist & Community Builder',
    category: 'NFTs',
    staked: '18,000',
    socials: { farcaster: '@sarahj', x: '@sarahj' },
    color: 'from-red-500 to-rose-500',
  },
  {
    handle: 'mpark',
    name: 'Michael Park',
    avatar: 'MP',
    role: 'Blockchain Engineer & Protocol Designer',
    category: 'Web3 Development',
    staked: '30,000',
    socials: { farcaster: '@mpark', x: '@mpark' },
    color: 'from-purple-500 to-indigo-500',
  },
  {
    handle: 'lisaz',
    name: 'Lisa Zhang',
    avatar: 'LZ',
    role: 'DAO Governance Expert & Writer',
    category: 'Community',
    staked: '22,000',
    socials: { farcaster: '@lisaz', x: '@lisaz' },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    handle: 'davidk',
    name: 'David Kim',
    avatar: 'DK',
    role: 'Smart Contract Auditor & Security Researcher',
    category: 'Research',
    staked: '28,000',
    socials: { farcaster: '@davidk', x: '@davidk' },
    color: 'from-emerald-500 to-teal-500',
  },
  {
    handle: 'rachelt',
    name: 'Rachel Torres',
    avatar: 'RT',
    role: 'DeFi Education & Community Management',
    category: 'DeFi',
    staked: '19,000',
    socials: { farcaster: '@rachelt', x: '@rachelt' },
    color: 'from-violet-500 to-purple-500',
  },
  {
    handle: 'jamesw',
    name: 'James Wilson',
    avatar: 'JW',
    role: 'Crypto Economics & Market Analysis',
    category: 'Research',
    staked: '24,000',
    socials: { farcaster: '@jamesw', x: '@jamesw' },
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    handle: 'ninap',
    name: 'Nina Patel',
    avatar: 'NP',
    role: 'Web3 UX Designer & Product Strategist',
    category: 'Web3 Development',
    staked: '17,000',
    socials: { farcaster: '@ninap', x: '@ninap' },
    color: 'from-rose-500 to-orange-500',
  },
]

const Profiles = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Creators')

  const filteredCreators = mockCreators.filter(creator => {
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = 
      selectedCategory === 'All Creators' || 
      creator.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Creator Profiles</h1>
          <p className="text-gray-400">Discover and connect with Web3 creators</p>
        </div>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          Connect Wallet
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search creators by name, handle, or role..."
            className="w-full h-12 bg-[#0A0A1B] rounded-xl pl-12 pr-4 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {mockCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 h-8 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white'
                  : 'bg-[#0A0A1B] text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <button className="h-8 px-4 bg-[#0A0A1B] rounded-lg text-sm text-gray-300 hover:bg-[#1e1f28] transition-colors flex items-center gap-2">
          Most Staked
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCreators.map((creator) => (
          <Link
            key={creator.handle}
            to={`/profiles/${creator.handle}`}
            className="group block"
          >
            <div className="bg-[#0A0A1B] rounded-xl p-5 relative group hover:bg-[#0F0F1F] transition-all duration-300 border border-white/5 hover:border-purple-500/20">
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center ring-2 ring-white/5 group-hover:ring-purple-500/20 transition-all duration-300`}>
                      <span className="text-sm font-semibold text-white">{creator.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors duration-300">{creator.name}</h3>
                      <p className="text-sm text-gray-500">@{creator.handle}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4">{creator.role}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#14151f] flex items-center justify-center group-hover:bg-purple-500/5 transition-colors duration-300">
                      <img src="/icons/farcaster.svg" alt="Farcaster" className="w-4 h-4 opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#14151f] flex items-center justify-center group-hover:bg-purple-500/5 transition-colors duration-300">
                      <img src="/icons/x.svg" alt="X" className="w-4 h-4 opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-purple-400 font-medium">{creator.staked}</span>
                    <span className="text-sm text-gray-500">SOCIAL staked</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredCreators.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#0A0A1B] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No creators found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default Profiles 