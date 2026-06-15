import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ModelsSection from '@/components/ModelsSection';
import PerformanceSection from '@/components/PerformanceSection';
import CustomizerSection from '@/components/CustomizerSection';
import GallerySection from '@/components/GallerySection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      <HeroSection />
      <ModelsSection />
      <PerformanceSection />
      <CustomizerSection />
      <GallerySection />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default HomePage;