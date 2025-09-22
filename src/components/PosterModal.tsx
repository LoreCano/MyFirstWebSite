import React, { useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { usePosterContext } from '../context/PosterContext';

const PosterModal: React.FC = () => {
  const { selectedPoster, setSelectedPoster, addSelectedPoster, selectedPosters } = usePosterContext();
  
  const isSelected = selectedPoster ? selectedPosters.some(p => p.id === selectedPoster.id) : false;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPoster(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [setSelectedPoster]);

  if (!selectedPoster) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedPoster(null);
    }
  };

  const handleRequestClick = () => {
    if (selectedPoster) {
      addSelectedPoster(selectedPoster);
    }
    setSelectedPoster(null);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-[#151515] rounded-2xl max-w-4xl w-full mx-6 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setSelectedPoster(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={selectedPoster.image}
              alt={`${selectedPoster.title} - ${selectedPoster.artist}`}
              className="w-full h-full object-contain rounded-t-xl"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedPoster.title}
              </h2>
              <p className="text-xl text-[#bdbdbd] font-medium uppercase tracking-wide mb-4">
                {selectedPoster.artist}
              </p>
              <p className="text-2xl text-[#00C853] font-semibold mb-6">
                {selectedPoster.price}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Descrizione</h3>
              <p className="text-[#bdbdbd] leading-relaxed">
                {selectedPoster.description}
              </p>
            </div>

            <button
              onClick={handleRequestClick}
              className={`${
                isSelected 
                  ? 'bg-[#00A844] text-white' 
                  : 'bg-[#00C853] hover:bg-[#00A844] text-white'
              } px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-3 text-lg`}
            >
              <Plus className="w-5 h-5" />
              <span>{isSelected ? 'Poster già selezionato' : 'Seleziona questo poster'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterModal;