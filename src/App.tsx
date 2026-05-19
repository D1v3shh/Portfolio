import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { LoadingSpinner, AnimatedBackground, PageTransition } from './components';
import { Hero, About, Experience, Skills, Projects, Footer } from './components/sections';
import { usePortfolio } from './hooks';
function App() {
  const { loading, error } = usePortfolio();

  // Add smooth scrolling behavior
  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Log to console to verify app is loading
    console.log('🎨 Portfolio App Loaded');
    console.log('📊 Loading state:', loading);
    console.log('❌ Error state:', error);
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [loading, error]);

  if (loading) {
    return (
      <Layout>
        <AnimatedBackground variant="default">
          <div className="flex items-center justify-center min-h-screen">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Loading portfolio...
              </motion.p>
            </motion.div>
          </div>
        </AnimatedBackground>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <AnimatedBackground variant="dark">
          <div className="flex items-center justify-center min-h-screen">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.h1 
                className="text-2xl font-bold text-red-600 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Error
              </motion.h1>
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {error}
              </motion.p>
            </motion.div>
          </div>
        </AnimatedBackground>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Page Transition Container with Smooth Animations */}
      <PageTransition>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Footer />
        </motion.div>
      </PageTransition>
    </Layout>
  );
}

export default App;