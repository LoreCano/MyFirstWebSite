import React from 'react';
import { Heart, Music, Star, Users } from 'lucide-react';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              La Nostra Storia
            </h1>
            <p className="text-xl text-[#bdbdbd] leading-relaxed">
              Come due amici hanno trasformato la passione per la musica 
              in un'esperienza artistica unica
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Tutto è iniziato con una passione
              </h2>
              <p className="text-[#bdbdbd] leading-relaxed">
                Nel 2024, due giovani appassionati di musica trap italiana, Lorenzo e Luca, 
                si sono resi conto che mancava qualcosa nelle loro stanze: l'arte delle 
                copertine che tanto amavano non aveva mai trovato spazio sulle loro pareti.
              </p>
              <p className="text-[#bdbdbd] leading-relaxed">
                Ascoltando per ore artisti come Capo Plaza e Sfera Ebbasta, hanno capito 
                che quelle copertine iconiche meritavano di essere celebrate non solo 
                digitalmente, ma anche fisicamente, trasformando gli spazi in vere e 
                proprie gallerie musicali.
              </p>
              <p className="text-[#bdbdbd] leading-relaxed">
                Da questa intuizione è nata <span className="text-[#00C853] font-semibold">Posterly</span>, 
                con la missione di portare l'arte della musica trap nelle case di tutti 
                gli appassionati, creando poster di altissima qualità che catturano 
                l'essenza e l\'energia di ogni album.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00C853]/20 to-[#151515] rounded-2xl p-8 border border-[#333]">
                <img
                  src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
                  alt="Due giovani appassionati di musica"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="text-center">
                  <p className="text-[#00C853] font-semibold mb-2">Marco & Luca</p>
                  <p className="text-[#bdbdbd] text-sm">Fondatori di Posterly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              I Nostri Valori
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Passione Musicale</h3>
                <p className="text-[#bdbdbd] text-sm">
                  Ogni poster nasce dall'amore autentico per la musica e i suoi artisti
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Qualità Premium</h3>
                <p className="text-[#bdbdbd] text-sm">
                  Utilizziamo solo materiali di alta qualità per garantire durata e bellezza
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cura Artigianale</h3>
                <p className="text-[#bdbdbd] text-sm">
                  Ogni poster è realizzato con attenzione ai dettagli e cura maniacale
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                <p className="text-[#bdbdbd] text-sm">
                  Creiamo connessioni tra appassionati che condividono la stessa passione
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-[#151515] to-[#0b0b0b] rounded-2xl p-8 border border-[#333] text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              La Nostra Missione
            </h2>
            <p className="text-[#bdbdbd] text-lg leading-relaxed mb-6">
              Trasformare ogni spazio in una celebrazione della musica che amiamo. 
              Vogliamo che ogni poster Posterly non sia solo un elemento decorativo, 
              ma un ponte emotivo che connette le persone alle emozioni e ai ricordi 
              legati alla loro musica preferita.
            </p>
            <div className="inline-flex items-center space-x-2 text-[#00C853] font-semibold">
              <Heart className="w-5 h-5" />
              <span>Fatto con passione per la musica italiana</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;