
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Loader2 } from 'lucide-react';
import { ChatMessage } from '../lib/types';

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hallo! Ich bin Ihr Krypto-Assistent. Stellen Sie mir Fragen über Kryptowährungen, Markttrends oder spezifische Coins.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      handleChatbotResponse(input);
      setLoading(false);
    }, 1000);
  };

  const handleChatbotResponse = (query: string) => {
    let response = "Es tut mir leid, ich kann diese Frage momentan nicht beantworten.";
    
    // Very basic response logic - this would be replaced with a proper chatbot API
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('bitcoin') || lowercaseQuery.includes('btc')) {
      response = "Bitcoin (BTC) ist die erste und größte Kryptowährung nach Marktkapitalisierung. Sie wurde 2009 von einer Person oder Gruppe unter dem Pseudonym Satoshi Nakamoto eingeführt.";
    } else if (lowercaseQuery.includes('ethereum') || lowercaseQuery.includes('eth')) {
      response = "Ethereum (ETH) ist eine dezentrale Computing-Plattform, die Smart Contracts und dezentrale Anwendungen (DApps) ermöglicht. Es wurde von Vitalik Buterin vorgeschlagen und 2015 eingeführt.";
    } else if (lowercaseQuery.includes('blockchain')) {
      response = "Eine Blockchain ist eine verteilte Datenbank, die Transaktionen in Blöcken speichert und durch Kryptografie sichert. Jeder Block ist mit dem vorherigen verknüpft, was die Unveränderlichkeit der Daten gewährleistet.";
    } else if (lowercaseQuery.includes('wallet')) {
      response = "Eine Krypto-Wallet ist eine digitale Brieftasche, die Ihre privaten Schlüssel speichert, um Ihre Kryptowährungen zu sichern. Es gibt verschiedene Arten: Hardware-Wallets, Software-Wallets, Mobile-Wallets und Paper-Wallets.";
    } else if (lowercaseQuery.includes('mining')) {
      response = "Mining ist der Prozess, bei dem Transaktionen verifiziert und der Blockchain hinzugefügt werden. Miner lösen komplexe mathematische Probleme und werden dafür mit neuen Münzen belohnt.";
    } else if (lowercaseQuery.includes('nft')) {
      response = "NFTs (Non-Fungible Tokens) sind einzigartige digitale Assets, die Eigentum an digitalen Inhalten wie Kunst, Musik oder Sammlerstücken repräsentieren. Sie werden auf Blockchains gespeichert und sind nicht austauschbar.";
    } else if (lowercaseQuery.includes('defi')) {
      response = "DeFi (Decentralized Finance) bezieht sich auf ein Ökosystem von Finanzanwendungen, die auf Blockchain-Technologie basieren. Es zielt darauf ab, traditionelle Finanzdienstleistungen ohne zentrale Autoritäten anzubieten.";
    } else {
      response = "Danke für Ihre Frage. Ich kann derzeit spezifische Informationen zu diesem Thema bereitstellen. Versuchen Sie es mit Fragen zu bekannten Kryptowährungen wie Bitcoin oder Ethereum, oder zu Konzepten wie Blockchain, Wallets oder Mining.";
    }
    
    const botMessage: ChatMessage = { role: 'assistant', content: response };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full crypto-gradient shadow-lg transition-transform duration-300 hover:scale-110 ${
          isChatOpen ? 'hidden' : 'flex'
        }`}
        aria-label="Open chat"
      >
        <Bot className="h-6 w-6 text-white" />
      </button>

      {/* Chat dialog */}
      <div
        className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 glass border border-gray-200 shadow-2xl transition-all duration-500 ease-in-out transform ${
          isChatOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: '80vh', borderRadius: '1rem 1rem 0 0' }}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full crypto-gradient flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Krypto Assistent</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 130px)' }}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'glass'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass max-w-[80%] rounded-xl p-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stellen Sie eine Frage..."
              className="flex-grow px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              className="p-2 rounded-full crypto-gradient text-white disabled:opacity-50"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
