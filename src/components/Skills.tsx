import React from 'react';

const Skills: React.FC = () => {
    const skillCategories = [
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
                // { name: 'TypeScript', level: 80 },
                // { name: 'R', level: 75 },
                { name: 'SQL', level: 90 }
            ]
        },
        {
            category: 'Cloud & DevOps',
            skills: [
                { name: 'AWS', level: 85 },
                { name: 'Docker', level: 80 },
                // { name: 'Kubernetes', level: 75 },
                { name: 'MLflow', level: 85 },
                { name: 'Git', level: 90 }
            ]
        },
        {
            category: 'Data & Databases',
            skills: [
                { name: 'PostgreSQL', level: 85 },
                { name: 'MongoDB', level: 80 },
                // { name: 'Redis', level: 75 },
                // { name: 'Apache Spark', level: 70 },
                // { name: 'Elasticsearch', level: 65 }
            ]
        }
    ];

    const specializations = [
        'Computer Vision',
        'Natural Language Processing',
        'Deep Learning',
        'Predictive Analytics',
        'Time Series Forecasting',
        'Recommendation Systems',
        'MLOps',
        'Data Engineering'
    ];

    return (
        <section className="skills-section">
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>
                
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category">
                            <h3 className="category-title">{category.category}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, idx) => (
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
                        {specializations.map((spec, index) => (
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
