
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CryptoTable from '../components/CryptoTable';
import MarketOverview from '../components/MarketOverview';
import Chatbot from '../components/Chatbot';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className={`max-w-4xl px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Entdecken Sie die Welt der <span className="text-transparent bg-clip-text crypto-gradient">Kryptowährungen</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Echtzeit-Kurse, intelligente Insights und ein persönlicher Krypto-Assistent – alles an einem Ort.
          </p>
          <a
            href="#market-overview"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full glass-card font-medium text-lg hover:-translate-y-1 transition-all duration-300"
          >
            Jetzt erkunden
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#market-overview" className="p-2 rounded-full glass">
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </section>
      
      {/* Market Overview Section */}
      <section id="market-overview" className="py-16 px-6">
        <div className="main-container">
          <h2 className="text-3xl font-display font-bold mb-8">Marktübersicht</h2>
          <MarketOverview />
        </div>
      </section>
      
      {/* Cryptocurrency Table Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="main-container">
          <CryptoTable />
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-16 px-6">
        <div className="main-container">
          <NewsSection />
        </div>
      </section>
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
