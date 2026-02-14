import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const expand = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.background = "hsl(59 100% 64%)";
      ring.style.borderColor = "hsl(0 0% 7%)";
      ring.style.borderRadius = "0px";
      dot.style.opacity = "0";
    };

    const shrink = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.background = "transparent";
      ring.style.borderColor = "white";
      ring.style.borderRadius = "50%";
      dot.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("input") || t.closest("textarea")) expand();
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("input") || t.closest("textarea")) shrink();
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          background: "white",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "opacity 0.2s",
          left: -100,
          top: -100,
        }}
        className="hidden lg:block"
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 36,
          height: 36,
          background: "transparent",
          border: "2px solid white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "width 0.3s, height 0.3s, background 0.3s, border-radius 0.3s, border-color 0.3s",
          left: -100,
          top: -100,
        }}
        className="hidden lg:block"
      />
    </>
  );
};

export default CustomCursor;
