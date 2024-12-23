'use client'

import { motion } from 'framer-motion'
import React from 'react'

const About = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-[#030014]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            About $SOCIAL
          </h2>
          <p className="text-lg text-gray-400">The future of social attention economy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Stake on Creators
            </h3>
            <p className="text-gray-400">
              Place your stakes on creators and earn rewards based on their social performance and
              engagement.
            </p>
          </motion.div>

          <motion.div
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
              Leverage AI agents to optimize your staking strategy and maximize your returns.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Earn Rewards
            </h3>
            <p className="text-gray-400">
              Earn rewards through staking, social engagement, and community participation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
