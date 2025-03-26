
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6">
        <div className="main-container">
          <h1 className="text-3xl font-display font-bold mb-8">Nutzungsbedingungen</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Stand: {new Date().toLocaleDateString('de-DE')}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Geltungsbereich</h2>
            <p>Diese Nutzungsbedingungen gelten für die Nutzung des Angebots von CoinChat Explorer, erreichbar unter coinchat-explorer.com. Mit der Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Leistungsbeschreibung</h2>
            <p>CoinChat Explorer bietet aktuelle Informationen zu Kryptowährungen, Marktanalysen und einen interaktiven Chatbot zur Beantwortung von Fragen rund um Kryptowährungen. Die bereitgestellten Informationen dienen ausschließlich zu Informationszwecken und stellen keine Anlageberatung dar.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Haftungsausschluss</h2>
            <p>Die auf unserer Website bereitgestellten Informationen werden mit größtmöglicher Sorgfalt zusammengestellt. Dennoch können wir keine Gewähr für die Aktualität, Richtigkeit und Vollständigkeit der bereitgestellten Informationen übernehmen. Die Nutzung der Inhalte erfolgt auf eigenes Risiko.</p>
            <p>Insbesondere übernehmen wir keine Haftung für Verluste oder Schäden, die durch Investitionsentscheidungen entstehen, die aufgrund der auf unserer Website bereitgestellten Informationen getroffen wurden.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Urheberrecht</h2>
            <p>Die auf unserer Website veröffentlichten Inhalte unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. KI-generierte Inhalte</h2>
            <p>Teile der auf dieser Website bereitgestellten Inhalte werden mithilfe von Künstlicher Intelligenz generiert. Diese Inhalte werden vor der Veröffentlichung überprüft, dennoch können sie Ungenauigkeiten oder Fehler enthalten. Gemäß den Anforderungen des EU AI Act weisen wir ausdrücklich darauf hin, dass diese Inhalte KI-generiert sind.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Datenschutz</h2>
            <p>Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer <a href="/privacy" className="text-primary hover:underline">Datenschutzerklärung</a>.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Änderungen der Nutzungsbedingungen</h2>
            <p>Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit ohne vorherige Ankündigung zu ändern. Die geänderten Bedingungen werden auf dieser Website veröffentlicht.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Anwendbares Recht</h2>
            <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Salvatorische Klausel</h2>
            <p>Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam oder undurchführbar sein oder nach Vertragsschluss unwirksam oder undurchführbar werden, bleibt davon die Wirksamkeit des Vertrages im Übrigen unberührt.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
