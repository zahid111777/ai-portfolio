export interface Experience {
    title: string;
    company: string;
    duration: string;
    location: string;
    type: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
}

export interface Skill {
    name: string;
    level: number;
}

export interface SkillCategory {
    category: string;
    skills: Skill[];
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    features: string[];
    metrics: string[];
    githubUrl: string;
    liveUrl?: string;
    image: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}
