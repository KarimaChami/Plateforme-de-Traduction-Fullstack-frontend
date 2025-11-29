"use client";

import React, { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles ONLY on client (after hydration)
    const generated = [...Array(50)].map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 5,
    }));

    setParticles(generated);
  }, []);

  return (
   <div className="fixed inset-0 -z-10 overflow-hidden">
  {/* Dégradé subtil */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-900/10 to-gray-50 opacity-50 animate-gradient-bg"></div>

  {/* Particules */}
  <div className="absolute inset-0">
    {particles.map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-red-900/30 animate-pulse"
        style={{
          width: `${p.width}px`,
          height: `${p.height}px`,
          top: `${p.top}%`,
          left: `${p.left}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          filter: 'blur(1px)', // effet flou subtil pour pro
        }}
      ></div>
    ))}
  </div>
</div>
  );
};

export default AnimatedBackground;
