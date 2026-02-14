const skills = [
  { cat: "LIBRARY", name: "React", color: "hover:bg-background" },
  { cat: "LANGUAGE", name: "Python", color: "hover:bg-neo-blue" },
  { cat: "BACKEND", name: "Node.js", color: "hover:bg-neo-green" },
  { cat: "STYLING", name: "Tailwind", color: "hover:bg-neo-pink" },
  { cat: "DEFENSE", name: "Network Sec", color: "hover:bg-neo-green" },
  { cat: "OFFENSE", name: "Pen Testing", color: "hover:bg-neo-red" },
  { cat: "AUDIT", name: "Vuln Assess", color: "hover:bg-neo-yellow" },
  { cat: "CRYPTO", name: "Cryptography", color: "hover:bg-neo-blue" },
  { cat: "CODE", name: "Secure Coding", color: "hover:bg-neo-pink" },
  { cat: "CLOUD", name: "Cloud Security", color: "hover:bg-neo-cyan" },
  { cat: "VERSION", name: "Git", color: "hover:bg-background" },
  { cat: "RESPONSE", name: "Incident Resp", color: "hover:bg-neo-orange" },
  { cat: "INTEL", name: "Threat Hunt", color: "hover:bg-neo-green" },
  { cat: "DATA", name: "MySQL", color: "hover:bg-neo-yellow" },
  { cat: "CORE", name: "HTML5/CSS3", color: "hover:bg-neo-orange" },
  { cat: "LANGUAGE", name: "TypeScript", color: "hover:bg-neo-blue" },
];

const SkillsSection = () => (
  <section id="skills" className="py-20 bg-foreground text-background border-y-4 border-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: "linear-gradient(hsl(0 0% 20%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 20%) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />

    <div className="max-w-[1400px] mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-background pb-4">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
          TECH<span className="text-neo-green">_STACK</span>
        </h2>
        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <div className="w-3 h-3 bg-neo-green rounded-full animate-pulse" />
          <p className="font-mono text-neo-green text-sm font-bold">/// SYSTEM_OPTIMIZED</p>
        </div>
      </div>

      <div className="flex flex-wrap">
        {skills.map((s) => (
          <div
            key={s.name}
            className={`group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%] h-24 border-r-2 border-b-2 border-background/20 bg-foreground ${s.color} transition-all duration-100 relative flex flex-col items-center justify-center p-2`}
          >
            <div className="text-neo-green group-hover:text-foreground font-mono text-xs mb-1 opacity-50">
              &gt;_ {s.cat}
            </div>
            <div className="text-background group-hover:text-foreground font-black text-lg md:text-xl uppercase">
              {s.name}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-4 border-background mt-8 pt-4 flex justify-between font-mono text-xs text-muted-foreground">
        <span>TOTAL_NODES: {skills.length}</span>
        <span>THREAT_LEVEL: LOW</span>
      </div>
    </div>
  </section>
);

export default SkillsSection;
