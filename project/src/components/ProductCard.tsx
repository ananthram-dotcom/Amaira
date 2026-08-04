import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-yellow-100/60 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden group">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2.5 left-2.5 bg-red-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow">
            {product.discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md transition-colors ${
            isInWishlist 
              ? 'bg-red-600 text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-600'
          }`}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <Link
            to={`/product/${product.id}`}
            className="pointer-events-auto px-4 py-2 bg-white/90 text-red-900 text-xs font-bold rounded-full shadow hover:bg-white flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-yellow-700 uppercase mb-1 block">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1.5 hover:text-red-800 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-current text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700 ml-1.5">
              {product.rating}
            </span>
            <span className="text-[10px] text-gray-400 ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div>
          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-base font-extrabold text-red-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-red-800 text-white py-2 rounded-lg font-semibold text-xs hover:bg-red-700 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;