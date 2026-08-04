import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlistCount, setIsCartOpen } = useCartWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const categories = ['Garments', 'Ornaments', 'Skincare', 'Haircare', 'Perfume', 'Makeup'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.header 
      className="bg-gradient-to-r from-amber-50 to-yellow-100 shadow-md sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-red-900 tracking-wide">
              AMAIRA
            </h1>
            <span className="text-yellow-600 ml-2 text-sm font-medium hidden sm:inline">✨ Indian Beauty</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl mx-4 sm:mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-xs sm:text-sm text-gray-700 bg-white border-2 border-yellow-200 rounded-full focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/wishlist"
              className="relative p-2 text-red-800 hover:text-red-600 transition-colors"
              title="Wishlist"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-red-800 hover:text-red-600 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <Link
                to="/account"
                className="flex items-center space-x-1 px-3 py-1.5 bg-red-800 text-white rounded-full hover:bg-red-700 transition-colors text-xs font-semibold"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-1.5 px-4 py-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-colors text-xs font-semibold"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-red-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Categories Navbar */}
        <div className="hidden md:flex items-center space-x-8 py-2.5 border-t border-yellow-200">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/?category=${category}`}
              className="text-red-800 hover:text-yellow-600 text-sm font-medium transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-yellow-200">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/?category=${category}`}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-red-800 hover:bg-yellow-50 text-sm transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;