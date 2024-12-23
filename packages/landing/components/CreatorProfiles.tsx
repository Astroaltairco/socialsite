'use client'

import dynamic from 'next/dynamic'
import React from 'react'

export type Profile = {
  id: string
  name: string
  handle: string
  type: 'creator' | 'ai'
  category: string
  followers: string
  apy: string
}

const defaultProfiles: Profile[] = Array.from({ length: 20 }, (_, i) => ({
  id: `profile-${i + 1}`,
  name: `Creator ${i + 1}`,
  handle: `@creator${i + 1}`,
  type: 'creator',
  category: 'Creator',
  followers: `${Math.floor(Math.random() * 900000 + 100000)}`,
  apy: `${Math.floor(Math.random() * 15 + 10)}%`,
}))

const virtualProfiles: Profile[] = [
  {
    id: 'virtual-1',
    name: 'ChatGPT',
    handle: '@chatgpt',
    type: 'ai',
    category: 'AI Agent',
    followers: '2.1M',
    apy: '24%',
  },
  {
    id: 'virtual-2',
    name: 'Claude',
    handle: '@claude',
    type: 'ai',
    category: 'AI Agent',
    followers: '1.8M',
    apy: '22%',
  },
  {
    id: 'virtual-3',
    name: 'Midjourney',
    handle: '@midjourney',
    type: 'ai',
    category: 'AI Agent',
    followers: '1.5M',
    apy: '20%',
  },
]

type CreatorProfilesClientProps = {
  initialProfiles?: Profile[][]
}

const CreatorProfilesClient = dynamic(() => import('./CreatorProfilesClient'), {
  ssr: false,
  loading: () => (
    <div className="overflow-visible">
      <div className="relative">
        <div className="mask-fade-x">
          <div className="py-24 -my-20">
            <div className="flex" style={{ gap: 'var(--card-gap)', padding: '0 var(--card-gap)' }}>
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
  ),
}) as React.ComponentType<CreatorProfilesClientProps>

export default function CreatorProfiles() {
  const allProfiles = React.useMemo(() => {
    return [
      defaultProfiles,
      virtualProfiles,
      defaultProfiles.map(p => ({ ...p, id: `profile-${p.id}-2` })),
    ]
  }, [])

  return <CreatorProfilesClient initialProfiles={allProfiles} />
}
