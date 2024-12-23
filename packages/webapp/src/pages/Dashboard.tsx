import { Card, Title, AreaChart, BarChart, Metric, Text } from '@tremor/react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

const formatNumber = (num: string) => {
  return new Intl.NumberFormat().format(parseInt(num))
}

const chartdata = [
  { date: '2024-01', Price: 2.5, Volume: 1200000 },
  { date: '2024-02', Price: 2.8, Volume: 1500000 },
  { date: '2024-03', Price: 3.2, Volume: 1800000 },
  { date: '2024-04', Price: 2.9, Volume: 2100000 },
  { date: '2024-05', Price: 3.5, Volume: 2400000 },
  { date: '2024-06', Price: 3.8, Volume: 2700000 },
]

const recentActivity = [
  {
    type: 'buy',
    amount: '1,000 SOCIAL',
    price: '$3.80',
    time: '5 mins ago',
    user: 'alex.eth',
  },
  {
    type: 'stake',
    amount: '5,000 SOCIAL',
    duration: '3 months',
    time: '15 mins ago',
    user: 'sarah.eth',
  },
  {
    type: 'sell',
    amount: '800 SOCIAL',
    price: '$3.79',
    time: '25 mins ago',
    user: 'mike.eth',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <Title>SOCIAL Price</Title>
          <Metric>$3.80</Metric>
          <div className="mt-2 flex items-center space-x-2">
            <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              8.57%
            </span>
            <Text>vs last 24h</Text>
          </div>
        </Card>

        <Card className="p-6">
          <Title>Market Cap</Title>
          <Metric>$38M</Metric>
          <div className="mt-2 flex items-center space-x-2">
            <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              12.34%
            </span>
            <Text>vs last 24h</Text>
          </div>
        </Card>

        <Card className="p-6">
          <Title>24h Volume</Title>
          <Metric>$2.7M</Metric>
          <div className="mt-2 flex items-center space-x-2">
            <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
              <ArrowDownIcon className="h-3 w-3 mr-1" />
              3.21%
            </span>
            <Text>vs last 24h</Text>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <Title>Price History</Title>
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["Price"]}
            colors={["emerald"]}
            valueFormatter={(number) => `$${number.toFixed(2)}`}
            showAnimation={true}
            showLegend={false}
          />
        </Card>

        <Card className="p-6">
          <Title>Volume History</Title>
          <BarChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["Volume"]}
            colors={["blue"]}
            valueFormatter={(number) => `$${(number / 1000000).toFixed(1)}M`}
            showAnimation={true}
            showLegend={false}
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <Title>Recent Activity</Title>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-700">
            {recentActivity.map((activity, index) => (
              <li key={index} className="py-5">
                <div className="flex items-center space-x-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.type === 'buy' ? 'bg-green-400/10 text-green-400' :
                    activity.type === 'sell' ? 'bg-red-400/10 text-red-400' :
                    'bg-blue-400/10 text-blue-400'
                  }`}>
                    {activity.type === 'buy' ? '↗' :
                     activity.type === 'sell' ? '↘' : '↻'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {activity.user}
                    </p>
                    <p className="truncate text-sm text-gray-400">
                      {activity.type === 'stake' ? 
                        `Staked ${formatNumber(activity.amount.replace(/[^\d]/g, ''))} SOCIAL for ${activity.duration}` :
                        `${activity.type === 'buy' ? 'Bought' : 'Sold'} ${formatNumber(activity.amount.replace(/[^\d]/g, ''))} SOCIAL at ${activity.price}`
                      }
                    </p>
                  </div>
                  <div className="text-sm text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
} 