import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/zahid-profile.jpeg';
import { aboutAPI } from '../services/api';
import { useAPI } from '../hooks/useAPI';
import { fallbackAboutInfo, fallbackHighlights } from '../data/fallbackData';

const About: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [typedText, setTypedText] = useState('');
    
    // Fetch data from API with fallbacks
    const { data: aboutInfo } = useAPI(() => aboutAPI.getInfo(), fallbackAboutInfo);
    const { data: highlights } = useAPI(() => aboutAPI.getHighlights(), fallbackHighlights);
    
    const fullText = aboutInfo.title;

    useEffect(() => {
        // Typing animation
        let i = 0;
        const typeWriter = () => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);

        // Particle system
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            opacity: number;
            color: string;
        }> = [];

        const colors = ['#00d4ff', '#ff006b', '#00ff94', '#ff4d00'];

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.shadowBlur = 15;
                ctx.shadowColor = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + '40';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw connections
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        // Counter animation
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count') || '0');
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current).toString();
                }, 50);
            });
        };

        setTimeout(animateCounters, 2000);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [fullText]);

    return (
        <section className="about-section">
            <canvas ref={canvasRef} className="particle-canvas" />
            
            <div className="container">
                <div className="hero-container">
                    <div className="hero-content">
                    <div className="greeting">
                        <span className="wave">👋</span>
                        <span className="hello-text">Hello, I'm</span>
                    </div>
                    
                    <h1 className="name">
                        <span className="first-name">{aboutInfo.name.split(' ')[0]}</span>
                        <span className="last-name">{aboutInfo.name.split(' ')[1]}</span>
                        <div className="name-underline"></div>
                    </h1>
                    <div className="title-container">
                        <h2 className="title">
                            <span className="typed-text">{typedText}</span>
                            <span className="cursor blinking">|</span>
                        </h2>
                    </div>
                    <p className="description">
                        {aboutInfo.description}
                    </p>
                    
                    <div className="highlights">
                        {highlights.map((highlight: any) => (
                            <div key={highlight.id} className="highlight-item">
                                <div className="highlight-icon">{highlight.icon}</div>
                                <span>{highlight.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number" data-count={aboutInfo.years_experience}>0</span><span className="plus">+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number" data-count={aboutInfo.ai_projects}>0</span><span className="plus">+</span>
                            <span className="stat-label">AI Projects</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number" data-count={aboutInfo.ml_models}>0</span><span className="plus">+</span>
                            <span className="stat-label">ML Models</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number" data-count={aboutInfo.accuracy_rate}>0</span><span className="plus">%</span>
                            <span className="stat-label">Accuracy Rate</span>
                        </div>
                    </div>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn-primary">
                            <span className="btn-text">Get In Touch</span>
                        </Link>
                        <a href={aboutInfo.cv_url || "/resume.pdf"} className="btn-secondary">
                            <span className="btn-text">Download CV</span>
                            <svg className="download-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="profile-container">
                        <div className="profile-photo">
                            <img src={aboutInfo.profile_image || profileImage} alt={`${aboutInfo.name} - ${aboutInfo.title}`} />
                            <div className="photo-ring ring1"></div>
                            <div className="photo-ring ring2"></div>
                            <div className="photo-ring ring3"></div>
                            <div className="photo-glow"></div>
                        </div>
                        
                        <div className="floating-elements">
                            <div className="float-element ai-badge">
                                <span>AI</span>
                            </div>
                            <div className="float-element ml-badge">
                                <span>ML</span>
                            </div>
                            <div className="float-element dl-badge">
                                <span>DL</span>
                            </div>
                            <div className="float-element cv-badge">
                                <span>CV</span>
                            </div>
                            <div className="float-element nlp-badge">
                                <span>NLP</span>
                            </div>
                        </div>

                        <div className="code-rain">
                            <div className="code-line">import tensorflow as tf</div>
                            <div className="code-line">model = Sequential()</div>
                            <div className="code-line">model.compile(optimizer='adam')</div>
                            <div className="code-line">model.fit(X_train, y_train)</div>
                            <div className="code-line">predictions = model.predict(X_test)</div>
                        </div>

                        <div className="neural-network">
                            <div className="layer input-layer">
                                <div className="neuron"></div>
                                <div className="neuron"></div>
                                <div className="neuron"></div>
                            </div>
                            <div className="layer hidden-layer">
                                <div className="neuron"></div>
                                <div className="neuron"></div>
                                <div className="neuron"></div>
                                <div className="neuron"></div>
                            </div>
                            <div className="layer output-layer">
                                <div className="neuron"></div>
                                <div className="neuron"></div>
                            </div>
                            <svg className="connections">
                                <line x1="50" y1="30" x2="150" y2="20" stroke="url(#gradient1)" strokeWidth="2"/>
                                <line x1="50" y1="60" x2="150" y2="40" stroke="url(#gradient1)" strokeWidth="2"/>
                                <line x1="50" y1="90" x2="150" y2="60" stroke="url(#gradient1)" strokeWidth="2"/>
                                <line x1="150" y1="40" x2="250" y2="50" stroke="url(#gradient2)" strokeWidth="2"/>
                                <line x1="150" y1="60" x2="250" y2="70" stroke="url(#gradient2)" strokeWidth="2"/>
                                <defs>
                                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8"/>
                                        <stop offset="100%" stopColor="#ff006b" stopOpacity="0.8"/>
                                    </linearGradient>
                                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ff006b" stopOpacity="0.8"/>
                                        <stop offset="100%" stopColor="#00ff94" stopOpacity="0.8"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
            <div className="scroll-indicator">
                <div className="scroll-text">Scroll to explore</div>
                <div className="scroll-arrow">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Floating Background Elements */}
            <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="shape shape4"></div>
            </div>
        </section>
    );
};

export default About;
