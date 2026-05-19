export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  avatar?: string;
  resume?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: 'cloud' | 'devops' | 'programming' | 'ai' | 'database' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'cloud-infrastructure' | 'ai-ml' | 'devops' | 'web-development' | 'automation';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  startDate: string;
  endDate?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  url?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  availability: 'available' | 'busy' | 'not-available';
  preferredContact: 'email' | 'phone' | 'linkedin';
  timezone: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: {
    cloudAndDevOps: string[];
    programmingAndDevelopment: string[];
    toolsAndPlatforms: string[];
    cicdAndWorkflow: string[];
    softSkills: string[];
  };
  experience: Array<{
    title: string;
    description: string[];
  }>;
  projects: Array<{
    title: string;
    featured: boolean;
    technologies: string[];
    description: string[];
    architecture: string;
    githubUrl: string;
    liveUrl: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    credentialUrl: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    cgpa?: string;
    percentage?: string;
  }>;
}