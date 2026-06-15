import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Palette, Disc, Sofa, Lightbulb } from 'lucide-react';
import * as THREE from 'three';

// 3D Car Component that updates based on customization
const CustomizableCar = ({ bodyColor, wheelStyle, interior, lighting }) => {
  const carRef = useRef();

  useFrame((state) => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.003;
    }
  });

  const wheelColors = {
    sport: '#E4FF1A',
    carbon: '#1A1A1A',
    luxury: '#F2C94C'
  };

  const lightingColors = {
    gold: '#F2C94C',
    green: '#00FF66',
    ice_blue: '#00F0FF'
  };

  return (
    <group ref={carRef} position={[0, 0, 0]}>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[4, 0.8, 1.8]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Hood */}
      <mesh position={[1.5, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[1.5, 0.4, 1.6]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* Roof/Interior */}
      <mesh position={[-0.5, 1, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 1.5]} />
        <meshPhysicalMaterial
          color={interior}
          metalness={0.5}
          roughness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Spoiler */}
      <mesh position={[-2.2, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 1.8]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wheels */}
      {[-1.3, 1.3].map((x, i) => (
        <React.Fragment key={i}>
          {[0.95, -0.95].map((z, j) => (
            <group key={j} position={[x, 0, z]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.3} />
              </mesh>
              {/* Rim */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.25, 0.25, 0.32, wheelStyle === 'sport' ? 6 : wheelStyle === 'carbon' ? 8 : 5]} />
                <meshStandardMaterial
                  color={wheelColors[wheelStyle]}
                  metalness={1}
                  roughness={0.2}
                />
              </mesh>
            </group>
          ))}
        </React.Fragment>
      ))}

      {/* Headlights with customizable color */}
      {[0.5, -0.5].map((z, i) => (
        <pointLight
          key={i}
          position={[2.2, 0.5, z]}
          intensity={2}
          distance={5}
          color={lightingColors[lighting]}
        />
      ))}
    </group>
  );
};

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
    { name: 'Gold', value: 'gold' },
    { name: 'Green', value: 'green' },
    { name: 'Ice Blue', value: 'ice_blue' }
  ];

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
            Customize Your
            <br />
            <span className="text-[#E4FF1A] glow-yellow">Dream Machine</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            Personalize every detail of your supercar. Choose colors, wheels, interior, and lighting to match your style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 3D Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-2xl p-4 h-[500px]"
          >
            {/* runtime toggle to disable 3D for debugging: set localStorage.enable3d = 'false' */}
            {typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('enable3d') === 'false' ? null : (
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[6, 2, 6]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.3}
                  penumbra={1}
                  intensity={2}
                  castShadow
                />
                <pointLight position={[0, 5, 0]} intensity={0.5} />

                {/* Contact shadows for grounding */}
                <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.5, 0]} opacity={0.8} width={6} blur={2} far={1.5} />
                {/* Environment */}
                <Environment preset="night" />

                {/* Customizable Car */}
                <CustomizableCar
                  bodyColor={bodyColor}
                  wheelStyle={wheelStyle}
                  interior={interior}
                  lighting={lighting}
                />

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="#0A0A0A" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Controls */}
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minDistance={4}
                  maxDistance={10}
                  autoRotate={false}
                />
              </Canvas>
            )}
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
                    data-testid={`body-color-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setBodyColor(color.value)}
                    className={`relative w-14 h-14 rounded-xl transition-all duration-300 ${bodyColor === color.value ? 'ring-2 ring-[#E4FF1A] ring-offset-2 ring-offset-[#050505] scale-110' : ''
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
                    className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 ${wheelStyle === style.value
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
                    className={`relative w-14 h-14 rounded-xl transition-all duration-300 ${interior === color.value ? 'ring-2 ring-[#E4FF1A] ring-offset-2 ring-offset-[#050505] scale-110' : ''
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
                    className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 ${lighting === mode.value
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
              onClick={() => {
                const cfg = { bodyColor, wheelStyle, interior, lighting };
                try {
                  localStorage.setItem('draftly.customizer', JSON.stringify(cfg));
                  toast.success('Configuration saved locally');
                } catch (e) {
                  toast.error('Failed to save configuration');
                }
              }}
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