import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Briefcase, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

// Magnetic Hover Wrapper Component: pulls button towards mouse position in cursor vicinity
function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    // Attract ratio (factor multiplier)
    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${className} cursor-pointer focus:outline-none`}
      animate={{ x: coords.x, y: coords.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bioText, setBioText] = useState("");
  const [isBioTypingComplete, setIsBioTypingComplete] = useState(false);

  // Typewriter effect for personal bio
  useEffect(() => {
    let index = 0;
    const fullBio = PORTFOLIO_DATA.bio;
    let bioInterval: NodeJS.Timeout;

    const delayTimer = setTimeout(() => {
      bioInterval = setInterval(() => {
        setBioText(fullBio.substring(0, index + 1));
        index++;
        if (index >= fullBio.length) {
          clearInterval(bioInterval);
          setIsBioTypingComplete(true);
        }
      }, 7); // Speed of 7ms per character
    }, 1100);

    return () => {
      clearTimeout(delayTimer);
      if (bioInterval) clearInterval(bioInterval);
    };
  }, []);

  // Cycle Titles with Typewriter effect
  useEffect(() => {
    const titles = PORTFOLIO_DATA.cyclingTitles;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const fullText = titles[titleIndex];
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at peak
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }

      timer = setTimeout(tick, typingSpeed);
    };

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, typingSpeed]);

  // Track cursor location for realistic depth parallax
  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => window.removeEventListener("mousemove", handleMouseMoveGlobal);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Convert name into letters for staggered reveal transitions
  const nameLetters = Array.from(PORTFOLIO_DATA.name);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg-dark pt-24 pb-16 px-6 md:px-12 lg:px-16"
    >
      {/* Huge Background Sliding Marquee Letters - Lando Norris High-Performance Signature Layout */}
      <div className="absolute top-[18%] left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.22] dark:opacity-[0.15] flex flex-col gap-2">
        <div className="flex whitespace-nowrap" style={{ width: "max-content" }}>
          <motion.div
            className="flex gap-12 text-[10vw] font-sans font-black italic uppercase leading-none text-transparent"
            style={{ 
              WebkitTextStroke: "1px var(--color-text-val)",
              willChange: "transform"
            }}
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              duration: 38,
              ease: "linear"
            }}
          >
            <span>{PORTFOLIO_DATA.name.toUpperCase()} // HIGH PERFORMANCE DEV // STAGE SELECTION // CREATIVE BUILDER // </span>
            <span>{PORTFOLIO_DATA.name.toUpperCase()} // HIGH PERFORMANCE DEV // STAGE SELECTION // CREATIVE BUILDER // </span>
          </motion.div>
        </div>
        <div className="flex whitespace-nowrap" style={{ width: "max-content", transform: "translateX(-400px)" }}>
          <motion.div
            className="flex gap-12 text-[10vw] font-sans font-black italic uppercase leading-none text-transparent"
            style={{ 
              WebkitTextStroke: "1px var(--color-text-val)",
              willChange: "transform"
            }}
            animate={{ x: [-1000, 0] }}
            transition={{
              repeat: Infinity,
              duration: 38,
              ease: "linear"
            }}
          >
            <span>FULL STACK ENGINEER // FLUID TRANSITIONS // ATHLETIC DESIGN SYSTEM // SCALE OPERATIONS // </span>
            <span>FULL STACK ENGINEER // FLUID TRANSITIONS // ATHLETIC DESIGN SYSTEM // SCALE OPERATIONS // </span>
          </motion.div>
        </div>
      </div>

      {/* Editorial Hairline Grid Lines drawing on mount */}
      <div className="absolute inset-x-0 top-1/4 h-[1px] bg-border-glass z-0 select-none pointer-events-none" />
      <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-border-glass z-0 select-none pointer-events-none" />
      <div className="absolute left-[30vw] inset-y-0 w-[1px] bg-border-glass z-0 select-none pointer-events-none" />
      <div className="absolute right-[30vw] inset-y-0 w-[1px] bg-border-glass z-0 select-none pointer-events-none" />

      {/* Decorative Blueprint Markers */}
      <div className="absolute top-24 left-12 p-1 border-t border-l border-neutral-300 dark:border-neutral-800 pointer-events-none select-none text-[8px] font-mono text-neutral-400 dark:text-neutral-550">
        [SYS_COORD_01x8]
      </div>
      <div className="absolute top-24 right-12 p-1 border-t border-r border-neutral-300 dark:border-neutral-800 pointer-events-none select-none text-[8px] font-mono text-neutral-400 dark:text-neutral-550">
        [REF_LINE_SEC]
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center select-none">
        
        {/* LEFT PANE: Bold Typography and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Soft tag accent */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded px-4 py-1.5 flex items-center gap-2 shadow-xs"
          >
            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest text-[#547394] dark:text-[#96b2d1] uppercase font-semibold">
              Available For Collaborative Operations
            </span>
          </motion.div>

          {/* Name Reveal - Framer Motion Character Stagger with Mask Clapping (Lando Norris Signature Reveal) */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-[5.5rem] font-black tracking-tighter mb-6 leading-[0.95] uppercase select-text flex flex-wrap gap-x-3 items-end">
            {PORTFOLIO_DATA.name.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden py-1" style={{ verticalAlign: "bottom" }}>
                {Array.from(word).map((char, index) => {
                  const globalIdx = wIdx * 10 + index;
                  return (
                    <motion.span
                      key={index}
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.85,
                        delay: 0.2 + globalIdx * 0.04,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="inline-block font-black italic text-neutral-800 dark:text-neutral-200"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Role Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="h-8 md:h-10 mb-8 font-mono text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-450 flex items-center"
          >
            <span className="text-[#a87f65] dark:text-[#e2bca8] font-semibold mr-2">&gt; WORK //</span>
            <span>I am a </span>
            <span className="text-neutral-800 dark:text-neutral-200 ml-1.5 relative bg-gradient-to-r from-neutral-800 dark:from-neutral-200 via-[#a87f65] dark:via-[#e2bca8] to-[#547394] dark:to-[#96b2d1] bg-clip-text text-transparent font-semibold border-r border-[#6c86a3]/40 dark:border-[#96b2d1]/40 pr-1 select-text">
              {currentText}
            </span>
          </motion.div>

          {/* Short Personal Statement BIO with typewriter animation */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="max-w-xl text-sm text-neutral-600 dark:text-neutral-300 font-sans tracking-wide leading-relaxed mb-10 text-left font-light select-text min-h-[80px]"
          >
            {bioText}
            {!isBioTypingComplete && (
              <span className="inline-block w-[1.5px] h-3.5 bg-accent-cyan ml-0.5 animate-pulse align-middle" />
            )}
          </motion.p>

          {/* CTA Magnetic Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-4 z-20 w-full sm:w-auto"
          >
            <MagneticButton
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto bg-accent-cyan hover:bg-accent-cyan/95 text-neutral-900 font-sans font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded-full shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Explore Projects
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-sans font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              Connect With Me
            </MagneticButton>
          </motion.div>

          {/* Social shortcuts floating bottom left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="hidden md:flex gap-4 mt-8 text-neutral-400 dark:text-neutral-500 text-xs"
          >
            <a
              href={PORTFOLIO_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-cyan transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PORTFOLIO_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-cyan transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <span className="text-neutral-500 dark:text-neutral-450 font-mono text-[9px] uppercase tracking-wider font-semibold">
              {PORTFOLIO_DATA.location.toUpperCase()}
            </span>
          </motion.div>

        </div>

        {/* RIGHT PANE: Lando Norris-Style Realistic Sliding Portrait */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 shadow-sm group"
          >
            {/* Tech Corner brackets */}
            <div className="absolute top-2.5 left-2.5 font-mono text-[8px] text-neutral-400 dark:text-neutral-500 z-30 select-none pointer-events-none">
              [DEVELOPER_IMAGE_SPEC]
            </div>
            <div className="absolute bottom-2.5 right-2.5 font-mono text-[8.5px] text-[#547394] dark:text-[#96b2d1] font-semibold z-30 select-none pointer-events-none flex items-center gap-1.5 bg-white/70 dark:bg-neutral-950/70 px-2 py-0.5 rounded backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              13.0844° N, 80.2700° E
            </div>

            {/* Inner frame containing image */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
              
              {/* Sliding Color Masks that wipe out to reveal the portrait */}
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                className="absolute inset-0 bg-[#e2bca8] z-20 origin-top pointer-events-none"
              />
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
                className="absolute inset-0 bg-[#96b2d1] z-20 origin-right pointer-events-none"
              />

              {/* Developer Portrait Image with interactive parallax */}
              <motion.div
                className="w-full h-full relative"
                animate={{
                  x: mousePos.x * -25,
                  y: mousePos.y * -25,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <img
                  src="https://github.com/Manimaran-tech.png"
                  alt="Manimaran K Portrait"
                  className="w-[124%] h-[124%] absolute -top-[12%] -left-[12%] object-cover grayscale brightness-[1.03] contrast-[1.05] hover:grayscale-0 hover:contrast-[1.02] hover:brightness-100 transition-all duration-700 ease-out select-none"
                  style={{ pointerEvents: "none" }}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to high quality avatar placeholder if offline/error
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000";
                  }}
                />
              </motion.div>

              {/* Parallax Overlay Subtle Tech Scanline */}
              <div 
                className="absolute inset-0 bg-transparent pointer-events-none mix-blend-overlay opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)`
                }}
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Animated downward pointer */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer focus:outline-none group"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 group-hover:text-accent-cyan transition-colors block mb-1">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-accent-cyan mx-auto transition-colors" />
      </motion.button>

    </section>
  );
}
