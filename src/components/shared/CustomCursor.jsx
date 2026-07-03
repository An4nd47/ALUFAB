import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animateRing);
    };

    const addHoverClass = () => setIsHovered(true);
    const removeHoverClass = () => setIsHovered(false);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, select, textarea, label"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHoverClass);
      el.addEventListener("mouseleave", removeHoverClass);
    });

    document.addEventListener("mousemove", moveCursor);
    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${isHovered ? "hovered" : ""}`} />
      <div ref={ringRef} className={`custom-cursor-ring ${isHovered ? "hovered" : ""}`} />
    </>
  );
}
