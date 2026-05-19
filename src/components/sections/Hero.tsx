import { motion } from 'framer-motion';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { AnimatedBackground } from '../AnimatedBackground';
import { usePortfolio } from '../../hooks';
import { staggerContainer, staggerItem } from '../../utils/animations';
import avatarImg from '../../assets/images/Divesh.png';

// Social media icons (you can replace these with actual icon components)
const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const PortfolioIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9 9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
  </svg>
);

export const Hero = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  const { personalInfo, skills } = data;

  // Extract AWS and AI skills for badges
  const awsSkills = skills.cloudAndDevOps?.filter((skill: string) => 
    skill.toLowerCase().includes('aws') || 
    skill.toLowerCase().includes('lambda') ||
    skill.toLowerCase().includes('s3') ||
    skill.toLowerCase().includes('ec2')
  ).slice(0, 3) || [];

  const aiSkills = ['AI/ML', 'AWS Bedrock', 'Serverless'];

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.github || '#',
      icon: <GitHubIcon />,
    },
    {
      name: 'LinkedIn', 
      url: personalInfo.linkedin || '#',
      icon: <LinkedInIcon />,
    },
    {
      name: 'Portfolio',
      url: personalInfo.portfolio || '#',
      icon: <PortfolioIcon />,
    },
  ];

  return (
    <AnimatedBackground variant="hero" className="min-h-screen flex items-center justify-center">
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Greeting */}
              <motion.span
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                👋 Hello, I'm
              </motion.span>

              {/* Name with Chrome Gradient */}
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <span className="gradient-text">
                  {personalInfo.name}
                </span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-semibold mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                {personalInfo.title}
              </motion.h2>

              {/* Bio */}
              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                {personalInfo.bio}
              </motion.p>

              {/* Skill Badges */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              >
                {[...awsSkills, ...aiSkills].map((skill) => (
                  <motion.div
                    key={skill}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant={skill.toLowerCase().includes('aws') ? 'primary' : 'secondary'}
                      className="glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex gap-4 justify-center lg:justify-start mb-8"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    variants={staggerItem}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="glass-effect backdrop-blur-md bg-blue-600/90 hover:bg-blue-700/90 border border-blue-500/30"
                  onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30"
                  href={personalInfo.resume}
                  target="_blank"
                >
                  View Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Avatar */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Avatar Container with Glassmorphism */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]">
                  {/* Glowing Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full blur-2xl opacity-30"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Avatar Frame */}
                  <motion.div
                    className="relative glass-effect backdrop-blur-md bg-white/10 dark:bg-gray-800/10 border-2 border-white/20 dark:border-gray-700/20 rounded-full p-4 w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Avatar Image */}
                    <img
                      src={avatarImg}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover rounded-full shadow-2xl"
                    />
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-full p-3"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <span className="text-2xl">☁️</span>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-full p-3"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <span className="text-2xl">🤖</span>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-8 glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-full p-2"
                    animate={{
                      x: [0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    <span className="text-xl">⚡</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <motion.div
            className="glass-effect backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-full p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </AnimatedBackground>
  );
};