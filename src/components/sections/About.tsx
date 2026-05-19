import { motion } from 'framer-motion';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { AnimatedBackground } from '../AnimatedBackground';
import { ScrollReveal } from '../ScrollReveal';
import { usePortfolio } from '../../hooks';
import { 
  staggerContainer, 
  staggerItem, 
  viewportSettings 
} from '../../utils/animations';

const HighlightIcon = ({ type }: { type: string }) => {
  const icons = {
    aws: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.048.08.064.16.064.24 0 .096-.064.192-.176.288l-.592.384c-.08.056-.16.08-.24.08-.096 0-.192-.048-.288-.128a3.66 3.66 0 01-.352-.448 8.69 8.69 0 01-.304-.512c-.768.904-1.728 1.352-2.896 1.352-.832 0-1.496-.24-1.984-.704-.496-.464-.736-1.088-.736-1.856 0-.832.288-1.504.88-2.016.576-.512 1.36-.768 2.336-.768.32 0 .656.024 1.024.08.368.048.752.128 1.152.224v-.736c0-.768-.16-1.296-.48-1.632-.32-.336-.864-.496-1.632-.496-.352 0-.72.04-1.088.128-.368.08-.728.192-1.088.336-.16.064-.272.096-.336.096-.128 0-.192-.096-.192-.288v-.448c0-.144.016-.256.064-.32.048-.064.128-.128.24-.192.368-.192.8-.352 1.296-.48.496-.144 1.024-.208 1.568-.208 1.2 0 2.08.272 2.64.832.56.56.832 1.408.832 2.56v3.376zm-4.0 1.488c.32 0 .64-.056.976-.176.336-.112.624-.304.864-.544.144-.144.256-.304.304-.48.048-.176.08-.384.08-.624v-.304c-.272-.064-.576-.112-.896-.144-.32-.032-.624-.048-.928-.048-.656 0-1.136.128-1.456.384-.32.256-.48.624-.48 1.104 0 .448.112.784.352 1.024.24.24.608.368 1.184.368zm7.424 1.92c-.128 0-.224-.024-.288-.08-.064-.048-.128-.144-.176-.256l-1.984-6.512c-.048-.16-.08-.272-.08-.336 0-.128.064-.208.192-.208h.784c.128 0 .224.024.288.08.064.048.112.144.144.256l1.424 5.616 1.312-5.616c.032-.128.08-.208.144-.256.064-.048.176-.08.288-.08h.64c.128 0 .224.024.288.08.064.048.128.144.144.256l1.328 5.68 1.456-5.68c.032-.128.08-.208.144-.256.064-.048.176-.08.288-.08h.752c.128 0 .208.064.208.208 0 .048-.016.096-.032.16-.016.064-.048.144-.08.256l-2.016 6.512c-.048.128-.112.208-.176.256-.064.048-.176.08-.288.08h-.688c-.128 0-.224-.024-.288-.08-.064-.056-.128-.144-.144-.256l-1.312-5.44-1.296 5.44c-.032.128-.08.208-.144.256-.064.048-.176.08-.288.08h-.688zm11.2.32c-.816 0-1.456-.24-1.936-.704-.48-.464-.72-1.088-.72-1.856 0-.832.288-1.504.88-2.016.576-.512 1.36-.768 2.336-.768.32 0 .656.024 1.024.08.368.048.752.128 1.152.224v-.736c0-.768-.16-1.296-.48-1.632-.32-.336-.864-.496-1.632-.496-.352 0-.72.04-1.088.128-.368.08-.728.192-1.088.336-.16.064-.272.096-.336.096-.128 0-.192-.096-.192-.288v-.448c0-.144.016-.256.064-.32.048-.064.128-.128.24-.192.368-.192.8-.352 1.296-.48.496-.144 1.024-.208 1.568-.208 1.2 0 2.08.272 2.64.832.56.56.832 1.408.832 2.56v3.376c0 .296.032.535.088.71.064.176.144.368.256.576.048.08.064.16.064.24 0 .096-.064.192-.176.288l-.592.384c-.08.056-.16.08-.24.08-.096 0-.192-.048-.288-.128a3.66 3.66 0 01-.352-.448 8.69 8.69 0 01-.304-.512c-.768.904-1.728 1.352-2.896 1.352z"/>
      </svg>
    ),
    ai: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    opensource: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    serverless: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    production: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
  
  return icons[type as keyof typeof icons] || icons.production;
};

export const About = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { personalInfo, skills, projects, certifications, education } = data;

  // Highlight keywords for emphasis
  const highlightKeywords = (text: string) => {
    const keywords = [
      'AWS', 'AI', 'serverless', 'production-ready', 'open source', 'cloud',
      'Lambda', 'DynamoDB', 'API Gateway', 'Bedrock', 'S3', 'EC2',
      'scalable', 'automation', 'DevOps', 'full-stack', 'REST APIs'
    ];
    
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`);
    });
    
    return highlightedText;
  };

  return (
    <AnimatedBackground variant="dark" className="py-20">
      <section id="about" className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </ScrollReveal>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Left Column - Bio & Highlights */}
              <ScrollReveal direction="left" delay={0.2} className="space-y-8">
                
                {/* Bio Section */}
                <Card 
                  variant="premium" 
                  className="hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">👨‍💻</span>
                      </div>
                      My Journey
                    </h3>
                    <p 
                      className="text-gray-300 leading-relaxed text-lg break-words hyphens-none"
                      dangerouslySetInnerHTML={{ __html: highlightKeywords(personalInfo.bio) }}
                    />
                  </div>
                </Card>

                {/* Key Highlights */}
                <Card 
                  variant="premium" 
                  className="hover:bg-gray-800/70 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">⭐</span>
                    </div>
                    Key Expertise
                  </h3>
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="grid gap-4"
                  >
                    {[
                      { 
                        type: 'aws', 
                        title: 'AWS Development', 
                        description: 'Expert in Lambda, S3, DynamoDB, API Gateway, and serverless architectures' 
                      },
                      { 
                        type: 'ai', 
                        title: 'AI Applications', 
                        description: 'Building AI-powered solutions with AWS Bedrock and modern ML frameworks' 
                      },
                      { 
                        type: 'opensource', 
                        title: 'Open Source Contributions', 
                        description: 'Active contributor to EPL ecosystem with cloud package development' 
                      },
                      { 
                        type: 'serverless', 
                        title: 'Serverless Architecture', 
                        description: 'Designing scalable, cost-effective serverless solutions' 
                      },
                      { 
                        type: 'production', 
                        title: 'Production-Ready Systems', 
                        description: 'Delivering robust, tested, and scalable applications' 
                      },
                    ].map((highlight) => (
                      <motion.div
                        key={highlight.type}
                        variants={staggerItem}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          <HighlightIcon type={highlight.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1 break-words hyphens-none">
                            {highlight.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed break-words hyphens-none">
                            {highlight.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card>
              </ScrollReveal>

              {/* Right Column - Skills & Stats */}
              <ScrollReveal direction="right" delay={0.4} className="space-y-8">
                
                {/* Skills Section */}
                <Card 
                  variant="premium" 
                  className="hover:bg-gray-800/70 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🛠️</span>
                    </div>
                    Technical Skills
                  </h3>
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="space-y-6"
                  >
                    {Object.entries(skills).map(([category, skillList]) => (
                      <motion.div
                        key={category}
                        variants={staggerItem}
                        className="space-y-3"
                      >
                        <h4 className="font-semibold text-blue-400 capitalize break-words hyphens-none">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skillList.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.05, duration: 0.3 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-600/50 hover:text-white transition-all duration-300 break-words hyphens-none"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card>

                {/* Education & Certifications */}
                <Card 
                  variant="premium" 
                  className="hover:bg-gray-800/70 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🎓</span>
                    </div>
                    Education & Certifications
                  </h3>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="space-y-6"
                  >
                    {/* Education */}
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-3">Education</h4>
                      <div className="space-y-3">
                        {education.map((edu, index) => (
                          <motion.div
                            key={index}
                            variants={staggerItem}
                            className="p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300"
                          >
                            <div className="font-medium text-white break-words hyphens-none">{edu.degree}</div>
                            <div className="text-gray-400 text-sm break-words hyphens-none">{edu.institution}</div>
                            <div className="text-gray-500 text-xs break-words hyphens-none">{edu.duration}</div>
                            {edu.cgpa && (
                              <div className="text-blue-400 text-sm font-medium">CGPA: {edu.cgpa}</div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-3">Certifications</h4>
                      <div className="space-y-3">
                        {certifications.map((cert, index) => (
                          <motion.div
                            key={index}
                            variants={staggerItem}
                            className="p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group"
                          >
                            <div className="font-medium text-white break-words hyphens-none group-hover:text-blue-400 transition-colors duration-300">
                              {cert.name}
                            </div>
                            <div className="text-gray-400 text-sm break-words hyphens-none">{cert.issuer}</div>
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm mt-1 transition-colors duration-300 break-words hyphens-none"
                              >
                                View Credential
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Stats Section */}
            <ScrollReveal direction="up" delay={0.6} className="mt-16">
              <Card variant="gradient" className="backdrop-blur-sm">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                  {[
                    { label: 'Projects Completed', value: projects.length.toString(), icon: '🚀' },
                    { label: 'AWS Services Used', value: skills.cloudAndDevOps.filter(skill => skill.toLowerCase().includes('aws')).length.toString(), icon: '☁️' },
                    { label: 'Certifications', value: certifications.length.toString(), icon: '🏆' },
                    { label: 'Years Experience', value: '2+', icon: '⏱️' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={staggerItem}
                      className="text-center group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm break-words hyphens-none">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </ScrollReveal>
          </motion.div>
        </div>
      </section>
    </AnimatedBackground>
  );
};