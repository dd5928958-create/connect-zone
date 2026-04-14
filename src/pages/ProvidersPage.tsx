import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, MapPin, MessageCircle, Shield, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories, type Provider } from '@/data/providers';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ProvidersPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let result = providers;
    if (selectedCategory !== 'Tous') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.job.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProviders(result);
  }, [providers, selectedCategory, searchQuery]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.provider-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [filteredProviders]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/providers');
        if (!res.ok) throw new Error('Erreur API');
        const data = await res.json();
        setProviders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-['Montserrat'] text-white uppercase mb-4">
            Nos Prestataires
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Découvrez des professionnels vérifiés près de chez vous et contactez-les directement par WhatsApp.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl border-[3px] border-black p-4 md:p-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2A2A2A]/50" />
              <Input
                type="text"
                placeholder="Rechercher un prestataire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
              />
            </div>
            <div className="flex items-center gap-2 text-white md:text-[#111111]">
              <Filter className="w-5 h-5" />
              <span className="font-medium md:hidden">Filtrer par catégorie:</span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border-2 border-black font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[#FF6B6B] text-white'
                    : 'bg-white text-[#111111] hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-white">
          <span className="font-bold">{filteredProviders.length}</span> prestataire
          {filteredProviders.length > 1 ? 's' : ''} trouvé
          {filteredProviders.length > 1 ? 's' : ''}
          {selectedCategory !== 'Tous' && (
            <span>
              {' '}
              en <Badge className="bg-[#FFD166] text-[#111111] border-2 border-black ml-2">
                {selectedCategory}
              </Badge>
            </span>
          )}
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="provider-card bg-white rounded-3xl border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden hover:translate-y-[-6px] hover:scale-[1.01] transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48 relative">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {provider.isCertified && (
                      <span className="inline-flex items-center px-2 py-1 bg-[#4B6BFB] text-white text-xs font-bold rounded-full border-2 border-black">
                        <Shield className="w-3 h-3 mr-1" />
                        Certifié
                      </span>
                    )}
                    {provider.isPopular && (
                      <span className="inline-flex items-center px-2 py-1 bg-[#FFD166] text-[#111111] text-xs font-bold rounded-full border-2 border-black">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                      {provider.job}
                    </span>
                    <div className="flex items-center text-sm text-[#2A2A2A]">
                      <Star className="w-4 h-4 fill-[#FFD166] text-[#FFD166] mr-1" />
                      <span className="font-bold">{provider.rating}</span>
                      <span className="text-[#2A2A2A]/60 ml-1">({provider.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-2">
                    {provider.name}
                  </h3>

                  <div className="flex items-center text-sm text-[#2A2A2A] mb-3">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    {provider.location}
                  </div>

                  <p className="text-sm text-[#2A2A2A] mb-4 line-clamp-2">
                    {provider.description}
                  </p>

                  <div className="flex items-center text-xs text-[#2A2A2A]/70 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    Répond en {provider.responseTime}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${provider.phone.replace(/\+/g, '')}?text=Bonjour ${provider.name}, je vous contacte via ConnectZone.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold py-2 rounded-xl border-2 border-black text-sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        WhatsApp
                      </Button>
                    </a>
                    <Link to={`/prestataire/${provider.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black text-[#111111] font-bold py-2 rounded-xl text-sm hover:bg-black hover:text-white transition-all"
                      >
                        Profil
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Aucun prestataire trouvé
            </h3>
            <p className="text-white/70">
              Essayez avec d'autres critères de recherche
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
