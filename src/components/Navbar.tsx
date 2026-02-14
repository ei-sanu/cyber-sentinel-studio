import { useState } from "react";
import { Settings } from "lucide-react";

const navLinks = [
  { href: "#about", label: "/ABOUT" },
  { href: "#skills", label: "/SKILLS" },
  { href: "#experience", label: "/LOGS" },
  { href: "#projects", label: "/WORK" },
  { href: "#contact", label: "HIRE ME" },
];

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <a
          href="#"
          onClick={(e) => smoothScroll(e, "#")}
          className="bg-background border-2 border-foreground px-3 py-1 text-lg sm:text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          SANU.exe
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 bg-card border-2 border-foreground p-2 shadow-hard">
          {navLinks.map((link) =>
            link.label === "HIRE ME" ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className="px-3 py-1 font-mono font-bold text-sm bg-neo-green border border-foreground hover:bg-neo-pink transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className="px-3 py-1 font-mono font-bold text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Mobile hamburger - Settings icon with rotation */}
        <button
          className="md:hidden bg-card border-2 border-foreground p-2 shadow-hard-sm relative z-[60]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Settings
            size={24}
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: open ? "rotate(-180deg)" : "rotate(0deg)",
            }}
          />
        </button>
      </div>

      {/* Mobile terminal menu */}
      <div
        className={`md:hidden mt-2 pointer-events-auto transition-all duration-300 ease-in-out origin-top-right ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-foreground border-2 border-neo-green shadow-hard-lg mx-2 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-neo-green/30">
            <span className="w-2.5 h-2.5 rounded-full bg-neo-red inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neo-yellow inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neo-green inline-block" />
            <span className="font-mono text-neo-green text-xs ml-2">nav_menu.sh</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm">
            <p className="text-neo-green/60 text-xs mb-3">sanu@kali:~$ ls ./routes/</p>
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  smoothScroll(e, link.href);
                  setOpen(false);
                }}
                className={`block py-2.5 px-3 transition-colors ${
                  link.label === "HIRE ME"
                    ? "text-foreground bg-neo-green font-black mt-2 border border-foreground hover:bg-neo-pink"
                    : "text-neo-green hover:bg-neo-green/10 hover:text-neo-yellow border-b border-neo-green/10"
                }`}
              >
                {link.label === "HIRE ME" ? (
                  <span className="flex items-center gap-2">
                    <span className="text-foreground">→</span> {link.label}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="text-neo-green/40">{`0${i + 1}`}</span>
                    <span className="text-neo-green/40">│</span>
                    {link.label}
                  </span>
                )}
              </a>
            ))}
            <p className="text-neo-green/30 text-xs mt-3">
              <span className="text-neo-green/50">$</span> exit
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-foreground/50 z-[-1] pointer-events-auto"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
