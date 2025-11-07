// Fallback data for when API is not available
export const fallbackAboutInfo = {
  id: 1,
  name: "Zahid Rashid",
  title: "AI Engineer & Machine Learning Specialist",
  description: "Passionate AI Engineer with expertise in machine learning, deep learning, and data science. I specialize in developing innovative AI solutions, building predictive models, and integrating cutting-edge AI technologies into business applications to drive digital transformation.",
  profile_image: "/assets/zahid-profile.jpeg",
  years_experience: 3,
  ai_projects: 25,
  ml_models: 50,
  accuracy_rate: 98,
  cv_url: "/resume.pdf",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const fallbackHighlights = [
  {
    id: 1,
    icon: "🚀",
    text: "Building the Future with AI",
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    icon: "💡",
    text: "Innovative Problem Solver",
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    icon: "⚡",
    text: "Performance Optimizer",
    order_index: 3,
    created_at: new Date().toISOString()
  }
];

export const fallbackExperiences = [
  {
    id: 1,
    title: 'Senior AI Engineer',
    company: 'CareCloud',
    duration: 'Jan 2025 - Present',
    location: 'Bagh AJK, Pakistan',
    employment_type: 'Full-time',
    order_index: 3,
    created_at: new Date().toISOString(),
    responsibilities: [
      {
        id: 1,
        description: 'Lead development of machine learning models for predictive analytics and business intelligence',
        order_index: 1
      },
      {
        id: 2,
        description: 'Architect and implement scalable AI solutions using TensorFlow, PyTorch, and cloud platforms',
        order_index: 2
      },
      {
        id: 3,
        description: 'Collaborate with cross-functional teams to integrate AI solutions into existing products',
        order_index: 3
      },
      {
        id: 4,
        description: 'Mentor junior developers and conduct technical workshops on AI/ML best practices',
        order_index: 4
      }
    ],
    achievements: [
      {
        id: 1,
        description: 'Increased model accuracy by 25% through advanced optimization techniques',
        order_index: 1
      },
      {
        id: 2,
        description: 'Reduced inference time by 40% through model optimization and deployment strategies',
        order_index: 2
      },
      {
        id: 3,
        description: 'Led a team of 5 engineers in developing a real-time recommendation system',
        order_index: 3
      },
      {
        id: 4,
        description: 'Presented research findings at Pakistan AI Summit 2023',
        order_index: 4
      },
      {
        id: 5,
        description: 'RCM automation',
        order_index: 5
      }
    ],
    projects: [],
    technologies: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'TensorFlow' },
      { id: 3, name: 'PyTorch' },
      { id: 4, name: 'AWS' },
      { id: 5, name: 'Docker' },
      { id: 6, name: 'Langchain' },
      { id: 7, name: 'LangGraph' },
      { id: 8, name: 'RAG' }
    ]
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    company: 'CareCloud',
    duration: 'Jan 2024 - Dec 2024',
    location: 'Bagh AJK, Pakistan',
    employment_type: 'Full-time',
    order_index: 2,
    created_at: new Date().toISOString(),
    responsibilities: [
      {
        id: 1,
        description: 'Developed end-to-end machine learning pipelines for data processing and model training',
        order_index: 1
      },
      {
        id: 2,
        description: 'Built computer vision models for image classification and object detection',
        order_index: 2
      },
      {
        id: 3,
        description: 'Implemented natural language processing solutions for text analysis',
        order_index: 3
      },
      {
        id: 4,
        description: 'Created data visualization dashboards for business stakeholders',
        order_index: 4
      }
    ],
    achievements: [
      {
        id: 1,
        description: 'Deployed 10+ ML models in production with 99.5% uptime',
        order_index: 1
      },
      {
        id: 2,
        description: 'Improved data processing efficiency by 35% through pipeline optimization',
        order_index: 2
      },
      {
        id: 3,
        description: 'Developed an automated anomaly detection system that reduced manual monitoring by 60%',
        order_index: 3
      },
      {
        id: 4,
        description: 'Work on the Charges automation',
        order_index: 4
      }
    ],
    projects: [],
    technologies: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'Scikit-learn' },
      { id: 3, name: 'OpenCV' },
      { id: 4, name: 'NLTK' },
      { id: 5, name: 'SQL' },
      { id: 6, name: 'FastAPI' },
      { id: 7, name: 'Selenium' },
      { id: 8, name: 'PyAutoGUI' },
      { id: 9, name: 'PyAutoIT' }
    ]
  }
];

export const fallbackProjects = [
  {
    id: 1,
    title: 'Intelligent Customer Analytics Platform',
    description: 'End-to-end ML platform for customer behavior prediction and segmentation using advanced deep learning techniques.',
    image: '/projects/analytics-platform.jpg',
    github_url: 'https://github.com/zahidrashid',
    live_url: 'https://analytics-platform.demo.com',
    order_index: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    technologies: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'TensorFlow' },
      { id: 3, name: 'AWS' },
      { id: 4, name: 'React' },
      { id: 5, name: 'SQL' }
    ],
    features: [
      { id: 1, description: 'Real-time customer behavior prediction', order_index: 1 },
      { id: 2, description: 'Advanced customer segmentation algorithms', order_index: 2 },
      { id: 3, description: 'Interactive analytics dashboard', order_index: 3 },
      { id: 4, description: 'Automated model retraining pipeline', order_index: 4 }
    ],
    metrics: [
      { id: 1, description: '25% increase in customer retention', order_index: 1 },
      { id: 2, description: '40% improvement in marketing ROI', order_index: 2 }
    ]
  },
  {
    id: 2,
    title: 'AI-Powered Content Recommendation Engine',
    description: 'Scalable recommendation system using collaborative filtering and deep learning for personalized content delivery.',
    image: '/projects/recommendation-engine.jpg',
    github_url: 'https://github.com/zahidrashid',
    live_url: 'https://recommendation-engine.demo.com',
    order_index: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    technologies: [
      { id: 1, name: 'PyTorch' },
      { id: 2, name: 'FastAPI' },
      { id: 3, name: 'Docker' },
      { id: 4, name: 'MongoDB' }
    ],
    features: [
      { id: 1, description: 'Hybrid recommendation algorithms', order_index: 1 },
      { id: 2, description: 'Real-time inference API', order_index: 2 },
      { id: 3, description: 'A/B testing framework', order_index: 3 },
      { id: 4, description: 'Scalable microservices architecture', order_index: 4 }
    ],
    metrics: [
      { id: 1, description: '35% increase in user engagement', order_index: 1 },
      { id: 2, description: '50% reduction in content discovery time', order_index: 2 }
    ]
  }
];

export const fallbackSkills = [
  { id: 1, name: 'Python', category: 'Programming Languages', proficiency: 95, icon: '🐍', order_index: 1, created_at: new Date().toISOString() },
  { id: 2, name: 'TensorFlow', category: 'AI/ML Frameworks', proficiency: 90, icon: '🧠', order_index: 1, created_at: new Date().toISOString() },
  { id: 3, name: 'PyTorch', category: 'AI/ML Frameworks', proficiency: 88, icon: '🔥', order_index: 2, created_at: new Date().toISOString() },
  { id: 4, name: 'AWS', category: 'Cloud Platforms', proficiency: 85, icon: '☁️', order_index: 1, created_at: new Date().toISOString() },
  { id: 5, name: 'Docker', category: 'DevOps', proficiency: 80, icon: '🐳', order_index: 1, created_at: new Date().toISOString() },
];

export const fallbackSkillCategories = [
  {
    category: 'AI/ML Frameworks',
    skills: [
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 85 },
      { name: 'Scikit-learn', level: 95 },
      { name: 'Keras', level: 88 },
      { name: 'Hugging Face', level: 80 }
    ]
  },
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'SQL', level: 90 }
    ]
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'MLflow', level: 85 },
      { name: 'Git', level: 90 }
    ]
  },
  {
    category: 'Data & Databases',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 }
    ]
  }
];

export const fallbackSpecializations = [
  'Computer Vision',
  'Natural Language Processing',
  'Deep Learning',
  'Predictive Analytics',
  'Time Series Forecasting',
  'Recommendation Systems',
  'MLOps',
  'Data Engineering'
];

export const fallbackContactInfo = {
  id: 1,
  email: "zahid@example.com",
  phone: "+92-123-456-7890",
  location: "Bagh AJK, Pakistan",
  linkedin_url: "https://linkedin.com/in/zahidrashid",
  github_url: "https://github.com/zahidrashid",
  twitter_url: "https://twitter.com/zahidrashid",
  website_url: "https://zahidrashid.dev",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};