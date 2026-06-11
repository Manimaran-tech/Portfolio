import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import { PORTFOLIO_DATA } from "./types";
import { ShieldCheck, Heart } from "lucide-react";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Theme Sync effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Live GMT+5:30 clock running continuously in the footer
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. INITIAL SYSTEM LOADING SEQUENCE (Min 1.5s) */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {isLoaded && (
        <div className="relative min-h-screen bg-bg-dark text-[#2b2927] dark:text-[#f4f1eb] selection:bg-accent-cyan/30 selection:text-neutral-900 dark:selection:text-neutral-100 overflow-x-hidden">
          
          {/* IMMERSIVE REGAL BACKGROUND ATMOSPHERE */}
          <div className="absolute top-[-5%] right-[-5%] w-[650px] h-[650px] bg-[#96b2d1]/12 dark:bg-[#96b2d1]/6 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse [animation-duration:8s]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[750px] h-[750px] bg-[#e2bca8]/10 dark:bg-[#e2bca8]/5 rounded-full blur-[160px] pointer-events-none z-0" />
          <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-[#96b2d1]/8 dark:bg-[#96b2d1]/4 rounded-full blur-[130px] pointer-events-none z-0" />
          
          {/* Custom lagging mouse cursor */}
          <CustomCursor />

          {/* Navigation Bar */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* Continuous floating status line or indicators (Minimal & Subtle) */}
          <div className="fixed left-8 bottom-12 hidden lg:flex flex-col gap-1 z-30 pointer-events-none select-none font-mono text-[8px] text-neutral-500/70 dark:text-neutral-450/60">
            <span>RESIDENCE // {PORTFOLIO_DATA.location.toUpperCase()}</span>
            <span>SYSTEMS // STANDARDIZED & VERIFIED</span>
          </div>

          {/* Scroll Indicator */}
          <div className="fixed right-8 bottom-32 hidden lg:flex flex-col items-center gap-4 z-30 select-none pointer-events-none">
            <span className="text-[9px] text-neutral-500/80 dark:text-neutral-450/70 uppercase tracking-[0.4em] rotate-180" style={{ writingMode: "vertical-rl" }}>Scroll to Immerse</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-neutral-300 dark:from-neutral-700 to-transparent relative">
              <motion.div 
                className="absolute left-[-2px] w-[5px] h-[5px] rounded-full bg-[#96b2d1]"
                animate={{ y: [0, 80, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Core Sequential Sections */}
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <AchievementsSection />
            <ContactSection />
          </main>

          {/* REFINED EDITORIAL FOOTER */}
          <footer className="bg-[#f2efe9] dark:bg-[#141312] border-t border-neutral-200/60 dark:border-neutral-800/60 py-14 px-6 md:px-12 relative z-10 overflow-hidden transition-colors duration-300">
            {/* Background elegant details */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-radial-gradient from-accent-cyan/10 to-transparent blur-3xl" />
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left select-none">
              
              {/* Brand indicators */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <div className="w-5 h-5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
                    <span className="font-display font-medium text-[9px] text-accent-cyan">M</span>
                  </div>
                  <span className="font-display font-semibold text-sm text-neutral-800 dark:text-neutral-200 tracking-[0.25em] uppercase text-left leading-none">
                    {PORTFOLIO_DATA.name.toUpperCase()}
                  </span>
                </div>
                <p className="font-mono text-[8px] text-neutral-500 dark:text-neutral-450 tracking-[0.3em] uppercase">
                  INTELLIGENT SYSTEMS & ARCHITECTURES • 2026
                </p>
              </div>

              {/* Live IST indicator */}
              <div className="flex flex-col items-center">
                <span className="font-mono text-[8px] text-neutral-500 dark:text-neutral-450 tracking-widest uppercase mb-1.5">
                  LOCAL ZONE TIME
                </span>
                <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300 tracking-widest bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 px-4 py-1.5 rounded">
                  {currentTime || "00:00:00"} <span className="text-[#a87f65] font-semibold ml-1">IST (GMT +5:30)</span>
                </span>
              </div>

              {/* Handcrafted sign off statement */}
              <div className="flex flex-col items-center md:items-end text-right">
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-1.5">
                  <span>Curated with refined execution by</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold hover:text-accent-cyan transition-colors">{PORTFOLIO_DATA.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Verified Standard Port Operations Complete</span>
                </div>
              </div>

            </div>
          </footer>

        </div>
      )}
    </>
  );
}
