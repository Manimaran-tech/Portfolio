import React, { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkDevice = () => {
      const mobile = 
        window.matchMedia("(maxWidth: 768px)").matches || 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Track standard hoverable elements globally
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isHoverable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive-target") ||
        target.classList.contains("cursor-pointer");

      if (isHoverable) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Spring interpolation loop for the lagging cursor trail
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;

    const updateTrail = () => {
      // Lerp coefficient
      const lerp = 0.15;
      
      currentX += (position.x - currentX) * lerp;
      currentY += (position.y - currentY) * lerp;
      
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isMobile]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Tiny central pinpoint following exact mouse coordinates */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: hovered ? "#b3c8e1" : "#ffffff",
        }}
      />
      
      {/* Lagging outer glowing ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border transition-all duration-300 ease-out"
        style={{
          width: hovered ? "40px" : "22px",
          height: hovered ? "40px" : "22px",
          borderColor: hovered ? "rgba(179, 200, 225, 0.4)" : "rgba(255, 255, 255, 0.15)",
          boxShadow: hovered ? "0 0 10px rgba(179, 200, 225, 0.15)" : "none",
          backgroundColor: hovered ? "rgba(179, 200, 225, 0.02)" : "transparent",
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`,
          marginLeft: hovered ? "-20px" : "-11px",
          marginTop: hovered ? "-20px" : "-11px",
          transformOrigin: "center",
          scale: isClicking ? 0.95 : 1,
        }}
      />
    </>
  );
}
