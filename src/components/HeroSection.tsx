const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden border-b-4 border-foreground">
      {/* Decorative shapes */}
      <div className="absolute top-1/3 left-[10%] w-16 h-16 bg-neo-blue border-4 border-foreground shadow-hard animate-bounce hidden lg:block rotate-12" />
      <div className="absolute bottom-1/3 right-[10%] w-24 h-24 bg-neo-green rounded-full border-4 border-foreground shadow-hard hidden lg:block animate-pulse" />
      <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none">CYBER</div>

      <div className="relative z-10 text-center max-w-5xl">
        {/* Status badge */}
        <div className="inline-block bg-background border-2 border-foreground px-4 py-1 mb-6 shadow-hard rotate-[-2deg] reveal">
          <span className="font-mono font-bold text-neo-green bg-foreground px-2 mr-2">●</span>
          <span className="font-mono font-bold">SYSTEM STATUS: SECURED</span>
        </div>

        {/* Name */}
        <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter mb-4 reveal">
          SOMESH RANJAN<br />
          <span className="text-background text-stroke-black">BISWAL</span>
        </h1>

        {/* Tagline */}
        <p className="font-mono text-lg md:text-2xl max-w-3xl mx-auto mb-6 bg-neo-green border-2 border-foreground p-4 shadow-hard reveal rotate-1">
          Defending digital infrastructures, one threat at a time.<br />
          <b>Blue Team • Security Analyst • Threat Hunter</b>
        </p>

        {/* Terminal */}
        <div className="max-w-md mx-auto mb-8 bg-foreground text-neo-green border-2 border-foreground p-4 shadow-hard font-mono text-left text-sm reveal">
          <div className="flex gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-neo-red inline-block" />
            <span className="w-3 h-3 rounded-full bg-neo-yellow inline-block" />
            <span className="w-3 h-3 rounded-full bg-neo-green inline-block" />
          </div>
          <p>sanu@kali:~</p>
          <p>$ whoami</p>
          <p className="text-neo-cyan">blue-team-defender<span className="cursor-blink"></span></p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row justify-center gap-6 reveal">
          <a
            href="#projects"
            className="neo-btn bg-foreground text-background border-2 border-foreground px-10 py-5 text-xl shadow-hard hover:bg-neo-green hover:text-foreground"
          >
            VIEW PROJECTS
          </a>
          <a
            href="#contact"
            className="neo-btn bg-background text-foreground border-2 border-foreground px-10 py-5 text-xl shadow-hard hover:bg-neo-pink hover:text-foreground"
          >
            CONTACT ME
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
