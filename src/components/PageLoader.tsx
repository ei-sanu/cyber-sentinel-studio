import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 20;
      });
    }, 100);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
    }, 1200);

    const removeTimer = setTimeout(() => setLoading(false), 1700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      {/* Neo-brutalist Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 0%) 2px, transparent 2px), linear-gradient(90deg, hsl(0 0% 0%) 2px, transparent 2px)",
            backgroundSize: "60px 60px",
            animation: "scrollGrid 3s linear infinite",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with Neo-brutalist Style */}
        <div className="relative mb-8">
          {/* Main Logo */}
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
              <span className="text-foreground">CYBER</span>
              <span className="relative inline-block ml-2">
                <span className="text-neo-cyan border-4 border-foreground bg-neo-yellow px-4 py-2 shadow-hard-lg inline-block transform hover:translate-x-1 hover:translate-y-1 transition-transform">
                  NOVA
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wider">
            <Shield className="w-4 h-4 text-neo-green" />
            <span className="text-foreground font-bold">SENTINEL STUDIO</span>
            <div className="w-2 h-2 bg-neo-red animate-pulse" />
          </div>
        </div>

        {/* Terminal-style Status */}
        <div className="font-mono text-sm mb-8 bg-foreground text-background px-6 py-3 border-4 border-foreground shadow-hard">
          <div className="flex items-center gap-2">
            <span className="text-neo-green">$</span>
            <span className="text-neo-cyan">initializing</span>
            <span className="text-background">system</span>
            <span className="inline-block w-2 h-4 bg-neo-green animate-pulse ml-1" />
          </div>
        </div>

        {/* Neo-brutalist Progress Bar */}
        <div className="w-80 md:w-96">
          <div className="h-8 bg-background border-4 border-foreground shadow-hard relative overflow-hidden">
            {/* Progress Fill */}
            <div
              className="h-full transition-all duration-300 ease-out relative"
              style={{
                width: `${progress}%`,
                background:
                  "repeating-linear-gradient(45deg, hsl(134 100% 60%), hsl(134 100% 60%) 10px, hsl(217 91% 60%) 10px, hsl(217 91% 60%) 20px)",
              }}
            >
              {/* Animated overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, white, transparent)",
                  animation: "slide 1.5s ease-in-out infinite",
                }}
              />
            </div>

            {/* Progress Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-foreground text-lg mix-blend-difference">
                {Math.floor(progress)}%
              </span>
            </div>
          </div>

          {/* Loading Message */}
          <div className="flex justify-between items-center mt-3 font-mono text-xs uppercase">
            <span className="text-foreground font-bold tracking-wider">
              Loading Assets
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-foreground"
                  style={{
                    animation: `blink 1s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes scrollGrid {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(60px) translateX(60px);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
