import React from 'react';
import { Mail, Plus } from 'lucide-react';
import { usePosterContext } from '../context/PosterContext';

interface Poster {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
  description: string;
}

interface PosterCardProps {
  poster: Poster;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster }) => {
  const { setSelectedPoster, addSelectedPoster, selectedPosters } = usePosterContext();
  
  const isSelected = selectedPosters.some(p => p.id === poster.id);

  const handleCardClick = () => {
    setSelectedPoster(poster);
  };

  const handleRequestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addSelectedPoster(poster);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className={`bg-[#151515] rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-out group-hover:transform group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-2xl ${
        isSelected ? 'ring-2 ring-[#00C853]' : ''
      }`}>
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={poster.image}
            alt={`${poster.title} - ${poster.artist}`}
            className="w-full h-full object-contain rounded-t-xl"
            loading="lazy"
          />
          
          {/* Overlay with Request Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <button
              onClick={handleRequestClick}
              className={`${
                isSelected 
                  ? 'bg-[#00A844] text-white' 
                  : 'bg-[#00C853] hover:bg-[#00A844] text-white'
              } px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300`}
            >
              {isSelected ? (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Selezionato</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Seleziona</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#00C853] transition-colors">
            {poster.title}
          </h3>
          <p className="text-sm text-[#bdbdbd] mb-3 font-medium uppercase tracking-wide">
            {poster.artist}
          </p>
          <p className="text-[#00C853] font-semibold text-lg">
            {poster.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
