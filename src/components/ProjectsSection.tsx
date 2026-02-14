import { useAuth } from "@/contexts/AuthContext";
import { projects as allProjects } from "@/data/projects";
import { ExternalLink, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

const ProjectsSection = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Get exclusive projects with IDs 1, 3, 7, 8
  const exclusiveProjectIds = ['1', '3', '7', '8'];
  const exclusiveProjects = allProjects.filter(p => exclusiveProjectIds.includes(p.id));

  const handleProjectClick = (e: React.MouseEvent, projectUrl?: string) => {
    if (!user) {
      e.preventDefault();
      setShowAuthModal(true);
      return;
    }
    if (projectUrl) {
      window.open(projectUrl, '_blank');
    }
  };

  return (
    <>
      <section id="projects" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase mb-4 tracking-tighter text-center">
          Exclusive<span className="text-neo-green">_Projects</span>
        </h2>
        <p className="font-mono text-center text-muted-foreground mb-4 max-w-2xl mx-auto text-sm sm:text-base">
          Check Out the Most Exclusive Projects — Discover a collection of powerful cybersecurity tools and Full Stack Web-Apps projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {exclusiveProjects.map((p, i) => (
            <article
              key={p.id}
              className={`reveal group bg-card border-2 sm:border-4 border-foreground p-4 sm:p-6 shadow-hard hover:shadow-hard-xl transition-all ${i % 2 !== 0 ? "md:mt-16" : ""} relative`}
            >
              {/* Lock Badge if not authenticated */}
              {!user && (
                <div className="absolute top-4 right-4 z-10 bg-neo-red border-2 border-foreground px-2 py-1 shadow-hard flex items-center gap-1">
                  <Lock size={14} />
                  <span className="font-mono text-xs font-bold">LOCKED</span>
                </div>
              )}

              {/* Project Image */}
              <div className="bg-foreground border-2 border-foreground aspect-video relative overflow-hidden mb-6 flex items-center justify-center">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className={`w-full h-full object-cover ${!user ? 'blur-sm' : ''}`}
                  />
                ) : (
                  <span className="text-neo-green font-mono text-6xl opacity-30 font-black">
                    {`0${parseInt(p.id)}`}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-3xl font-black uppercase mb-2 transition-colors glitch-hover group-hover:text-neo-green">
                    {p.title}
                  </h3>
                  <p className={`font-mono text-sm mb-4 text-muted-foreground ${!user ? 'line-clamp-2' : ''}`}>
                    {p.description}
                  </p>
                  <div className="flex gap-2 font-mono text-xs font-bold flex-wrap mb-3">
                    {p.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="bg-foreground text-background px-2 py-1">{t}</span>
                    ))}
                    {p.techStack.length > 3 && (
                      <span className="bg-neo-pink text-foreground border-2 border-foreground px-2 py-1">
                        +{p.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="inline-block px-2 py-1 bg-neo-cyan/20 border border-foreground text-xs font-mono font-bold">
                    {p.category}
                  </div>
                </div>

                <button
                  onClick={(e) => handleProjectClick(e, p.liveUrl)}
                  className="w-12 h-12 border-2 border-foreground bg-neo-green flex items-center justify-center hover:bg-foreground hover:text-background transition-all shadow-hard-sm shrink-0 ml-4"
                  title={user ? "View Project" : "Login to view"}
                >
                  {user ? <ExternalLink size={24} /> : <Lock size={24} />}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          {user ? (
            <Link
              to="/projects"
              className="neo-btn inline-block bg-foreground text-background px-8 sm:px-12 py-4 sm:py-5 font-mono text-base sm:text-xl border-2 sm:border-4 border-foreground shadow-hard hover:bg-background hover:text-foreground"
            >
              VIEW ALL PROJECTS
            </Link>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="neo-btn inline-block bg-foreground text-background px-8 sm:px-12 py-4 sm:py-5 font-mono text-base sm:text-xl border-2 sm:border-4 border-foreground shadow-hard hover:bg-background hover:text-foreground flex items-center gap-3 mx-auto"
            >
              <Lock size={24} />
              SIGN IN TO VIEW ALL PROJECTS
            </button>
          )}
          <p className="font-mono text-xs text-muted-foreground mt-2">
            {user ? "* Access granted - View all projects" : "* Authentication required to access projects"}
          </p>
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default ProjectsSection;
