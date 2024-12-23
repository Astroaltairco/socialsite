type ActivityItem = {
  id: string
  type: 'stake' | 'unstake' | 'reward'
  creator: {
    name: string
    handle: string
    avatar: string
  }
  amount: string
  timestamp: string
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'stake',
    creator: {
      name: 'Emma Wilson',
      handle: '@emmawilson',
      avatar: 'E'
    },
    amount: '5,000 SOCIAL',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'reward',
    creator: {
      name: 'Sophie Taylor',
      handle: '@sophietaylor',
      avatar: 'S'
    },
    amount: '250 SOCIAL',
    timestamp: '15 minutes ago'
  },
  {
    id: '3',
    type: 'stake',
    creator: {
      name: 'Ryan Martinez',
      handle: '@ryanmartinez',
      avatar: 'R'
    },
    amount: '10,000 SOCIAL',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'unstake',
    creator: {
      name: 'Nina Patel',
      handle: '@ninapatel',
      avatar: 'N'
    },
    amount: '2,500 SOCIAL',
    timestamp: '3 hours ago'
  },
  {
    id: '5',
    type: 'stake',
    creator: {
      name: 'David Kim',
      handle: '@davidkim',
      avatar: 'D'
    },
    amount: '7,500 SOCIAL',
    timestamp: '4 hours ago'
  },
  {
    id: '6',
    type: 'reward',
    creator: {
      name: 'Emma Wilson',
      handle: '@emmawilson',
      avatar: 'E'
    },
    amount: '450 SOCIAL',
    timestamp: '5 hours ago'
  },
  {
    id: '7',
    type: 'stake',
    creator: {
      name: 'James Wilson',
      handle: '@jameswilson',
      avatar: 'J'
    },
    amount: '15,000 SOCIAL',
    timestamp: '6 hours ago'
  },
  {
    id: '8',
    type: 'unstake',
    creator: {
      name: 'Sophie Taylor',
      handle: '@sophietaylor',
      avatar: 'S'
    },
    amount: '3,000 SOCIAL',
    timestamp: '7 hours ago'
  },
  {
    id: '9',
    type: 'reward',
    creator: {
      name: 'Ryan Martinez',
      handle: '@ryanmartinez',
      avatar: 'R'
    },
    amount: '300 SOCIAL',
    timestamp: '8 hours ago'
  },
  {
    id: '10',
    type: 'stake',
    creator: {
      name: 'Nina Patel',
      handle: '@ninapatel',
      avatar: 'N'
    },
    amount: '12,000 SOCIAL',
    timestamp: '9 hours ago'
  },
  {
    id: '11',
    type: 'stake',
    creator: {
      name: 'David Kim',
      handle: '@davidkim',
      avatar: 'D'
    },
    amount: '8,500 SOCIAL',
    timestamp: '10 hours ago'
  },
  {
    id: '12',
    type: 'reward',
    creator: {
      name: 'James Wilson',
      handle: '@jameswilson',
      avatar: 'J'
    },
    amount: '550 SOCIAL',
    timestamp: '11 hours ago'
  },
  {
    id: '13',
    type: 'unstake',
    creator: {
      name: 'Emma Wilson',
      handle: '@emmawilson',
      avatar: 'E'
    },
    amount: '4,000 SOCIAL',
    timestamp: '12 hours ago'
  },
  {
    id: '14',
    type: 'stake',
    creator: {
      name: 'Sophie Taylor',
      handle: '@sophietaylor',
      avatar: 'S'
    },
    amount: '9,000 SOCIAL',
    timestamp: '13 hours ago'
  },
  {
    id: '15',
    type: 'reward',
    creator: {
      name: 'Ryan Martinez',
      handle: '@ryanmartinez',
      avatar: 'R'
    },
    amount: '400 SOCIAL',
    timestamp: '14 hours ago'
  },
  {
    id: '16',
    type: 'stake',
    creator: {
      name: 'Nina Patel',
      handle: '@ninapatel',
      avatar: 'N'
    },
    amount: '11,000 SOCIAL',
    timestamp: '15 hours ago'
  },
  {
    id: '17',
    type: 'unstake',
    creator: {
      name: 'David Kim',
      handle: '@davidkim',
      avatar: 'D'
    },
    amount: '5,500 SOCIAL',
    timestamp: '16 hours ago'
  },
  {
    id: '18',
    type: 'reward',
    creator: {
      name: 'James Wilson',
      handle: '@jameswilson',
      avatar: 'J'
    },
    amount: '600 SOCIAL',
    timestamp: '17 hours ago'
  },
  {
    id: '19',
    type: 'stake',
    creator: {
      name: 'Emma Wilson',
      handle: '@emmawilson',
      avatar: 'E'
    },
    amount: '13,000 SOCIAL',
    timestamp: '18 hours ago'
  },
  {
    id: '20',
    type: 'stake',
    creator: {
      name: 'Sophie Taylor',
      handle: '@sophietaylor',
      avatar: 'S'
    },
    amount: '8,000 SOCIAL',
    timestamp: '19 hours ago'
  }
]

export default function RecentActivity() {
  if (mockActivity.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No recent activity
      </div>
    )
  }

  return (
    <div className="h-[400px] overflow-y-auto pr-2 -mr-2">
      <div className="space-y-4">
        {mockActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ring-2 ring-white/20">
              {activity.creator.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-sm">
                <span className="text-white font-medium truncate">
                  {activity.creator.name}
                </span>
                <span className="text-gray-400 truncate">
                  {activity.creator.handle}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {activity.type === 'stake' && 'Staked'}
                {activity.type === 'unstake' && 'Unstaked'}
                {activity.type === 'reward' && 'Earned'}
                {' '}
                <span className="text-white font-medium">{activity.amount}</span>
              </p>
            </div>

            {/* Timestamp */}
            <div className="text-gray-400 text-sm whitespace-nowrap">
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 