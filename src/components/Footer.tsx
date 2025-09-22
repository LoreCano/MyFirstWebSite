import React from 'react';
import { Image, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0b0b] border-t border-[#1a1a1a] py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#00C853] rounded-lg flex items-center justify-center">
                <img src="/images/Logo.jpg" alt="Logo"/>
              </div>
              <span className="text-xl font-bold text-white">Posterly</span>
            </div>
            <p className="text-[#bdbdbd] leading-relaxed mb-6">
              La tua destinazione per poster musicali di alta qualità. 
              Trasforma i tuoi spazi con l'arte delle copertine più iconiche della storia della musica.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-[#bdbdbd]">
                <Mail className="w-5 h-5 text-[#00C853]" />
                <span>posterly97@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-[#bdbdbd]">
                <div className="w-5 h-5 bg-[#00C853] rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">P</span>
                </div>
                <span>Poster di alta qualità dal 2024</span>
              </div>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Seguici</h3>
            <div className="flex items-center space-x-4 mb-8">
              <a 
                href="#" 
                className="w-12 h-12 bg-[#151515] hover:bg-[#00C853] rounded-full flex items-center justify-center text-[#bdbdbd] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-[#151515] hover:bg-[#00C853] rounded-full flex items-center justify-center text-[#bdbdbd] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-[#151515] hover:bg-[#00C853] rounded-full flex items-center justify-center text-[#bdbdbd] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <div className="bg-gradient-to-r from-[#00C853]/20 to-transparent p-4 rounded-lg border border-[#00C853]/30">
              <p className="text-[#00C853] font-semibold mb-2">🎵 Novità in arrivo!</p>
              <p className="text-[#bdbdbd] text-sm">
                Nuovi poster di artisti emergenti della scena trap italiana
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[#bdbdbd] text-sm">
            © 2025 Posterly. Tutti i diritti riservati.
          </p>
          <p className="text-[#bdbdbd] text-sm mt-4 md:mt-0">
            Realizzato con ❤️ per gli amanti della musica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;