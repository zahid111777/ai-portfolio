import React from 'react';

const Experience: React.FC = () => {
    const experiences = [
        {
            title: 'Senior AI Engineer',
            company: 'CareCloud',
            duration: 'Jan 2025 - Present',
            location: 'Bagh AJK, Pakistan',
            type: 'Full-time',
            responsibilities: [
                'Lead development of machine learning models for predictive analytics and business intelligence',
                'Architect and implement scalable AI solutions using TensorFlow, PyTorch, and cloud platforms',
                'Collaborate with cross-functional teams to integrate AI solutions into existing products',
                'Mentor junior developers and conduct technical workshops on AI/ML best practices'
            ],
            achievements: [
                'Increased model accuracy by 25% through advanced optimization techniques',
                'Reduced inference time by 40% through model optimization and deployment strategies',
                'Led a team of 5 engineers in developing a real-time recommendation system',
                'Presented research findings at Pakistan AI Summit 2023',
                'RCM automation'
            ],
            technologies: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker','Langchain','LangGraph','Rag']
        },
        {
            title: 'AI/ML Engineer',
            company: 'CareCloud',
            duration: 'Jan 2024 - Dec 2024',
            location: 'Bagh AJK, Pakistan',
            type: 'Full-time',
            responsibilities: [
                'Developed end-to-end machine learning pipelines for data processing and model training',
                'Built computer vision models for image classification and object detection',
                'Implemented natural language processing solutions for text analysis',
                'Created data visualization dashboards for business stakeholders'
            ],
            achievements: [
                'Deployed 10+ ML models in production with 99.5% uptime',
                'Improved data processing efficiency by 35% through pipeline optimization',
                'Developed an automated anomaly detection system that reduced manual monitoring by 60%',
                'Work on the Charges automation'
            ],
            technologies: ['Python', 'Scikit-learn', 'OpenCV', 'NLTK', 'SQL', 'FastAPI','Selenium','PyautoGui','PYAutoIT']
        },
        {
            title: 'Junior Data Scientist (Internship)',
            company: 'CareCloud',
            duration: 'May 2023 - Dec 2023',
            location: 'Bagh AJK, Pakistan',
            type: 'Internship',
            responsibilities: [
                'Learned foundational data science concepts and machine learning algorithms',
                'Gained hands-on experience with Python programming and data manipulation libraries',
                'Developed understanding of statistical analysis and data visualization techniques',
                'Participated in team projects to apply theoretical knowledge to real-world problems',
                'Studied deep learning concepts and transformer architectures'
            ],
            achievements: [
                'Successfully completed comprehensive training in Python, Flask, SQL, NumPy, Pandas, and Matplotlib',
                'Mastered Scikit-learn for machine learning model development',
                'Gained proficiency in deep learning frameworks and transformer models',
                'Built beginner-level projects demonstrating core data science skills'
            ],
            projects: [
                'House Price Prediction Model using Linear Regression and Random Forest',
                'Customer Segmentation Analysis using K-means Clustering',
                'Sentiment Analysis of Product Reviews using NLP techniques',
                'Sales Forecasting Dashboard with interactive visualizations',
                'Image Classification project using CNN for digit recognition'
            ],
            technologies: ['Python', 'Flask', 'SQL', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Deep Learning', 'Transformers']
        }
    ];

    return (
        <section className="experience-section">
            <div className="container">
                <h2 className="section-title">Professional Experience</h2>
                <div className="timeline">
                    {experiences.map((experience, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <div className="experience-header">
                                    <h3 className="job-title">{experience.title}</h3>
                                    <div className="company-info">
                                        <span className="company">{experience.company}</span>
                                        <span className="location">{experience.location}</span>
                                        <span className="type">{experience.type}</span>
                                    </div>
                                    <span className="duration">{experience.duration}</span>
                                </div>
                                
                                <div className="experience-details">
                                    <div className="responsibilities">
                                        <h4>Key Responsibilities:</h4>
                                        <ul>
                                            {experience.responsibilities.map((responsibility, idx) => (
                                                <li key={idx}>{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="achievements">
                                        <h4>Key Achievements:</h4>
                                        <ul>
                                            {experience.achievements.map((achievement, idx) => (
                                                <li key={idx}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {(experience as any).projects && (
                                        <div className="projects">
                                            <h4>Projects Completed:</h4>
                                            <ul>
                                                {(experience as any).projects.map((project: string, idx: number) => (
                                                    <li key={idx}>{project}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="technologies">
                                        <h4>Technologies Used:</h4>
                                        <div className="tech-tags">
                                            {experience.technologies.map((tech, idx) => (
                                                <span key={idx} className="tech-tag">{tech}</span>
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

// i have made some changes in my experience now update like this 

// i want to update the text of Junior datascientist internship

// during internship
// i learnt PYthon, flask, sql,numpy,pandas,matplot,sciketlearn deeplearning,transfomer

// add some project as beginer level at this stage