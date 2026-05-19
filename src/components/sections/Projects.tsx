import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Star, Zap, Code, Database, Cloud, Globe } from 'lucide-react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { AnimatedBackground } from '../AnimatedBackground';
import { ScrollReveal } from '../ScrollReveal';
import { usePortfolio } from '../../hooks';
import { 
  staggerContainer, 
  staggerItem, 
  viewportSettings 
} from '../../utils/animations';

const getTechIcon = (tech: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'AWS Lambda': <Zap className="w-4 h-4" />,
    'AWS Bedrock': <Cloud className="w-4 h-4" />,
    'AWS Amplify': <Cloud className="w-4 h-4" />,
    'API Gateway': <Globe className="w-4 h-4" />,
    'DynamoDB': <Database className="w-4 h-4" />,
    'Angular': <Code className="w-4 h-4" />,
    'Node.js': <Code className="w-4 h-4" />,
    'React': <Code className="w-4 h-4" />,
    'Express': <Code className="w-4 h-4" />,
    'MongoDB': <Database className="w-4 h-4" />,
    'JavaScript': <Code className="w-4 h-4" />,
    'Vercel': <Globe className="w-4 h-4" />,
    'JWT': <Code className="w-4 h-4" />,
    'Google Gemini API': <Zap className="w-4 h-4" />,
  };
  
  return iconMap[tech] || <Code className="w-4 h-4" />;
};

const getTechColor = (tech: string) => {
  if (tech.toLowerCase().includes('aws')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
  if (tech.toLowerCase().includes('react') || tech.toLowerCase().includes('angular')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  if (tech.toLowerCase().includes('node') || tech.toLowerCase().includes('express')) return 'bg-green-500/20 text-green-300 border-green-500/30';
  if (tech.toLowerCase().includes('database') || tech.toLowerCase().includes('mongo') || tech.toLowerCase().includes('dynamo')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  if (tech.toLowerCase().includes('api') || tech.toLowerCase().includes('gemini')) return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
  return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

interface ProjectCardProps {
  project: {
    title: string;
    featured: boolean;
    technologies: string[];
    description: string[];
    architecture: string;
    githubUrl: string;
    liveUrl: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card 
        variant="premium" 
        className="group hover:border-gray-600/50 transition-all duration-500 overflow-hidden"
      >
        <div className="relative">
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium rounded-full shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </div>
            </motion.div>
          )}

          {/* Project Header */}
          <div className="p-8 pb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300 break-words hyphens-none">
              {project.title}
            </h3>

            {/* Technology Stack */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Technology Stack
              </h4>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {project.technologies.map((tech) => (
                  <motion.div
                    key={tech}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      className={`${getTechColor(tech)} flex items-center gap-1.5 hover:scale-105 transition-all duration-300`}
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Architecture */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Architecture
              </h4>
              <p className="text-gray-300 leading-relaxed break-words hyphens-none bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                {project.architecture}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Key Features
              </h4>
              <motion.ul 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3"
              >
                {project.description.map((desc, descIndex) => (
                  <motion.li
                    key={descIndex}
                    variants={staggerItem}
                    className="flex items-start gap-3 text-gray-300 leading-relaxed break-words hyphens-none"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2"></div>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: desc
                          .replace(/(AWS|Angular|Node\.js|React|API|AI|serverless|cloud|production)/gi, 
                            '<span class="text-blue-400 font-semibold">$1</span>')
                          .replace(/(scalable|responsive|secure|optimized|automated)/gi,
                            '<span class="text-green-400 font-semibold">$1</span>')
                          .replace(/(real-time|performance|accessibility|offline)/gi,
                            '<span class="text-purple-400 font-semibold">$1</span>')
                      }}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                href={project.liveUrl}
                target="_blank"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                Live Demo
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
                href={project.githubUrl}
                target="_blank"
                icon={<GitBranch className="w-4 h-4" />}
                iconPosition="right"
              >
                View Code
              </Button>
            </div>
          </div>

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            initial={false}
          />

          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)',
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
          />
        </div>
      </Card>
    </motion.div>
  );
};

export const Projects = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { projects } = data;

  // Sort projects to show featured ones first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <AnimatedBackground variant="dark" className="pt-8 pb-20">
      <section id="projects" className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Featured{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
              <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
                Showcasing innovative solutions built with modern technologies and cloud architectures
              </p>
            </ScrollReveal>

            {/* Projects List */}
            <div className="space-y-8">
              {sortedProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            {/* Call to Action */}
            <ScrollReveal direction="up" delay={0.6} className="text-center mt-16">
              <Card variant="gradient" className="backdrop-blur-sm">
                <div className="text-center space-y-6">
                  <h3 className="text-3xl font-bold text-white">
                    Interested in Collaboration?
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto text-lg">
                    I'm always excited to work on innovative projects and explore new technologies.
                  </p>
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <motion.a
                      variants={staggerItem}
                      href="#footer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Let's Build Something Amazing
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      variants={staggerItem}
                      href={data.personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All Projects
                      <GitBranch className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </AnimatedBackground>
  );
};