import React from 'react';
import { skillsAPI } from '../services/api';
import { useAPI } from '../hooks/useAPI';
import { fallbackSkillCategories, fallbackSpecializations } from '../data/fallbackData';

const Skills: React.FC = () => {
    // Fetch skills from API with fallback data
    const { data: skillCategories } = useAPI(() => skillsAPI.getAll(), fallbackSkillCategories);
    const { data: specializations } = useAPI(() => skillsAPI.getCategories(), fallbackSpecializations);

    return (
        <section className="skills-section">
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>
                
                <div className="skills-grid">
                    {skillCategories.map((category: any, index: number) => (
                        <div key={index} className="skill-category">
                            <h3 className="category-title">{category.category}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill: any, idx: number) => (
                                    <div key={idx} className="skill-item">
                                        <div className="skill-info">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-level">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div 
                                                className="skill-progress" 
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="specializations">
                    <h3 className="specializations-title">AI Specializations</h3>
                    <div className="specializations-grid">
                        {specializations.map((spec: string, index: number) => (
                            <div key={index} className="specialization-card">
                                <span className="specialization-name">{spec}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
