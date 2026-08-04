import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Chatbot from './components/Chatbot';
import CartDrawer from './components/CartDrawer';
import CookieBanner from './components/CookieBanner';
import ErrorBoundary from './components/ErrorBoundary';

import { CartWishlistProvider } from './context/CartWishlistContext';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import WishlistPage from './pages/WishlistPage';
import MockCheckout from './pages/MockCheckout';
import UserDashboard from './pages/UserDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingReturns from './pages/ShippingReturns';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartWishlistProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex flex-col justify-between">
              <div>
                <Header onLoginClick={handleLoginClick} />
                
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<MockCheckout />} />
                  <Route path="/account" element={<UserDashboard />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/shipping-returns" element={<ShippingReturns />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>

              <Footer />

              <CartDrawer />

              <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={handleCloseLoginModal} 
              />

              <Chatbot />
              <CookieBanner />
            </div>
          </Router>
        </CartWishlistProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;