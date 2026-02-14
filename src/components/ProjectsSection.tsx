import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Net Works",
    desc: "Networking utilities and tools for monitoring and securing network infrastructure.",
    tags: ["Python", "Networking", "Security"],
    color: "group-hover:text-neo-green",
  },
  {
    title: "Encryption Utilities",
    desc: "Collection of encryption tools for secure data handling and cryptographic operations.",
    tags: ["C++", "Cryptography", "AES"],
    color: "group-hover:text-neo-blue",
  },
  {
    title: "Front-End Web Dev",
    desc: "Secure front-end web development templates with best security practices baked in.",
    tags: ["React", "TypeScript", "Security"],
    color: "group-hover:text-neo-pink",
  },
  {
    title: "Secure Coding Templates",
    desc: "Boilerplate code with security-first approach for building resilient applications.",
    tags: ["Go", "Node.js", "OWASP"],
    color: "group-hover:text-neo-orange",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
    <h2 className="text-5xl md:text-8xl font-black uppercase mb-4 tracking-tighter text-center">
      Exclusive<span className="text-neo-green">_Projects</span>
    </h2>
    <p className="font-mono text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
      Check Out the Most Exclusive Projects — Discover a collection of powerful cybersecurity tools and Full Stack Web-Apps projects.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {projects.map((p, i) => (
        <article
          key={p.title}
          className={`reveal group bg-card border-4 border-foreground p-6 shadow-hard hover:shadow-hard-xl transition-all ${i % 2 !== 0 ? "md:mt-16" : ""}`}
        >
          <div className="bg-foreground border-2 border-foreground aspect-video relative overflow-hidden mb-6 flex items-center justify-center">
            <span className="text-neo-green font-mono text-6xl opacity-30 font-black">{`0${i + 1}`}</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-3xl font-black uppercase mb-2 transition-colors glitch-hover ${p.color}`}>
                {p.title}
              </h3>
              <p className="font-mono text-sm mb-4 max-w-xs text-muted-foreground">{p.desc}</p>
              <div className="flex gap-2 font-mono text-xs font-bold flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="bg-foreground text-background px-2 py-1">{t}</span>
                ))}
              </div>
            </div>
            <div className="w-12 h-12 border-2 border-foreground bg-neo-green flex items-center justify-center hover:bg-foreground hover:text-background transition-all shadow-hard-sm shrink-0">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </article>
      ))}
    </div>

    <div className="text-center mt-16">
      <a
        href="https://github.com/ei-sanu"
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn inline-block bg-foreground text-background px-12 py-5 font-mono text-xl border-4 border-foreground shadow-hard hover:bg-background hover:text-foreground"
      >
        VIEW ALL REPOS ON GITHUB
      </a>
      <p className="font-mono text-xs text-muted-foreground mt-2">* Sign in required to access projects</p>
    </div>
  </section>
);

export default ProjectsSection;
