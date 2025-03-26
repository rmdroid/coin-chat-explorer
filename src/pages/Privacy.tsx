
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6">
        <div className="main-container">
          <h1 className="text-3xl font-display font-bold mb-8">Datenschutzerklärung</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Stand: {new Date().toLocaleDateString('de-DE')}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Verantwortliche Stelle</h2>
            <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:</p>
            <p>CoinChat Explorer<br />
            Kryptostraße 123<br />
            10115 Berlin<br />
            Deutschland</p>
            <p>E-Mail: info@coinchat-explorer.com</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Grundlegendes zum Datenschutz</h2>
            <p>Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie darüber, wie und welche Daten erfasst, gespeichert und genutzt werden, wenn Sie unsere Website besuchen.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Datenerfassung auf unserer Website</h2>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">3.1 Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">3.2 Cookies</h3>
            <p>Unsere Website verwendet Cookies. Cookies sind Textdateien, die beim Besuch einer Internetseite auf Ihrem Computer gespeichert werden. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Die meisten der von uns verwendeten Cookies sind sogenannte "Session-Cookies", die nach Ende Ihres Besuchs automatisch gelöscht werden.</p>
            <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Chatbot und KI-Anwendungen</h2>
            <p>Auf unserer Website kommt ein KI-basierter Chatbot zum Einsatz, der Ihre Fragen zu Kryptowährungen beantwortet. Wenn Sie den Chatbot nutzen, werden Ihre Fragen und die daraus resultierenden Antworten temporär gespeichert, um die Funktionalität des Chatbots zu gewährleisten. Diese Daten werden nicht mit persönlichen Identifikationsdaten verknüpft.</p>
            <p>Gemäß den Anforderungen des EU AI Act weisen wir darauf hin, dass der Chatbot auf Künstlicher Intelligenz basiert und die bereitgestellten Informationen Ungenauigkeiten enthalten können.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Datenanalyse und Externe Dienste</h2>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">5.1 Verwendung von API-Diensten</h3>
            <p>Wir nutzen die CoinGecko API, um aktuelle Informationen zu Kryptowährungen anzuzeigen. Bei der Nutzung dieser API werden Ihre IP-Adresse und Browser-Informationen an CoinGecko übermittelt. Weitere Informationen zum Datenschutz bei CoinGecko finden Sie unter: <a href="https://www.coingecko.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.coingecko.com/en/privacy</a></p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Ihre Rechte</h2>
            <p>Sie haben das Recht:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen</li>
              <li>Die Berichtigung unrichtiger oder unvollständiger Daten zu verlangen</li>
              <li>Die Löschung Ihrer bei uns gespeicherten Daten zu verlangen</li>
              <li>Die Einschränkung der Datenverarbeitung zu verlangen</li>
              <li>Der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
              <li>Bei einer Aufsichtsbehörde eine Beschwerde einzureichen</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Änderungen der Datenschutzerklärung</h2>
            <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Fragen zum Datenschutz</h2>
            <p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an: info@coinchat-explorer.com</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
