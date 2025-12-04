import { motion } from 'framer-motion';
import { fadeInOut } from '../animations/variants';

const AnimatedWrapper = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut}
      className={className}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;

