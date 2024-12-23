import dynamic from 'next/dynamic'

const HomeClient = dynamic(() => import('./HomeClient').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#030014]" />,
}) as any

export default function Home() {
  return <HomeClient />
}
