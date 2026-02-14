import { useState } from "react";
import { Menu, X } from "lucide-react";

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
          className="bg-background border-2 border-foreground px-4 py-1 text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          SANU.exe
        </a>

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

        <button
          className="md:hidden bg-card border-2 border-foreground p-2 shadow-hard-sm"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 bg-card border-2 border-foreground p-4 shadow-hard pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                smoothScroll(e, link.href);
                setOpen(false);
              }}
              className="block px-3 py-2 font-mono font-bold text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
