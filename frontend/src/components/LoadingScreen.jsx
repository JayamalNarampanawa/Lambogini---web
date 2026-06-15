import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-[#E4FF1A]" style={{ fontFamily: 'Unbounded' }}>
            DRAFTLY
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60 mt-2" style={{ fontFamily: 'Outfit' }}>
            Supercar Experience
          </p>
        </motion.div>

        {/* Speedometer Style Loader */}
        <div className="relative w-64 h-64">
          {/* Outer ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E4FF1A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={283}
              strokeDashoffset={283 - (283 * progress) / 100}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(228, 255, 26, 0.6))'
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl font-black text-[#E4FF1A] glow-yellow"
              style={{ fontFamily: 'Unbounded' }}
            >
              {progress}%
            </motion.div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60 mt-2">
              Loading Experience
            </div>
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex gap-2"
        >
          <div className="w-2 h-2 bg-[#E4FF1A] rounded-full"></div>
          <div className="w-2 h-2 bg-[#E4FF1A] rounded-full animation-delay-200"></div>
          <div className="w-2 h-2 bg-[#E4FF1A] rounded-full animation-delay-400"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;