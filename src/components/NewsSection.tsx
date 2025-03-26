
import { useState, useEffect } from 'react';
import { Clock, ExternalLink, Newspaper } from 'lucide-react';
import { fetchCryptoNews } from '../lib/api';
import { NewsItem } from '../lib/types';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const NewsCard = ({ news }: { news: NewsItem }) => (
  <a
    href={news.link}
    target="_blank"
    rel="noopener noreferrer"
    className="glass-card p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    <div className="flex justify-between items-start mb-3">
      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
        {news.source}
      </span>
      <div className="flex items-center text-xs text-muted-foreground">
        <Clock className="w-3 h-3 mr-1" />
        {formatDate(news.pubDate)}
      </div>
    </div>
    <h3 className="text-lg font-display font-bold mb-2">{news.title}</h3>
    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
      {news.description}
    </p>
    <div className="flex items-center text-sm text-primary font-medium">
      <span>Mehr lesen</span>
      <ExternalLink className="w-4 h-4 ml-1" />
    </div>
  </a>
);

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newsData = await fetchCryptoNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="glass-card p-6 h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center mb-8">
        <Newspaper className="w-6 h-6 mr-3 text-primary" />
        <h2 className="text-2xl font-display font-bold">Aktuelle Krypto-Nachrichten</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, index) => (
          <NewsCard key={index} news={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
