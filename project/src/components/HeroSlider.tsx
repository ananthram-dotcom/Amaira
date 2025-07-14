import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Exquisite Indian Jewelry",
      subtitle: "Handcrafted with Love",
      price: "Starting from ₹2,999",
      image: "https://images.pexels.com/photos/18016517/pexels-photo-18016517.jpeg",
      offer: "50% OFF"
    },
    {
      id: 2,
      title: "Premium Skincare Collection",
      subtitle: "Natural & Ayurvedic",
      price: "Starting from ₹899",
      image: "https://images.pexels.com/photos/10712765/pexels-photo-10712765.jpeg",
      offer: "Buy 2 Get 1 Free"
    },
    {
      id: 3,
      title: "Designer Ethnic Wear",
      subtitle: "Traditional Meets Modern",
      price: "Starting from ₹1,499",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      offer: "Up to 70% OFF"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-red-900 to-yellow-700">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="text-white space-y-4">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-sm font-bold inline-block"
                >
                  {slides[currentSlide].offer}
                </motion.div>
                
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-yellow-200"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-yellow-300"
                >
                  {slides[currentSlide].price}
                </motion.p>
                
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-4"
                >
                  <button className="px-8 py-3 bg-yellow-400 text-red-900 rounded-full font-bold hover:bg-yellow-300 transition-colors">
                    Shop Now
                  </button>
                  <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-full font-bold hover:bg-yellow-400 hover:text-red-900 transition-colors">
                    View Collection
                  </button>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-80 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;