import React from 'react';
import PosterGrid from '../components/PosterGrid';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-sm font-medium uppercase tracking-wide text-[#bdbdbd] mb-2">
              TUTTI I POSTER
            </h1>
          </div>
          <PosterGrid />
        </div>
      </section>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;