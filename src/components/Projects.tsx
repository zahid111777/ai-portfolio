import React from 'react';

const Projects: React.FC = () => {
    const projects = [
        {
            title: 'Intelligent Customer Analytics Platform',
            description: 'End-to-end ML platform for customer behavior prediction and segmentation using advanced deep learning techniques.',
            technologies: ['Python', 'TensorFlow', 'AWS', 'React', 'SQL'],
            features: [
                'Real-time customer behavior prediction',
                'Advanced customer segmentation algorithms',
                'Interactive analytics dashboard',
                'Automated model retraining pipeline'
            ],
            metrics: ['25% increase in customer retention', '40% improvement in marketing ROI'],
            githubUrl: 'https://github.com/zahidrashid',
            liveUrl: 'https://analytics-platform.demo.com',
            image: '/projects/analytics-platform.jpg'
        },
        {
            title: 'AI-Powered Content Recommendation Engine',
            description: 'Scalable recommendation system using collaborative filtering and deep learning for personalized content delivery.',
            technologies: ['PyTorch', 'FastAPI', 'Docker', 'MongoDB'],
            features: [
                'Hybrid recommendation algorithms',
                'Real-time inference API',
                'A/B testing framework',
                'Scalable microservices architecture'
            ],
            metrics: ['35% increase in user engagement', '50% reduction in content discovery time'],
            githubUrl: 'https://github.com/zahidrashid',
            liveUrl: 'https://recommendation-engine.demo.com',
            image: '/projects/recommendation-engine.jpg'
        },
        {
            title: 'Computer Vision Quality Control System',
            description: 'Automated quality inspection system using computer vision and deep learning for manufacturing processes.',
            technologies: ['OpenCV', 'TensorFlow', 'Flask', 'PostgreSQL', 'Docker'],
            features: [
                'Real-time defect detection',
                'Multi-class classification',
                'Production line integration',
                'Quality metrics dashboard'
            ],
            metrics: ['99.2% accuracy in defect detection', '60% reduction in manual inspection time'],
            githubUrl: 'https://github.com/zahidrashid',
            image: '/projects/quality-control.jpg'
        }
    ];

    return (
        <section className="projects-section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        <a href={project.githubUrl} className="project-link">GitHub</a>
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} className="project-link">Live Demo</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                
                                <div className="project-features">
                                    <h4>Key Features:</h4>
                                    <ul>
                                        {project.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-metrics">
                                    <h4>Impact:</h4>
                                    <ul>
                                        {project.metrics.map((metric, idx) => (
                                            <li key={idx}>{metric}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-technologies">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
