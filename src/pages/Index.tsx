
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CryptoTable from '../components/CryptoTable';
import MarketOverview from '../components/MarketOverview';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
import { ArrowDown, Sparkles } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollPosition * 0.2;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
        <Navbar />
      </div>
      
      {/* Hero Section with enhanced parallax effect */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div 
          className="relative max-w-4xl px-6 text-center"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <div className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="text-primary w-8 h-8 mr-2 animate-pulse-subtle" />
              <span className="text-sm font-medium text-transparent bg-clip-text crypto-gradient">Intelligentes Krypto-Dashboard</span>
            </div>
            
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
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#market-overview" className="p-2 rounded-full glass-card transition-all hover:shadow-lg">
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </section>
      
      {/* Market Overview Section with enhanced animations */}
      <section id="market-overview" className="min-h-screen py-24 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-50/30 to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-50/30 to-transparent opacity-50"></div>
        </div>
        
        <div className="main-container relative">
          <div className="animate-fade-in">
            <MarketOverview />
          </div>
        </div>
      </section>
      
      {/* Cryptocurrency Table Section with enhanced styling */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="main-container relative">
          <CryptoTable />
        </div>
      </section>
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Footer with subtle animation */}
      <Footer />
    </div>
  );
};

export default Index;
