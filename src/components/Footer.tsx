const Footer = () => (
  <footer className="bg-foreground text-background py-16 px-4 border-t-8 border-neo-green font-mono relative overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-4xl font-black mb-6">SANU.</h2>
        <p className="text-muted-foreground max-w-sm">
          {"< Cyber Security Enthusiast />"}<br />
          Defending digital infrastructures with raw, no-nonsense security solutions.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-neo-green mb-4 border-b border-muted-foreground/30 pb-2">SITEMAP</h3>
        <ul className="space-y-2 text-muted-foreground">
          {[
            { href: "#", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-background hover:underline decoration-neo-pink decoration-2">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-neo-green mb-4 border-b border-muted-foreground/30 pb-2">SOCIALS</h3>
        <div className="flex gap-4 text-2xl">
          <a href="https://github.com/ei-sanu" target="_blank" rel="noopener noreferrer" className="hover:text-neo-yellow transition-colors">GitHub</a>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neo-green inline-block animate-pulse" />
          <span className="text-xs text-neo-green uppercase">Secured by CyberNova</span>
        </div>
      </div>
    </div>

    <div className="text-center mt-16 pt-8 border-t border-muted-foreground/20 text-muted-foreground text-sm">
      <p>© 2026 SANU. ALL RIGHTS RESERVED. // SYSTEM_END</p>
    </div>

    <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black text-background opacity-[0.03] leading-none select-none pointer-events-none text-center">
      SECURE
    </div>
  </footer>
);

export default Footer;
