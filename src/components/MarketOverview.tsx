
import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart, PieChart, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { fetchGlobalMarketData } from '../lib/api';
import { MarketData } from '../lib/types';
import { Card, CardContent } from './ui/card';
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent 
} from './ui/chart';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  gradientClass?: string;
}

const mockChartData = [
  { name: 'Jan', value: 1000 },
  { name: 'Feb', value: 1200 },
  { name: 'Mär', value: 900 },
  { name: 'Apr', value: 1500 },
  { name: 'Mai', value: 1700 },
  { name: 'Jun', value: 1400 },
  { name: 'Jul', value: 2100 },
];

const StatCard = ({ title, value, change, isPositive, icon, gradientClass = "crypto-gradient" }: StatCardProps) => (
  <Card className="overflow-hidden">
    <div className={`absolute inset-0 opacity-10 ${gradientClass}`} />
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10">{icon}</div>
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
    const interval = setInterval(fetchData, 300000); // Aktualisierung alle 5 Minuten
    return () => clearInterval(interval);
  }, []);

  if (loading || !marketData) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="p-6 h-36"></Card>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
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

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Globe className="w-6 h-6 mr-3 text-primary" />
        <h2 className="text-2xl font-display font-bold">Marktübersicht</h2>
      </div>
      
      {/* Statistikkarten */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Gesamte Marktkapitalisierung"
          value={formattedMarketCap}
          change={marketCapChange}
          isPositive={isMarketCapChangePositive}
          icon={<BarChart className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-blue-500 to-indigo-600"
        />
        
        <StatCard
          title="24h Handelsvolumen"
          value={formatted24hVolume}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-purple-500 to-pink-600"
        />
        
        <StatCard
          title="Bitcoin Dominanz"
          value={btcDominance}
          icon={<PieChart className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-yellow-400 to-orange-500"
        />
        
        <StatCard
          title="Ethereum Dominanz"
          value={ethDominance}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          gradientClass="bg-gradient-to-r from-teal-400 to-green-500"
        />
      </div>
      
      {/* Marktentwicklung Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-display font-bold mb-4">Marktentwicklung Übersicht</h3>
        <div className="h-64">
          <ChartContainer
            config={{
              value: { label: "Marktwert", theme: { light: "var(--color-primary)", dark: "#fff" } },
            }}
          >
            <AreaChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip
                content={
                  ({ active, payload }) => active && payload?.length ? (
                    <ChartTooltipContent payload={payload} />
                  ) : null
                }
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                name="value" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </Card>
      
      {/* Top Kryptowährungen nach Dominanz */}
      <Card className="p-6">
        <h3 className="text-lg font-display font-bold mb-4">Marktdominanz</h3>
        <div className="h-64">
          <ChartContainer
            config={{
              btc: { label: "Bitcoin", theme: { light: "#F7931A", dark: "#F7931A" } },
              eth: { label: "Ethereum", theme: { light: "#627EEA", dark: "#627EEA" } },
              other: { label: "Andere", theme: { light: "#6C7284", dark: "#6C7284" } },
            }}
          >
            <LineChart data={[
              { name: 'Jan', btc: 40, eth: 20, other: 40 },
              { name: 'Feb', btc: 45, eth: 18, other: 37 },
              { name: 'Mär', btc: 42, eth: 22, other: 36 },
              { name: 'Apr', btc: 48, eth: 19, other: 33 },
              { name: 'Mai', btc: 50, eth: 21, other: 29 },
              { name: 'Jun', btc: 47, eth: 24, other: 29 },
              { name: 'Jul', btc: marketData.market_cap_percentage.btc, eth: marketData.market_cap_percentage.eth || 19, other: 100 - marketData.market_cap_percentage.btc - (marketData.market_cap_percentage.eth || 19) },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip
                content={
                  ({ active, payload }) => active && payload?.length ? (
                    <ChartTooltipContent payload={payload} />
                  ) : null
                }
              />
              <Line type="monotone" dataKey="btc" name="btc" stroke="#F7931A" />
              <Line type="monotone" dataKey="eth" name="eth" stroke="#627EEA" />
              <Line type="monotone" dataKey="other" name="other" stroke="#6C7284" />
              <ChartLegend
                content={<ChartLegendContent verticalAlign="bottom" />}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
};

export default MarketOverview;
