import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GalleryTunnel3D from './GalleryTunnel3D';

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
    title: 'Exterior Excellence',
    category: 'Design'
  },
  {
    url: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    title: 'Aerodynamic Perfection',
    category: 'Performance'
  },
  {
    url: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
    title: 'Night Mode',
    category: 'Lighting'
  },
  {
    url: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    title: 'Engine Bay',
    category: 'Engineering'
  },
  {
    url: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg',
    title: 'Interior Luxury',
    category: 'Interior'
  },
  {
    url: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg',
    title: 'Track Ready',
    category: 'Performance'
  }
];

const GalleryCard = ({ image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      data-testid={`gallery-image-${index}`}
      className="group relative glass-panel rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, #E4FF1A20 0%, transparent 70%)'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="text-xs uppercase tracking-[0.2em] text-[#E4FF1A] mb-2" style={{ fontFamily: 'Outfit' }}>
          {image.category}
        </div>
        <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Unbounded' }}>
          {image.title}
        </h3>
      </div>

      {/* Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          border: '2px solid #E4FF1A',
          boxShadow: '0 0 30px #E4FF1A50, inset 0 0 30px #E4FF1A20'
        }}
      ></div>
    </motion.div>
  );
};

const GallerySection = () => {
  return (
    <section className="relative min-h-screen py-20 px-6 lg:px-12 bg-[#0A0A0A]" id="gallery">
      {/* Background */}
      <div className="absolute inset-0 carbon-texture opacity-20"></div>

      {/* Floating lights */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#E4FF1A' : '#00FF66'}08 0%, transparent 70%)`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              filter: 'blur(50px)'
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#E4FF1A] mb-4" style={{ fontFamily: 'Outfit' }}>
            Visual Journey
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            Immersive
            <br />
            <span className="text-[#E4FF1A] glow-yellow">Gallery</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            Explore every angle of automotive excellence. Each image tells a story of precision, power, and passion.
          </p>
        </motion.div>
        <div className="flex justify-center mb-8">
          <button onClick={() => setOpen(true)} className="px-6 py-3 rounded-full bg-[#E4FF1A] text-black font-bold">Enter 3D Gallery</button>
        </div>
        {open && (
          <div className="fixed inset-0 z-50 bg-black">
            <GalleryTunnel3D images={galleryImages} onClose={() => setOpen(false)} />
          </div>
        )}

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            perspective: '2000px'
          }}
        >
          {galleryImages.map((image, index) => (
            <GalleryCard key={index} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;