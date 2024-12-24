import dynamic from 'next/dynamic'

const NavbarClient = dynamic(() => import('./NavbarClient'), {
  ssr: false,
  loading: () => null,
}) as any

export function Navbar() {
  return <NavbarClient />
}
