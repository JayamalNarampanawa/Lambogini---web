import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Showroom3D from './Showroom3D';

const HeroSection = () => {
  const [hotspot, setHotspot] = useState(null);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505]" id="hero">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#E4FF1A' : '#00FF66'
                }${i === 0 ? '15' : '08'} 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 15}%`,
              filter: 'blur(60px)',
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}\n
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(228, 255, 26, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(228, 255, 26, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Car silhouette with 3D effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1100px] h-[420px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Showroom3D onHotspot={(label) => setHotspot(label)} />
          </div>
        </motion.div>

        {/* Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#E4FF1A] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-12">
        {/* Top Navigation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-0 right-0 flex justify-between items-center px-8 lg:px-12"
        >
          <div className="text-3xl font-black tracking-tighter text-[#E4FF1A] glow-yellow" style={{ fontFamily: 'Unbounded' }}>
            DRAFTLY
          </div>
          <button
            data-testid="menu-button"
            className="glass-panel px-6 py-2 rounded-full text-sm uppercase tracking-widest hover:border-[#E4FF1A] transition-all duration-300"
          >
            Menu
          </button>
        </motion.div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mt-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#E4FF1A] mb-4" style={{ fontFamily: 'Outfit' }}>
              Italian Engineering Excellence
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-tight mb-6 glow-yellow"
              style={{ fontFamily: 'Unbounded' }}
            >
              Enter the Future<br />of Italian Performance
            </h1>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Manrope' }}>
              An immersive supercar showroom built for speed, luxury, and precision.
              Experience automotive perfection in a cinematic digital environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
          >
            <button
              data-testid="explore-showroom-btn"
              onClick={() => scrollToSection('models')}
              className="group relative px-8 py-4 bg-[#E4FF1A] text-black font-bold uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(228,255,26,0.5)]"
              style={{ fontFamily: 'Outfit' }}
            >
              <span className="relative z-10">Explore Showroom</span>
            </button>
            <button
              data-testid="customize-car-btn"
              onClick={() => scrollToSection('customizer')}
              className="px-8 py-4 glass-panel font-bold uppercase tracking-widest text-sm rounded-full border-2 border-white/20 hover:border-[#E4FF1A] transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Outfit' }}
            >
              Customize Your Car
            </button>
          </motion.div>
        </div>

        {/* Hotspot Info Panel */}
        {hotspot && (
          <div className="absolute top-24 right-12 z-20">
            <div className="glass-panel p-6 rounded-2xl max-w-sm w-80 backdrop-blur-md">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-xs text-[#E4FF1A] uppercase tracking-wider">{hotspot}</div>
                  <h4 className="text-lg font-bold text-white mt-1">Overview</h4>
                  <p className="text-sm text-white/70 mt-2">Brief information about the {hotspot.toLowerCase()}. Click other hotspots to explore more details.</p>
                </div>
                <button onClick={() => setHotspot(null)} className="ml-4 text-white/60 hover:text-white">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Scroll to Explore</div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-[#E4FF1A] rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-[#E4FF1A] rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
