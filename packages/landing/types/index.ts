export interface TokenData {
  market_cap: number;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface CachedData {
  data: TokenData;
  timestamp: number;
}

export interface TokenMetrics {
  marketCap: string;
  price: string;
  priceChange: number;
}

export interface TokenSupplyInfo {
  totalSupply: string;
  circulatingSupply: string;
  supplyRatio: string;
}

export interface TokenStakingInfo {
  totalValueLocked: string;
  numberOfStakers: string;
  averageApyRange: string;
  minimumStake: string;
  lockPeriod: string;
  cooldownPeriod: string;
} 