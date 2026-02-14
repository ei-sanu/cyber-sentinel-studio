import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[class*='cursor-hover']")
      ) {
        // Hover state: neo-yellow block
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.backgroundColor = "hsl(var(--neo-yellow))";
        ring.style.borderColor = "hsl(var(--foreground))";
        ring.style.borderRadius = "0px";
        ring.style.mixBlendMode = "difference";
        dot.style.opacity = "0";
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[class*='cursor-hover']")
      ) {
        // Normal state: crosshair ring
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = "hsl(var(--foreground))";
        ring.style.borderRadius = "50%";
        ring.style.mixBlendMode = "difference";
        dot.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Dot / crosshair center */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "hsl(var(--foreground))",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "opacity 0.2s",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden lg:block"
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: "transparent",
          border: "2px solid hsl(var(--foreground))",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "width 0.3s cubic-bezier(.25,1,.5,1), height 0.3s cubic-bezier(.25,1,.5,1), background-color 0.3s, border-radius 0.3s, opacity 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
