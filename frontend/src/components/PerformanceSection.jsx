import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Gauge, Zap, Timer, Cog } from 'lucide-react';
import { useScroll } from '@/lib/ScrollContext';

const performanceData = [
  {
    icon: Gauge,
    label: 'Top Speed',
    value: 350,
    suffix: ' km/h',
    color: '#E4FF1A'
  },
  {
    icon: Zap,
    label: 'Horsepower',
    value: 1001,
    suffix: ' HP',
    color: '#00FF66'
  },
  {
    icon: Timer,
    label: '0-100 km/h',
    value: 2.5,
    suffix: 's',
    decimals: 1,
    color: '#F2C94C'
  },
  {
    icon: Cog,
    label: 'Cylinders',
    value: 12,
    suffix: '',
    color: '#00F0FF'
  }
];

const PerformanceCard = ({ data, index, animate }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`performance-card-${data.label.toLowerCase().replace(/\s+/g, '-')}`}
      className="glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-white/30 transition-all duration-300"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${data.color}10 0%, transparent 70%)`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${data.color}20`,
              boxShadow: `0 0 20px ${data.color}30`
            }}
          >
            <Icon
              className="w-8 h-8"
              style={{ color: data.color }}
            />
          </div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <div
            className="text-5xl font-black tracking-tighter"
            style={{
              fontFamily: 'Unbounded',
              color: data.color,
              textShadow: `0 0 30px ${data.color}80`
            }}
          >
            {animate ? (
              <CountUp
                end={data.value}
                duration={2.5}
                decimals={data.decimals || 0}
                suffix={data.suffix}
              />
            ) : (
              <span>0{data.suffix}</span>
            )}
          </div>
        </div>

        {/* Label */}
        <div className="text-sm uppercase tracking-[0.2em] text-white/70" style={{ fontFamily: 'Outfit' }}>
          {data.label}
        </div>
      </div>

      {/* Circular gauge background */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={data.color}
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>
      </div>
    </motion.div>
  );
};

const PerformanceSection = () => {
  const { section } = useScroll();
  const animate = section >= 2; // performance is the 3rd section (index 2)
  return (
    <section className="relative min-h-screen py-20 px-6 lg:px-12 bg-[#0A0A0A]" id="performance">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0A] to-[#050505]"></div>
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '300px',
                height: '300px',
                background: `radial-gradient(circle, ${i === 0 ? '#E4FF1A' : i === 1 ? '#00FF66' : '#F2C94C'}10 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 10}%`,
                filter: 'blur(60px)'
              }}
              animate={{
                y: [0, 50, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
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
            Engineering Excellence
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            Unleash the
            <br />
            <span className="text-[#00FF66] glow-green">Power</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            Experience unprecedented performance metrics that redefine what's possible in automotive engineering.
          </p>
        </motion.div>

        {/* Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((data, index) => (
            <PerformanceCard key={index} data={data} index={index} animate={animate} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass-panel rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Unbounded' }}>
                V12 Hybrid Powerhouse
              </h3>
              <p className="text-white/70 leading-relaxed mb-6" style={{ fontFamily: 'Manrope' }}>
                Combining the raw power of a naturally aspirated V12 engine with cutting-edge hybrid technology,
                delivering an unprecedented 1001 horsepower. Experience the perfect harmony of tradition and innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-[#E4FF1A]/10 border border-[#E4FF1A]/30 rounded-full">
                  <span className="text-[#E4FF1A] font-bold uppercase text-sm tracking-wider">Hybrid Technology</span>
                </div>
                <div className="px-6 py-3 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-full">
                  <span className="text-[#00FF66] font-bold uppercase text-sm tracking-wider">All-Wheel Drive</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
                alt="Engine"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;