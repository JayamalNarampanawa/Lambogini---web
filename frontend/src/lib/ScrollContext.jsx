import React, { createContext, useContext, useEffect, useState } from 'react';

const ScrollContext = createContext({ progress: 0, section: 0 });

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const handler = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const val = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(Math.max(val, 0), 1));

      // simple section mapping (0..5) to cover Hero, Models, Performance, Customizer, Gallery, Booking
      const secs = 6;
      const sec = Math.min(Math.floor(val * secs), secs - 1);
      setSection(sec);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <ScrollContext.Provider value={{ progress, section }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;
