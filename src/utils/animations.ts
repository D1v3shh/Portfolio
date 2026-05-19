import type { Variants } from 'framer-motion';

// Performance-optimized animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -60,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const scaleInRotate: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5,
    rotate: -180,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.3
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      duration: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const staggerItemScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },
  hover: { 
    scale: 1.03, 
    y: -12,
    rotateX: 5,
    rotateY: 5,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const buttonHover = {
  rest: { 
    scale: 1,
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatingAnimationSlow = {
  animate: {
    y: [0, -30, 0],
    x: [0, 10, 0, -10, 0],
    rotate: [0, 3, 0, -3, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const glowAnimation = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.3)',
      '0 0 40px rgba(147, 51, 234, 0.5)',
      '0 0 20px rgba(59, 130, 246, 0.3)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const slideInFromLeft: Variants = {
  hidden: { 
    x: -100, 
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const slideInFromRight: Variants = {
  hidden: { 
    x: 100, 
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const bounceIn: Variants = {
  hidden: { 
    scale: 0,
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 15,
      duration: 0.6
    }
  }
};

export const rotateIn: Variants = {
  hidden: { 
    rotate: -180,
    scale: 0,
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Smooth scroll utility
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Viewport animation settings
export const viewportSettings = {
  once: true,
  margin: "-50px",
  amount: 0.05 as const
};

export const viewportSettingsRepeat = {
  once: false,
  margin: "-50px",
  amount: 0.2 as const
};

// Performance-optimized transition settings
export const fastTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1] as const
};

export const mediumTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as const
};

export const slowTransition = {
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1] as const
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};