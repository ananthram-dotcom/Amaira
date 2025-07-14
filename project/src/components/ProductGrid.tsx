import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
}

const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Traditional Kundan Necklace Set",
      price: 2999,
      originalPrice: 5999,
      image: "https://images.pexels.com/photos/32077584/pexels-photo-32077584.jpeg",
      category: "Ornaments",
      rating: 4.5,
      reviews: 128,
      discount: 50
    },
    {
      id: 2,
      name: "Ayurvedic Face Cream",
      price: 899,
      originalPrice: 1299,
      image: "https://images.pexels.com/photos/7148534/pexels-photo-7148534.jpeg",
      category: "Skincare",
      rating: 4.8,
      reviews: 256,
      discount: 30
    },
    {
      id: 3,
      name: "Designer Silk Saree",
      price: 3499,
      originalPrice: 6999,
      image: "https://desigiftsusa.com/cdn/shop/products/247561399_212053007729168_7044059845176090578_n_2048x.jpg?v=1702842362",
      category: "Garments",
      rating: 4.7,
      reviews: 89,
      discount: 50
    },
    {
      id: 4,
      name: "Rose Gold Perfume",
      price: 1599,
      originalPrice: 2299,
      image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Perfume",
      rating: 4.6,
      reviews: 175,
      discount: 30
    },
    {
      id: 5,
      name: "Organic Hair Oil",
      price: 699,
      originalPrice: 999,
      image: "https://images.pexels.com/photos/4408447/pexels-photo-4408447.jpeg",
      category: "Haircare",
      rating: 4.4,
      reviews: 312,
      discount: 30
    },
    {
      id: 6,
      name: "Bridal Makeup Kit",
      price: 2499,
      originalPrice: 4999,
      image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
      category: "Makeup",
      rating: 4.9,
      reviews: 94,
      discount: 50
    }
  ];

  const categories = ['All', 'Garments', 'Ornaments', 'Skincare', 'Haircare', 'Perfume', 'Makeup'];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (product: Product) => {
    return wishlist.some(item => item.id === product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-red-900 mb-2">Our Products</h2>
        <p className="text-gray-600">Discover our curated collection of authentic Indian products</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-800 text-white'
                  : 'bg-white text-red-800 hover:bg-red-100'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          
          <button className="p-2 text-red-800 hover:bg-red-100 rounded-lg transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={isInWishlist(product)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          Load More Products
        </motion.button>
      </div>
    </div>
  );
};

export default ProductGrid;