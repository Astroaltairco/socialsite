import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useProfiles } from '../contexts/ProfilesContext'

// Helper function to format numbers with commas
const formatNumber = (num: string | undefined | null): string => {
  if (!num) return '0'
  const cleanNum = num.replace(/[^\d]/g, '')
  return cleanNum ? cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0'
}

// Mock data - replace with real data later
const mockPerformanceData = [
  { date: '2024-01', value: 2400, engagement: 75 },
  { date: '2024-02', value: 3600, engagement: 82 },
  { date: '2024-03', value: 3200, engagement: 78 },
  { date: '2024-04', value: 4500, engagement: 88 },
  { date: '2024-05', value: 4900, engagement: 85 },
  { date: '2024-06', value: 5800, engagement: 92 },
]

const mockStakers = [
  { address: '0x1234...5678', amount: '5000', since: '3 months ago', rank: '1' },
  { address: '0x8765...4321', amount: '3200', since: '2 months ago', rank: '2' },
  { address: '0x9876...1234', amount: '2800', since: '1 month ago', rank: '3' },
]

const mockRecentActivity = [
  { type: 'stake', amount: '1000', time: '2 hours ago', address: '0x1234...5678' },
  { type: 'unstake', amount: '500', time: '1 day ago', address: '0x8765...4321' },
  { type: 'reward', amount: '100', time: '2 days ago', description: 'Weekly Performance Bonus' },
]

const ProfilePage = () => {
  const { handle } = useParams()
  const [isPinned, setIsPinned] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const { addProfile, removeProfile } = useProfiles()

  const handlePinToggle = () => {
    setIsPinned(!isPinned)
    if (!isPinned) {
      addProfile({
        handle: handle?.replace('@', '') || '',
        name: handle || '',
        initial: handle?.[0].toUpperCase() || '',
      })
    } else {
      removeProfile(handle?.replace('@', '') || '')
    }
  }

  const handleWalletAction = () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true)
    }
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-purple-500/20">
              <span className="text-2xl font-bold">{handle?.[0].toUpperCase()}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-[#0A0A1B] flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
          </div>
          <div className="ml-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{handle}</h1>
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full">Verified Creator</span>
            </div>
            <div className="flex items-center mt-2 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <img src="/icons/x.svg" alt="X" className="w-4 h-4" />
                <span className="text-sm">@{handle}</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <img src="/icons/farcaster.svg" alt="Farcaster" className="w-4 h-4" />
                <span className="text-sm">@{handle}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className={`p-2 transition-colors ${
              isPinned ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'
            }`}
            onClick={handlePinToggle}
            title={isPinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
          >
            <svg 
              className="w-6 h-6" 
              fill={isPinned ? 'currentColor' : 'none'} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
              />
            </svg>
          </button>
          <button 
            onClick={handleWalletAction}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 group/btn relative overflow-hidden"
          >
            <span className="relative z-10">{isWalletConnected ? 'Stake $SOCIAL' : 'Connect Wallet'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-300/50 to-yellow-200/0 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-300/30 to-yellow-200/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Total Staked</h3>
          <p className="text-2xl font-bold tabular-nums">125,000 SOCIAL</p>
          <span className="text-green-400 text-sm flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +12.5% this month
          </span>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Number of Stakers</h3>
          <p className="text-2xl font-bold tabular-nums">48</p>
          <span className="text-green-400 text-sm flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +8 this month
          </span>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Average Stake</h3>
          <p className="text-2xl font-bold tabular-nums">2,604 SOCIAL</p>
          <span className="text-gray-400 text-sm">per staker</span>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Performance Score</h3>
          <p className="text-2xl font-bold tabular-nums">92</p>
          <span className="text-purple-400 text-sm flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Top 5%
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-lg font-medium mb-4">Staking Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-lg font-medium mb-4">Engagement Score</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#ec4899"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Stakers List */}
        <div className="col-span-2 bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Top Stakers</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4 font-semibold w-[80px] text-center">Rank</th>
                  <th className="pb-4 font-semibold w-[280px] text-left">Address</th>
                  <th className="pb-4 font-semibold w-[160px] text-right">Amount Staked</th>
                  <th className="pb-4 font-semibold w-[140px] text-right">Staking Since</th>
                  <th className="pb-4 font-semibold w-[120px] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockStakers.map((staker, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-4 text-center">
                      <span className="text-purple-400">#{staker.rank}</span>
                    </td>
                    <td className="py-4 text-left">{staker.address}</td>
                    <td className="py-4 text-right">{formatNumber(staker.amount)} SOCIAL</td>
                    <td className="py-4 text-right">{staker.since}</td>
                    <td className="py-4 text-center">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
          </div>
          <div className="space-y-4">
            {mockRecentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'stake' ? 'bg-green-500/10 text-green-500' :
                  activity.type === 'unstake' ? 'bg-red-500/10 text-red-500' :
                  'bg-purple-500/10 text-purple-500'
                }`}>
                  {activity.type === 'stake' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                  {activity.type === 'unstake' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                  {activity.type === 'reward' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    {activity.type === 'stake' && (
                      <>New stake of <span className="text-white font-medium tabular-nums">{formatNumber(activity.amount)} SOCIAL</span> from {activity.address}</>
                    )}
                    {activity.type === 'unstake' && (
                      <>Unstaked <span className="text-white font-medium tabular-nums">{formatNumber(activity.amount)} SOCIAL</span> by {activity.address}</>
                    )}
                    {activity.type === 'reward' && (
                      <>Earned <span className="text-white font-medium tabular-nums">{formatNumber(activity.amount)} SOCIAL</span> - {activity.description}</>
                    )}
                  </p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage 