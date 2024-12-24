'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTokenData, formatCompactNumber, formatPrice } from '../utils/tokenPriceUtils'

const MotionNav = motion.nav
const MotionDiv = motion.div
const MotionLink = motion.a

// Type AnimatePresence
const AnimatePresenceComponent = AnimatePresence as React.FC<{
  children: React.ReactNode
}>

export default function NavbarClient() {
  const [showSoon, setShowSoon] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenData, setTokenData] = useState<{
    marketCap: string;
    price: string;
    priceChange: number;
  }>({
    marketCap: '$1.2M',
    price: '$0.012',
    priceChange: 5.2,
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchTokenData = async () => {
      setIsLoading(true);
      const data = await getTokenData();
      if (data) {
        const oldPrice = tokenData.price;
        const oldMarketCap = tokenData.marketCap;
        
        const newData = {
          marketCap: `$${formatCompactNumber(data.market_cap)}`,
          price: `$${formatPrice(data.current_price)}`,
          priceChange: Number(data.price_change_percentage_24h.toFixed(1)),
        };

        setTokenData(newData);

        const priceElement = document.getElementById('price-value');
        const mcapElement = document.getElementById('mcap-value');
        
        if (priceElement && oldPrice !== newData.price) {
          priceElement.classList.add('value-update');
          setTimeout(() => priceElement.classList.remove('value-update'), 1000);
        }
        
        if (mcapElement && oldMarketCap !== newData.marketCap) {
          mcapElement.classList.add('value-update');
          setTimeout(() => mcapElement.classList.remove('value-update'), 1000);
        }
      }
      setIsLoading(false);
    };

    fetchTokenData();

    const interval = setInterval(fetchTokenData, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('0xD3C68968137317a57a9bAbeacC7707Ec433548B4')
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy address:', error)
      // TODO: Add proper error notification here
    }
  }

  const scrollToPreview = (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setShowSoon(true)
      setTimeout(() => {
        setShowSoon(false)
        const previewElement = document.getElementById('preview')
        if (!previewElement) {
          console.warn('Preview section not found')
          return
        }
        previewElement.scrollIntoView({ behavior: 'smooth' })
      }, 1000)
    } catch (error) {
      console.error('Error scrolling to preview:', error)
    }
  }

  return (
    <MotionNav
      className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/40 backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex-1 flex items-center space-x-4">
          <a
            href="/"
            className={`font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text hover:from-purple-500 hover:to-pink-500 transition-all animate-gradient ${isScrolled ? 'text-2xl' : 'text-4xl'}`}
          >
            $SOCIAL
          </a>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm text-white/70">MCap:</span>
              <span 
                id="mcap-value"
                className={`text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text ${isLoading ? 'opacity-50' : ''}`}
              >
                {tokenData.marketCap}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm text-white/70">Price:</span>
              <span 
                id="price-value"
                className={`text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text ${isLoading ? 'opacity-50' : ''}`}
              >
                {tokenData.price}
              </span>
              <span className={`text-xs ${tokenData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'} ${isLoading ? 'opacity-50' : ''}`}>
                {tokenData.priceChange >= 0 ? '+' : ''}{tokenData.priceChange}%
              </span>
            </div>
          </div>

          <div className="group inline-flex items-center relative">
            <button
              onClick={handleCopy}
              className="text-sm text-white/70 transition-all duration-300 ease-in-out relative inline-block"
            >
              <div className="relative h-6 flex items-center">
                <span className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  0xD3C6...548B4
                </span>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  0xD3C68968137317a57a9bAbeacC7707Ec433548B4
                </span>
              </div>
            </button>
            <AnimatePresenceComponent>
              {showCopied && (
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-8 left-0 text-xs text-white/90 bg-purple-500/80 px-2 py-1 rounded-md backdrop-blur-sm"
                >
                  Copied!
                </MotionDiv>
              )}
            </AnimatePresenceComponent>
          </div>
        </div>

        <div className="flex-1 hidden md:flex items-center justify-center space-x-10">
          <a
            href="#new-era"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('new-era')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-sm font-bold text-center text-white/70 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
          >
            Social Staking
          </a>
          <a
            href="#token"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('token')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-sm font-bold text-white/70 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
          >
            Token Metrics
          </a>
        </div>

        <div className="flex-1 flex justify-end relative">
          <motion.button
            onClick={scrollToPreview}
            className="relative group px-4 py-2 text-sm font-bold text-white/40 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg overflow-hidden hover:text-white hover:border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 gradient-shift rounded-lg" />
            <span className="relative z-10">Launch App</span>
          </motion.button>

          <AnimatePresenceComponent>
            {showSoon && (
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-full right-0 mt-2 px-3 py-1 bg-purple-500/80 text-white text-xs font-medium rounded-lg whitespace-nowrap backdrop-blur-sm border border-white/10 shadow-lg"
              >
                Coming Soon
              </MotionDiv>
            )}
          </AnimatePresenceComponent>
        </div>
      </div>
    </MotionNav>
  )
}
