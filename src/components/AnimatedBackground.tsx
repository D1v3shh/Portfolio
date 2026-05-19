import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'hero' | 'dark' | 'gradient';
  children: React.ReactNode;
  className?: string;
}

export const AnimatedBackground = ({ 
  variant = 'default', 
  children, 
  className = '' 
}: AnimatedBackgroundProps) => {
  const getBackgroundConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          background: 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900',
          blobs: [
            { color: 'bg-blue-400/20 dark:bg-blue-500/30', size: 384, position: { top: '-12rem', right: '-12rem' }, duration: 25 },
            { color: 'bg-purple-400/20 dark:bg-purple-500/30', size: 320, position: { bottom: '-10rem', left: '-10rem' }, duration: 30 },
            { color: 'bg-pink-400/15 dark:bg-pink-500/25', size: 256, position: { top: '33%', left: '25%' }, duration: 35 },
            { color: 'bg-cyan-400/10 dark:bg-cyan-500/20', size: 288, position: { bottom: '33%', right: '33%' }, duration: 28 },
          ]
        };
      case 'dark':
        return {
          background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
          blobs: [
            { color: 'bg-blue-500/10', size: 320, position: { top: '25%', left: '-10rem' }, duration: 22 },
            { color: 'bg-purple-500/10', size: 384, position: { bottom: '25%', right: '-10rem' }, duration: 28 },
            { color: 'bg-cyan-500/8', size: 288, position: { top: '50%', right: '25%' }, duration: 32 },
            { color: 'bg-pink-500/8', size: 256, position: { bottom: '50%', left: '33%' }, duration: 26 },
          ]
        };
      case 'gradient':
        return {
          background: 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20',
          blobs: [
            { color: 'bg-gradient-to-r from-blue-600/15 to-cyan-600/15', size: 352, position: { top: '-11rem', right: '-11rem' }, duration: 30 },
            { color: 'bg-gradient-to-r from-purple-600/15 to-pink-600/15', size: 304, position: { bottom: '-9.5rem', left: '-9.5rem' }, duration: 35 },
            { color: 'bg-gradient-to-r from-cyan-600/10 to-blue-600/10', size: 256, position: { top: '50%', left: '50%' }, duration: 25 },
          ]
        };
      default:
        return {
          background: 'bg-gray-50 dark:bg-gray-900',
          blobs: [
            { color: 'bg-blue-500/8', size: 256, position: { top: '25%', right: '-8rem' }, duration: 24 },
            { color: 'bg-purple-500/8', size: 256, position: { bottom: '25%', left: '-8rem' }, duration: 28 },
            { color: 'bg-pink-500/6', size: 224, position: { top: '50%', left: '50%' }, duration: 32 },
          ]
        };
    }
  };

  const config = getBackgroundConfig();

  return (
    <div className={`relative overflow-hidden ${config.background} ${className}`}>
      {/* Animated Gradient Blobs with Enhanced Movement */}
      <div className="absolute inset-0 overflow-hidden">
        {config.blobs.map((blob, index) => (
          <motion.div
            key={`blob-${index}`}
            className={`absolute ${blob.color} rounded-full`}
            style={{
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              filter: 'blur(80px)',
              ...blob.position
            }}
            animate={{
              x: [0, 50, -50, 30, -30, 0],
              y: [0, -50, 50, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, index) => {
          const size = 20 + Math.random() * 40;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const color = index % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' :
                       index % 3 === 1 ? 'rgba(147, 51, 234, 0.3)' :
                       'rgba(236, 72, 153, 0.3)';
          
          return (
            <motion.div
              key={`orb-${index}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `radial-gradient(circle, ${color}, transparent)`,
                filter: 'blur(20px)',
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
            />
          );
        })}
      </div>

      {/* Floating Particles with Varied Sizes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, index) => {
          const size = index % 3 === 0 ? 12 : index % 3 === 1 ? 8 : 4;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          return (
            <motion.div
              key={`particle-${index}`}
              className="absolute bg-white/20 dark:bg-white/10 rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -200, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 12,
              }}
            />
          );
        })}
      </div>

      {/* Animated Grid Pattern Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Radial Gradient Overlay for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
        }}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-200% 0%', '200% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};