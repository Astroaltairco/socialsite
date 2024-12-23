import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Staking',
  description: 'The Future of Social Token Staking',
  icons: {
    icon: [
      {
        url: '/icons/favicon.svg',
        type: 'image/svg+xml'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#030014]">
      <body className={`${inter.className} min-h-screen bg-[#030014] overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
} 