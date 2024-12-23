'use client'

import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion'
import { useEffect, useState, type FC } from 'react'

interface StakingNotification {
  id: string
  message: string
  amount: string
  timestamp: string
}

const notifications: StakingNotification[] = [
  {
    id: '1',
    message: 'New stake on @creator',
    amount: '1,000 $SOCIAL',
    timestamp: '2 mins ago'
  },
  {
    id: '2',
    message: 'Stake increased on @influencer',
    amount: '5,000 $SOCIAL',
    timestamp: '5 mins ago'
  },
  {
    id: '3',
    message: 'Rewards claimed by @developer',
    amount: '2,500 $SOCIAL',
    timestamp: '10 mins ago'
  }
]

const motionProps: HTMLMotionProps<"div"> = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { type: 'spring', stiffness: 100, damping: 15 }
}

export const StakingNotification: FC = () => {
  const [currentNotification, setCurrentNotification] = useState<StakingNotification | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(notifications[index])
      setIndex((prevIndex) => (prevIndex + 1) % notifications.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [index])

  return (
    <div className="fixed top-20 left-8 z-50">
      <AnimatePresence mode="wait">
        {currentNotification && (
          <motion.div
            key={currentNotification.id}
            {...motionProps}
            className="bg-[#0F0F23]/80 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg max-w-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {currentNotification.message}
                </p>
                <p className="text-sm text-purple-400 font-medium">
                  {currentNotification.amount}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {currentNotification.timestamp}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 