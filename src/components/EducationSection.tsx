const EducationSection = () => (
  <section id="education" className="py-24 px-4 max-w-7xl mx-auto">
    <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter text-center">
      Education<span className="text-neo-blue">_Log</span>
    </h2>

    <div className="relative border-l-4 border-foreground ml-4 md:ml-10 space-y-12">
      <div className="reveal relative pl-8 md:pl-16">
        <div className="absolute -left-[14px] top-2 w-6 h-6 bg-neo-green border-4 border-foreground" />
        <div className="bg-card border-4 border-foreground p-6 shadow-hard hover:shadow-hard-xl transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-muted pb-4 mb-4">
            <h3 className="text-3xl font-black uppercase">Cybersecurity Specialist</h3>
            <span className="font-mono font-bold bg-foreground text-background px-2 py-1">2024 - 2028</span>
          </div>
          <p className="font-mono text-xl mb-2 text-neo-blue font-bold">@ B.Tech in Computer Science & Engineering</p>
          <p className="font-mono text-lg mb-4 text-muted-foreground">Lovely Professional University</p>

          <ul className="list-disc list-inside font-mono text-muted-foreground space-y-1 mb-6">
            <li>NAAC A++ accredited institution</li>
            <li>Ranked among Top 50 Universities in India</li>
            <li>Collaborations with 300+ global universities</li>
            <li>Strong focus on research and innovation</li>
          </ul>

          <p className="font-mono text-sm text-muted-foreground mb-6">
            LPU features a 700+ acre high-tech campus with world-class infrastructure and industry-focused curriculum.
          </p>

          <a
            href="https://www.lpu.in/entrance-test/lpunest"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-block bg-neo-yellow text-foreground px-8 py-3 text-lg shadow-hard"
          >
            APPLY FOR LPUNEST
          </a>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            After LPUNEST, proceed to the official LPU website for admission.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
