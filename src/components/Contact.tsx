import React, { useState } from 'react';
import { contactAPI } from '../services/api';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            await contactAPI.sendMessage(formData);
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully.'
            });
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Sorry, there was an error sending your message. Please try again or contact me directly via email.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always interested in discussing new opportunities, 
                            innovative AI projects, or potential collaborations. 
                            Feel free to reach out!
                        </p>
                        
                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-label">Email:</span>
                                <a href="mailto:zahidrasheed0123@gmail.com">zahid.rasheed0123@gmail.com</a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">LinkedIn:</span>
                                <a href="https://pk.linkedin.com/in/zahid-rashid-3464b5260" target="_blank" rel="noopener noreferrer">
                                    linkedin.com/in/zahid-rashid-3464b5260
                                </a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Location:</span>
                                <span>Pakistan</span>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="https://github.com/zahidrashid" className="social-link">GitHub</a>
                            <a href="https://pk.linkedin.com/in/zahid-rashid-3464b5260" className="social-link">LinkedIn</a>
                            <a href="https://twitter.com/zahidrashid" className="social-link">Twitter</a>
                        </div>
                    </div>

                    <div className="contact-form">
                        {submitStatus.type && (
                            <div className={`alert alert-${submitStatus.type}`}>
                                {submitStatus.message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
