
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, BarChart2 } from 'lucide-react';
import { fetchTopCryptocurrencies } from '../lib/api';
import { Cryptocurrency } from '../lib/types';

const CryptoTable = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTopCryptocurrencies(10);
        setCryptocurrencies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full glass-card p-6 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full glass-card p-6">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full glass-card p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold">Top Cryptocurrencies</h2>
        <p className="text-muted-foreground">Live prices updated every minute</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left py-3 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-right py-3 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-right py-3 text-sm font-medium text-muted-foreground">24h %</th>
              <th className="text-right py-3 text-sm font-medium text-muted-foreground">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {cryptocurrencies.map((crypto) => (
              <tr 
                key={crypto.id} 
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-4 text-sm">{crypto.market_cap_rank}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                    <div>
                      <p className="font-medium">{crypto.name}</p>
                      <p className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right font-medium">
                  ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 text-right">
                  <span
                    className={`inline-flex items-center ${
                      crypto.price_change_percentage_24h >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <ChevronUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 text-right text-sm font-medium">
                  ${crypto.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
