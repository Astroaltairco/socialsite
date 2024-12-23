import { TokenData, CachedData } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const TOKEN_ID = 'phavercoin';
const CURRENCY = 'usd';
const CACHE_DURATION = 3600000; // 1 hour cache
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second between retries

let cachedTokenData: CachedData | null = null;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (response.status === 429) {
      console.warn('Rate limit reached, using cached data');
      throw new Error('Rate limit reached');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

export async function getTokenData(): Promise<TokenData | null> {
  try {
    // Check cache first
    if (cachedTokenData && Date.now() - cachedTokenData.timestamp < CACHE_DURATION) {
      console.log('Using cached token data');
      return cachedTokenData.data;
    }

    console.log('Fetching fresh token data from CoinGecko');
    const response = await fetchWithRetry(
      `${COINGECKO_API}/coins/${TOKEN_ID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    const data = await response.json();
    
    if (!data.market_data) {
      throw new Error('Token market data not found');
    }

    const tokenData: TokenData = {
      market_cap: data.market_data.market_cap[CURRENCY] || 0,
      current_price: data.market_data.current_price[CURRENCY] || 0,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h || 0,
    };

    // Update cache
    cachedTokenData = {
      data: tokenData,
      timestamp: Date.now(),
    };

    console.log('Successfully fetched and cached new token data');
    return tokenData;
  } catch (error) {
    console.error('Error fetching token data:', error);
    // Return cached data if available, even if expired
    if (cachedTokenData?.data) {
      console.log('Returning expired cached data due to error');
      return cachedTokenData.data;
    }
    // If no cached data, return null
    console.log('No cached data available');
    return null;
  }
}

// Format large numbers to compact form with 2 decimals
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(num);
}

// Format price with appropriate decimals based on value
export function formatPrice(price: number): string {
  if (price < 0.01) {
    return price.toFixed(6);
  }
  if (price < 1) {
    return price.toFixed(4);
  }
  return price.toFixed(2);
} 