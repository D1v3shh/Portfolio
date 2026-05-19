import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient' | 'premium';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  onClick,
  variant = 'default',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !hover) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXPos = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPos = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20';
      case 'gradient':
        return 'bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-800/5 dark:to-gray-800/10 backdrop-blur-sm border border-white/10 dark:border-gray-700/10';
      case 'premium':
        return 'bg-white/5 dark:bg-gray-800/5 backdrop-blur-xl border border-white/10 dark:border-gray-700/10 shadow-2xl';
      default:
        return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
    }
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const baseClasses = `${getVariantClasses()} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${clickableClasses} ${className}`;

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${baseClasses}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX: hover ? rotateX : 0,
        rotateY: hover ? rotateY : 0,
      }}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Animated gradient border on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.15), transparent, rgba(147, 51, 234, 0.15), transparent)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}

      {/* Glow effect on hover */}
      {hover && variant !== 'default' && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 pointer-events-none blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Spotlight effect following mouse */}
      {hover && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(mouseX.get() + 1) * 50}% ${(mouseY.get() + 1) * 50}%, rgba(59, 130, 246, 0.15), transparent 50%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Shimmer effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['-200% 0%', '200% 0%'] : '-200% 0%',
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Content with 3D transform */}
      <div 
        className="relative z-10"
        style={{
          transform: hover ? 'translateZ(20px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        {children}
      </div>

      {/* Corner accents */}
      {hover && variant === 'premium' && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
};