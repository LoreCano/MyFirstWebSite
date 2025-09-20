import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import { PosterProvider } from './context/PosterContext';

function App() {
  return (
    <PosterProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chi-siamo" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PosterProvider>
  );
}

export default App;