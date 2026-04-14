import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Provider } from '@/data/providers';

interface ProviderCardProps {
  provider: Provider;
  className?: string;
}

export default function ProviderCard({ provider, className = '' }: ProviderCardProps) {
  return (
    <div
      className={`bg-white rounded-3xl border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden hover:translate-y-[-6px] hover:scale-[1.01] transition-all duration-300 ${className}`}
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
  );
}
