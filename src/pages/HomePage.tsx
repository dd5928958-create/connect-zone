import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, MessageCircle, Shield, Star, CheckCircle, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Provider, stats } from '@/data/providers';
import ProviderCard from '@/components/ProviderCard';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, scale: 0.96, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-headline',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-subtext',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out', stagger: 0.08 }
      );

      // Steps animation
      gsap.fromTo(
        '.step-card',
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card-left',
        { opacity: 0, x: '-12vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.stat-card-right',
        { opacity: 0, x: '12vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Spotlight animation
      gsap.fromTo(
        '.spotlight-card',
        { opacity: 0, x: '20vw', rotate: 3 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Directory cards animation
      gsap.fromTo(
        '.directory-card',
        { opacity: 0, y: 90, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: directoryRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Trust cards animation
      gsap.fromTo(
        '.trust-card-left',
        { opacity: 0, x: '-10vw', rotate: -3 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trustRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.trust-card-right',
        { opacity: 0, x: '10vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trustRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        '.cta-card',
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

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

  const featuredProvider = providers.find((provider) => provider.isFeatured && provider.isPublished);
  const directoryProviders = providers.slice(0, 3);

  return (
    <main className="overflow-hidden">
      {/* Section 1: Hero */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative pt-20 pb-12 px-4"
      >
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-[#FFD166] opacity-60" />
        <div className="absolute bottom-1/4 right-[8%] w-12 h-12 md:w-20 md:h-20 rounded-full border-4 border-[#FF6B6B] opacity-60" />
        <div className="absolute top-1/3 right-[15%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#FFD166] opacity-40" />

        <div
          ref={heroCardRef}
          className="relative w-full max-w-[1100px] min-h-[560px] bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Hero Image */}
          <div className="lg:w-[55%] h-64 lg:h-auto relative">
            <img
              src="/images/hero_hands_phone.jpg"
              alt="Personne utilisant un smartphone"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="lg:w-[45%] p-6 md:p-10 lg:p-12 flex flex-col justify-center">
            <h1 className="hero-headline text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-['Montserrat'] text-[#111111] uppercase leading-tight tracking-tight mb-4 md:mb-6">
              Trouvez le<br />bon prestataire
            </h1>
            <p className="hero-subtext text-base md:text-lg text-[#2A2A2A] mb-6 md:mb-8 leading-relaxed">
              Comparez les prestataires près de chez vous et contactez-les directement par WhatsApp.
            </p>
            <div className="hero-subtext flex flex-col sm:flex-row gap-4 mb-4">
              <Link to="/prestataires">
                <Button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-sm md:text-base">
                  Consulter les prestataires
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="hero-subtext text-sm text-[#2A2A2A]/70">
              Aucun frais caché. Réponse sous 24h.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 mb-12">
        <div className="max-w-5xl mx-auto rounded-[28px] border-[4px] border-red-600 bg-red-100 px-6 py-8 shadow-[0_20px_50px_rgba(255,0,0,0.08)] animate-pulse text-red-900 font-black text-center text-base md:text-xl tracking-tight">
          <p>
            Si un prestataire ne se comporte pas bien, signalez-le{' '}
            <a
              href="https://wa.me/2290141733286?text=Bonjour%20ConnectZone%20je%20souhaite%20signaler%20un%20prestataire"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] underline decoration-[#2563eb] decoration-2 hover:text-[#1d4ed8]"
            >
              ici
            </a>
          </p>
          <p className="mt-4 text-[#2563eb] text-lg font-black">+2290141733286</p>
          <p className="mt-2 text-red-900">pour qu'on puisse intervenir.</p>
        </div>
      </section>

      {/* Section 2: How it works */}
      <section
        ref={stepsRef}
        id="comment-ca-marche"
        className="py-16 md:py-24 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-['Montserrat'] text-white text-center uppercase mb-12 md:mb-16">
            Comment ça marche
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: '1',
                title: 'Recherchez',
                description: 'Filtrez par métier et ville.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Comparez',
                description: 'Profils vérifiés, tarifs clairs.',
                icon: CheckCircle,
              },
              {
                step: '3',
                title: 'Contactez',
                description: 'Discutez par WhatsApp, sans intermédiaire.',
                icon: MessageCircle,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="step-card bg-white rounded-3xl border-[3px] border-black p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.14)] text-center hover:translate-y-[-6px] hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-[#4B6BFB] rounded-full flex items-center justify-center border-[3px] border-black">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-[#FF6B6B] mb-2">
                  {item.step}
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-['Montserrat'] text-[#111111] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#2A2A2A]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Stats + Social Proof */}
      <section
        ref={statsRef}
        className="py-16 md:py-24 px-4 bg-[#FFD166] relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Stats Card */}
            <div className="stat-card-left bg-white rounded-[28px] border-[3px] border-black p-6 md:p-10 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
              <h3 className="text-2xl md:text-3xl font-black font-['Montserrat'] text-[#111111] mb-6 md:mb-8">
                La communauté
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-black text-[#FF6B6B]">
                    +{stats.providersCount.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-[#2A2A2A] mt-1">
                    prestataires actifs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-black text-[#4B6BFB]">
                    +{stats.requestsPerMonth.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-[#2A2A2A] mt-1">
                    demandes par mois
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-black text-[#FFD166]">
                    {stats.averageRating}/5
                  </div>
                  <div className="text-xs md:text-sm text-[#2A2A2A] mt-1">
                    satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="stat-card-right bg-white rounded-[28px] border-[3px] border-black p-6 md:p-10 shadow-[0_18px_40px_rgba(0,0,0,0.14)] flex flex-col justify-center">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#FFD166] text-[#FFD166]"
                  />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-[#111111] italic mb-4 leading-relaxed">
                "J'ai trouvé un électricien en 10 minutes. Le chat WhatsApp a tout simplifié."
              </blockquote>
              <cite className="text-[#2A2A2A] font-medium not-italic">
                — Amélie, Lyon
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Provider Spotlight */}
      <section
        ref={spotlightRef}
        className="py-16 md:py-24 px-4 relative"
      >
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-['Montserrat'] text-white text-center uppercase mb-12 md:mb-16">
            Le prestataire du mois
          </h2>

          {featuredProvider && (
            <div className="spotlight-card bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-[52%] h-64 lg:h-auto relative">
                <img
                  src={featuredProvider.image}
                  alt={featuredProvider.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:w-[48%] p-6 md:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProvider.isCertified && (
                    <span className="inline-flex items-center px-3 py-1 bg-[#4B6BFB] text-white text-sm font-bold rounded-full border-2 border-black">
                      <Shield className="w-4 h-4 mr-1" />
                      Certifié
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 bg-[#FFD166] text-[#111111] text-sm font-bold rounded-full border-2 border-black">
                    <Clock className="w-4 h-4 mr-1" />
                    Répond en {featuredProvider.responseTime}
                  </span>
                </div>

                <div className="text-sm font-bold text-[#FF6B6B] uppercase tracking-wider mb-2">
                  {featuredProvider.job} — {featuredProvider.location}
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-['Montserrat'] text-[#111111] mb-4">
                  {featuredProvider.name}
                </h3>

                <ul className="space-y-2 mb-6">
                  {featuredProvider.services.slice(0, 3).map((service, idx) => (
                    <li key={idx} className="flex items-center text-[#2A2A2A]">
                      <CheckCircle className="w-5 h-5 text-[#4B6BFB] mr-2 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${featuredProvider.phone.replace(/\+/g, '')}?text=Bonjour ${featuredProvider.name}, je vous contacte via ConnectZone.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold px-6 py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full sm:w-auto">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contacter par WhatsApp
                    </Button>
                  </a>
                  <Link to={`/prestataire/${featuredProvider.id}`}>
                    <Button
                      variant="outline"
                      className="border-[3px] border-black text-[#111111] font-bold px-6 py-3 rounded-xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                    >
                      Voir le profil complet
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Directory Preview */}
      <section
        ref={directoryRef}
        className="py-16 md:py-24 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-['Montserrat'] text-white uppercase mb-8 md:mb-12">
            Parcourir les prestataires
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {directoryProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                className="directory-card"
              />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link to="/prestataires">
              <Button className="bg-white hover:bg-gray-100 text-[#111111] font-bold px-8 py-4 rounded-xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Voir tous les prestataires
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Safety + Quality */}
      <section
        ref={trustRef}
        className="py-16 md:py-24 px-4 bg-[#FFD166] relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Main Trust Card */}
            <div className="trust-card-left bg-white rounded-[28px] border-[3px] border-black p-8 md:p-12 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#4B6BFB] rounded-full flex items-center justify-center border-[3px] border-black mb-6">
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-['Montserrat'] text-[#111111] mb-4">
                Profils vérifiés
              </h3>
              <p className="text-[#2A2A2A] text-lg">
                Pièce d'identité + justificatif de métier. Chaque prestataire est
                vérifié avant publication.
              </p>
            </div>

            {/* Secondary Cards */}
            <div className="space-y-4 md:space-y-6">
              <div className="trust-card-right bg-white rounded-2xl border-[3px] border-black p-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] flex items-center">
                <div className="w-12 h-12 bg-[#FFD166] rounded-full flex items-center justify-center border-[3px] border-black mr-4 flex-shrink-0">
                  <Star className="w-6 h-6 text-[#111111]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-['Montserrat'] text-[#111111]">
                    Avis clients
                  </h4>
                  <p className="text-[#2A2A2A]">
                    Notes et commentaires publics
                  </p>
                </div>
              </div>

              <div className="trust-card-right bg-white rounded-2xl border-[3px] border-black p-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] flex items-center">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center border-[3px] border-black mr-4 flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-['Montserrat'] text-[#111111]">
                    Modération active
                  </h4>
                  <p className="text-[#2A2A2A]">
                    Signalement et support humain
                  </p>
                </div>
              </div>

              <div className="trust-card-right bg-white rounded-2xl border-[3px] border-black p-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] flex items-center">
                <div className="w-12 h-12 bg-[#4B6BFB] rounded-full flex items-center justify-center border-[3px] border-black mr-4 flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-['Montserrat'] text-[#111111]">
                    Pas de commissions
                  </h4>
                  <p className="text-[#2A2A2A]">
                    Vous payez directement le prestataire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section
        ref={ctaRef}
        className="py-16 md:py-24 px-4 relative"
      >
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

        <div className="max-w-6xl mx-auto">
          <div className="cta-card bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col lg:flex-row">
            {/* Image */}
            <div className="lg:w-[55%] h-64 lg:h-auto relative">
              <img
                src="/images/final_cta_team.jpg"
                alt="Équipe collaborant"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="lg:w-[45%] p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-['Montserrat'] text-[#111111] uppercase mb-4 md:mb-6">
                Commencez maintenant
              </h2>
              <p className="text-base md:text-lg text-[#2A2A2A] mb-6 md:mb-8 leading-relaxed">
                Créez une demande ou explorez les profils. C'est rapide, gratuit
                et sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
                <Link to="/prestataires">
                  <Button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold px-6 py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full">
                    Consulter les prestataires
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="border-[3px] border-black text-[#111111] font-bold px-6 py-3 rounded-xl hover:bg-black hover:text-white transition-all w-full"
                  >
                    Créer une demande
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-[#2A2A2A]/70">
                Des questions ? Écrivez à{' '}
                <a
                  href="mailto:connectzoneteam@gmail.com"
                  className="text-[#4B6BFB] hover:underline"
                >
                  connectzoneteam@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
