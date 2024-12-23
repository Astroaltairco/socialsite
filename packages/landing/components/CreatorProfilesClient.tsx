'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, MotionStyle } from 'framer-motion'
import { StakingNotification } from './StakingNotification'
import type { Profile } from './CreatorProfiles'

const defaultProfiles: Profile[][] = [
  // Row 1 - Creators
  Array.from({ length: 20 }, (_, i) => ({
    id: `creator${i + 1}`,
    name: `Creator ${i + 1}`,
    handle: `@creator${i + 1}`,
    category: 'Creator',
    followers: `${(Math.floor(Math.random() * 38000 + 2000)).toLocaleString()}`,
    apy: `${Math.floor(Math.random() * 15 + 10)}%`,
    type: 'creator',
  })),
  // Row 2 - AI Agents
  Array.from({ length: 20 }, (_, i) => ({
    id: `ai${i + 1}`,
    name: `AI Agent ${i + 1}`,
    handle: `@ai${i + 1}`,
    category: 'AI Agent',
    followers: `${(Math.floor(Math.random() * 195000 + 5000)).toLocaleString()}`,
    apy: `${Math.floor(Math.random() * 20 + 15)}%`,
    type: 'ai',
  })),
  // Row 3 - Mixed
  Array.from({ length: 20 }, (_, i) => ({
    id: `mixed${i + 1}`,
    name: `Profile ${i + 1}`,
    handle: `@profile${i + 1}`,
    category: i % 2 === 0 ? 'Creator' : 'AI Agent',
    followers: `${(Math.floor(Math.random() * 470000 + 30000)).toLocaleString()}`,
    apy: `${Math.floor(Math.random() * 18 + 12)}%`,
    type: i % 2 === 0 ? 'creator' : 'ai',
  })),
]

const ProfileCard = React.memo(function ProfileCard({
  profile,
  isStaked,
}: {
  profile: Profile
  isStaked: boolean
}) {
  const colorIndex = parseInt(profile.id.replace(/[^0-9]/g, '')) % 5
  const gradientColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-teal-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
  ]
  const gradient = gradientColors[colorIndex]

  const scrollToPreview = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      className="group relative h-[200px] isolate stacking-context"
      initial={false}
      whileHover={{ scale: 1.5, zIndex: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative h-full bg-[#030014] rounded-2xl profile-card-solid">
        <motion.div
          className="relative h-full p-6 bg-[#030014] rounded-2xl border border-white/10 z-10 profile-card-solid"
          whileHover={{
            borderColor: 'rgba(168, 85, 247, 0.2)',
            boxShadow:
              '0 20px 25px -5px rgba(168, 85, 247, 0.1), 0 10px 10px -5px rgba(168, 85, 247, 0.04)',
          }}
          transition={{ duration: 0.5 }}
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-start justify-between relative">
            <div className="flex items-center space-x-4">
              <div className="relative group/avatar">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-sm opacity-50 group-hover:opacity-75 group-hover:blur-md transition-all duration-500 animate-pulse-slow" />
                <div
                  className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-white/20 flex items-center justify-center text-white text-lg font-bold group-hover:ring-white/40 group-hover:scale-105 transition-all duration-500 group-hover/avatar:rotate-12`}
                >
                  {profile.name.charAt(0)}
                </div>
                {profile.type === 'ai' && (
                  <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1 group-hover:scale-110 transition-transform duration-500 animate-float-fast">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 10V7a2 2 0 00-2-2H6a2 2 0 00-2 2v3a2 2 0 00-2 2v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2zM8.5 8.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm7 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM12 16H7v-2h10v2h-5z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="transform transition-transform duration-500 group-hover:translate-x-2">
                <h3 className="text-white font-semibold leading-tight group-hover:text-purple-100 transition-colors duration-500">
                  {profile.name}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-purple-200/70 transition-colors duration-500">
                  {profile.handle}
                </p>
                <span className="inline-block mt-1 text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400 group-hover:bg-purple-500/10 group-hover:text-purple-200 transition-all duration-500 group-hover:translate-x-1">
                  {profile.category}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex justify-between items-center pt-4 border-t border-white/5 group-hover:border-purple-500/20 transition-colors duration-500">
              <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                <p className="text-gray-400 text-xs group-hover:text-purple-200/70 transition-colors duration-500">
                  Followers
                </p>
                <p className="text-white font-medium group-hover:text-purple-100 transition-colors duration-500">
                  {profile.followers}
                </p>
              </div>
              <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                <p className="text-gray-400 text-xs group-hover:text-purple-200/70 transition-colors duration-500">
                  APY
                </p>
                <p className="text-white font-medium group-hover:text-purple-100 transition-colors duration-500">
                  {profile.apy}
                </p>
              </div>
              <button
                onClick={scrollToPreview}
                className="group relative px-4 py-1.5 text-white/40 bg-white/5 rounded-lg text-sm font-medium transition-all duration-500 hover:text-white hover:scale-105 hover:-translate-y-1 hover:font-semibold hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 gradient-shift rounded-lg" />
                <span className="relative z-10">STAKE</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {isStaked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 rounded-3xl opacity-30 blur-xl"
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-amber-300 rounded-2xl opacity-20 blur-md"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
})
ProfileCard.displayName = 'ProfileCard'

interface ScrollingRowProps {
  profiles: Profile[]
  direction?: 'left' | 'right'
  className?: string
  stakedProfile: string | null
  label?: React.ReactNode
}

const ScrollingRow = React.memo(function ScrollingRow({
  profiles,
  direction = 'left',
  className = '',
  stakedProfile,
  label,
}: ScrollingRowProps) {
  const scrollingProfiles = [...profiles, ...profiles, ...profiles]

  const containerStyle: MotionStyle = {
    gap: 'var(--card-gap)',
    width: 'max-content',
    transform: 'translate3d(0, 0, 0)',
    padding: '0 var(--card-gap)',
  }

  const cardStyle: MotionStyle = {
    width: 'var(--card-width)',
  }

  return (
    <motion.div className={`relative py-14 -my-10 ${className}`}>
      <div className="absolute inset-0 pointer-events-none" />
      <motion.div
        className={`flex ${direction === 'left' ? 'scroll-left' : 'scroll-right'} animate-gpu`}
        style={containerStyle}
      >
        {scrollingProfiles.map((profile, index) => (
          <motion.div
            key={`${profile.id}-${index}`}
            className="relative flex-shrink-0"
            style={cardStyle}
            layout
            transition={{ duration: 0.5 }}
          >
            <ProfileCard profile={profile} isStaked={profile.id === stakedProfile} />
          </motion.div>
        ))}
      </motion.div>
      {label && (
        <div className="absolute inset-0 pointer-events-none">
          {label}
        </div>
      )}
    </motion.div>
  )
})
ScrollingRow.displayName = 'ScrollingRow'

export default function CreatorProfilesClient({
  initialProfiles = defaultProfiles,
}: {
  initialProfiles?: Profile[][]
}): JSX.Element {
  const [mounted, setMounted] = useState(false)
  const [stakedProfile, setStakedProfile] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationUsername, setNotificationUsername] = useState('')

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const frame = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let timeoutId: NodeJS.Timeout
    let isActive = true

    const simulateStaking = () => {
      if (!isActive) return

      const rowIndex = Math.floor(Math.random() * 3)
      const profileIndex = Math.floor(Math.random() * 20)
      const randomProfile = initialProfiles[rowIndex][profileIndex]

      if (randomProfile) {
        setStakedProfile(randomProfile.id)
        setNotificationUsername(randomProfile.name)
        setShowNotification(true)

        timeoutId = setTimeout(() => {
          if (!isActive) return
          setStakedProfile(null)
          setShowNotification(false)
        }, 2000)
      }
    }

    const intervalId = setInterval(simulateStaking, 5000)

    return () => {
      isActive = false
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [mounted, initialProfiles])

  if (!mounted) {
    return (
      <div className="overflow-visible">
        <div className="relative">
          <div className="mask-fade-x">
            <div className="py-24 -my-20">
              <div
                className="flex"
                style={{ gap: 'var(--card-gap)', padding: '0 var(--card-gap)' }}
              >
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 animate-pulse"
                    style={{ width: 'var(--card-width)' }}
                  >
                    <div className="h-[200px] bg-[#0A0A1B]/50 rounded-2xl border border-white/5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative py-32 pb-48 overflow-hidden bg-gradient-to-b from-[#030014] via-[#020010] to-[#030014]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-transparent" />
      </div>
      
      <div className="relative w-full">
        <div id="new-era" className="text-center mb-16 scroll-mt-[100px]">
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              New Era of Social Staking
            </span>
          </h2>
          <p className="text-xl text-gray-400">Choose your yapper and get rewarded from their mindshare</p>
        </div>
        
        <div className="space-y-12">
          {/* First Row */}
          <div className="relative">
            <ScrollingRow
              profiles={initialProfiles[0]}
              direction="left"
              stakedProfile={stakedProfile}
              label={
                <div className="absolute left-[7%] bottom-2 pointer-events-none" style={{ zIndex: 1 }}>
                  <h3 className="text-3xl font-medium bg-gradient-to-r from-gray-400/50 to-gray-600/50 text-transparent bg-clip-text">
                    Creators on Farcaster or Lens
                  </h3>
                </div>
              }
            />
          </div>

          {/* Second Row */}
          <div className="relative">
            <ScrollingRow
              profiles={initialProfiles[1]}
              direction="right"
              stakedProfile={stakedProfile}
              label={
                <div className="absolute right-[7%] bottom-2 pointer-events-none" style={{ zIndex: 1 }}>
                  <h3 className="text-3xl font-medium text-right bg-gradient-to-r from-gray-400/50 to-gray-600/50 text-transparent bg-clip-text">
                    AI agents from Virtuals or Bonsai
                  </h3>
                </div>
              }
            />
          </div>

          {/* Third Row */}
          <div className="relative">
            <ScrollingRow
              profiles={initialProfiles[2]}
              direction="left"
              stakedProfile={stakedProfile}
              label={
                <div className="absolute left-[7%] bottom-2 pointer-events-none" style={{ zIndex: 1 }}>
                  <h3 className="text-3xl font-medium bg-gradient-to-r from-gray-400/50 to-gray-600/50 text-transparent bg-clip-text">
                    Or your favourite Crypto Twitter account
                  </h3>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
