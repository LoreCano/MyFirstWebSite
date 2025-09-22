import React from 'react';
import PosterCard from './PosterCard';
import PosterModal from './PosterModal';
import { usePosterContext } from '../context/PosterContext';

const posters = [
  {
    id: 1,
    title: '20',
    artist: 'Capo Plaza',
    price: 'Da €14,90',
    image: '/images/posters/Capo_Plaza_20 .jpg?',
    description: 'Iconico album dell\'artista Capo Plaza publicato nel 2018, un classico intramontabile della musica trap.'
  },
  {
    id: 2,
    title: '20 (Deluxe Edition)',
    artist: 'Capo Plaza',
    price: 'Da €14,90',
    image: 'images/posters/Capo_Plaza_20_(Deluxe edition).jpg?',
    description: 'Iconico album dell\'artista Capo Plaza publicato nel 2018, Edizione Deluxe, un classico intramontabile della musica trap.'
  },
  {
    id: 3,
    title: 'Plaza',
    artist: 'Capo Plaza',
    price: 'Da €14,90',
    image: 'images/posters/Capo_Plaza_Plaza.jpg?',
    description: 'Iconico album dell\'artista Capo Plaza publicato nel 2021, un classico intramontabile della musica trap.'
  },
  {
    id: 4,
    title: 'Plaza (Deluxe Edition)',
    artist: 'Capo Plaza',
    price: 'Da €14,90',
    image: '/images/posters/Capo_Plaza_Plaza_(Deluxe edition).jpg',
    description: 'Iconico album dell\'artista Capo Plaza publicato nel 2021,, Edizione Deluxe, un classico intramontabile della musica trap.'
  },
  {
    id: 5,
    title: 'Hustle Mixtape',
    artist: 'Capo Plaza',
    price: 'Da €14,90',
    image: '/images/posters/Capo_Plaza_Hustle_Mixtape.jpg',
    description: 'Iconico album dell\'artista Capo Plaza publicato nel 2022, un classico intramontabile della musica trap.'
  },
  {
    id: 6,
    title: 'Ferite',
    artist: 'Capo Plaza',
    price: 'Da €14,90',
    image: '/images/posters/Capo_Plaza_Ferite.jpg',
    description: 'Iconico album dell\'artista Capo Plaza publicato nel 2024, un classico intramontabile della musica trap.'
  },
  {
    id: 7,
    title: 'Sfera Ebbasta',
    artist: 'Sfera Ebbasta',
    price: 'Da €14,90',
    image: '/images/posters/Sfera_Ebbasta_Sfera_Ebbasta.jpg',
    description: 'Iconico album dell\'artista Sfera Ebbasta publicato nel 2016, un classico intramontabile della musica trap.'
  },
  {
    id: 8,
    title: 'Rockstar',
    artist: 'Sfera Ebbasta',
    price: 'Da €14,90',
    image: '/images/posters/Sfera_Ebbasta_Rockstar.jpg',
    description: 'Iconico album dell\'artista Sfera Ebbasta publicato nel 2018, un classico intramontabile della musica trap.'
  },
  {
    id: 9,
    title: 'Rockstar',
    artist: 'Sfera Ebbasta',
    price: 'Da €14,90',
    image: '/images/posters/Sfera_Ebbasta_Rockstar_Foto.jpg',
    description: 'Immagine iconica dell\'artista Sfera Ebbasta inerente al suo album Rockstar, un classico intramontabile della musica trap.'
  },
  {
    id: 10,
    title: 'Famoso',
    artist: 'Sfera Ebbasta',
    price: 'Da €14,90',
    image: '/images/posters/Sfera_Ebbasta_Famoso.jpg',
    description: 'Iconico album dell\'artista Sfera Ebbasta publicato nel 2020, un classico intramontabile della musica trap.'
  },
  {
    id: 11,
    title: 'X2VR',
    artist: 'Sfera Ebbasta',
    price: 'Da €14,90',
    image: '/images/posters/Sfera_Ebbasta_X2VR.jpg',
    description: 'Iconico album dell\'artista Sfera Ebbasta publicato nel 2023, un classico intramontabile della musica trap.'
  },
  {
    id: 12,
    title: 'X2VR',
    artist: 'Sfera Ebbasta',
    price: 'Da €14,90',
    image: '/images/posters/Sfera_Ebbasta_X2VR_Foto.jpg',
    description: 'Immagine iconica dell\'artista Sfera Ebbasta inerente al suo album Rockstar, un classico intramontabile della musica trap.'
  },
  {
    id: 13,
    title: 'Milano Demons',
    artist: 'Shiva',
    price: 'Da €14,90',
    image: '/images/posters/Shiva_Milano_Demons.jpg',
    description: 'Iconico album dell\'artista Shiva publicato nel 2022, un classico intramontabile della musica trap.'
  },
  {
    id: 14,
    title: 'Santana Season',
    artist: 'Shiva',
    price: 'Da €14,90',
    image: '/images/posters/Shiva_Santana_Season.jpg',
    description: 'Iconico album dell\'artista Shiva publicato nel 2023, un classico intramontabile della musica trap.'
  },
  {
    id: 15,
    title: 'Milano Angels',
    artist: 'Shiva',
    price: 'Da €14,90',
    image: '/images/posters/Shiva_Milano_Angels.jpg',
    description: 'Iconico album dell\'artista Shiva publicato nel 2024, un classico intramontabile della musica trap.'
  },
  {
    id: 16,
    title: 'Going Hard',
    artist: 'Tony Boy',
    price: 'Da €14,90',
    image: '/images/posters/Tony_Boy_Going_Hard.jpg',
    description: 'Iconico album dell\'artista Tony Boy publicato nel 2020, un classico intramontabile della musica trap.'
  },
  {
    id: 17,
    title: 'Going Hard 2',
    artist: 'Tony Boy',
    price: 'Da €14,90',
    image: '/images/posters/Tony_Boy_Going_Hard_2.jpg',
    description: 'Iconico album dell\'artista Tony Boy publicato nel 2021, un classico intramontabile della musica trap.'
  }
];

const PosterGrid: React.FC = () => {
  const { selectedPoster } = usePosterContext();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posters.map((poster) => (
          <PosterCard key={poster.id} poster={poster} />
        ))}
      </div>
      {selectedPoster && <PosterModal />}
    </>
  );
};

export default PosterGrid;