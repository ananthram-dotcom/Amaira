import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onLoginClick: () => void;
  cartCount: number;
  wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, cartCount, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Garments', 'Ornaments', 'Skincare', 'Haircare', 'Perfume', 'Makeup'];

  return (
    <motion.header 
      className="bg-gradient-to-r from-amber-50 to-yellow-100 shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-2xl font-bold text-red-900 tracking-wide">
              AMAIRA
            </h1>
            <span className="text-yellow-600 ml-2 text-sm font-medium">✨ Indian Beauty</span>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border-2 border-yellow-200 rounded-full focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-red-800 hover:text-red-600 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-red-800 hover:text-red-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLoginClick}
              className="flex items-center space-x-2 px-4 py-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Login</span>
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-red-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="hidden md:flex items-center space-x-8 py-3 border-t border-yellow-200">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              className="text-red-800 hover:text-yellow-600 font-medium transition-colors"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-3 border-t border-yellow-200"
          >
            {categories.map((category) => (
              <button
                key={category}
                className="block w-full text-left px-4 py-2 text-red-800 hover:bg-yellow-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;