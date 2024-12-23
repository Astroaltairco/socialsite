import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for the portfolio performance chart
const mockPerformanceData = [
  { date: '2024-01', value: 15000 },
  { date: '2024-02', value: 22000 },
  { date: '2024-03', value: 28000 },
  { date: '2024-04', value: 35000 },
  { date: '2024-05', value: 42000 },
  { date: '2024-06', value: 50000 },
]

// Mock data for recent activity
const mockRecentActivity = [
  { type: 'stake', amount: '5,000 SOCIAL', time: '2 hours ago', creator: '@emmawilson' },
  { type: 'reward', amount: '250 SOCIAL', time: '1 day ago', creator: '@alexc' },
  { type: 'unstake', amount: '2,000 SOCIAL', time: '3 days ago', creator: '@sarahj' },
]

export default function Portfolio() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Portfolio</h1>
          <p className="text-gray-400">Track and manage your staking positions</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-400">Total Value</div>
            <div className="text-lg font-semibold text-white">0.00 SOCIAL</div>
          </div>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Total Staked</h3>
          <p className="text-2xl font-bold text-white">0.00 SOCIAL</p>
          <span className="text-gray-400 text-sm">Across all creators</span>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Active Stakes</h3>
          <p className="text-2xl font-bold text-white">0</p>
          <span className="text-gray-400 text-sm">Active positions</span>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">Total Returns</h3>
          <p className="text-2xl font-bold text-white">0.00 SOCIAL</p>
          <span className="text-gray-400 text-sm">All-time earnings</span>
        </div>
        <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
          <h3 className="text-gray-400 text-sm mb-2">ROI</h3>
          <p className="text-2xl font-bold text-white">0.00%</p>
          <span className="text-gray-400 text-sm">Average return</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Portfolio Performance</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">1W</button>
                <button className="px-3 py-1 text-sm bg-white/10 text-white rounded-lg">1M</button>
                <button className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">1Y</button>
                <button className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">ALL</button>
              </div>
            </div>
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

          {/* Active Stakes */}
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Active Stakes</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
            </div>
            <div className="text-gray-400 text-center py-8">
              No active stakes
            </div>
          </div>

          {/* Stake History */}
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Stake History</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
            </div>
            <div className="text-gray-400 text-center py-8">
              No stake history
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
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
                        <>Staked <span className="text-white font-medium">{activity.amount}</span> in {activity.creator}</>
                      )}
                      {activity.type === 'unstake' && (
                        <>Unstaked <span className="text-white font-medium">{activity.amount}</span> from {activity.creator}</>
                      )}
                      {activity.type === 'reward' && (
                        <>Earned <span className="text-white font-medium">{activity.amount}</span> from {activity.creator}</>
                      )}
                    </p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
            <h2 className="text-lg font-semibold text-white mb-4">Top Performers</h2>
            <div className="text-gray-400 text-center py-8">
              No stakes yet
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 