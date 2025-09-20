import React, { createContext, useContext, useState } from 'react';

interface Poster {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
  description: string;
}

interface SelectedPoster {
  id: number;
  name: string;
}

interface PosterContextType {
  selectedPoster: Poster | null;
  setSelectedPoster: (poster: Poster | null) => void;
  selectedPosters: SelectedPoster[];
  addSelectedPoster: (poster: Poster) => void;
  removeSelectedPoster: (id: number) => void;
  clearSelectedPosters: () => void;
}

const PosterContext = createContext<PosterContextType | undefined>(undefined);

export const PosterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [selectedPosters, setSelectedPosters] = useState<SelectedPoster[]>([]);

  const addSelectedPoster = (poster: Poster) => {
    const posterData = {
      id: poster.id,
      name: `${poster.title} - ${poster.artist}`
    };
    
    setSelectedPosters(prev => {
      // Check if poster is already selected
      if (prev.some(p => p.id === poster.id)) {
        return prev;
      }
      return [...prev, posterData];
    });
  };

  const removeSelectedPoster = (id: number) => {
    setSelectedPosters(prev => prev.filter(p => p.id !== id));
  };

  const clearSelectedPosters = () => {
    setSelectedPosters([]);
  };

  return (
    <PosterContext.Provider value={{
      selectedPoster,
      setSelectedPoster,
      selectedPosters,
      addSelectedPoster,
      removeSelectedPoster,
      clearSelectedPosters
    }}>
      {children}
    </PosterContext.Provider>
  );
};

export const usePosterContext = () => {
  const context = useContext(PosterContext);
  if (context === undefined) {
    throw new Error('usePosterContext must be used within a PosterProvider');
  }
  return context;
};