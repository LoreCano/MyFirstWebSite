import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#0b0b0b] border-b border-[#1a1a1a] transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#00C853] rounded-lg flex items-center justify-center">
              <img src="/images/Logo.jpg" alt="Logo"/>
            </div>
            <span className="text-xl font-bold text-white">Posterly</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === '/' 
                  ? 'text-[#00C853]' 
                  : 'text-[#bdbdbd] hover:text-white'
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Home
            </Link>
            <Link 
              to="/chi-siamo" 
              className={`transition-colors ${
                location.pathname === '/chi-siamo' 
                  ? 'text-[#00C853]' 
                  : 'text-[#bdbdbd] hover:text-white'
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Chi Siamo
            </Link>
          </nav>

          {/* CTA Button */}
          {location.pathname === '/' ? (
            <button
              onClick={scrollToContact}
              className="bg-[#00C853] hover:bg-[#00A844] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contattami</span>
            </button>
          ) : (
            <Link
              to="/"
              className="bg-[#00C853] hover:bg-[#00A844] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Vai al Catalogo</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;