import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[class*='cursor-hover']")
      ) {
        cursor.style.width = "48px";
        cursor.style.height = "48px";
        cursor.style.backgroundColor = "hsl(var(--neo-green))";
        cursor.style.borderColor = "transparent";
      }
    };

    const onMouseOut = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.backgroundColor = "white";
      cursor.style.borderColor = "hsl(var(--foreground))";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 bg-white rounded-full border-2 border-foreground pointer-events-none z-[9999] hidden lg:block"
      style={{
        mixBlendMode: "difference",
        transition: "width 0.2s, height 0.2s, background-color 0.2s, transform 0.1s",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
