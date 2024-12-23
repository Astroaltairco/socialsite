import { Card, Title, AreaChart, BarChart, DonutChart } from '@tremor/react'

const chartdata = [
  { date: '2024-01', TVL: 1200000, Volume: 450000 },
  { date: '2024-02', TVL: 1500000, Volume: 550000 },
  { date: '2024-03', TVL: 1800000, Volume: 750000 },
  { date: '2024-04', TVL: 2100000, Volume: 900000 },
  { date: '2024-05', TVL: 2400000, Volume: 1200000 },
  { date: '2024-06', TVL: 2700000, Volume: 1500000 },
]

const tokenDistribution = [
  { name: 'Staked', value: 45 },
  { name: 'Circulating', value: 30 },
  { name: 'Treasury', value: 15 },
  { name: 'Team', value: 10 },
]

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Title>Total Value Locked (TVL)</Title>
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["TVL"]}
            colors={["emerald"]}
            valueFormatter={(number) => `$${(number / 1000000).toFixed(1)}M`}
            showAnimation={true}
          />
        </Card>

        <Card className="p-6">
          <Title>Trading Volume</Title>
          <BarChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={["Volume"]}
            colors={["blue"]}
            valueFormatter={(number) => `$${(number / 1000).toFixed(1)}K`}
            showAnimation={true}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-6">
          <Title>Token Distribution</Title>
          <DonutChart
            className="mt-4 h-80"
            data={tokenDistribution}
            category="value"
            index="name"
            valueFormatter={(number) => `${number}%`}
            colors={["emerald", "blue", "amber", "rose"]}
            showAnimation={true}
          />
        </Card>
      </div>
    </div>
  )
} 