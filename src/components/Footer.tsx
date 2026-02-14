import { Shield, Home, FileText, Briefcase, Lock, Mail, Twitter, Linkedin, Instagram, Github } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com/ei-sanu", label: "GitHub" },
];

const navLinks = [
  { icon: Home, label: "Home", href: "#" },
  { icon: FileText, label: "Terms", href: "#" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: Lock, label: "Privacy", href: "#" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="bg-foreground text-background py-8 sm:py-10 px-4 border-t-4 border-neo-green font-mono relative overflow-hidden">
    <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto text-center">

      {/* Brand */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Shield size={20} className="text-neo-green" />
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">SANU</h2>
          <Shield size={20} className="text-neo-green" />
        </div>
        <p className="text-neo-green text-sm sm:text-base font-mono">
          {"< Cyber Security Enthusiast />"}
        </p>
      </div>

      {/* Social icons */}
      <div className="flex gap-4">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-11 h-11 rounded-lg bg-background/10 border border-background/20 flex items-center justify-center hover:bg-neo-green hover:text-foreground hover:border-neo-green transition-all hover:shadow-[0_0_12px_hsl(var(--neo-green)/0.4)]"
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {navLinks.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/10 border border-background/20 text-sm font-bold hover:bg-neo-green hover:text-foreground hover:border-neo-green transition-all hover:shadow-[0_0_12px_hsl(var(--neo-green)/0.4)]"
          >
            <n.icon size={16} />
            {n.label}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="pt-6 border-t border-background/10 w-full text-center space-y-2">
        <p className="text-sm text-background/70">© 2026 SANU. ALL RIGHTS RESERVED.</p>
        <p className="text-xs text-background/40 flex items-center justify-center gap-2">
          <span className="w-1 h-1 rounded-full bg-neo-green inline-block" />
          SECURED BY CYBERNOVA
          <span className="w-1 h-1 rounded-full bg-neo-green inline-block" />
        </p>
      </div>
    </div>

    {/* Background watermark */}
    <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black text-background opacity-[0.03] leading-none select-none pointer-events-none text-center">
      SECURE
    </div>
  </footer>
);

export default Footer;
