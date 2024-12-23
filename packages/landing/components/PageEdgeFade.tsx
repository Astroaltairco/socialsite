import React from 'react'

interface PageEdgeFadeProps {
  children: React.ReactNode
}

export default function PageEdgeFade({ children }: PageEdgeFadeProps) {
  return (
    <div className="relative">
      {/* Fade out overlay */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-20"
        style={{
          top: '80px', // Adjust based on header height
          bottom: '80px', // Adjust based on footer height
          background: `linear-gradient(to right, 
            #030014 0%, 
            transparent 5%, 
            transparent 95%, 
            #030014 100%
          )`,
        }}
      />
      {children}
    </div>
  )
} 