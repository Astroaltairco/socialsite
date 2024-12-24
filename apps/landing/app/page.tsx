import dynamic from 'next/dynamic'

const HomeClient = dynamic(() => import('./HomeClient'), {
  loading: () => (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-white/50 text-xl">Loading Social Staking...</div>
        <div className="mt-4 text-white/30 text-sm">Please wait while we prepare your experience</div>
      </div>
    </div>
  ),
})

export default function Home() {
  return <HomeClient />
}
