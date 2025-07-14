import React from 'react';
import { Clock, Tag, Star, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const OffersSection: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: "Festival Special",
      description: "Up to 70% off on traditional wear",
      image: "https://images.pexels.com/photos/7176634/pexels-photo-7176634.jpeg",
      discount: "70% OFF",
      validUntil: "2024-12-31",
      category: "Garments"
    },
    {
      id: 2,
      title: "Beauty Bonanza",
      description: "Buy 2 Get 1 Free on all skincare products",
      image: "https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg",
      discount: "BUY 2 GET 1",
      validUntil: "2024-12-25",
      category: "Skincare"
    },
    {
      id: 3,
      title: "Jewelry Extravaganza",
      description: "Flat 50% off on all jewelry items",
      image: "https://images.pexels.com/photos/18016517/pexels-photo-18016517.jpeg",
      discount: "50% OFF",
      validUntil: "2024-12-30",
      category: "Ornaments"
    }
  ];

  const flashDeals = [
    {
      id: 1,
      name: "Golden Bangles Set",
      price: 1999,
      originalPrice: 3999,
      image: "https://images.pexels.com/photos/8887302/pexels-photo-8887302.jpeg",
      timeLeft: "2h 30m",
      soldPercentage: 75
    },
    {
      id: 2,
      name: "Luxury Face Serum",
      price: 699,
      originalPrice: 1299,
      image: "https://images.pexels.com/photos/32291052/pexels-photo-32291052.jpeg",
      timeLeft: "4h 15m",
      soldPercentage: 60
    },
    {
      id: 3,
      name: "Designer Lehenga",
      price: 2499,
      originalPrice: 4999,
      image: "https://images.pexels.com/photos/13224227/pexels-photo-13224227.jpeg",
      timeLeft: "6h 45m",
      soldPercentage: 85
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-red-900 mb-4"
          >
            Special Offers & Deals
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our exclusive offers and limited-time deals
          </p>
        </div>

        {/* Main Offers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {offer.discount}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{offer.category}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-red-800 text-white py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flash Deals */}
        <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Gift className="h-8 w-8 mr-3" />
              Flash Deals
            </h3>
            <p className="text-red-200">Limited time offers - Grab them before they're gone!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flashDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={deal.image} 
                    alt={deal.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{deal.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-yellow-400 font-bold">₹{deal.price.toLocaleString()}</span>
                      <span className="text-gray-300 line-through text-sm">₹{deal.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Sold: {deal.soldPercentage}%</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {deal.timeLeft}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${deal.soldPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-yellow-400 text-red-900 py-2 rounded-full font-medium hover:bg-yellow-300 transition-colors text-sm"
                >
                  Grab Deal
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;