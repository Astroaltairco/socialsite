'use client'

import { motion } from 'framer-motion'
import React, { useRef, useEffect } from 'react'
import dynamic from "next/dynamic";
const MindshareTreemap = dynamic(() => import("@jieliu218/mindshare-lib").then(mod => mod.MindshareTreemap), { ssr: false });

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error)
      })
    }
  }, [])

  const scrollToPreview = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative pt-10 pb-32 overflow-hidden">
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            The Common Currency for{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Social Attention
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Earn rewards by staking your $SOCIAL tokens, place your stakes on Creators, AI agents or
            any profiles based on their mindshare on the timeline
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#preview"
              onClick={scrollToPreview}
              className="relative px-8 py-3 bg-white/5 rounded-lg text-white/40 text-sm font-medium group overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 gradient-shift rounded-lg" />
              <span className="relative z-10">Launch App</span>
            </motion.a>
            <motion.a
              href="#"
              className="relative px-8 py-3 bg-white/5 rounded-lg text-white/40 text-sm font-medium group overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 gradient-shift rounded-lg" />
              <span className="relative z-10">Learn More</span>
            </motion.a>
          </div>
          <h3 className="text-3xl md:text-3xl mt-8 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
             Mindshare
            </span>
          </h3>
        </div>
       
        <div className="w-full h-180 px-2 py-2 md:px-4 pb-10">
          <MindshareTreemap
            color={{
              title: '#fff',
            }}
            minHeight={720}
          />
        </div>
        <div className="relative max-w-6xl mx-auto mt-4">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-amber-500/20 blur-3xl -z-10"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden shadow-2xl bg-transparent"
          >
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute -inset-48 bg-gradient-to-t from-[#030014] via-transparent to-[#030014] opacity-80 blur-[160px]" />
              <div className="absolute -inset-48 bg-gradient-to-r from-[#030014] via-transparent to-[#030014] opacity-80 blur-[160px]" />
              <div className="absolute -inset-24 bg-gradient-to-t from-[#030014] via-transparent to-[#030014] opacity-70 blur-[100px]" />
              <div className="absolute -inset-24 bg-gradient-to-r from-[#030014] via-transparent to-[#030014] opacity-70 blur-[100px]" />
              <div className="absolute -inset-12 bg-gradient-to-t from-[#030014] via-transparent to-[#030014] opacity-60 blur-[60px]" />
              <div className="absolute -inset-12 bg-gradient-to-r from-[#030014] via-transparent to-[#030014] opacity-60 blur-[60px]" />
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#030014] opacity-40 blur-[30px]" />
              <div className="absolute inset-[30%] bg-gradient-radial to-transparent from-black opacity-10" />
            </div>
            <video
              ref={videoRef}
              className="w-full h-auto scale-[146%] opacity-100"
              autoPlay
              loop
              muted
              playsInline
              poster="/social-token.png"
            >
              <source src="/hero-optimized.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
