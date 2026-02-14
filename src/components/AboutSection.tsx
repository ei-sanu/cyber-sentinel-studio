const AboutSection = () => (
  <section id="about" className="py-24 px-4 max-w-7xl mx-auto border-x-4 border-foreground bg-card my-12 shadow-hard-lg">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      {/* Avatar */}
      <div className="md:col-span-4 reveal">
        <div className="aspect-square bg-muted border-4 border-foreground relative shadow-hard overflow-hidden group">
          <img
            src="https://avatars.githubusercontent.com/u/ei-sanu"
            alt="Somesh Ranjan Biswal"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <span className="absolute top-2 left-2 bg-neo-red text-background px-2 font-mono text-xs border border-foreground z-10">
            AVATAR.JPG
          </span>
        </div>
      </div>

      {/* About text */}
      <div className="md:col-span-8 flex flex-col justify-center reveal">
        <h2 className="text-6xl font-black uppercase mb-2">Who am I?</h2>
        <h3 className="text-3xl font-black text-neo-blue mb-6">SOMESH RANJAN BISWAL</h3>
        <p className="font-mono text-xl leading-relaxed mb-6">
          I am a <span className="bg-neo-yellow px-1 border border-foreground">Full-Stack Developer</span> &{" "}
          <span className="bg-neo-green px-1 border border-foreground">Blue Team Cybersecurity Specialist</span>. I build robust web applications and defend digital infrastructures from emerging threats.
        </p>
        <p className="font-mono text-lg mb-8 text-muted-foreground border-l-4 border-neo-blue pl-4">
          &gt; Specialized in Full-Stack Web Development & Cybersecurity.<br />
          &gt; Blue Team player — Threat Hunting, Incident Response, SOC.<br />
          &gt; Building secure, performant digital products.
        </p>
        <div className="flex gap-4 flex-wrap">
          <div className="bg-foreground text-background px-4 py-2 font-mono text-sm border-2 border-transparent">
            📍 Odisha, India
          </div>
          <div className="bg-neo-green text-foreground px-4 py-2 font-mono text-sm border-2 border-foreground">
            🟢 STATUS: AVAILABLE
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
