import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    gsap.fromTo(
      '.contact-content',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24h.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto contact-content">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-['Montserrat'] text-white uppercase mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Une question ? Besoin d'aide ? Notre équipe est là pour vous répondre.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-[28px] border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-6 md:p-10">
            <h2 className="text-2xl font-bold font-['Montserrat'] text-[#111111] mb-6">
              Envoyer un message
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name" className="text-[#111111] font-medium mb-2 block">
                    Nom *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#111111] font-medium mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="subject" className="text-[#111111] font-medium mb-2 block">
                  Sujet
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Le sujet de votre message"
                  className="rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="message" className="text-[#111111] font-medium mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Votre message..."
                  rows={5}
                  className="rounded-xl border-2 border-black focus:ring-[#4B6BFB] focus:border-[#4B6BFB]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF6B6B] hover:bg-[#e55a5a] text-white font-bold py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Send className="w-5 h-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-6">
              <h3 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-4">
                Nos coordonnées
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#4B6BFB] rounded-full flex items-center justify-center border-2 border-black mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111111]">Email</p>
                    <a
                      href="mailto:connectzoneteam@gmail.com"
                      className="text-[#4B6BFB] hover:underline"
                    >
                      connectzoneteam@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#FFD166] rounded-full flex items-center justify-center border-2 border-black mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111111]">Téléphone</p>
                    <a href="tel:+2290141733286" className="text-[#4B6BFB] hover:underline">
                      +229 01 41 73 32 86
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center border-2 border-black mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111111]">Adresse</p>
                    <p className="text-[#2A2A2A]">
                      Cotonou, Bénin
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#FFD166] rounded-2xl border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-6">
              <h3 className="text-xl font-bold font-['Montserrat'] text-[#111111] mb-4">
                Liens utiles
              </h3>
              
              <div className="space-y-3">
                <Link
                  to="/prestataires"
                  className="flex items-center text-[#111111] hover:underline"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Trouver un prestataire
                </Link>
                <Link
                  to="/#comment-ca-marche"
                  className="flex items-center text-[#111111] hover:underline"
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Comment ça marche
                </Link>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-white rounded-2xl border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-6 text-center">
              <p className="text-[#2A2A2A] mb-4">
                Préférez WhatsApp ?
              </p>
              <a
                href="https://wa.me/2290141733286?text=Bonjour, je vous contacte depuis ConnectZone."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#25D366] hover:bg-[#1fb959] text-white font-bold px-6 py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Nous écrire sur WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-black font-['Montserrat'] text-white text-center uppercase mb-8">
            Questions fréquentes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'Comment contacter un prestataire ?',
                a: 'Cliquez simplement sur le bouton WhatsApp du prestataire de votre choix. Une conversation s\'ouvrira directement dans l\'application WhatsApp.',
              },
              {
                q: 'Les prestataires sont-ils vérifiés ?',
                a: 'Oui, tous nos prestataires certifiés ont fait l\'objet d\'une vérification d\'identité et de leurs qualifications professionnelles.',
              },
              {
                q: 'Est-ce gratuit ?',
                a: 'Oui, l\'utilisation de ConnectZone est 100% gratuite pour les clients. Vous payez directement le prestataire pour ses services.',
              },
              {
                q: 'Comment devenir prestataire ?',
                a: 'Contactez-nous par email ou WhatsApp. Nous étudierons votre demande et vous guiderons dans l\'inscription.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-[3px] border-black shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-6"
              >
                <h3 className="text-lg font-bold text-[#111111] mb-2">{faq.q}</h3>
                <p className="text-[#2A2A2A]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
