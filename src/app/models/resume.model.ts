/** TypeScript interfaces matching resume.json structure */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  avatarModel: string; // path to GLB/FBX file in assets
  avatarImage: string; // fallback 2D image
  resumePdf: string;   // downloadable PDF link
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'language' | 'tool' | 'other';
  level: number; // 0-100
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // icon class or SVG name
}

export interface ContactInfo {
  email: string;
  phone?: string;
  socials: SocialLink[];
}

export interface Resume {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: ContactInfo;
}
