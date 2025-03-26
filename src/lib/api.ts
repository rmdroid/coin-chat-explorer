
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

// Mock-Implementation für deutsche Krypto-Nachrichten
export async function fetchCryptoNews(): Promise<NewsItem[]> {
  // Für eine echte Implementierung würde man einen Backend-Service nutzen, 
  // um RSS-Feeds zu holen und zu parsen
  return [
    {
      title: "Bitcoin überschreitet 60.000 USD mit steigender institutioneller Akzeptanz",
      link: "#",
      pubDate: new Date().toISOString(),
      description: "Bitcoin hat einen neuen Meilenstein erreicht und überschreitet 60.000 USD, während die institutionelle Akzeptanz weiter zunimmt.",
      source: "KryptoNews"
    },
    {
      title: "Ethereum 2.0-Update schreitet mit erfolgreicher Testnet-Implementierung voran",
      link: "#",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      description: "Ethereums Übergang zu Proof-of-Stake kommt mit einer weiteren erfolgreichen Testnet-Implementierung voran.",
      source: "BlockchainReport"
    },
    {
      title: "Große Bank kündigt Kryptowährungs-Handelsservices für institutionelle Kunden an",
      link: "#",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      description: "In einem bedeutenden Schritt für die Branche hat ein großes Finanzinstitut Kryptowährungs-Handelsservices angekündigt.",
      source: "FinanzHeute"
    },
    {
      title: "Neuer Regulierungsrahmen für digitale Vermögenswerte von Finanzbehörden vorgeschlagen",
      link: "#",
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      description: "Regulierungsbehörden haben einen neuen Rahmen vorgeschlagen, der auf mehr Klarheit für Kryptowährungs-Operationen abzielt.",
      source: "KryptoInsider"
    }
  ];
}
