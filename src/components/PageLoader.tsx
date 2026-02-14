import { useEffect, useState } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1200);
    const removeTimer = setTimeout(() => setLoading(false), 1800);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-foreground flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-4xl md:text-6xl font-black text-neo-green mb-4 animate-pulse">
        SANU.exe
      </div>
      <div className="font-mono text-muted-foreground text-sm">
        <span className="text-neo-green">$</span> initializing system
        <span className="cursor-blink"></span>
      </div>
      <div className="mt-8 w-48 h-1 bg-background/20 border border-background/10">
        <div
          className="h-full bg-neo-green transition-all duration-1000"
          style={{ width: fadeOut ? "100%" : "60%" }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
