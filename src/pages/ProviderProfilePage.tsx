import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, MapPin, MessageCircle, Shield, Star, Clock, CheckCircle, Award, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Provider } from '@/data/providers';

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/providers/${id}`);
        if (!res.ok) {
          setProvider(null);
          return;
        }
        const data = await res.json();
        setProvider(data);
      } catch (error) {
        console.error(error);
        setProvider(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  useEffect(() => {
    if (provider) {
      gsap.fromTo(
        '.profile-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [provider]);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Chargement du prestataire...</div>
      </main>
    );
  }

  if (!provider) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Prestataire non trouvé
          </h1>
          <p className="text-white/70 mb-6">
            Le profil que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link to="/prestataires">
            <Button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold px-6 py-3 rounded-xl border-2 border-black">
              Voir tous les prestataires
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const whatsappLink = `https://wa.me/${provider.phone.replace(/\+/g, '')}?text=Bonjour ${provider.name}, je vous contacte via ConnectZone.`;

  const handleShareProfile = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `Profil de ${provider.name}`,
      text: `Découvre ce prestataire sur ConnectZone : ${provider.name}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('Profil partagé !');
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('Lien copié dans le presse-papiers');
      }
    } catch (error) {
      setShareMessage('Impossible de partager le profil pour le moment.');
      console.error(error);
    }

    window.setTimeout(() => setShareMessage(''), 3000);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto profile-content">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-[#FFD166] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </button>

        {/* Main Profile Card */}
        <div className="bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden">
          {/* Header with Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {provider.isCertified && (
                <Badge className="bg-[#4B6BFB] text-white border-2 border-black px-3 py-1 text-sm">
                  <Shield className="w-4 h-4 mr-1" />
                  Certifié
                </Badge>
              )}
              {provider.isPopular && (
                <Badge className="bg-[#FFD166] text-[#111111] border-2 border-black px-3 py-1 text-sm">
                  <Star className="w-4 h-4 mr-1" />
                  Populaire
                </Badge>
              )}
              {provider.isFeatured && (
                <Badge className="bg-[#FF6B6B] text-white border-2 border-black px-3 py-1 text-sm">
                  <Award className="w-4 h-4 mr-1" />
                  Mis en avant
                </Badge>
              )}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
              <p className="text-sm font-bold uppercase tracking-wider mb-1">
                {provider.job}
              </p>
              <h1 className="text-3xl md:text-4xl font-black font-['Montserrat']">
                {provider.name}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
              <div className="flex items-center text-[#2A2A2A]">
                <MapPin className="w-5 h-5 mr-2 text-[#4B6BFB]" />
                {provider.location}
              </div>
              <div className="flex items-center text-[#2A2A2A]">
                <Star className="w-5 h-5 mr-2 text-[#FFD166] fill-[#FFD166]" />
                <span className="font-bold">{provider.rating}/5</span>
                <span className="text-[#2A2A2A]/60 ml-1">
                  ({provider.reviewCount} avis)
                </span>
              </div>
              <div className="flex items-center text-[#2A2A2A]">
                <Clock className="w-5 h-5 mr-2 text-[#FF6B6B]" />
                Répond en {provider.responseTime}
              </div>
              <div className="flex items-center text-[#2A2A2A]">
                <Calendar className="w-5 h-5 mr-2 text-[#4B6BFB]" />
                {provider.availability}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-3">
                À propos
              </h2>
              <p className="text-[#2A2A2A] leading-relaxed">
                {provider.fullDescription}
              </p>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-3">
                Services proposés
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {provider.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-[#2A2A2A] bg-gray-50 rounded-xl p-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#4B6BFB] mr-3 flex-shrink-0" />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-3">
                Tarifs
              </h2>
              <p className="text-[#2A2A2A]">
                <span className="font-bold">Fourchette de prix:</span>{' '}
                {provider.priceRange}
              </p>
            </div>

            <Separator className="my-8" />

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-4">
                Avis clients
              </h2>
              <div className="space-y-4">
                {provider.adminReview && (
                  <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-red-700">Avis admin</span>
                      <span className="text-sm text-red-700">ConnectZone</span>
                    </div>
                    <p className="text-red-700 leading-relaxed">
                      {provider.adminReview}
                    </p>
                  </div>
                )}
                {provider.reviews.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100 text-[#2A2A2A]">
                    Aucun avis client pour le moment.
                  </div>
                ) : (
                  provider.reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#111111]">
                          {review.author}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-[#FFD166] text-[#FFD166]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#2A2A2A] text-sm">{review.comment}</p>
                      <p className="text-[#2A2A2A]/50 text-xs mt-2">
                        {new Date(review.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold py-4 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contacter par WhatsApp
                </Button>
              </a>
              <Button
                onClick={handleShareProfile}
                className="w-full sm:w-auto bg-[#4B6BFB] hover:bg-[#3a5aea] text-white font-bold py-4 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Partager le profil
              </Button>
              <Link to="/prestataires" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-[3px] border-black text-[#111111] font-bold py-4 rounded-xl hover:bg-black hover:text-white transition-all text-lg"
                >
                  Voir d'autres prestataires
                </Button>
              </Link>
            </div>
            {shareMessage && (
              <div className="mt-4 text-sm text-[#111111] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3">
                {shareMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
