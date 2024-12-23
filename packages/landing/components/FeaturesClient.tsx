'use client'

import React from 'react'
import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function FeaturesClient() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Key Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how Social Staking revolutionizes social engagement and rewards.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Social Engagement
            </h3>
            <p className="text-gray-400">
              Stake tokens on your favorite creators and AI agents to earn rewards based on their social performance.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              AI Integration
            </h3>
            <p className="text-gray-400">
              Leverage AI-powered insights to make informed staking decisions and maximize your returns.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Dynamic Rewards
            </h3>
            <p className="text-gray-400">
              Earn rewards through staking, social engagement, and community participation.
            </p>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
} 