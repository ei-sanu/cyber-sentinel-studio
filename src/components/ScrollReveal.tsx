import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
      );

      // Observe all reveal elements
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => {
        // If element is already in viewport, immediately add active class
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("active");
        }
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-run when route changes

  return null;
};

export default ScrollReveal;
