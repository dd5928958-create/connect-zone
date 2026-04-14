import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-black font-['Montserrat'] text-white mb-4 block">
              ConnectZone
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Trouvez le bon pro et contactez-le directement par WhatsApp.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B6B] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#4B6BFB] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD166] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/prestataires" className="text-gray-400 hover:text-white transition-colors">
                  Prestataires
                </Link>
              </li>
              <li>
                <Link to="/#comment-ca-marche" className="text-gray-400 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/prestataires" className="text-gray-400 hover:text-white transition-colors">
                  Plomberie
                </Link>
              </li>
              <li>
                <Link to="/prestataires" className="text-gray-400 hover:text-white transition-colors">
                  Électricité
                </Link>
              </li>
              <li>
                <Link to="/prestataires" className="text-gray-400 hover:text-white transition-colors">
                  Menuiserie
                </Link>
              </li>
              <li>
                <Link to="/prestataires" className="text-gray-400 hover:text-white transition-colors">
                  Informatique
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:connectzoneteam@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  connectzoneteam@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+2290141733286"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +229 01 41 73 32 86
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2290141733286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp: +229 01 41 73 32 86
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ConnectZone. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
