
import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { fetchGlobalMarketData } from '../lib/api';
import { MarketData } from '../lib/types';
import { Card, CardContent } from './ui/card';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  gradientClass?: string;
  delay?: number;
}

// Die Farben für das Diagramm
const COLORS = ['#F7931A', '#627EEA', '#3F3F3F', '#1BA27A', '#2775CA', '#F0B90B'];

const StatCard = ({ title, value, change, isPositive, icon, gradientClass = "crypto-gradient", delay = 0 }: StatCardProps) => (
  <div className={`animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className={`absolute inset-0 opacity-10 ${gradientClass}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
          <div className="p-2 rounded-full bg-primary/10 animate-pulse-subtle">{icon}</div>
        </div>
        <p className="text-2xl font-display font-bold mb-1">{value}</p>
        {change && (
          <p className={`text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  </div>
);

const MarketOverview = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartAnimated, setChartAnimated] = useState(false);

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
        
        // Delay chart animation to create a sequenced effect
        setTimeout(() => {
          setChartAnimated(true);
        }, 800);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Aktualisierung alle 5 Minuten
    return () => clearInterval(interval);
  }, []);

  if (loading || !marketData) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="p-6 h-36 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded-full w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </Card>
          ))}
        </div>
        <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  // Formatierung Marktkapitalisierung
  const totalMarketCap = marketData.total_market_cap.usd;
  const formattedMarketCap = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(totalMarketCap * 0.93); // Ungefähre USD zu EUR Umrechnung

  // Formatierung 24h Volumen
  const total24hVolume = marketData.total_volume.usd;
  const formatted24hVolume = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(total24hVolume * 0.93); // Ungefähre USD zu EUR Umrechnung

  // Bitcoin Dominanz
  const btcDominance = marketData.market_cap_percentage.btc.toFixed(1) + '%';

  // Marktkapitalisierung Änderung
  const marketCapChange = marketData.market_cap_change_percentage_24h_usd.toFixed(2) + '%';
  const isMarketCapChangePositive = marketData.market_cap_change_percentage_24h_usd >= 0;

  // Ethereum Dominanz
  const ethDominance = marketData.market_cap_percentage.eth?.toFixed(1) + '%' || "10.0%";

  // Daten für das Balkendiagramm zur Marktentwicklung
  const marketDevelopmentData = [
    { name: 'Bitcoin', value: marketData.total_market_cap.usd * (marketData.market_cap_percentage.btc / 100) / 1e9, fill: '#F7931A' },
    { name: 'Ethereum', value: marketData.total_market_cap.usd * ((marketData.market_cap_percentage.eth || 0) / 100) / 1e9, fill: '#627EEA' },
    { name: 'Stablecoins', value: marketData.total_market_cap.usd * ((marketData.market_cap_percentage.usdt || 0) + (marketData.market_cap_percentage.usdc || 0)) / 100 / 1e9, fill: '#2775CA' },
    { name: 'Altcoins', value: marketData.total_market_cap.usd * (100 - marketData.market_cap_percentage.btc - (marketData.market_cap_percentage.eth || 0) - ((marketData.market_cap_percentage.usdt || 0) + (marketData.market_cap_percentage.usdc || 0))) / 100 / 1e9, fill: '#3F3F3F' }
  ];

  // Formatierung für Tooltips im Balkendiagramm
  const formatBarValue = (value: number) => {
    return `${value.toFixed(0)} Mrd. €`;
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center animate-fade-in">
        <div className="p-3 rounded-full bg-primary/10 mr-4">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-display font-bold">Marktübersicht</h2>
      </div>
      
      {/* Statistikkarten mit gestaffelten Animationen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Gesamte Marktkapitalisierung"
          value={formattedMarketCap}
          change={marketCapChange}
          isPositive={isMarketCapChangePositive}
          icon={<BarChart className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-blue-500 to-indigo-600"
          delay={100}
        />
        
        <StatCard
          title="24h Handelsvolumen"
          value={formatted24hVolume}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-purple-500 to-pink-600"
          delay={200}
        />
        
        <StatCard
          title="Bitcoin Dominanz"
          value={btcDominance}
          icon={<BarChart className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-yellow-400 to-orange-500"
          delay={300}
        />
        
        <StatCard
          title="Ethereum Dominanz"
          value={ethDominance}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-teal-400 to-green-500"
          delay={400}
        />
      </div>
      
      {/* Animiertes Balkendiagramm für Marktentwicklung */}
      <div 
        className={`transition-all duration-1000 ${chartAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Card className="p-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-6">
            <BarChart className="w-5 h-5 mr-2 text-primary" />
            <h3 className="text-xl font-display font-bold">Marktverteilung (Mrd. €)</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={marketDevelopmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                barSize={50}
                className="animate-fade-in-slow"
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#666', fontSize: 14 }}
                  tickLine={{ stroke: '#ccc' }}
                  axisLine={{ stroke: '#ccc' }}
                />
                <YAxis 
                  tick={{ fill: '#666', fontSize: 14 }}
                  tickLine={{ stroke: '#ccc' }}
                  axisLine={{ stroke: '#ccc' }}
                />
                <Tooltip 
                  formatter={(value: number) => [formatBarValue(value), 'Marktkapitalisierung']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '14px'
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                >
                  {marketDevelopmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketOverview;
