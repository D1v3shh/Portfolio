import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Stagger children animation wrapper
interface StaggerWrapperProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerWrapper = ({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const StaggerItem = ({ 
  children, 
  className = '',
  direction = 'up' 
}: StaggerItemProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 30 };
      case 'down': return { y: -30 };
      case 'left': return { x: 30 };
      case 'right': return { x: -30 };
      default: return { y: 30 };
    }
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          ...getInitialPosition() 
        },
        visible: { 
          opacity: 1, 
          y: 0,
          x: 0,
          transition: { 
            duration: 0.5, 
            ease: [0.25, 0.1, 0.25, 1] 
          } 
        },
      }}
    >
      {children}
    </motion.div>
  );
};
