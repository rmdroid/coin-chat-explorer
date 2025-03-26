
import { Cryptocurrency, MarketData, NewsItem } from './types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchTopCryptocurrencies(limit: number = 10): Promise<Cryptocurrency[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&locale=en`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    return [];
  }
}

export async function fetchGlobalMarketData(): Promise<MarketData | null> {
  try {
    const response = await fetch(`${BASE_URL}/global`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch global market data');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching global market data:', error);
    return null;
  }
}

// This is a mock implementation since we're using RSS feeds which require server-side processing
// In a real implementation, you'd use a backend service to fetch and parse RSS feeds
export async function fetchCryptoNews(): Promise<NewsItem[]> {
  // Mock data for demonstration
  return [
    {
      title: "Bitcoin surges past $60,000 as institutional adoption grows",
      link: "#",
      pubDate: new Date().toISOString(),
      description: "Bitcoin has reached a new milestone, surpassing $60,000 as institutional adoption continues to grow.",
      source: "CryptoNews"
    },
    {
      title: "Ethereum 2.0 update progresses with successful testnet implementation",
      link: "#",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      description: "Ethereum's transition to proof-of-stake moves forward with another successful testnet implementation.",
      source: "BlockchainReport"
    },
    {
      title: "Major bank announces cryptocurrency trading services for institutional clients",
      link: "#",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      description: "In a significant move for the industry, a major financial institution has announced cryptocurrency trading services.",
      source: "FinanceToday"
    },
    {
      title: "New regulatory framework for digital assets proposed by financial authorities",
      link: "#",
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      description: "Regulatory bodies have proposed a new framework aimed at providing clarity for cryptocurrency operations.",
      source: "CryptoInsider"
    }
  ];
}
