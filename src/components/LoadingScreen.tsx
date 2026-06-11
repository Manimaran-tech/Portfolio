import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  
  const onCompleteRef = useRef(onComplete);

  // Keep the callback ref updated with potential new parent closures
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Progress counter simulation
    const totalDuration = 1800; // 1.8s duration
    const intervalTime = 30;
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          // Wait briefly for finishing ease before firing complete
          setTimeout(() => {
            onCompleteRef.current();
          }, 450);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center p-6 select-none bg-transparent"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 1,
            transition: { duration: 1.4 } 
          }}
        >
          {/* Staggered vertical color curtains that wipe out to reveal the site */}
          <div className="absolute inset-0 z-0 flex pointer-events-none overflow-hidden">
            {[
              { color: "#23211f", delay: 0.0 },
              { color: "#96b2d1", delay: 0.1 },
              { color: "#e2bca8", delay: 0.18 },
              { color: "#ede9e2", delay: 0.25 },
              { color: "#fbf9f6", delay: 0.32 },
            ].map((panel, idx) => (
              <motion.div
                key={idx}
                className="h-full flex-grow origin-top"
                initial={{ scaleY: 1 }}
                exit={{ 
                  scaleY: 0,
                  transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: panel.delay }
                }}
                style={{ backgroundColor: panel.color }}
              />
            ))}
          </div>

          {/* Interactive foreground loading content that fades out on exit */}
          <motion.div 
            className="relative z-10 flex flex-col items-center max-w-sm w-full bg-transparent"
            exit={{ 
              opacity: 0,
              y: -40,
              transition: { duration: 0.45, ease: "easeIn" }
            }}
          >
            {/* SVG Logo - Isometric Constructing Letter "M" */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Isometric Cube left slab */}
                <motion.path
                  d="M15 30L50 50V90L15 70V30Z"
                  fill="url(#leftGradient)"
                  initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  stroke="#96b2d1"
                  strokeWidth="1"
                />
                {/* Isometric Cube right slab */}
                <motion.path
                  d="M85 30L50 50V90L85 70V30Z"
                  fill="url(#rightGradient)"
                  initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                  stroke="#96b2d1"
                  strokeWidth="1"
                />
                {/* Isometric Cube top cap */}
                <motion.path
                  d="M50 10L85 30L50 50L15 30L50 10Z"
                  fill="url(#topGradient)"
                  initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                  stroke="#96b2d1"
                  strokeWidth="1"
                />

                {/* Cyber Matrix core dot at origin */}
                <circle cx="50" cy="50" r="4" fill="#e2bca8" className="animate-ping" />

                <defs>
                  <linearGradient id="leftGradient" x1="15" y1="30" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#080808" />
                    <stop offset="100%" stopColor="#96b2d1" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="rightGradient" x1="85" y1="30" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#080808" />
                    <stop offset="100%" stopColor="#e2bca8" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="topGradient" x1="50" y1="10" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#96b2d1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#080808" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Title / Brand Mark */}
            <h2 className="font-display font-medium text-3xl text-white tracking-widest uppercase mb-1">
              MANIMARAN
            </h2>
            <p className="font-mono text-[9px] text-[#96b2d1] tracking-[0.4em] uppercase mb-8 font-semibold">
              // SYSTEM SECURING STAGE
            </p>

            {/* Percentage Bar & Percentage Ticker */}
            <div className="w-full relative px-6">
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-white/40 uppercase tracking-widest text-[9px] font-semibold">
                  Configuring matrix elements
                </span>
                <span className="text-[#96b2d1] font-bold">{Math.floor(progress)}%</span>
              </div>
              
              {/* Outer Slider Bar */}
              <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                {/* Loaded Progress Indicator */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#96b2d1] to-[#e2bca8]"
                  style={{ width: `${progress}%` }}
                  layoutId="loading-bar"
                />
              </div>
            </div>
            
            {/* Console output feedback under bar */}
            <div className="mt-4 font-mono text-[8px] text-white/30 tracking-wider text-center h-4 overflow-hidden">
              {progress < 30 && ">> LOADING GLOBAL MODULES ..."}
              {progress >= 30 && progress < 60 && ">> INITIALIZING PARALLAX ENG CORE ..."}
              {progress >= 60 && progress < 85 && ">> SYNCING GITHUB DATASTORES ..."}
              {progress >= 85 && ">> CORE OPERATIONAL. EMBARKING..."}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
