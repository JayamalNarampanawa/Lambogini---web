import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, Wind, Cog } from 'lucide-react';

const modelData = [
  {
    id: 'aventador',
    name: 'APEX V12',
    subtitle: 'Aventador-Inspired',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
    specs: {
      power: '770 HP',
      speed: '350 km/h',
      acceleration: '2.8s',
      engine: 'V12'
    },
    color: '#E4FF1A'
  },
  {
    id: 'huracan',
    name: 'STORM EVO',
    subtitle: 'Huracán-Inspired',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    specs: {
      power: '640 HP',
      speed: '325 km/h',
      acceleration: '2.9s',
      engine: 'V10'
    },
    color: '#00FF66'
  },
  {
    id: 'revuelto',
    name: 'THUNDER HYBRID',
    subtitle: 'Revuelto-Inspired',
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
    specs: {
      power: '1001 HP',
      speed: '350 km/h',
      acceleration: '2.5s',
      engine: 'V12 Hybrid'
    },
    color: '#F2C94C'
  }
];

const ModelCard = ({ model, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      data-testid={`model-card-${model.id}`}
      className="group relative glass-panel rounded-2xl overflow-hidden cursor-pointer"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={model.image} 
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${model.color}20 0%, transparent 70%)`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2" style={{ fontFamily: 'Outfit' }}>
          {model.subtitle}
        </div>
        <h3 
          className="text-3xl font-black tracking-tighter mb-6"
          style={{ 
            fontFamily: 'Unbounded',
            color: model.color
          }}
        >
          {model.name}
        </h3>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-[#E4FF1A] mt-1" />
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Power</div>
              <div className="text-lg font-bold">{model.specs.power}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Gauge className="w-5 h-5 text-[#E4FF1A] mt-1" />
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Top Speed</div>
              <div className="text-lg font-bold">{model.specs.speed}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Wind className="w-5 h-5 text-[#E4FF1A] mt-1" />
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">0-100 km/h</div>
              <div className="text-lg font-bold">{model.specs.acceleration}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Cog className="w-5 h-5 text-[#E4FF1A] mt-1" />
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Engine</div>
              <div className="text-lg font-bold">{model.specs.engine}</div>
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            border: `2px solid ${model.color}`,
            boxShadow: `0 0 30px ${model.color}50, inset 0 0 30px ${model.color}20`
          }}
        ></div>
      </div>

      {/* View Details Button */}
      <div className="px-6 pb-6">
        <button
          data-testid={`view-details-${model.id}`}
          className="w-full py-3 border-2 border-white/20 rounded-full text-sm uppercase tracking-widest font-bold hover:border-[#E4FF1A] hover:bg-[#E4FF1A]/10 transition-all duration-300"
          style={{ fontFamily: 'Outfit' }}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const ModelsSection = () => {
  return (
    <section className="relative min-h-screen py-20 px-6 lg:px-12 bg-[#050505]" id="models">
      {/* Background Pattern */}
      <div className="absolute inset-0 carbon-texture opacity-30"></div>
      
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
            Our Collection
          </div>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            Choose Your<br />
            <span className="text-[#E4FF1A] glow-yellow">Beast</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            Three masterpieces of engineering, each designed to dominate the road and turn heads wherever they go.
          </p>
        </motion.div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modelData.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;