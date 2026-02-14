import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import ProfileDropdown from "./ProfileDropdown";

const navLinks = [
  { href: "#about", label: "/ABOUT" },
  { href: "#skills", label: "/SKILLS" },
  { href: "#experience", label: "/LOGS" },
  { href: "#projects", label: "/WORK" },
  { href: "#contact", label: "HIRE ME" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll after navigation
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.hash === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're on the home page, just scroll
    if (location.pathname === '/') {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page with hash
      navigate('/' + href);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
      setShowProfileDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "#")}
            className="bg-background border-2 border-foreground px-3 py-1 text-lg sm:text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            SANU.exe
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-4 items-center">
            <div className="flex gap-4 bg-card border-2 border-foreground p-2 shadow-hard">
              {navLinks.map((link) =>
                link.label === "HIRE ME" ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-1 font-mono font-bold text-sm bg-neo-green border border-foreground hover:bg-neo-pink transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-1 font-mono font-bold text-sm hover:bg-foreground hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Auth Section - Profile Icon Only */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="w-10 h-10 rounded-full border-2 border-foreground overflow-hidden bg-neo-blue shadow-hard hover:shadow-hard-xl transition-all"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={20} />
                    </div>
                  )}
                </button>

                <ProfileDropdown
                  isOpen={showProfileDropdown}
                  onClose={() => setShowProfileDropdown(false)}
                  onSignOut={handleSignOut}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 font-mono font-bold text-sm bg-neo-green border-2 border-foreground shadow-hard hover:bg-foreground hover:text-background transition-all"
              >
                LOGIN
              </button>
            )}
          </div>

          {/* Mobile hamburger - Settings icon with rotation */}
          <button
            className="md:hidden bg-background border-2 border-foreground p-2 shadow-hard hover:bg-neo-yellow transition-colors relative z-[70]"
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
          className={`md:hidden mt-2 pointer-events-auto transition-all duration-300 ease-in-out origin-top-right ${open
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

              {/* User Profile Section */}
              {user && (
                <div className="mb-4 p-3 bg-neo-green/10 border border-neo-green/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full border-2 border-neo-green overflow-hidden bg-neo-blue">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User size={20} className="text-background" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neo-green font-bold text-xs truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-neo-green/60 text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-neo-green/60 text-xs space-y-1">
                    <p>📅 Joined: {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setOpen(false);
                  }}
                  className={`block py-2.5 px-3 transition-colors ${link.label === "HIRE ME"
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

              {/* All Projects Link - Only show if user is logged in */}
              {user && (
                <Link
                  to="/projects"
                  onClick={() => setOpen(false)}
                  className="block py-2.5 px-3 mt-2 text-foreground bg-neo-cyan font-black border border-foreground hover:bg-neo-pink transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-foreground">→</span> ALL PROJECTS
                  </span>
                </Link>
              )}

              {/* Auth Button */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block py-2.5 px-3 mt-2 text-foreground bg-neo-red font-black border border-foreground hover:bg-foreground hover:text-neo-red transition-colors w-full text-left"
                >
                  <span className="flex items-center gap-2">
                    <LogOut size={16} />
                    LOGOUT
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setOpen(false);
                  }}
                  className="block py-2.5 px-3 mt-2 text-foreground bg-neo-green font-black border border-foreground hover:bg-neo-pink transition-colors w-full text-left"
                >
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    LOGIN
                  </span>
                </button>
              )}

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

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
