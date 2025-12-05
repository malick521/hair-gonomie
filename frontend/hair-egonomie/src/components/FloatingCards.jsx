import { motion } from 'framer-motion';

const FloatingCards = () => {
  // Configuration des cartes roses élégantes et innovantes
  const cards = [
    {
      id: 1,
      width: 320,
      height: 200,
      x: '8%',
      y: '12%',
      rotation: -12,
      delay: 0,
      depth: 1,
    },
    {
      id: 2,
      width: 280,
      height: 180,
      x: '75%',
      y: '20%',
      rotation: 18,
      delay: 0.4,
      depth: 2,
    },
    {
      id: 3,
      width: 240,
      height: 160,
      x: '52%',
      y: '58%',
      rotation: -8,
      delay: 0.8,
      depth: 3,
    },
    {
      id: 4,
      width: 300,
      height: 190,
      x: '18%',
      y: '68%',
      rotation: 22,
      delay: 1.2,
      depth: 4,
    },
    {
      id: 5,
      width: 260,
      height: 170,
      x: '78%',
      y: '72%',
      rotation: -15,
      delay: 1.6,
      depth: 5,
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {cards.map((card) => {
        const baseOpacity = 0.08 - (card.depth - 1) * 0.015;
        const borderOpacity = 0.25 - (card.depth - 1) * 0.03;
        
        return (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
              scale: 0.85,
              x: `${parseFloat(card.x)}%`,
              y: `${parseFloat(card.y) + 120}%`,
              rotate: card.rotation,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: [baseOpacity * 0.8, baseOpacity * 1.3, baseOpacity * 0.8],
              scale: [0.98, 1.02, 0.98],
              x: `${parseFloat(card.x)}%`,
              y: `${parseFloat(card.y)}%`,
              rotate: card.rotation + [0, 2, -2, 0],
            }}
            transition={{
              opacity: {
                duration: 5 + card.id * 0.8,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              },
              scale: {
                duration: 6 + card.id * 0.5,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              },
              x: {
                duration: 25 + card.id * 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: [0.4, 0, 0.6, 1],
              },
              y: {
                duration: 20 + card.id * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: [0.4, 0, 0.6, 1],
              },
              rotate: {
                duration: 12 + card.id * 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: [0.4, 0, 0.6, 1],
              },
              filter: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              },
              delay: card.delay,
            }}
            style={{
              position: 'absolute',
              width: `${card.width}px`,
              height: `${card.height}px`,
              background: `linear-gradient(135deg, 
                rgba(236, 72, 153, ${baseOpacity}) 0%, 
                rgba(219, 39, 119, ${baseOpacity * 0.8}) 50%,
                rgba(236, 72, 153, ${baseOpacity}) 100%)`,
              border: `1px solid rgba(236, 72, 153, ${borderOpacity})`,
              borderRadius: '32px',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: `
                0 8px 32px rgba(236, 72, 153, ${baseOpacity * 2}),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Effet de brillance interne */}
            <motion.div
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + card.id,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingCards;
