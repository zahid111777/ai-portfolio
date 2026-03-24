import React, { useState, useEffect } from 'react';
import { fallbackGitHubRepos } from '../data/fallbackData';

const GITHUB_USERNAME = 'zahid111777';
const EXCLUDED_REPOS = ['zahid111777'];

const LANGUAGE_COLORS: Record<string, string> = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
};

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    updated_at: string;
    fork: boolean;
}

const FILTER_CATEGORIES = ['All', 'Python', 'JavaScript', 'TypeScript', 'HTML'];

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
                    { headers: { Accept: 'application/vnd.github.v3+json' } }
                );
                if (!response.ok) throw new Error('GitHub API error');
                const data: GitHubRepo[] = await response.json();
                const filtered = data.filter(r => !EXCLUDED_REPOS.includes(r.name) && !r.fork);
                setRepos(filtered.length > 0 ? filtered : fallbackGitHubRepos);
            } catch {
                setRepos(fallbackGitHubRepos);
            } finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    const displayRepos = repos.filter(repo => {
        if (filter === 'All') return true;
        return repo.language === filter;
    });

    return (
        <section className="projects-section">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <p className="projects-subtitle">
                    Open-source projects live on GitHub — from AI agents and LLM tools to full-stack apps.
                </p>

                <div className="project-filters">
                    {FILTER_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn${filter === cat ? ' active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="projects-loading">
                        <div className="loading-spinner"></div>
                        <p>Fetching projects from GitHub...</p>
                    </div>
                ) : (
                    <>
                        <div className="projects-grid-github">
                            {displayRepos.map(repo => {
                                const langColor = LANGUAGE_COLORS[repo.language || ''] || '#444';
                                const displayName = repo.name.replace(/[-_]/g, ' ');
                                return (
                                    <div key={repo.id} className="project-card-github">
                                        <div
                                            className="project-lang-banner"
                                            style={{ background: `linear-gradient(135deg, ${langColor}cc, ${langColor}55)` }}
                                        >
                                            <span className="project-lang-icon">
                                                {repo.language === 'Python' && '🐍'}
                                                {repo.language === 'JavaScript' && '⚡'}
                                                {repo.language === 'TypeScript' && '🔷'}
                                                {repo.language === 'HTML' && '🌐'}
                                                {!['Python', 'JavaScript', 'TypeScript', 'HTML'].includes(repo.language || '') && '💻'}
                                            </span>
                                            <span className="project-lang-label">{repo.language || 'Code'}</span>
                                        </div>

                                        <div className="project-card-body">
                                            <h3 className="project-title">{displayName}</h3>
                                            <p className="project-description">
                                                {repo.description || 'No description provided.'}
                                            </p>

                                            <div className="project-stats">
                                                <span className="project-stat">⭐ {repo.stargazers_count}</span>
                                                <span className="project-stat">🍴 {repo.forks_count}</span>
                                            </div>

                                            <div className="project-technologies">
                                                {repo.language && (
                                                    <span className="tech-tag" style={{ borderColor: langColor, color: langColor }}>
                                                        {repo.language}
                                                    </span>
                                                )}
                                                {repo.topics?.slice(0, 3).map(topic => (
                                                    <span key={topic} className="tech-tag">{topic}</span>
                                                ))}
                                            </div>

                                            <div className="project-actions">
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link-btn"
                                                >
                                                    View on GitHub →
                                                </a>
                                                {repo.homepage && (
                                                    <a
                                                        href={repo.homepage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="project-link-btn project-link-btn--secondary"
                                                    >
                                                        Live Demo →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="github-cta">
                            <a
                                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-cta-btn"
                            >
                                View All {repos.length} Repositories on GitHub
                            </a>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Projects;
