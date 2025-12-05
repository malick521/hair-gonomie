import React from 'react';
import { motion } from 'framer-motion';

const TradingBackground = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 30%, #1a1a1a 70%, #0a0a0a 100%)',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* 1. La Grille (Grid Overlay) - Très subtile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
        }}
      />

      {/* 2. Les Orbes Lumineux Roses - Animations ultra-fluides et subtiles */}
      
      {/* Orbe Rose Principal - Haut gauche */}
      <motion.div
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(150px)',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.2) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, 80, -50, 40, 0],
          y: [0, -60, 50, -30, 0],
          scale: [1, 1.2, 0.9, 1.15, 1],
          opacity: [0.25, 0.35, 0.28, 0.32, 0.25],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />

      {/* Orbe Rose Foncé - Bas droite */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(160px)',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.35) 0%, rgba(190, 24, 93, 0.18) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, -90, 60, -50, 0],
          y: [0, 70, -55, 40, 0],
          scale: [1, 0.85, 1.25, 0.9, 1],
          opacity: [0.22, 0.32, 0.26, 0.3, 0.22],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 4,
        }}
      />

      {/* Orbe Rose Clair - Centre */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '800px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(170px)',
          background: 'radial-gradient(circle, rgba(251, 113, 133, 0.3) 0%, rgba(236, 72, 153, 0.15) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          opacity: [0.18, 0.28, 0.22, 0.26, 0.18],
          scale: [1, 1.15, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 2,
        }}
      />

      {/* Orbe Rose Subtile - Milieu gauche */}
      <motion.div
        style={{
          position: 'absolute',
          top: '55%',
          left: '2%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(130px)',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, rgba(236, 72, 153, 0.12) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, 45, -30, 25, 0],
          y: [0, -35, 30, -20, 0],
          opacity: [0.15, 0.25, 0.2, 0.23, 0.15],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 6,
        }}
      />

      {/* Orbe Rose Subtile - Haut droite */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(135px)',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, rgba(219, 39, 119, 0.11) 35%, rgba(0,0,0,0) 65%)',
        }}
        animate={{
          x: [0, -50, 35, -25, 0],
          y: [0, 40, -30, 25, 0],
          opacity: [0.14, 0.24, 0.18, 0.22, 0.14],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 8,
        }}
      />

      {/* Overlay de profondeur supplémentaire */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(219, 39, 119, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(251, 113, 133, 0.04) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default TradingBackground;

