'use client'

import dynamic from 'next/dynamic'
import PageEdgeFade from '../components/PageEdgeFade'

// Define types for components that accept props
interface CreatorProfilesProps {
  initialProfiles?: any[][]
}

// Define a type for components with no props
type NoProps = Record<string, never>

// Dynamic imports with proper typing and loading states
const NavbarClient = dynamic(() => import('../components/NavbarClient'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-[#030014]/40 backdrop-blur-md">
      <div className="animate-pulse bg-white/5 h-full" />
    </div>
  ),
}) as unknown as (props: NoProps) => JSX.Element

const Hero = dynamic(() => import('../components/Hero'), {
  ssr: false,
  loading: () => (
    <div className="relative pt-80 pb-32 overflow-hidden">
      <div className="animate-pulse bg-white/5 h-[400px]" />
    </div>
  ),
}) as unknown as (props: NoProps) => JSX.Element

const CreatorProfilesClient = dynamic(() => import('../components/CreatorProfilesClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading Profiles...</div>
    </div>
  ),
}) as unknown as (props: CreatorProfilesProps) => JSX.Element

const WebappPreview = dynamic(() => import('../components/WebappPreview'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading Preview...</div>
    </div>
  ),
}) as unknown as (props: NoProps) => JSX.Element

const TokenInfo = dynamic(() => import('../components/TokenInfo'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading Token Info...</div>
    </div>
  ),
}) as unknown as (props: NoProps) => JSX.Element

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-[#030014]">
      <NavbarClient />
      <PageEdgeFade>
        <Hero />
        <CreatorProfilesClient />
        <WebappPreview />
        <TokenInfo />
      </PageEdgeFade>
    </div>
  )
}
