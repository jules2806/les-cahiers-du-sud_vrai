import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Calendar, BookOpen, Users, Bookmark } from 'lucide-react';
import Timeline from './components/Timeline';
import VoiceCard from './components/VoiceCard';
import SpecialIssue from './components/SpecialIssue';

// API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8055';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [heritage, setHeritage] = useState<{
    titre: string;
    contenu: string;
    image: string;
  } | null>(null);
  const [voices, setVoices] = useState<Array<{
    id: number;
    name: string;
    years: string;
    role: string;
    description: string;
    image?: string;
    order: number;
  }>>([]);
  const [specialIssues, setSpecialIssues] = useState<Array<{
    id: number;
    title: string;
    description: string;
    order: number;
  }>>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch homepage data
        const homepageResponse = await fetch(`${API_URL}/items/home_page`, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const homepageData = await homepageResponse.json();
        if (homepageData.data && homepageData.data.image_fond) {
          const imageUrl = `${API_URL}/assets/${homepageData.data.image_fond}`;
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            setBackgroundImage(imageUrl);
            setIsLoading(false);
          };
        }

        // Fetch heritage data
        const heritageResponse = await fetch(`${API_URL}/items/heritage`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        });
        const heritageData = await heritageResponse.json();
        console.log('Heritage Data received:', heritageData);
        if (heritageData.data) {
          console.log('Setting heritage with:', heritageData.data);
          setHeritage({
            titre: heritageData.data.titre || '',
            contenu: heritageData.data.contenu || '',
            image: heritageData.data.image || ''
          });
        } else {
          console.log('No heritage data found');
        }

        // Fetch notable voices data
        const voicesResponse = await fetch(`${API_URL}/items/voix_marquantes?sort=order`, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const voicesData = await voicesResponse.json();
        if (voicesData.data) {
          setVoices(voicesData.data.map((voice: any) => ({
            id: voice.id,
            name: voice.nom,
            years: voice.annee.toString(),
            role: voice.poste,
            description: voice.description,
            image: voice.image ? `${API_URL}/assets/${voice.image}` : undefined,
            order: voice.order
          })));
        }

        // Fetch special issues data
        const specialIssuesResponse = await fetch(`${API_URL}/items/numeros_speciaux?sort=order`, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const specialIssuesData = await specialIssuesResponse.json();
        if (specialIssuesData.data) {
          setSpecialIssues(specialIssuesData.data.map((issue: any) => ({
            id: issue.id,
            title: issue.titre,
            description: issue.description,
            order: issue.order
          })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a href="#" className="flex items-center">
            <img 
              src="/les-cahiers-des-suds-10-cours-jean-ballard-13001-marseille-3.png"
              alt="Les Cahiers du Sud"
              className="h-12 transition-all duration-300"
            />
          </a>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="#heritage" 
              className={`transition ${
                isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              Héritage
            </a>
            <a 
              href="#histoire" 
              className={`transition ${
                isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              Histoire
            </a>
            <a 
              href="#voices" 
              className={`transition ${
                isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              Voix Marquantes
            </a>
            <a 
              href="#special" 
              className={`transition ${
                isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              Numéros Spéciaux
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`absolute top-full left-0 right-0 ${
            isScrolled ? 'bg-white shadow-md' : 'bg-blue-900/90'
          } p-4 md:hidden`}>
            <div className="flex flex-col space-y-4">
              <a 
                href="#heritage" 
                className={`transition ${
                  isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Héritage
              </a>
              <a 
                href="#histoire" 
                className={`transition ${
                  isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Histoire
              </a>
              <a 
                href="#voices" 
                className={`transition ${
                  isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Voix Marquantes
              </a>
              <a 
                href="#special" 
                className={`transition ${
                  isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Numéros Spéciaux
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <header className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: backgroundImage 
              ? `url('${backgroundImage}')`
              : "url('https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=2070')",
            backgroundBlendMode: "overlay",
            opacity: isLoading ? 0 : 1
          }}
        >
          <div className="absolute inset-0 bg-blue-900/50" />
        </div>

        {/* Hero content */}
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-4 tracking-wide">Les Cahiers du Sud</h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 font-playfair italic">Une revue littéraire de 1914-1966</p>
            <a 
              href="#heritage"
              className="inline-flex items-center px-8 py-4 text-lg text-white bg-blue-700 rounded-full hover:bg-blue-600 transition font-playfair"
            >
              Découvrir l'héritage <ChevronRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Heritage Section */}
      <section id="heritage" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <BookOpen className="text-blue-600 mr-4" size={32} />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900">
              {heritage?.titre || "L'Héritage des Cahiers du Sud"}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg">
              <div 
                className="text-gray-700 leading-relaxed font-serif"
                dangerouslySetInnerHTML={{ __html: heritage?.contenu || "" }}
              />
            </div>
            <div className="relative h-96">
              <img 
                src={heritage?.image 
                  ? `${API_URL}/assets/${heritage.image}`
                  : "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80"}
                alt="Archive des Cahiers du Sud"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="histoire" className="py-20 bg-blue-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Calendar className="text-blue-600 mr-4" size={32} />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900">L'Histoire</h2>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Voices Section */}
      <section id="voices" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Users className="text-blue-600 mr-4" size={32} />
              <h2 className="text-4xl font-serif font-bold text-gray-900">Les Voix qui ont Marqué les Cahiers du Sud</h2>
            </div>
            <p className="text-xl text-gray-600 font-serif max-w-3xl mx-auto">
              Des plumes exceptionnelles qui ont contribué à façonner l'identité et le rayonnement de la revue à travers le XXe siècle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {voices.map((voice, index) => (
              <VoiceCard key={voice.id || index} {...voice} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Issues Section */}
      <section id="special" className="py-20 bg-blue-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-12">
            <Bookmark className="text-blue-600 mr-4" size={32} />
            <h2 className="text-4xl font-serif font-bold text-gray-900">Numéros Spéciaux</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialIssues.map((issue) => (
              <SpecialIssue key={issue.id} {...issue} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-playfair mb-4">Contact</h3>
            <p>10 Cours Jean Ballard</p>
            <p>13001 Marseille</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-playfair mb-4">Les Cahiers du Sud</h2>
            <p className="italic text-blue-200">Une revue littéraire de 1914-1966</p>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-playfair mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#heritage" className="hover:text-blue-200">Héritage</a></li>
              <li><a href="#histoire" className="hover:text-blue-200">Histoire</a></li>
              <li><a href="#voices" className="hover:text-blue-200">Voix Marquantes</a></li>
              <li><a href="#special" className="hover:text-blue-200">Numéros Spéciaux</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;