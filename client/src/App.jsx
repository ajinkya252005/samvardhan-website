import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import OurWork from './pages/OurWork';
import Gallery from './pages/Gallery';
import Donation from './pages/Donation';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Navbar stays at the top */}
        <Navbar />

        {/* Main Content Area - Adjusts for fixed navbar */}
        <main className="flex-grow pt-16"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<OurWork />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;