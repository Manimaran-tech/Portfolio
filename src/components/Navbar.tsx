import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, FileText, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Calming lofi track "Komorebi" (sunlight filtering through trees)
    audioRef.current = new Audio("https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35; // Gentle ambient level

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Autoplay block or playback failed:", err);
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate scroll percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percent = (window.scrollY / totalHeight) * 100;
        setScrollPercent(percent);
      }

      // 2. Adjust Navbar visual style based on scroll height
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 3. Highlight current active section based on proximity
      const scrollPosition = window.scrollY + 180;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Smoothly scroll to the requested anchor
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Topmost visual scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-neutral-200/50 dark:bg-neutral-800/50 pointer-events-none">
        <div
          className="h-full bg-accent-cyan opacity-80 transition-all duration-75"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bg-dark/85 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="relative w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-accent-cyan/60 group-hover:bg-accent-cyan/10">
              <span className="font-display font-medium text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-accent-cyan transition-colors">M</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-semibold text-xs text-neutral-800 dark:text-neutral-200 tracking-[0.2em] leading-none group-hover:text-accent-cyan transition-colors">
                {PORTFOLIO_DATA.name.toUpperCase()}
              </span>
              <span className="font-mono text-[7px] text-neutral-500 dark:text-neutral-450 tracking-[0.2em] mt-0.5 uppercase">
                Systems Architect
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded-full backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer focus:outline-none ${
                    isActive ? "text-neutral-900 dark:text-white font-semibold" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-250"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-accent-cyan/40 dark:bg-accent-cyan/20 rounded-full z-0 pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Social Shortcut Badges */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Controller */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-450 hover:border-accent-cyan dark:hover:border-accent-cyan hover:bg-accent-cyan/5 dark:hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300 cursor-pointer flex items-center justify-center"
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Ambient Audio Controller */}
            <button
              onClick={togglePlay}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isPlaying 
                  ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-[0_0_12px_rgba(150,178,209,0.35)]" 
                  : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-450 hover:border-accent-cyan hover:bg-accent-cyan/5 dark:hover:bg-accent-cyan/10"
              }`}
              title={isPlaying ? "Mute Ambient Music" : "Play Ambient Music"}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[2px] w-4 h-4 justify-center py-[1px]">
                  <motion.div className="w-[2px] bg-accent-cyan rounded-xs" animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }} />
                  <motion.div className="w-[2px] bg-accent-cyan rounded-xs" animate={{ height: [10, 4, 10] }} transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut", delay: 0.15 }} />
                  <motion.div className="w-[2px] bg-accent-cyan rounded-xs" animate={{ height: [6, 11, 6] }} transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.3 }} />
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <a
              href={PORTFOLIO_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-accent-cyan hover:bg-accent-cyan/10 text-neutral-500 hover:text-accent-cyan transition-all duration-300"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-accent-cyan hover:bg-accent-cyan/10 text-neutral-500 hover:text-accent-cyan transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.resume}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-accent-cyan hover:bg-accent-cyan/10 text-neutral-500 hover:text-accent-cyan transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburg Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 active:scale-95 transition-all outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Screen Full Sized Overlay Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full bg-bg-dark/97 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Ambient vector glow points */}
            <div className="absolute top-[20%] left-[-20%] w-[300px] h-[300px] bg-accent-cyan/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-accent-gold/15 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-xs flex flex-col items-center justify-center text-center gap-6">
              {/* Overlay Navigation Links */}
              <nav className="flex flex-col gap-5 w-full">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`font-display text-2xl font-semibold tracking-wider hover:text-accent-cyan focus:outline-none py-1 transition-colors ${
                      activeSection === item.id ? "text-[#a87f65] dark:text-[#e2bca8]" : "text-neutral-600 dark:text-neutral-400"
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Theme Toggle Controller */}
              <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border font-mono text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 w-full ${
                  theme === "dark" 
                    ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan" 
                    : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:text-accent-cyan"
                }`}
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-accent-cyan" /> : <Moon className="w-4 h-4" />}
                <span>{theme === "dark" ? "Theme: Dark Mode" : "Theme: Light Mode"}</span>
              </motion.button>

              {/* Mobile Ambient Audio Controller */}
              <motion.button
                onClick={togglePlay}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border font-mono text-[10px] uppercase tracking-widest font-extrabold transition-all duration-300 w-full ${
                  isPlaying 
                    ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan" 
                    : "border-neutral-200 bg-neutral-50 text-neutral-500"
                }`}
              >
                {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                <span>{isPlaying ? "Ambient Sound: ON" : "Ambient Sound: OFF"}</span>
              </motion.button>

              <hr className="w-16 border-neutral-200 dark:border-neutral-800" />

              {/* Social Channels Link Row */}
              <div className="flex gap-4">
                <motion.a
                  href={PORTFOLIO_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all text-neutral-500 dark:text-neutral-450"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={PORTFOLIO_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all text-neutral-500 dark:text-neutral-450"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={PORTFOLIO_DATA.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all text-neutral-500 dark:text-neutral-450"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <FileText className="w-5 h-5" />
                </motion.a>
              </div>

              <div className="text-center font-mono text-[9px] text-neutral-400 dark:text-neutral-500 tracking-widest mt-4">
                AVAILABLE FOR COLLABORATIVE OPERATIONS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
