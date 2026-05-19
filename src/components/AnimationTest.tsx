import { motion } from 'framer-motion';

/**
 * Simple test component to verify animations are working
 * Add this to your App.tsx temporarily to test
 */
export const AnimationTest = () => {
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Animation Test</h3>
      
      {/* Test 1: CSS Animation */}
      <div className="mb-4">
        <p className="text-sm mb-2">CSS Float Animation:</p>
        <div className="w-12 h-12 bg-blue-500 rounded-full animate-float"></div>
      </div>

      {/* Test 2: Framer Motion */}
      <div className="mb-4">
        <p className="text-sm mb-2">Framer Motion:</p>
        <motion.div
          className="w-12 h-12 bg-purple-500 rounded-full"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Test 3: Gradient Text */}
      <div className="mb-4">
        <p className="text-sm mb-2">Gradient Text:</p>
        <h4 className="gradient-text text-2xl font-bold">Animated</h4>
      </div>

      {/* Test 4: Hover Effect */}
      <div className="mb-4">
        <p className="text-sm mb-2">Hover Effect:</p>
        <motion.button
          className="px-4 py-2 bg-green-500 text-white rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Hover Me
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        ✅ If you see animations above, everything is working!
      </p>
    </div>
  );
};
