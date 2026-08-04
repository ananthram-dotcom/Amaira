import React from 'react';
import HeroSlider from '../components/HeroSlider';
import OffersSection from '../components/OffersSection';
import ProductGrid from '../components/ProductGrid';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSlider />
      <OffersSection />
      <ProductGrid />
    </main>
  );
};

export default HomePage;
