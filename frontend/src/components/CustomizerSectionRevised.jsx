import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Disc, Sofa, Lightbulb } from 'lucide-react';

const CustomizerSection = () => {
  const [bodyColor, setBodyColor] = useState('#E4FF1A');
  const [wheelStyle, setWheelStyle] = useState('sport');
  const [interior, setInterior] = useState('#000000');
  const [lighting, setLighting] = useState('gold');

  const bodyColors = [
    { name: 'Neon Yellow', value: '#E4FF1A' },
    { name: 'Carbon Black', value: '#1A1A1A' },
    { name: 'Racing Red', value: '#FF3B30' },
    { name: 'Pearl White', value: '#F5F5F5' },
    { name: 'Electric Green', value: '#00FF66' }
  ];

  const wheelStyles = [
    { name: 'Sport', value: 'sport' },
    { name: 'Carbon', value: 'carbon' },
    { name: 'Luxury', value: 'luxury' }
  ];

  const interiorColors = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#FF3B30' },
    { name: 'Tan', value: '#C19A6B' }
  ];

  const lightingModes = [
    { name: 'Gold', value: 'gold', color: '#F2C94C' },
    { name: 'Green', value: 'green', color: '#00FF66' },
    { name: 'Ice Blue', value: 'ice_blue', color: '#00F0FF' }
  ];

  const getLightingColor = () => {
    const mode = lightingModes.find(m => m.value === lighting);
    return mode ? mode.color : '#F2C94C';
  };

  return (
    <section className="relative min-h-screen py-20 px-6 lg:px-12 bg-[#050505]" id="customizer">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#E4FF1A] mb-4" style={{ fontFamily: 'Outfit' }}>
            Make It Yours
          </div>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            Customize Your<br />
            <span className="text-[#E4FF1A] glow-yellow">Dream Machine</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            Personalize every detail of your supercar. Choose colors, wheels, interior, and lighting to match your style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-2xl p-8 h-[500px] flex items-center justify-center relative overflow-hidden"
          >
            {/* Background glow */}
            <div 
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: `radial-gradient(circle at center, ${bodyColor}15 0%, transparent 70%)`
              }}
            />
            
            {/* Car visualization using SVG */}
            <motion.svg
              width="500"
              height="350"
              viewBox="0 0 600 300"
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Headlight glow */}
              <defs>
                <radialGradient id="headlightGlow">
                  <stop offset="0%" stopColor={getLightingColor()} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={getLightingColor()} stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Headlight beams */}
              <ellipse cx="520" cy="160" rx="80" ry="40" fill="url(#headlightGlow)" opacity="0.4" />
              
              {/* Main body */}
              <motion.rect 
                x="100" 
                y="120" 
                width="400" 
                height="80" 
                fill={bodyColor} 
                rx="10"
                animate={{ fill: bodyColor }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Hood */}
              <motion.polygon 
                points="480,120 500,140 500,180 480,200" 
                fill={bodyColor} 
                opacity="0.9"
                animate={{ fill: bodyColor }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Windshield */}
              <polygon points="300,120 350,80 420,80 450,120" fill={interior} opacity="0.3" />
              
              {/* Roof */}
              <motion.rect 
                x="300" 
                y="80" 
                width="150" 
                height="40" 
                fill={interior} 
                opacity="0.6" 
                rx="5"
                animate={{ fill: interior }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Wheels */}
              <motion.g animate={{ rotate: wheelStyle === 'sport' ? 0 : wheelStyle === 'carbon' ? 45 : 90 }}>
                <circle cx="200" cy="200" r="40" fill="#1A1A1A" stroke={bodyColor} strokeWidth="3" />
                <circle cx="200" cy="200" r="25" fill={wheelStyle === 'sport' ? '#E4FF1A' : wheelStyle === 'carbon' ? '#1A1A1A' : '#F2C94C'} />
                {wheelStyle === 'sport' && (
                  <>
                    <line x1="200" y1="175" x2="200" y2="225" stroke="#1A1A1A" strokeWidth="2" />
                    <line x1="175" y1="200" x2="225" y2="200" stroke="#1A1A1A" strokeWidth="2" />
                  </>
                )}
              </motion.g>
              
              <motion.g animate={{ rotate: wheelStyle === 'sport' ? 0 : wheelStyle === 'carbon' ? 45 : 90 }}>
                <circle cx="420" cy="200" r="40" fill="#1A1A1A" stroke={bodyColor} strokeWidth="3" />
                <circle cx="420" cy="200" r="25" fill={wheelStyle === 'sport' ? '#E4FF1A' : wheelStyle === 'carbon' ? '#1A1A1A' : '#F2C94C'} />
                {wheelStyle === 'sport' && (
                  <>
                    <line x1="420" y1="175" x2="420" y2="225" stroke="#1A1A1A" strokeWidth="2" />
                    <line x1="395" y1="200" x2="445" y2="200" stroke="#1A1A1A" strokeWidth="2" />
                  </>
                )}
              </motion.g>
              
              {/* Headlights with animation */}
              <motion.circle 
                cx="490" 
                cy="150" 
                r="8" 
                fill={getLightingColor()}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle 
                cx="490" 
                cy="170" 
                r="8" 
                fill={getLightingColor()}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Spoiler */}
              <motion.rect 
                x="80" 
                y="100" 
                width="30" 
                height="5" 
                fill={bodyColor}
                animate={{ fill: bodyColor }}
                transition={{ duration: 0.5 }}
              />
              <motion.rect 
                x="85" 
                y="95" 
                width="20" 
                height="5" 
                fill={bodyColor}
                animate={{ fill: bodyColor }}
                transition={{ duration: 0.5 }}
              />
            </motion.svg>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Body Color */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-[#E4FF1A]" />
                <h3 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Unbounded' }}>
                  Body Color
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {bodyColors.map((color) => (
                  <button
                    key={color.value}
                    data-testid={`body-color-${color.name.toLowerCase().replace(/\\s+/g, '-')}`}
                    onClick={() => setBodyColor(color.value)}
                    className={`relative w-14 h-14 rounded-xl transition-all duration-300 ${
                      bodyColor === color.value ? 'ring-2 ring-[#E4FF1A] ring-offset-2 ring-offset-[#050505] scale-110' : ''
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {bodyColor === color.value && (
                      <div className="absolute inset-0 rounded-xl" style={{
                        boxShadow: `0 0 20px ${color.value}80`
                      }}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wheel Style */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Disc className="w-5 h-5 text-[#E4FF1A]" />
                <h3 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Unbounded' }}>
                  Wheel Style
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {wheelStyles.map((style) => (
                  <button
                    key={style.value}
                    data-testid={`wheel-style-${style.value}`}
                    onClick={() => setWheelStyle(style.value)}
                    className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                      wheelStyle === style.value 
                        ? 'border-[#E4FF1A] bg-[#E4FF1A]/10 text-[#E4FF1A]' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-sm font-bold uppercase tracking-wider">{style.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interior */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sofa className="w-5 h-5 text-[#E4FF1A]" />
                <h3 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Unbounded' }}>
                  Interior
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {interiorColors.map((color) => (
                  <button
                    key={color.value}
                    data-testid={`interior-color-${color.name.toLowerCase()}`}
                    onClick={() => setInterior(color.value)}
                    className={`relative w-14 h-14 rounded-xl transition-all duration-300 ${
                      interior === color.value ? 'ring-2 ring-[#E4FF1A] ring-offset-2 ring-offset-[#050505] scale-110' : ''
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {interior === color.value && (
                      <div className="absolute inset-0 rounded-xl" style={{
                        boxShadow: `0 0 20px ${color.value}80`
                      }}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Mode */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-[#E4FF1A]" />
                <h3 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Unbounded' }}>
                  Lighting Mode
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {lightingModes.map((mode) => (
                  <button
                    key={mode.value}
                    data-testid={`lighting-mode-${mode.value}`}
                    onClick={() => setLighting(mode.value)}
                    className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                      lighting === mode.value 
                        ? 'border-[#E4FF1A] bg-[#E4FF1A]/10 text-[#E4FF1A]' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-sm font-bold uppercase tracking-wider">{mode.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Configuration */}
            <button
              data-testid="save-configuration-btn"
              className="w-full py-4 bg-[#E4FF1A] text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(228,255,26,0.5)]"
              style={{ fontFamily: 'Outfit' }}
            >
              Save Configuration
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizerSection;
