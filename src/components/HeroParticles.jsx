// src/components/HeroParticles.jsx
import React from 'react';

const HeroParticles = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {/* Rotating golden ring (like the torus knot) */}
      <div style={{
        position: 'absolute',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        border: '3px solid rgba(212, 175, 55, 0.3)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'spin 20s linear infinite',
      }} />
      
      {/* Inner rotating ring */}
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        border: '2px solid rgba(212, 175, 55, 0.2)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'spinReverse 15s linear infinite',
      }} />

      {/* Floating particles (circles) */}
      {[...Array(30)].map((_, i) => {
        const size = 4 + Math.random() * 8;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 12;
        const opacity = 0.2 + Math.random() * 0.4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size + 'px',
              height: size + 'px',
              borderRadius: '50%',
              background: `rgba(212, 175, 55, ${opacity})`,
              top: y + '%',
              left: x + '%',
              animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`,
              boxShadow: `0 0 ${size * 2}px rgba(212, 175, 55, 0.2)`,
            }}
          />
        );
      })}

      {/* Additional glowing orb (like the cake slice shape) */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.10) 0%, transparent 70%)',
        bottom: '-50px',
        right: '-50px',
        animation: 'pulseGlow 6s ease-in-out infinite alternate',
      }} />

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes floatParticle {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -40px) scale(1.3); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default HeroParticles;