import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    if (hasTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    let isHovering = false;

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
      if (isHovering) return;
      isHovering = true;
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.background = "#FBFF48";
      ring.style.border = "3px solid #121212";
      ring.style.borderRadius = "0px";
      ring.style.mixBlendMode = "difference";
      dot.style.opacity = "0";
    };

    const shrink = () => {
      isHovering = false;
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.background = "transparent";
      ring.style.border = "2px solid #FBFF48";
      ring.style.borderRadius = "50%";
      ring.style.mixBlendMode = "normal";
      dot.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("input") || t.closest("textarea") || t.closest("[role='button']")) {
        expand();
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("input") || t.closest("textarea") || t.closest("[role='button']")) {
        shrink();
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    shrink();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          background: "#FBFF48",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
          left: -100,
          top: -100,
          boxShadow: "0 0 8px 2px rgba(251,255,72,0.5)",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 32,
          height: 32,
          background: "transparent",
          border: "2px solid #FBFF48",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.35s cubic-bezier(.25,1,.5,1), height 0.35s cubic-bezier(.25,1,.5,1), background 0.35s ease, border-radius 0.35s ease, border 0.35s ease, opacity 0.2s ease, mix-blend-mode 0.35s ease",
          left: -100,
          top: -100,
        }}
      />
    </>
  );
};

export default CustomCursor;
