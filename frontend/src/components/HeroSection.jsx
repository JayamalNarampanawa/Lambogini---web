import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Car Model Component (Placeholder using primitives)
const CarModel = ({ color = '#E4FF1A' }) => {
  const carRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (carRef.current) {
      // Slow auto-rotation
      carRef.current.rotation.y += 0.002;
      
      // Floating animation
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        ref={carRef} 
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* Car Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[4, 0.8, 1.8]} />
          <meshPhysicalMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </mesh>
        
        {/* Hood */}
        <mesh position={[1.5, 0.7, 0]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[1.5, 0.4, 1.6]} />
          <meshPhysicalMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Roof */}
        <mesh position={[-0.5, 1, 0]} castShadow>
          <boxGeometry args={[2, 0.6, 1.5]} />
          <meshPhysicalMaterial 
            color="#000000"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        
        {/* Spoiler */}
        <mesh position={[-2.2, 1.2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 1.8]} />
          <meshPhysicalMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
          />
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
                  <cylinderGeometry args={[0.25, 0.25, 0.32, 6]} />
                  <meshStandardMaterial color="#E4FF1A" metalness={1} roughness={0.2} />
                </mesh>
              </group>
            ))}
          </React.Fragment>
        ))}
        
        {/* Headlights */}
        {[2, -2].map((x, i) => (
          <pointLight 
            key={i}
            position={[2.2, 0.5, x * 0.5]} 
            intensity={2} 
            distance={5} 
            color="#E4FF1A"
          />
        ))}
      </group>
    </Float>
  );
};

// Ground with grid
const Ground = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Grid lines */}
      <gridHelper args={[50, 50, '#E4FF1A', '#1A1A1A']} position={[0, -0.49, 0]} />
    </>
  );
};

// Particles
const Particles = () => {
  return (
    <>
      <Sparkles count={100} scale={20} size={2} speed={0.3} color="#E4FF1A" opacity={0.3} />
      <Sparkles count={50} scale={15} size={3} speed={0.2} color="#00FF66" opacity={0.2} />
    </>
  );
};

const HeroSection = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden" id="hero">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[8, 3, 8]} fov={50} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
            color="#E4FF1A"
          />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            color="#00FF66"
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#E4FF1A" />
          
          {/* Fog */}
          <fog attach="fog" args={['#050505', 10, 30]} />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Scene Elements */}
          <CarModel />
          <Ground />
          <Particles />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
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
              An immersive 3D supercar showroom built for speed, luxury, and precision.
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
              <span className="relative z-10">Explore 3D Showroom</span>
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