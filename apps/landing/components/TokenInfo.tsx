'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getTokenData, formatCompactNumber, formatPrice } from '../utils/tokenPriceUtils'
import { TokenMetrics } from '../types'

export default function TokenInfo() {
  const [tokenData, setTokenData] = useState<TokenMetrics>({
    marketCap: '...',
    price: '...',
    priceChange: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getTokenData();
        if (data) {
          setTokenData({
            marketCap: `$${formatCompactNumber(data.market_cap)}`,
            price: `$${formatPrice(data.current_price)}`,
            priceChange: Number(data.price_change_percentage_24h.toFixed(1)),
          });
        } else {
          setError('Unable to fetch token data')
        }
      } catch (err) {
        setError('Error fetching token data')
        console.error('Error in fetchTokenData:', err)
      } finally {
        setIsLoading(false)
      }
    };

    fetchTokenData();
    // Fetch every hour
    const interval = setInterval(fetchTokenData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-[#030014]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Token Image Side */}
          <div id="token" className="relative flex flex-col items-center text-center scroll-mt-[100px]">
            {/* Title Section */}
            <div className="mb-8 max-w-lg">
              <h2 className="text-5xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  The $SOCIAL Token
                </span>
              </h2>
              <p className="text-lg text-gray-400">
                Earn rewards by staking your $SOCIAL tokens on creators and AI agents
              </p>
            </div>

            {/* Token with Glow */}
            <div className="relative w-full max-w-xl mb-8">
              {/* Subtle glow effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-2xl"
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Image
                  src="/social-token.png"
                  alt="$SOCIAL Token"
                  width={500}
                  height={500}
                  className="w-full h-auto relative z-10"
                  priority
                />
              </motion.div>
            </div>

            {/* Exchange Listings */}
            <div className="w-full max-w-xl text-left">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Listed on:
              </h3>
              <div className="flex flex-col gap-4">
                {/* First row - larger buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="https://www.bybit.com/trade/spot/SOCIAL/USDT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-pink-600/0"
                      animate={{
                        x: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 3,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    />
                    <span className="font-semibold text-white text-lg relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">Bybit</span>
                  </motion.a>
                  <motion.a
                    href="https://www.gate.io/trade/SOCIAL_USDT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-pink-600/0"
                      animate={{
                        x: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 3,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    />
                    <span className="font-semibold text-white text-lg relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">Gate.io</span>
                  </motion.a>
                </div>
                {/* Second row - smaller buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.a
                    href="https://www.kucoin.com/trade/SOCIAL-USDT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-pink-600/0"
                      animate={{
                        x: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 2,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    />
                    <span className="font-semibold text-white relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">KuCoin</span>
                  </motion.a>
                  <motion.a
                    href="https://www.bitget.com/spot/SOCIALUSDT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-pink-600/0"
                      animate={{
                        x: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 2,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    />
                    <span className="font-semibold text-white relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">BitGet</span>
                  </motion.a>
                  <motion.a
                    href="https://www.mexc.com/exchange/SOCIAL_USDT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-pink-600/0"
                      animate={{
                        x: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 2,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    />
                    <span className="font-semibold text-white relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">MEXC</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards Side */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Token Metrics
                </h3>
                <a
                  href="https://www.coingecko.com/en/coins/phavercoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  title="View on CoinGecko"
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 0C7.176 0 0 7.176 0 16s7.176 16 16 16 16-7.176 16-16S24.824 0 16 0zm0 4.8c3.28 0 6.24 1.933 7.613 4.8H8.388C9.76 6.733 12.72 4.8 16 4.8zM6.4 16c0-1.067.213-2.027.533-2.933h18.134c.32.907.533 1.867.533 2.933s-.213 2.027-.533 2.933H6.933A8.46 8.46 0 016.4 16zm9.6 11.2c-3.28 0-6.24-1.933-7.613-4.8h15.226c-1.373 2.867-4.333 4.8-7.613 4.8z" />
                  </svg>
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Market Cap</span>
                  <span className={`text-white font-medium ${isLoading ? 'opacity-50' : ''}`}>
                    {tokenData.marketCap}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Price</span>
                  <span className={`text-white font-medium ${isLoading ? 'opacity-50' : ''}`}>
                    {tokenData.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">24h Change</span>
                  <span 
                    className={`font-medium ${
                      isLoading 
                        ? 'opacity-50 text-white' 
                        : tokenData.priceChange >= 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                    }`}
                  >
                    {tokenData.priceChange === 0 && isLoading 
                      ? '...' 
                      : `${tokenData.priceChange >= 0 ? '+' : ''}${tokenData.priceChange}%`
                    }
                  </span>
                </div>
                {error && (
                  <div className="text-red-400 text-sm mt-2">
                    {error}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Supply Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400 shrink-0">Total Supply</span>
                  <span className="text-white font-medium text-right">9,958,286,627 SOCIAL</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400 shrink-0">Circulating Supply</span>
                  <span className="text-white font-medium text-right">1,004,500,000 SOCIAL</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400 shrink-0">Supply Ratio</span>
                  <span className="text-white font-medium text-right">10.087%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Staking Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Value Locked</span>
                  <span className="text-white font-medium">$324.5K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Number of Stakers</span>
                  <span className="text-white font-medium">1,245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average APY Range</span>
                  <span className="text-white font-medium">8% - 24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Minimum Stake</span>
                  <span className="text-white font-medium">1,000 SOCIAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Lock Period</span>
                  <span className="text-white font-medium">30 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cooldown Period</span>
                  <span className="text-white font-medium">24 hours</span>
                </div>
              </div>
            </div>

            <motion.a
              href="https://tokensfarm.com/social/staking/1"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 text-center text-white font-medium rounded-xl bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Stake $SOCIAL to get ready for the app
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
