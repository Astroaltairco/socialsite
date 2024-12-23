// Helper function to format numbers with commas
// const formatNumber = (num: string) => {
//   return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }

interface Activity {
  id: number
  type: 'trade' | 'stake' | 'reward'
  description: string
  timestamp: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'trade',
    description: 'Bought 1,000 SOCIAL',
    timestamp: '2 mins ago'
  },
  {
    id: 2,
    type: 'stake',
    description: 'Staked 500 SOCIAL',
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    type: 'reward',
    description: 'Earned 50 SOCIAL',
    timestamp: '3 hours ago'
  }
]

export default function ActivityFeed() {
  return (
    <div className="bg-[#0A0A1B] rounded-xl border border-white/5 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
          >
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              activity.type === 'trade' ? 'bg-purple-500/10 text-purple-400' :
              activity.type === 'stake' ? 'bg-green-400/10 text-green-400' :
              'bg-blue-400/10 text-blue-400'
            }`}>
              {activity.type === 'trade' ? '↗' :
               activity.type === 'stake' ? '↻' : '★'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{activity.description}</p>
              <p className="text-sm text-gray-400">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 