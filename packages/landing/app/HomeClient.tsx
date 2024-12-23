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
  loading: () => null,
}) as unknown as (props: NoProps) => JSX.Element

const Hero = dynamic(() => import('../components/Hero'), {
  ssr: false,
  loading: () => null,
}) as unknown as (props: NoProps) => JSX.Element

const CreatorProfilesClient = dynamic(() => import('../components/CreatorProfilesClient'), {
  ssr: false,
  loading: () => null,
}) as unknown as (props: CreatorProfilesProps) => JSX.Element

const WebappPreview = dynamic(() => import('../components/WebappPreview'), {
  ssr: false,
  loading: () => null,
}) as unknown as (props: NoProps) => JSX.Element

const TokenInfo = dynamic(() => import('../components/TokenInfo'), {
  ssr: false,
  loading: () => null,
}) as unknown as (props: NoProps) => JSX.Element

export default function HomeClient() {
  return (
    <>
      <NavbarClient />
      <PageEdgeFade>
        <Hero />
        <CreatorProfilesClient />
        <WebappPreview />
        <TokenInfo />
      </PageEdgeFade>
    </>
  )
}
