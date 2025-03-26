
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="main-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full crypto-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xl">₿</span>
              </div>
              <span className="font-display font-bold text-xl">CoinChat Explorer</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Ihre Quelle für aktuelle Kryptowährungskurse, Marktanalysen und Informationen. 
              Unser integrierter Chatbot beantwortet alle Ihre Krypto-Fragen.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:info@coinchat-explorer.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold mb-4">Kontakt</h3>
            <address className="not-italic text-muted-foreground">
              <p>CoinChat Explorer</p>
              <p>Kryptostraße 123</p>
              <p>10115 Berlin</p>
              <p className="mt-3">
                <a href="mailto:info@coinchat-explorer.com" className="hover:text-primary transition-colors">
                  info@coinchat-explorer.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CoinChat Explorer. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Datenschutz
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Nutzungsbedingungen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
