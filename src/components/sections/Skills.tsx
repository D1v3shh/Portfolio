import { motion } from 'framer-motion';
import { 
  Cloud, 
  Server, 
  Database, 
  Code, 
  Cpu, 
  Brain, 
  Globe, 
  Palette, 
  Terminal, 
  Settings,
  Zap,
  Shield,
  Monitor,
  Layers,
  Box,
  Workflow,
  FileCode,
  Wrench,
  GitBranch
} from 'lucide-react';
import { Card } from '../Card';
import { AnimatedBackground } from '../AnimatedBackground';
import { ScrollReveal } from '../ScrollReveal';
import { usePortfolio } from '../../hooks';
import { 
  staggerContainer, 
  staggerItem, 
  viewportSettings 
} from '../../utils/animations';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  skills: Array<{
    name: string;
    icon: React.ReactNode;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>;
}

const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    // Cloud & DevOps
    'AWS EC2': <Server className="w-5 h-5" />,
    'AWS S3': <Database className="w-5 h-5" />,
    'AWS Lambda': <Zap className="w-5 h-5" />,
    'API Gateway': <Globe className="w-5 h-5" />,
    'DynamoDB': <Database className="w-5 h-5" />,
    'VPC': <Shield className="w-5 h-5" />,
    'CloudTrail': <Monitor className="w-5 h-5" />,
    'CloudWatch': <Monitor className="w-5 h-5" />,
    'RDS': <Database className="w-5 h-5" />,
    'IAM': <Shield className="w-5 h-5" />,
    'Load Balancing': <Layers className="w-5 h-5" />,
    'AWS Bedrock': <Brain className="w-5 h-5" />,
    'Serverless Architecture': <Cloud className="w-5 h-5" />,
    'Cloud Deployment': <Cloud className="w-5 h-5" />,
    'Vercel': <Globe className="w-5 h-5" />,
    'Linux': <Terminal className="w-5 h-5" />,
    'REST APIs': <Globe className="w-5 h-5" />,
    
    // Programming & Development
    'C++': <Code className="w-5 h-5" />,
    'Java': <Code className="w-5 h-5" />,
    'C': <Code className="w-5 h-5" />,
    'SQL': <Database className="w-5 h-5" />,
    'JavaScript': <Code className="w-5 h-5" />,
    'Node.js': <Server className="w-5 h-5" />,
    'Angular': <Globe className="w-5 h-5" />,
    'OOP': <Box className="w-5 h-5" />,
    'CLI': <Terminal className="w-5 h-5" />,
    'Problem Solving': <Cpu className="w-5 h-5" />,
    'Debugging': <Wrench className="w-5 h-5" />,
    
    // Tools & Platforms
    'Git': <GitBranch className="w-5 h-5" />,
    'GitHub': <GitBranch className="w-5 h-5" />,
    'Linux CLI': <Terminal className="w-5 h-5" />,
    'VS Code': <FileCode className="w-5 h-5" />,
    'Postman': <Globe className="w-5 h-5" />,
    'Microsoft 365': <Monitor className="w-5 h-5" />,
    
    // CI/CD & Workflow
    'CodePipeline': <Workflow className="w-5 h-5" />,
    'GitHub Workflows': <Workflow className="w-5 h-5" />,
    'Pull Requests': <GitBranch className="w-5 h-5" />,
    'Code Reviews': <FileCode className="w-5 h-5" />,
    
    // Soft Skills
    'Communication': <Globe className="w-5 h-5" />,
    'Team Collaboration': <Globe className="w-5 h-5" />,
    'Adaptability': <Settings className="w-5 h-5" />,
  };
  
  return iconMap[skillName] || <Code className="w-5 h-5" />;
};

const getSkillLevel = (skillName: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  const expertSkills = ['AWS Lambda', 'AWS S3', 'JavaScript', 'Node.js', 'Git', 'GitHub'];
  const advancedSkills = ['AWS EC2', 'DynamoDB', 'Angular', 'C++', 'Java', 'SQL', 'Linux'];
  const intermediateSkills = ['AWS Bedrock', 'API Gateway', 'VPC', 'CloudWatch', 'Vercel'];
  
  if (expertSkills.some(skill => skillName.includes(skill))) return 'expert';
  if (advancedSkills.some(skill => skillName.includes(skill))) return 'advanced';
  if (intermediateSkills.some(skill => skillName.includes(skill))) return 'intermediate';
  return 'intermediate';
};

export const Skills = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { skills } = data;

  // Organize skills into the specified categories
  const skillCategories: SkillCategory[] = [
    {
      title: 'Cloud & DevOps',
      icon: <Cloud className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      skills: skills.cloudAndDevOps.map(skill => ({
        name: skill,
        icon: getSkillIcon(skill),
        level: getSkillLevel(skill)
      }))
    },
    {
      title: 'AI & Backend',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        ...skills.programmingAndDevelopment.filter(skill => 
          ['Node.js', 'JavaScript', 'Java', 'C++', 'SQL'].includes(skill)
        ),
        'AWS Bedrock'
      ].map(skill => ({
        name: skill,
        icon: getSkillIcon(skill),
        level: getSkillLevel(skill)
      }))
    },
    {
      title: 'Frontend',
      icon: <Palette className="w-6 h-6" />,
      gradient: 'from-green-500 to-teal-500',
      skills: [
        'Angular',
        'JavaScript',
        ...skills.programmingAndDevelopment.filter(skill => 
          ['OOP', 'Problem Solving', 'Debugging'].includes(skill)
        )
      ].map(skill => ({
        name: skill,
        icon: getSkillIcon(skill),
        level: getSkillLevel(skill)
      }))
    },
    {
      title: 'Tools & Workflow',
      icon: <Wrench className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-500',
      skills: [
        ...skills.toolsAndPlatforms,
        ...skills.cicdAndWorkflow
      ].map(skill => ({
        name: skill,
        icon: getSkillIcon(skill),
        level: getSkillLevel(skill)
      }))
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-green-400';
      case 'advanced': return 'text-blue-400';
      case 'intermediate': return 'text-yellow-400';
      case 'beginner': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert': return 'w-full';
      case 'advanced': return 'w-4/5';
      case 'intermediate': return 'w-3/5';
      case 'beginner': return 'w-2/5';
      default: return 'w-3/5';
    }
  };

  return (
    <AnimatedBackground variant="dark" className="pt-8 pb-8">
      <section id="skills" className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Technical{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Skills
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
              <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
                Expertise across cloud platforms, AI technologies, and modern development tools
              </p>
            </ScrollReveal>

            {/* Skills Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {skillCategories.map((category) => (
                <motion.div
                  key={category.title}
                  variants={staggerItem}
                  className="space-y-6"
                >
                  {/* Category Header */}
                  <div className="text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.title}
                    </h3>
                    <div className={`w-12 h-0.5 bg-gradient-to-r ${category.gradient} mx-auto rounded-full`}></div>
                  </div>

                  {/* Skills List */}
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="space-y-4"
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        variants={staggerItem}
                      >
                        <Card 
                          variant="premium"
                          className="group hover:border-gray-600/50 transition-all duration-300 p-4"
                          hover={true}
                        >
                          <motion.div
                            className="space-y-3"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Skill Header */}
                            <div className="flex items-center gap-3">
                              <motion.div
                                className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white shadow-md`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                {skill.icon}
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors duration-300 break-words hyphens-none">
                                  {skill.name}
                                </h4>
                                <p className={`text-xs capitalize ${getLevelColor(skill.level)} font-medium`}>
                                  {skill.level}
                                </p>
                              </div>
                            </div>

                            {/* Skill Level Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Proficiency</span>
                                <span className={`${getLevelColor(skill.level)} font-medium`}>
                                  {skill.level === 'expert' ? '90%' : 
                                   skill.level === 'advanced' ? '80%' : 
                                   skill.level === 'intermediate' ? '60%' : '40%'}
                                </span>
                              </div>
                              <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${category.gradient} rounded-full ${getLevelWidth(skill.level)}`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: getLevelWidth(skill.level).replace('w-', '') === 'full' ? '100%' : 
                                    getLevelWidth(skill.level).replace('w-', '').replace('/', '') === '45' ? '80%' :
                                    getLevelWidth(skill.level).replace('w-', '').replace('/', '') === '35' ? '60%' : '40%' }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: skillIndex * 0.1, ease: "easeOut" }}
                                />
                              </div>
                            </div>

                            {/* Hover Gradient Border */}
                            <motion.div
                              className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                              initial={false}
                            />
                          </motion.div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills Summary */}
            <ScrollReveal direction="up" delay={0.6} className="mt-16 text-center">
              <Card variant="gradient" className="backdrop-blur-sm max-w-4xl mx-auto">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                  {[
                    { 
                      label: 'AWS Services', 
                      value: skills.cloudAndDevOps.filter(skill => skill.toLowerCase().includes('aws')).length.toString(),
                      icon: <Cloud className="w-6 h-6" />,
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      label: 'Programming Languages', 
                      value: skills.programmingAndDevelopment.filter(skill => 
                        ['C++', 'Java', 'C', 'JavaScript', 'SQL'].includes(skill)
                      ).length.toString(),
                      icon: <Code className="w-6 h-6" />,
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    { 
                      label: 'Development Tools', 
                      value: skills.toolsAndPlatforms.length.toString(),
                      icon: <Wrench className="w-6 h-6" />,
                      gradient: 'from-green-500 to-teal-500'
                    },
                    { 
                      label: 'Workflow Systems', 
                      value: skills.cicdAndWorkflow.length.toString(),
                      icon: <Workflow className="w-6 h-6" />,
                      gradient: 'from-orange-500 to-red-500'
                    },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={staggerItem}
                      className="text-center group"
                    >
                      <motion.div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} mb-3 text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm break-words hyphens-none">
                        {stat.label}
                      </div>
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