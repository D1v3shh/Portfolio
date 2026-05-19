import { motion } from 'framer-motion';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { AnimatedBackground } from '../AnimatedBackground';
import { ScrollReveal } from '../ScrollReveal';
import { usePortfolio } from '../../hooks';
import { 
  staggerContainer, 
  staggerItem, 
  viewportSettings 
} from '../../utils/animations';

const TechIcon = ({ tech }: { tech: string }) => {
  const icons = {
    'AWS S3': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.234-.44-.36-.748-.36-.199 0-.398.063-.559.189l-2.87 2.25c-.199.156-.318.396-.318.648v3.375c0 .252.119.492.318.648l2.87 2.25c.161.126.36.189.559.189.308 0 .579-.126.748-.36.169-.234.252-.531.252-.846V9.006c0-.315-.083-.612-.252-.846z"/>
      </svg>
    ),
    'AWS Lambda': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    'SQS': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    'GitHub': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    'Testing': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'EPL': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    'boto3': (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
      </svg>
    ),
    'default': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  };
  
  return icons[tech as keyof typeof icons] || icons.default;
};

export const Experience = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { experience } = data;

  // Extract key technologies and achievements for highlighting
  const extractTechnologies = (description: string[]) => {
    const techKeywords = [
      'AWS S3', 'AWS Lambda', 'SQS', 'boto3', 'EPL', 'GitHub', 'Testing',
      'unit tests', 'mocked AWS', 'pull requests', 'code reviews'
    ];
    
    const foundTech = new Set<string>();
    description.forEach(desc => {
      techKeywords.forEach(tech => {
        if (desc.toLowerCase().includes(tech.toLowerCase())) {
          if (tech === 'unit tests' || tech === 'mocked AWS') {
            foundTech.add('Testing');
          } else if (tech === 'pull requests' || tech === 'code reviews') {
            foundTech.add('GitHub');
          } else {
            foundTech.add(tech);
          }
        }
      });
    });
    
    return Array.from(foundTech);
  };

  return (
    <AnimatedBackground variant="dark" className="pt-20 pb-4">
      <section id="experience" className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="max-w-4xl mx-auto"
          >
            {/* Section Header */}
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Professional{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
              <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
                Building scalable cloud solutions and contributing to open source projects
              </p>
            </ScrollReveal>

            {/* Timeline Container */}
            <div className="relative">
              {/* Timeline Line */}
              <ScrollReveal direction="scale" delay={0.5}>
                <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500" />
              </ScrollReveal>

              {/* Experience Items */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="space-y-12"
              >
                {experience.map((exp, index) => {
                  const technologies = extractTechnologies(exp.description);
                  const isEPL = exp.title.toLowerCase().includes('epl');
                  
                  return (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      className="relative flex items-start gap-8"
                    >
                      {/* Timeline Number */}
                      <div className="flex-shrink-0 relative">
                        <motion.div
                          className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.div>
                        
                        {/* Pulse Animation */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />
                      </div>

                      {/* Experience Card */}
                      <motion.div
                        className="flex-1"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card 
                          variant="premium" 
                          className="hover:border-gray-600/50 transition-all duration-300 group"
                        >
                          <div className="space-y-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 break-words hyphens-none">
                                  {exp.title}
                                  {isEPL && (
                                    <motion.span
                                      className="ml-3 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium rounded-full"
                                      animate={{
                                        boxShadow: [
                                          "0 0 0 0 rgba(251, 191, 36, 0.4)",
                                          "0 0 0 10px rgba(251, 191, 36, 0)",
                                          "0 0 0 0 rgba(251, 191, 36, 0)"
                                        ]
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    >
                                      <TechIcon tech="EPL" />
                                      Featured
                                    </motion.span>
                                  )}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">Open Source Contribution</p>
                              </div>
                              <div className="text-right">
                                <div className="text-blue-400 font-semibold">2024</div>
                                <div className="text-gray-500 text-sm">Present</div>
                              </div>
                            </div>

                            {/* Technologies */}
                            {technologies.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                  Key Technologies
                                </h4>
                                <motion.div 
                                  variants={staggerContainer}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={viewportSettings}
                                  className="flex flex-wrap gap-2"
                                >
                                  {technologies.map((tech) => (
                                    <motion.div
                                      key={tech}
                                      variants={staggerItem}
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <Badge
                                        variant="primary"
                                        className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300 flex items-center gap-1.5"
                                      >
                                        <TechIcon tech={tech} />
                                        {tech}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>
                            )}

                            {/* Description */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Key Achievements
                              </h4>
                              <motion.ul 
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportSettings}
                                className="space-y-3"
                              >
                                {exp.description.map((desc, descIndex) => (
                                  <motion.li
                                    key={descIndex}
                                    variants={staggerItem}
                                    className="flex items-start gap-3 text-gray-300 leading-relaxed break-words hyphens-none"
                                  >
                                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2"></div>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: desc
                                          .replace(/(AWS S3|AWS Lambda|SQS|boto3|EPL|GitHub|unit tests|mocked AWS services|pull requests|code reviews)/gi, 
                                            '<span class="text-blue-400 font-semibold">$1</span>')
                                          .replace(/(25 unit tests|high test coverage|reliability)/gi,
                                            '<span class="text-green-400 font-semibold">$1</span>')
                                          .replace(/(cloud package|eplang\[cloud\]|modular)/gi,
                                            '<span class="text-purple-400 font-semibold">$1</span>')
                                      }}
                                    />
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </div>

                            {/* Highlights for EPL Project */}
                            {isEPL && (
                              <ScrollReveal direction="up" delay={0.5}>
                                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                                  <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                                    <TechIcon tech="EPL" />
                                    Project Highlights
                                  </h4>
                                  <motion.div 
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportSettings}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                                  >
                                    <div className="space-y-2">
                                      {[
                                        { tech: "AWS S3", label: "AWS S3 Integration" },
                                        { tech: "AWS Lambda", label: "Lambda Functions" },
                                        { tech: "SQS", label: "SQS Messaging" }
                                      ].map((item) => (
                                        <motion.div
                                          key={item.tech}
                                          variants={staggerItem}
                                          className="flex items-center gap-2 text-gray-300"
                                        >
                                          <TechIcon tech={item.tech} />
                                          <span>{item.label}</span>
                                        </motion.div>
                                      ))}
                                    </div>
                                    <div className="space-y-2">
                                      {[
                                        { tech: "Testing", label: "25 Unit Tests" },
                                        { tech: "GitHub", label: "GitHub Workflows" },
                                        { tech: "boto3", label: "Boto3 Support" }
                                      ].map((item) => (
                                        <motion.div
                                          key={item.tech}
                                          variants={staggerItem}
                                          className="flex items-center gap-2 text-gray-300"
                                        >
                                          <TechIcon tech={item.tech} />
                                          <span>{item.label}</span>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </motion.div>
                                </div>
                              </ScrollReveal>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedBackground>
  );
};