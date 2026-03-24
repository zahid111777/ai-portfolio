import React from 'react';
import { experienceAPI } from '../services/api';
import { useAPI } from '../hooks/useAPI';
import { fallbackExperiences } from '../data/fallbackData';

const Experience: React.FC = () => {
    // Fetch experiences from API with fallback data - refresh when experiences change
    const { data: experiences } = useAPI(() => experienceAPI.getAll(), fallbackExperiences, {
        refreshOn: ['experiences']
    });

    return (
        <section className="experience-section">
            <div className="container">
                <h2 className="section-title">Professional Experience</h2>
                <div className="timeline">
                    {experiences.map((experience: any, index: number) => (
                        <div key={experience.id} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <div className="experience-header">
                                    <h3 className="job-title">{experience.title}</h3>
                                    <div className="company-info">
                                        <span className="company">{experience.company}</span>
                                        <span className="location">{experience.location}</span>
                                        <span className="type">{experience.employment_type}</span>
                                    </div>
                                    <span className="duration">{experience.duration}</span>
                                </div>
                                
                                <div className="experience-details">
                                    <div className="responsibilities">
                                        <h4>Key Responsibilities:</h4>
                                        <ul>
                                            {experience.responsibilities.map((resp: any) => (
                                                <li key={resp.id}>{resp.description}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="achievements">
                                        <h4>Key Achievements:</h4>
                                        <ul>
                                            {experience.achievements.map((achievement: any) => (
                                                <li key={achievement.id}>{achievement.description}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {experience.projects && experience.projects.length > 0 && (
                                        <div className="projects">
                                            <h4>Notable Projects:</h4>
                                            <ul>
                                                {experience.projects.map((project: any) => (
                                                    <li key={project.id}>
                                                        <strong>{project.name}</strong>
                                                        {project.description && <span> - {project.description}</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="technologies">
                                        <h4>Technologies Used:</h4>
                                        <div className="tech-tags">
                                            {experience.technologies.map((tech: any) => (
                                                <span key={tech.id} className="tech-tag">{tech.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience; 

// i want to update the text of Junior datascientist internship

// during internship
// i learnt PYthon, flask, sql,numpy,pandas,matplot,sciketlearn deeplearning,transfomer

// add some project as beginer level at this stage