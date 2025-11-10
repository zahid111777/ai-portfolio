import React from 'react';
import { projectsAPI } from '../services/api';
import { useAPI } from '../hooks/useAPI';
import { fallbackProjects } from '../data/fallbackData';

const Projects: React.FC = () => {
    // Fetch projects from API with fallback data - refresh when projects change
    const { data: projects } = useAPI(() => projectsAPI.getAll(true), fallbackProjects, {
        refreshOn: ['projects']
    });

    return (
        <section className="projects-section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projects.map((project: any, index: number) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        <a href={project.github_url} className="project-link">GitHub</a>
                                        {project.live_url && (
                                            <a href={project.live_url} className="project-link">Live Demo</a>
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
                                        {project.features.map((feature: any, idx: number) => (
                                            <li key={feature.id}>{feature.description}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-metrics">
                                    <h4>Impact:</h4>
                                    <ul>
                                        {project.metrics.map((metric: any, idx: number) => (
                                            <li key={metric.id}>{metric.description}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-technologies">
                                    {project.technologies.map((tech: any, idx: number) => (
                                        <span key={tech.id} className="tech-tag">{tech.name}</span>
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
