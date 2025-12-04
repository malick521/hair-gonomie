import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { pulse, fadeInOut } from '../animations/variants';

const SplashScreen = ({ next }) => {
  useEffect(() => {
    // Déclencher la transition après 2 secondes
    const timer = setTimeout(() => {
      next();
    }, 2000);

    return () => clearTimeout(timer);
  }, [next]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <motion.div
        variants={pulse}
        animate="animate"
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center'
        }}
      >
        Hair-Gonomie
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          fontSize: '1.2rem',
          opacity: 0.9
        }}
      >
        Parcours guidé progressif
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;

