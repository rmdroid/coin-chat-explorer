
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Was sind Kryptowährungen?',
    answer: 'Kryptowährungen sind digitale oder virtuelle Währungen, die Kryptografie zur Sicherung ihrer Transaktionen und zur Kontrolle der Erstellung neuer Einheiten verwenden. Sie basieren auf dezentralen Blockchain-Technologien und funktionieren ohne zentrale Autorität wie eine Regierung oder Bank.'
  },
  {
    question: 'Wie beginne ich mit dem Kauf von Kryptowährungen?',
    answer: 'Um mit dem Kauf von Kryptowährungen zu beginnen, müssen Sie zunächst eine Krypto-Wallet erstellen und sich bei einer Kryptowährungsbörse registrieren. Nach der Verifizierung Ihrer Identität können Sie Geld einzahlen und Ihre ersten Kryptowährungen kaufen. Beliebte Börsen sind Coinbase, Binance und Kraken.'
  },
  {
    question: 'Was ist eine Blockchain?',
    answer: 'Eine Blockchain ist ein digitales Hauptbuch oder eine Datenbank, in der Transaktionen in Blöcken aufgezeichnet und durch kryptografische Verfahren miteinander verkettet werden. Jeder Block enthält einen kryptografischen Hash des vorherigen Blocks, wodurch die Daten unveränderlich und manipulationssicher werden. Diese Technologie bildet die Grundlage für Kryptowährungen.'
  },
  {
    question: 'Was ist der Unterschied zwischen Bitcoin und Ethereum?',
    answer: 'Bitcoin wurde als alternative digitale Währung konzipiert, während Ethereum eine Plattform für dezentrale Anwendungen und Smart Contracts ist. Bitcoin hat ein festes Angebot von 21 Millionen Coins, während Ethereum keine feste Obergrenze hat. Ethereum ermöglicht die Erstellung und Ausführung von Smart Contracts, die automatisch ausgeführt werden, wenn vordefinierte Bedingungen erfüllt sind.'
  },
  {
    question: 'Was sind NFTs?',
    answer: 'NFTs (Non-Fungible Tokens) sind einzigartige digitale Assets, die mithilfe von Blockchain-Technologie Eigentum und Echtheit zertifizieren. Im Gegensatz zu Kryptowährungen wie Bitcoin, die fungibel (austauschbar) sind, ist jeder NFT einzigartig. Sie werden häufig für digitale Kunst, Sammlerstücke, Musik und andere kreative Werke verwendet.'
  },
  {
    question: 'Was bedeutet "DeFi"?',
    answer: 'DeFi (Decentralized Finance) bezieht sich auf ein Ökosystem von Finanzanwendungen, die auf Blockchain-Technologie basieren. Es zielt darauf ab, traditionelle Finanzdienstleistungen wie Kredite, Handel und Versicherungen ohne zentrale Vermittler anzubieten. DeFi-Anwendungen verwenden Smart Contracts, um Transaktionen automatisch und transparent auszuführen.'
  },
  {
    question: 'Wie sicher sind Kryptowährungen?',
    answer: 'Die Blockchain-Technologie hinter Kryptowährungen ist sehr sicher, aber die Sicherheit Ihrer Investitionen hängt von vielen Faktoren ab, einschließlich der Sicherheit Ihrer Wallet, der Plattformen, die Sie nutzen, und Ihrem eigenen Sicherheitsverhalten. Es ist wichtig, starke Passwörter zu verwenden, die Zwei-Faktor-Authentifizierung zu aktivieren und Ihre privaten Schlüssel sicher aufzubewahren.'
  },
  {
    question: 'Was ist ein Hardware-Wallet?',
    answer: 'Ein Hardware-Wallet ist ein physisches Gerät, das Ihre Kryptowährungs-Private-Keys offline speichert. Dies bietet ein höheres Maß an Sicherheit, da Ihre Schlüssel niemals mit dem Internet verbunden sind und somit vor Hackern geschützt sind. Beliebte Hardware-Wallets sind Ledger Nano und Trezor.'
  }
];

const FaqAccordionItem = ({ item, isOpen, toggleOpen }: { item: FaqItem, isOpen: boolean, toggleOpen: () => void }) => {
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium">{item.question}</h3>
        <span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </span>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-muted-foreground py-3">{item.answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6">
        <div className="main-container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full crypto-gradient mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold mb-4">Häufig gestellte Fragen</h1>
            <p className="text-xl text-muted-foreground">
              Finden Sie Antworten auf häufig gestellte Fragen rund um Kryptowährungen
            </p>
          </div>
          
          <div className="glass-card p-8 animate-fade-in">
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <FaqAccordionItem
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  toggleOpen={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Noch Fragen? Kontaktieren Sie uns oder nutzen Sie unseren Chatbot.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full crypto-gradient text-white font-medium hover:opacity-90 transition-opacity"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </main>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Faq;
