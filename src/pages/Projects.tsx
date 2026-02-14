import Navbar from '@/components/Navbar';
import PageLoader from '@/components/PageLoader';
import ScrollReveal from '@/components/ScrollReveal';
import { useAuth } from '@/contexts/AuthContext';
import { projects } from '@/data/projects';
import { ExternalLink, Filter, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        // Simulate loading for smooth transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Ensure scroll to top when page loads
        window.scrollTo(0, 0);
    }, []);

    if (authLoading || isLoading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <>
            <ScrollReveal />
            <Navbar />
            <div className="min-h-screen bg-background pt-24 pb-16 px-4" style={{ pointerEvents: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 reveal">
                        <div className="inline-block bg-neo-green border-2 border-foreground px-4 py-1 mb-6 shadow-hard rotate-[-1deg]">
                            <span className="font-mono font-bold">● PROJECTS DATABASE</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                            ALL <span className="text-background text-stroke-black">PROJECTS</span>
                        </h1>
                        <p className="font-mono text-lg max-w-2xl bg-neo-cyan border-2 border-foreground p-4 shadow-hard">
                            $ ls -la /projects/* <br />
                            <span className="text-sm">Showing {filteredProjects.length} project(s)</span>
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Filter size={20} />
                            <span className="font-bold text-lg">FILTER BY CATEGORY:</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedCategory(category);
                                    }}
                                    className={`neo-btn px-6 py-3 border-2 border-foreground shadow-hard font-bold uppercase text-sm cursor-pointer ${selectedCategory === category
                                        ? 'bg-foreground text-background'
                                        : 'bg-background text-foreground hover:bg-neo-yellow'
                                        }`}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="bg-background border-4 border-foreground shadow-hard overflow-hidden hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all reveal"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Project Image */}
                                <div className="relative h-48 bg-neo-blue/20 border-b-4 border-foreground overflow-hidden">
                                    {project.imageUrl ? (
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-6xl font-black opacity-20">?</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-neo-green border-2 border-foreground px-2 py-1 text-xs font-bold shadow-hard">
                                        #{project.id}
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-black uppercase mb-3 tracking-tight">
                                        {project.title}
                                    </h3>

                                    <p className="font-mono text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-background border-2 border-foreground text-xs font-bold shadow-hard"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack.length > 3 && (
                                            <span className="px-2 py-1 bg-neo-pink border-2 border-foreground text-xs font-bold shadow-hard">
                                                +{project.techStack.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Category Badge */}
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-neo-cyan/20 border-2 border-foreground text-xs font-bold">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 neo-btn bg-neo-green text-foreground border-2 border-foreground px-4 py-2 text-sm shadow-hard hover:bg-foreground hover:text-background flex items-center justify-center gap-2 cursor-pointer"
                                                style={{ pointerEvents: 'auto' }}
                                            >
                                                <ExternalLink size={16} />
                                                LIVE
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 neo-btn bg-background text-foreground border-2 border-foreground px-4 py-2 text-sm shadow-hard hover:bg-foreground hover:text-background flex items-center justify-center gap-2 cursor-pointer"
                                                style={{ pointerEvents: 'auto' }}
                                            >
                                                <Github size={16} />
                                                CODE
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Projects Message */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-block bg-neo-red border-4 border-foreground p-8 shadow-hard">
                                <p className="font-mono text-xl font-bold">
                                    NO PROJECTS FOUND IN THIS CATEGORY
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;
