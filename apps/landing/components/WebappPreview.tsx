'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const PreviewWindow = ({
  position,
  src,
}: {
  position: 'left' | 'center' | 'right'
  src: string
}) => {
  const baseRotation = position === 'left' ? -6 : position === 'right' ? 6 : 0
  const baseScale = position === 'center' ? 1.4 : 0.85
  const baseZIndex = position === 'center' ? 20 : 10
  const baseTranslateX = position === 'left' ? '25%' : position === 'right' ? '-25%' : '0%'
  const baseOpacity = position === 'center' ? 1 : 0.5

  return (
    <motion.div
      className="relative"
      style={{
        zIndex: baseZIndex,
        x: baseTranslateX,
        perspective: 1000,
        opacity: baseOpacity,
      }}
      whileHover={{
        scale: position === 'center' ? 1.6 : 1.4,
        rotate: 0,
        zIndex: 30,
        x: 0,
        opacity: 1,
      }}
      initial={{
        rotate: baseRotation,
        scale: baseScale,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="relative rounded-xl shadow-2xl overflow-hidden transform-gpu transition-all duration-300 group">
        <div className="relative h-6 bg-[#2D2D2D]/90 backdrop-blur-sm flex items-center px-3 border-b border-black/20">
          <div className="flex space-x-1.5 absolute left-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-1.5 px-3 bg-[#1C1C1C]/80 rounded h-4">
              <span className="text-white/50 text-[10px] font-medium">app.socialdao.ai</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src={src}
            alt="App Interface"
            width={2400}
            height={1500}
            className="w-full h-auto"
            priority
          />
          {position !== 'center' && (
            <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#030014] to-transparent" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-amber-500/0 transition-opacity duration-300 group-hover:from-purple-600/30 group-hover:to-amber-500/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/0 transition-opacity duration-300 group-hover:to-black/20" />
        <motion.div
          className="absolute inset-0"
          initial={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          whileHover={{
            boxShadow: '0 35px 60px -15px rgba(147, 51, 234, 0.4)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function WebappPreview() {
  return (
    <section id="preview" className="relative py-40 overflow-hidden bg-[#030014]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Webapp Preview
            </span>
          </h2>
          <p className="text-xl text-gray-400">Launching the standalone dApp soon with early access to $SOCIAL stakers</p>
        </div>

        <div className="relative max-w-[140rem] mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-amber-500/20 blur-3xl -z-10 animate-pulse-slow" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex justify-center items-center"
            >
              <div className="relative flex justify-center items-center w-full">
                <PreviewWindow position="left" src="/profile-preview.png" />
                <PreviewWindow position="center" src="/overview-preview.png" />
                <PreviewWindow position="right" src="/portfolio-preview.png" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
