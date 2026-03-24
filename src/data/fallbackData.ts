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
    title: 'Data Science Intern',
    company: 'CareCloud',
    duration: 'Jun 2023 - Dec 2023',
    location: 'Bagh AJK, Pakistan',
    employment_type: 'Internship',
    order_index: 1,
    created_at: new Date().toISOString(),
    responsibilities: [
      {
        id: 1,
        description: 'Performed exploratory data analysis and feature engineering on large healthcare datasets',
        order_index: 1
      },
      {
        id: 2,
        description: 'Built and evaluated machine learning models for classification and regression tasks',
        order_index: 2
      },
      {
        id: 3,
        description: 'Created data visualization dashboards to communicate insights to stakeholders',
        order_index: 3
      },
      {
        id: 4,
        description: 'Assisted senior engineers in data preprocessing pipelines and model validation',
        order_index: 4
      }
    ],
    achievements: [
      {
        id: 1,
        description: 'Developed a predictive model achieving 90%+ accuracy on healthcare claim data',
        order_index: 1
      },
      {
        id: 2,
        description: 'Automated data cleaning pipeline that reduced preprocessing time by 40%',
        order_index: 2
      },
      {
        id: 3,
        description: 'Delivered actionable insights report used by the product team',
        order_index: 3
      }
    ],
    projects: [],
    technologies: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'Pandas' },
      { id: 3, name: 'Scikit-learn' },
      { id: 4, name: 'Matplotlib' },
      { id: 5, name: 'SQL' },
      { id: 6, name: 'Jupyter' }
    ]
  },
  {
    id: 2,
    title: 'Junior AI Engineer',
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
        description: 'Built NLP solutions for medical text analysis and automated claim processing',
        order_index: 2
      },
      {
        id: 3,
        description: 'Implemented and deployed FastAPI microservices exposing ML model inference endpoints',
        order_index: 3
      },
      {
        id: 4,
        description: 'Worked on RCM automation using PyAutoGUI, PyAutoIT and Selenium',
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
        description: 'Built an automated charges automation system reducing manual effort by 60%',
        order_index: 3
      }
    ],
    projects: [],
    technologies: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'Scikit-learn' },
      { id: 3, name: 'NLTK' },
      { id: 4, name: 'SQL' },
      { id: 5, name: 'FastAPI' },
      { id: 6, name: 'Selenium' },
      { id: 7, name: 'PyAutoGUI' },
      { id: 8, name: 'PyAutoIT' }
    ]
  },
  {
    id: 3,
    title: 'AI Engineer',
    company: 'CareCloud',
    duration: 'Jan 2025 - Present',
    location: 'Bagh AJK, Pakistan',
    employment_type: 'Full-time',
    order_index: 3,
    created_at: new Date().toISOString(),
    responsibilities: [
      {
        id: 1,
        description: 'Lead development of LLM-powered solutions using LangChain, LangGraph and RAG architectures',
        order_index: 1
      },
      {
        id: 2,
        description: 'Architect and implement scalable AI pipelines using Python, FastAPI and cloud platforms',
        order_index: 2
      },
      {
        id: 3,
        description: 'Build multi-agent AI systems for automated research and RCM workflows',
        order_index: 3
      },
      {
        id: 4,
        description: 'Collaborate with cross-functional teams to integrate AI solutions into existing products',
        order_index: 4
      }
    ],
    achievements: [
      {
        id: 1,
        description: 'Increased model accuracy by 25% through advanced prompt engineering and fine-tuning',
        order_index: 1
      },
      {
        id: 2,
        description: 'Reduced inference time by 40% through model optimization and deployment strategies',
        order_index: 2
      },
      {
        id: 3,
        description: 'Built multi-agent orchestration system automating end-to-end RCM workflows',
        order_index: 3
      },
      {
        id: 4,
        description: 'Delivered AI tools for CPT code explanation, denial analysis, and timely filing compliance',
        order_index: 4
      }
    ],
    projects: [],
    technologies: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'LangChain' },
      { id: 3, name: 'LangGraph' },
      { id: 4, name: 'RAG' },
      { id: 5, name: 'OpenAI' },
      { id: 6, name: 'FastAPI' },
      { id: 7, name: 'Docker' },
      { id: 8, name: 'AWS' }
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
  { id: 2, name: 'LangChain', category: 'LLM Frameworks', proficiency: 92, icon: '🦜', order_index: 1, created_at: new Date().toISOString() },
  { id: 3, name: 'LangGraph', category: 'LLM Frameworks', proficiency: 90, icon: '🕸️', order_index: 2, created_at: new Date().toISOString() },
  { id: 4, name: 'AWS', category: 'Cloud & Deployment', proficiency: 85, icon: '☁️', order_index: 1, created_at: new Date().toISOString() },
  { id: 5, name: 'OpenAI SDK', category: 'LLM Frameworks', proficiency: 95, icon: '🤖', order_index: 3, created_at: new Date().toISOString() },
];

export const fallbackSkillCategories = [
  {
    category: 'LLM & AI Frameworks',
    skills: [
      { name: 'LangChain', level: 92 },
      { name: 'LangGraph', level: 90 },
      { name: 'OpenAI SDK', level: 95 },
      { name: 'CrewAI', level: 85 },
      { name: 'Ollama', level: 88 },
      { name: 'OpenRouter', level: 82 },
      { name: 'LangSmith', level: 80 },
      { name: 'Hugging Face', level: 85 }
    ]
  },
  {
    category: 'Vector Databases & RAG',
    skills: [
      { name: 'FAISS', level: 88 },
      { name: 'ChromaDB', level: 87 },
      { name: 'Qdrant', level: 85 },
      { name: 'Supabase', level: 82 }
    ]
  },
  {
    category: 'Automation & No-Code AI',
    skills: [
      { name: 'n8n', level: 88 },
      { name: 'Make.com', level: 85 },
      { name: 'ElevenLabs', level: 80 },
      { name: 'Heygen', level: 78 }
    ]
  },
  {
    category: 'Programming & Data',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 88 },
      { name: 'Snowflake', level: 80 },
      { name: 'JavaScript', level: 80 }
    ]
  },
  {
    category: 'MLOps & Monitoring',
    skills: [
      { name: 'MLflow', level: 85 },
      { name: 'LangSmith', level: 80 },
      { name: 'Docker', level: 82 },
      { name: 'Git', level: 90 }
    ]
  },
  {
    category: 'Cloud & Deployment',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Vercel', level: 88 },
      { name: 'PythonAnywhere', level: 82 },
      { name: 'Supabase', level: 82 }
    ]
  }
];

export const fallbackSpecializations = [
  'LLM Application Development',
  'RAG Systems',
  'Multi-Agent AI',
  'Prompt Engineering',
  'AI Automation (n8n / Make.com)',
  'Natural Language Processing',
  'MLOps & Model Monitoring',
  'Vector Search & Embeddings',
  'AI Voice & Avatar (ElevenLabs / Heygen)',
  'Cloud Deployment (AWS / Vercel)'
];

export const fallbackGitHubRepos = [
  {
    id: 1,
    name: 'AI-Meeting-Intelligence-System',
    full_name: 'zahid111777/AI-Meeting-Intelligence-System',
    description: 'Meeting intelligence platform - Transcribe, analyze, and extract actionable insights from meetings using AI',
    html_url: 'https://github.com/zahid111777/AI-Meeting-Intelligence-System',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-09T18:29:56Z',
    fork: false,
  },
  {
    id: 2,
    name: 'Multi-Agent-AI-Research-System',
    full_name: 'zahid111777/Multi-Agent-AI-Research-System',
    description: 'Multi-agent orchestration framework - Coordinate multiple AI agents for collaborative research and task execution',
    html_url: 'https://github.com/zahid111777/Multi-Agent-AI-Research-System',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-09T18:26:45Z',
    fork: false,
  },
  {
    id: 3,
    name: 'Prompt-Engineering-Playground',
    full_name: 'zahid111777/Prompt-Engineering-Playground',
    description: 'Interactive prompt engineering environment - Experiment with different prompts and optimize LLM outputs',
    html_url: 'https://github.com/zahid111777/Prompt-Engineering-Playground',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-09T18:22:14Z',
    fork: false,
  },
  {
    id: 4,
    name: 'AI-codebase-understanding-system',
    full_name: 'zahid111777/AI-codebase-understanding-system',
    description: 'Codebase intelligence tool - Analyze and understand large codebases using semantic search and AI',
    html_url: 'https://github.com/zahid111777/AI-codebase-understanding-system',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-09T18:09:11Z',
    fork: false,
  },
  {
    id: 5,
    name: 'Hotel-expenses-tracker',
    full_name: 'zahid111777/Hotel-expenses-tracker',
    description: 'Hotel expense management dashboard - Track and analyze hotel expenses with React and JavaScript',
    html_url: 'https://github.com/zahid111777/Hotel-expenses-tracker',
    homepage: 'https://hotel-expenses-tracker.vercel.app',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-09T12:47:03Z',
    fork: false,
  },
  {
    id: 6,
    name: 'Denial-Reason-Analyzer',
    full_name: 'zahid111777/Denial-Reason-Analyzer',
    description: 'Intelligent claim denial analysis system - Analyze denial reasons and extract insights from healthcare data',
    html_url: 'https://github.com/zahid111777/Denial-Reason-Analyzer',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-05T19:05:42Z',
    fork: false,
  },
  {
    id: 7,
    name: 'Timely-Filing-Limit-Assistant',
    full_name: 'zahid111777/Timely-Filing-Limit-Assistant',
    description: 'Healthcare compliance tool - Track and manage timely filing limits for medical claims using AI',
    html_url: 'https://github.com/zahid111777/Timely-Filing-Limit-Assistant',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-05T18:57:13Z',
    fork: false,
  },
  {
    id: 8,
    name: 'CPT-Code-Explanation-AI',
    full_name: 'zahid111777/CPT-Code-Explanation-AI',
    description: 'AI assistant for healthcare CPT code analysis - Provide explanations and coding guidance for medical billing',
    html_url: 'https://github.com/zahid111777/CPT-Code-Explanation-AI',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-05T18:45:58Z',
    fork: false,
  },
  {
    id: 9,
    name: 'CHATBOT_WITH_MEMORY',
    full_name: 'zahid111777/CHATBOT_WITH_MEMORY',
    description: 'Stateful chatbot with conversation memory - Maintain context across multiple exchanges using LangChain',
    html_url: 'https://github.com/zahid111777/CHATBOT_WITH_MEMORY',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-04T18:53:26Z',
    fork: false,
  },
  {
    id: 10,
    name: 'AI_PDF_Q-A',
    full_name: 'zahid111777/AI_PDF_Q-A',
    description: 'PDF Question-Answering system - Extract insights from documents using RAG and vector embeddings',
    html_url: 'https://github.com/zahid111777/AI_PDF_Q-A',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-04T18:49:25Z',
    fork: false,
  },
  {
    id: 11,
    name: 'AI_EMAIL_WRITER',
    full_name: 'zahid111777/AI_EMAIL_WRITER',
    description: 'AI email composition assistant - Generate professional emails with customizable tone and style',
    html_url: 'https://github.com/zahid111777/AI_EMAIL_WRITER',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-04T18:45:45Z',
    fork: false,
  },
  {
    id: 12,
    name: 'AI_CODE_EXPLAINER',
    full_name: 'zahid111777/AI_CODE_EXPLAINER',
    description: 'Code explanation tool - Understand complex code snippets with AI-powered analysis and documentation',
    html_url: 'https://github.com/zahid111777/AI_CODE_EXPLAINER',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-04T18:39:58Z',
    fork: false,
  },
  {
    id: 13,
    name: 'AI_BLOG_GENERATOR',
    full_name: 'zahid111777/AI_BLOG_GENERATOR',
    description: 'Generate high-quality blog posts automatically using AI and advanced prompting techniques',
    html_url: 'https://github.com/zahid111777/AI_BLOG_GENERATOR',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-04T18:28:36Z',
    fork: false,
  },
  {
    id: 14,
    name: 'AI-Text-Summarizer',
    full_name: 'zahid111777/AI-Text-Summarizer',
    description: 'Intelligent text summarization tool powered by LLMs for quick content digestion',
    html_url: 'https://github.com/zahid111777/AI-Text-Summarizer',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-03T18:07:32Z',
    fork: false,
  },
  {
    id: 15,
    name: 'AI_RESUME_GENERATOR',
    full_name: 'zahid111777/AI_RESUME_GENERATOR',
    description: 'AI-powered resume generator - Automatically create professional resumes using LLMs and prompt engineering',
    html_url: 'https://github.com/zahid111777/AI_RESUME_GENERATOR',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2026-03-03T17:54:12Z',
    fork: false,
  },
  {
    id: 16,
    name: 'Hackthon-Rag-Agent',
    full_name: 'zahid111777/Hackthon-Rag-Agent',
    description: 'AI research agent built during a hackathon using RAG architecture for intelligent document-based Q&A',
    html_url: 'https://github.com/zahid111777/Hackthon-Rag-Agent',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2025-11-25T06:56:01Z',
    fork: false,
  },
  {
    id: 17,
    name: 'agent-rag',
    full_name: 'zahid111777/agent-rag',
    description: 'AI research agent using Retrieval-Augmented Generation for knowledge-grounded intelligent responses',
    html_url: 'https://github.com/zahid111777/agent-rag',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2025-11-21T08:09:24Z',
    fork: false,
  },
  {
    id: 19,
    name: 'OgranicStore',
    full_name: 'zahid111777/OgranicStore',
    description: 'This ecommerce store basically design for organic things.',
    html_url: 'https://github.com/zahid111777/OgranicStore',
    homepage: null,
    language: 'HTML',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2025-11-06T10:39:08Z',
    fork: false,
  },
  {
    id: 20,
    name: 'video-downloader-streamlit',
    full_name: 'zahid111777/video-downloader-streamlit',
    description: 'Video downloader application built with Streamlit - Download and manage videos with a simple web interface',
    html_url: 'https://github.com/zahid111777/video-downloader-streamlit',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2025-08-11T15:32:42Z',
    fork: false,
  },
  {
    id: 21,
    name: 'MyFastApi',
    full_name: 'zahid111777/MyFastApi',
    description: 'Smart video downloader built with FastAPI',
    html_url: 'https://github.com/zahid111777/MyFastApi',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: '2025-08-11T13:32:02Z',
    fork: false,
  },
];

export const fallbackContactInfo = {
  id: 1,
  email: "zahid@example.com",
  phone: "+92-123-456-7890",
  location: "Bagh AJK, Pakistan",
  linkedin_url: "https://linkedin.com/in/zahidrashid",
  github_url: "https://github.com/zahid111777",
  website_url: "https://zahidrashid.dev",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};