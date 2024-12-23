import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'

export default function MarketOverview() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [{
          label: 'Market Price',
          data: Array.from({ length: 24 }, () => Math.random() * 100 + 50),
          borderColor: '#3B82F6',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Market Overview</h2>
      <canvas ref={chartRef} height="80"></canvas>
    </div>
  )
} 