export interface User {
  id: number;
  username: string;
  is_active: boolean;
  created_at: string;
}

export interface AboutInfo {
  id: number;
  name: string;
  title: string;
  description: string;
  profile_image?: string;
  years_experience: number;
  ai_projects: number;
  ml_models: number;
  accuracy_rate: number;
  cv_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Highlight {
  id: number;
  icon: string;
  text: string;
  order_index: number;
  created_at: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  employment_type: string;
  order_index: number;
  created_at: string;
  updated_at?: string;
  responsibilities: Responsibility[];
  achievements: Achievement[];
  projects: ExperienceProject[];
  technologies: ExperienceTechnology[];
}

export interface Responsibility {
  id: number;
  description: string;
  order_index: number;
}

export interface Achievement {
  id: number;
  description: string;
  order_index: number;
}

export interface ExperienceProject {
  id: number;
  name: string;
  description?: string;
  order_index: number;
}

export interface ExperienceTechnology {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order_index: number;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  github_url?: string;
  live_url?: string;
  order_index: number;
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
  technologies: ProjectTechnology[];
  features: ProjectFeature[];
  metrics: ProjectMetric[];
}

export interface ProjectTechnology {
  id: number;
  name: string;
}

export interface ProjectFeature {
  id: number;
  description: string;
  order_index: number;
}

export interface ProjectMetric {
  id: number;
  description: string;
  order_index: number;
}

export interface ContactInfo {
  id: number;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Form types
export interface AboutInfoForm {
  name: string;
  title: string;
  description: string;
  profile_image?: string;
  years_experience: number;
  ai_projects: number;
  ml_models: number;
  accuracy_rate: number;
  cv_url?: string;
}

export interface ExperienceForm {
  title: string;
  company: string;
  duration: string;
  location: string;
  employment_type: string;
  order_index: number;
  responsibilities: { description: string; order_index: number }[];
  achievements: { description: string; order_index: number }[];
  projects: { name: string; description?: string; order_index: number }[];
  technologies: { name: string }[];
}

export interface ProjectForm {
  title: string;
  description: string;
  image?: string;
  github_url?: string;
  live_url?: string;
  order_index: number;
  is_featured: boolean;
  technologies: { name: string }[];
  features: { description: string; order_index: number }[];
  metrics: { description: string; order_index: number }[];
}

export interface SkillForm {
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order_index: number;
}

export interface ContactInfoForm {
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
}