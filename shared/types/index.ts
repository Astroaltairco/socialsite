export interface Token {
  address: string
  symbol: string
  decimals: number
  name: string
  totalSupply: string
}

export interface TokenMetrics {
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: string
  volume: string
  sparkline: number[]
  logo: string
}

export interface TokenCardProps {
  name: string
  symbol: string
  price: number
  change: number
  volume: number
}

export interface User {
  address: string
  balance: string
  tokens: Token[]
}

export interface StakingInfo {
  amount: string
  reward: string
  lockPeriod: number
} 