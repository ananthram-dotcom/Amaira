import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ProductGrid from './components/ProductGrid';
import OffersSection from './components/OffersSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Chatbot from './components/Chatbot';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      <Header 
        onLoginClick={handleLoginClick}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
      
      <main>
        <HeroSlider />
        <OffersSection />
        <ProductGrid />
      </main>
      
      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
      />
      
      <Chatbot />
    </div>
  );
}

export default App;