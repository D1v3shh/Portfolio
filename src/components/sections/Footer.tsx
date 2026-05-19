import { motion } from 'framer-motion';
import { 
  Mail, 
  Download, 
  ExternalLink, 
  Copy, 
  Check,
  MapPin,
  Phone,
  Heart,
  ArrowUp
} from 'lucide-react';
import { useState } from 'react';
import { AnimatedBackground } from '../AnimatedBackground';
import { ScrollReveal } from '../ScrollReveal';
import { usePortfolio } from '../../hooks';
import { 
  staggerContainer, 
  staggerItem, 
  viewportSettings 
} from '../../utils/animations';

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    portfolio: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9 9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
      </svg>
    ),
  };
  
  return icons[platform as keyof typeof icons] || icons.portfolio;
};

export const Footer = () => {
  const { data, loading } = usePortfolio();
  const [emailCopied, setEmailCopied] = useState(false);

  if (loading || !data) {
    return (
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const { personalInfo } = data;

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin || '#',
      platform: 'linkedin',
    },
    {
      name: 'GitHub',
      url: personalInfo.github || '#',
      platform: 'github',
    },
    {
      name: 'Portfolio',
      url: personalInfo.portfolio || '#',
      platform: 'portfolio',
    },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatedBackground variant="dark">
      <footer id="footer" className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="py-16"
          >
            {/* Main Footer Content */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
            >
              
              {/* Column 1: Branding & Contact */}
              <ScrollReveal direction="left" className="space-y-6">
                {/* Chrome Gradient Branding */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                      {personalInfo.name}
                    </span>
                  </h3>
                  <p className="text-gray-400 text-lg font-medium">
                    {personalInfo.title}
                  </p>
                  <p className="text-gray-500 leading-relaxed break-words hyphens-none">
                    Building innovative cloud solutions and AI-powered applications with modern technologies.
                  </p>
                </div>

                {/* Contact Info */}
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  <motion.div 
                    variants={staggerItem}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words hyphens-none">{personalInfo.location}</span>
                  </motion.div>
                  {personalInfo.phone && (
                    <motion.div 
                      variants={staggerItem}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="break-words hyphens-none">{personalInfo.phone}</span>
                    </motion.div>
                  )}
                </motion.div>
              </ScrollReveal>

              {/* Column 2: Quick Actions */}
              <ScrollReveal direction="up" delay={0.2} className="space-y-6">
                <h4 className="text-xl font-semibold text-white mb-6">Quick Actions</h4>
                
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {/* Email Copy Button */}
                  <motion.button
                    variants={staggerItem}
                    onClick={copyEmail}
                    className="w-full flex items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {emailCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                        {emailCopied ? 'Email Copied!' : 'Copy Email'}
                      </div>
                      <div className="text-sm text-gray-400 break-words hyphens-none">
                        {personalInfo.email}
                      </div>
                    </div>
                  </motion.button>

                  {/* Resume Download Button */}
                  <motion.a
                    variants={staggerItem}
                    href={personalInfo.resume || '#'}
                    download
                    className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white">Download Resume</div>
                      <div className="text-sm text-blue-100">PDF Format</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </motion.a>

                  {/* Email Direct Link */}
                  <motion.a
                    variants={staggerItem}
                    href={`mailto:${personalInfo.email}`}
                    className="w-full flex items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                        Send Email
                      </div>
                      <div className="text-sm text-gray-400">Open mail client</div>
                    </div>
                  </motion.a>
                </motion.div>
              </ScrollReveal>

              {/* Column 3: Social Links & Navigation */}
              <ScrollReveal direction="right" delay={0.4} className="space-y-6">
                <h4 className="text-xl font-semibold text-white mb-6">Connect With Me</h4>
                
                {/* Social Links */}
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      variants={staggerItem}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-gray-300 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        <SocialIcon platform={social.platform} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                          {social.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {social.platform === 'linkedin' ? 'Professional Profile' :
                           social.platform === 'github' ? 'Source Code' : 'Live Portfolio'}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Back to Top Button */}
                <motion.button
                  variants={staggerItem}
                  onClick={scrollToTop}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                    Back to Top
                  </span>
                </motion.button>
              </ScrollReveal>
            </motion.div>

            {/* Bottom Bar */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="pt-8 border-t border-gray-700/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>Made with</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </motion.div>
                    <span>by</span>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent font-semibold">
                      {personalInfo.name}
                    </span>
                  </div>
                  
                  <div className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} All rights reserved.
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </footer>
    </AnimatedBackground>
  );
};