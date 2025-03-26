
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
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
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
}

// Die Farben für das Kreisdiagramm
const COLORS = ['#F7931A', '#627EEA', '#3F3F3F', '#1BA27A', '#2775CA', '#F0B90B'];

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

  // Daten für das Kreisdiagramm der Marktdominanz
  const dominanceData = Object.entries(marketData.market_cap_percentage)
    .filter(([key]) => ['btc', 'eth', 'usdt', 'bnb', 'usdc'].includes(key))
    .map(([key, value]) => ({
      name: key.toUpperCase(),
      value: parseFloat(value.toFixed(1))
    }));
  
  // Sonstige Kryptowährungen in eine Kategorie zusammenfassen
  const otherPercentage = 100 - dominanceData.reduce((sum, item) => sum + item.value, 0);
  if (otherPercentage > 0) {
    dominanceData.push({ name: 'Andere', value: parseFloat(otherPercentage.toFixed(1)) });
  }

  // Daten für das Balkendiagramm zur Marktentwicklung
  const marketDevelopmentData = [
    { name: 'Bitcoin', value: marketData.total_market_cap.usd * (marketData.market_cap_percentage.btc / 100) / 1e9 },
    { name: 'Ethereum', value: marketData.total_market_cap.usd * ((marketData.market_cap_percentage.eth || 0) / 100) / 1e9 },
    { name: 'Stablecoins', value: marketData.total_market_cap.usd * ((marketData.market_cap_percentage.usdt || 0) + (marketData.market_cap_percentage.usdc || 0)) / 100 / 1e9 },
    { name: 'Altcoins', value: marketData.total_market_cap.usd * (100 - marketData.market_cap_percentage.btc - (marketData.market_cap_percentage.eth || 0) - ((marketData.market_cap_percentage.usdt || 0) + (marketData.market_cap_percentage.usdc || 0))) / 100 / 1e9 }
  ];

  // Formatierung für Tooltips im Balkendiagramm
  const formatBarValue = (value: number) => {
    return `${value.toFixed(0)} Mrd. €`;
  };

  // Formatierung für Tooltips im Kreisdiagramm
  const formatPieValue = (value: number) => {
    return `${value}%`;
  };

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
      
      {/* Balkendiagramm für Marktentwicklung */}
      <Card className="p-6">
        <h3 className="text-lg font-display font-bold mb-4">Marktverteilung (Mrd. €)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={marketDevelopmentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [formatBarValue(value), 'Marktkapitalisierung']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {marketDevelopmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Kreisdiagramm für Marktdominanz */}
      <Card className="p-6">
        <h3 className="text-lg font-display font-bold mb-4">Marktdominanz</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={dominanceData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {dominanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatPieValue(value), 'Dominanz']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default MarketOverview;
