import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Creator {
  name: string
  handle: string
  marketCap: string
  price: string
  volume24h: string
  priceChange24h: string
  category: string
  imageUrl: string
  description?: string
  followers: string
  engagement: string
  socials?: {
    farcaster?: string
    x?: string
  }
}

interface Staker {
  address: string
  amount: string
  since: string
  rewards: string
}

interface SocialPost {
  platform: 'farcaster' | 'x'
  content: string
  timestamp: string
  likes: number
  reposts: number
}

const CreatorProfile = () => {
  const { handle } = useParams<{ handle: string }>()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [stakers, setStakers] = useState<Staker[]>([])
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/data/virtuals_agents.json')
        const data = await response.json()
        const creatorData = data.find((c: Creator) => c.handle === handle)
        
        // Add mock social links if not present
        if (creatorData) {
          creatorData.socials = {
            farcaster: `https://warpcast.com/${creatorData.handle.replace('@', '')}`,
            x: `https://x.com/${creatorData.handle.replace('@', '')}`
          }
        }
        
        setCreator(creatorData || null)

        // Mock stakers data
        setStakers([
          { address: '0x1234...5678', amount: '1,500 SOCIAL', since: '2024-01-15', rewards: '45 SOCIAL' },
          { address: '0x8765...4321', amount: '2,200 SOCIAL', since: '2024-01-10', rewards: '72 SOCIAL' },
          { address: '0x9876...0123', amount: '800 SOCIAL', since: '2024-01-20', rewards: '21 SOCIAL' },
        ])

        // Mock social posts
        setSocialPosts([
          {
            platform: 'farcaster',
            content: 'Just launched a new AI feature! Check it out...',
            timestamp: '2024-01-25T10:30:00Z',
            likes: 156,
            reposts: 42
          },
          {
            platform: 'x',
            content: 'Thanks for all the support! Our community is growing fast...',
            timestamp: '2024-01-24T15:45:00Z',
            likes: 234,
            reposts: 89
          }
        ])

        setLoading(false)
      } catch (error) {
        console.error('Error fetching creator data:', error)
        setLoading(false)
      }
    }

    if (handle) {
      fetchCreatorData()
    }
  }, [handle])

  const stakingData = {
    labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
    datasets: [
      {
        label: 'Total Staked',
        data: [1000, 1500, 2200, 2800, 3500, 4200, 4500],
        fill: true,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Creator not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={creator.imageUrl}
          alt={creator.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600"
        />
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{creator.name}</h1>
              <p className="text-gray-600">{creator.handle}</p>
              <div className="flex space-x-4 mt-2">
                <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                  {creator.category}
                </span>
                <span className="text-sm text-gray-600">
                  {creator.followers} followers
                </span>
                <span className="text-sm text-gray-600">
                  {creator.engagement} engagement
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {creator.socials?.farcaster && (
                <a
                  href={creator.socials.farcaster}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <img src="/icons/farcaster.svg" alt="Farcaster" className="w-6 h-6" />
                </a>
              )}
              {creator.socials?.x && (
                <a
                  href={creator.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <img src="/icons/x.svg" alt="X" className="w-6 h-6" />
                </a>
              )}
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Market Cap</h3>
          <p className="text-2xl font-semibold">{creator.marketCap}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Price</h3>
          <div className="flex items-center">
            <p className="text-2xl font-semibold">{creator.price}</p>
            <span className={`ml-2 text-sm ${
              creator.priceChange24h.startsWith('-') ? 'text-red-500' : 'text-green-500'
            }`}>
              {creator.priceChange24h}
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">24h Volume</h3>
          <p className="text-2xl font-semibold">{creator.volume24h}</p>
        </div>
      </div>

      {/* Staking Graph */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Total Staked Amount</h2>
        <div className="h-[300px]">
          <Line data={stakingData} options={chartOptions} />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stakers List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Top Stakers</h2>
          <div className="space-y-4">
            {stakers.map((staker, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{staker.address}</p>
                  <p className="text-sm text-gray-600">Since {staker.since}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{staker.amount}</p>
                  <p className="text-sm text-green-600">+{staker.rewards}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Posts */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
          <div className="space-y-4">
            {socialPosts.map((post, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={`/icons/${post.platform}.svg`}
                    alt={post.platform}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{post.content}</p>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>{post.likes} likes</span>
                  <span>{post.reposts} reposts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorProfile 