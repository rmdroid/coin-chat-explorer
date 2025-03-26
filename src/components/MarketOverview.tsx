
import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart, PieChart } from 'lucide-react';
import { fetchGlobalMarketData } from '../lib/api';
import { MarketData } from '../lib/types';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <div className="glass-card p-6 flex flex-col animate-fade-in">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
      <div className="p-2 rounded-full bg-primary/10">{icon}</div>
    </div>
    <p className="text-2xl font-display font-bold mb-1">{value}</p>
    {change && (
      <p className={`text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '+' : ''}{change}
      </p>
    )}
  </div>
);

const MarketOverview = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGlobalMarketData();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading || !marketData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="glass-card p-6 h-36"></div>
        ))}
      </div>
    );
  }

  // Format market cap
  const totalMarketCap = marketData.total_market_cap.usd;
  const formattedMarketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(totalMarketCap);

  // Format 24h volume
  const total24hVolume = marketData.total_volume.usd;
  const formatted24hVolume = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(total24hVolume);

  // Bitcoin dominance
  const btcDominance = marketData.market_cap_percentage.btc.toFixed(1) + '%';

  // Market cap change
  const marketCapChange = marketData.market_cap_change_percentage_24h_usd.toFixed(2) + '%';
  const isMarketCapChangePositive = marketData.market_cap_change_percentage_24h_usd >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Market Cap"
        value={formattedMarketCap}
        change={marketCapChange}
        isPositive={isMarketCapChangePositive}
        icon={<BarChart className="h-5 w-5 text-primary" />}
      />
      
      <StatCard
        title="24h Trading Volume"
        value={formatted24hVolume}
        icon={<TrendingUp className="h-5 w-5 text-primary" />}
      />
      
      <StatCard
        title="Bitcoin Dominance"
        value={btcDominance}
        icon={<PieChart className="h-5 w-5 text-primary" />}
      />
      
      <StatCard
        title="Active Cryptocurrencies"
        value="10,000+"
        icon={<DollarSign className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default MarketOverview;
