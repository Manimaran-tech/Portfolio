import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView } from "motion/react";
import { Briefcase, Trophy, GitCommit, FileSpreadsheet, Layers, ExternalLink, Cpu, Terminal, RefreshCw, Activity, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

// Interactive AI & System Automation Simulation Panel
function AIAutomationHub() {
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] ORCHESTRATOR NODE ONLINE`,
    `[${new Date().toLocaleTimeString()}] PARSING AUTONOMOUS TRIGGERS...`,
    `[${new Date().toLocaleTimeString()}] PIPELINE: CRON_JOB_REPETITIVE_SYNC SUCCESS`,
  ]);
  const [isActive, setIsActive] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const phrases = [
      "Running Pydantic AI validation... APPROVED",
      "Scanning vector database repositories... COMPLETED",
      "Triggering automation routine: Repetitive Summaries...",
      "Syncing multi-agent node cluster state... SUCCESS",
      "Deploying agent runner into sandboxed cluster...",
      "Active scheduling: checking cron event queue... SLEEPING",
      "Optimizing numerical matrices of neural PINN engine...",
      "Blockchain ledger sync: contract execution completed",
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const timeStr = new Date().toLocaleTimeString();
        const randPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        const newLog = `[${timeStr}] ${randPhrase}`;
        const next = [...prev, newLog];
        if (next.length > 7) next.shift();
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-xs flex flex-col gap-5 relative overflow-hidden backdrop-blur-md">
      <div className="flex justify-between items-center pb-3 border-b border-neutral-100 dark:border-neutral-800 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          <span className="font-display text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-accent-cyan" />
            AI Orchestration Lab
          </span>
        </div>
        <span className="font-mono text-[8px] text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-950 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
          ACTIVE_SWARM_V3
        </span>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="bg-neutral-50/60 dark:bg-neutral-950/60 border border-neutral-200/50 dark:border-neutral-800/50 p-4 rounded-xl flex flex-col items-center justify-center gap-4 relative overflow-hidden select-none z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        
        <div className="flex sm:flex-row items-center justify-between w-full h-full max-w-sm gap-4 z-10 py-2">
          {/* Node 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex items-center justify-center text-[#547394] dark:text-[#96b2d1] hover:border-accent-cyan/80 hover:text-accent-cyan transition-all">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-mono text-[8.5px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-1.5 font-bold">Trigger</span>
          </div>

          {/* Connect 1 */}
          <div className="hidden sm:block flex-grow h-[1px] border-t border-dashed border-[#96b2d1]/60 relative">
            <div className="absolute top-1/2 left-0 h-1 w-1 bg-accent-cyan rounded-full -translate-y-1/2 animate-ping" />
          </div>

          {/* Node 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full border-2 border-accent-cyan bg-accent-cyan/10 shadow-sm flex items-center justify-center text-accent-cyan hover:bg-accent-cyan hover:text-white transition-all scale-105">
              <Layers className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-mono text-[8.5px] text-neutral-800 dark:text-neutral-200 uppercase tracking-wide mt-1.5 font-extrabold text-[#547394] dark:text-[#96b2d1]">Orchestration</span>
          </div>

          {/* Connect 2 */}
          <div className="hidden sm:block flex-grow h-[1px] border-t border-dashed border-[#96b2d1]/60 relative">
            <div className="absolute top-1/2 left-0 h-1 w-1 bg-[#a87f65] rounded-full -translate-y-1/2 animate-ping" />
          </div>

          {/* Node 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex items-center justify-center text-[#a87f65] dark:text-[#e2bca8] hover:border-[#a87f65]/80 hover:text-[#a87f65] transition-all">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-mono text-[8.5px] text-neutral-500 dark:text-neutral-450 uppercase tracking-wider mt-1.5 font-bold">Autopilot</span>
          </div>
        </div>
      </div>

      {/* Terminal Console */}
      <div className="flex flex-col rounded-xl bg-[#0e0d0c] border border-neutral-800 overflow-hidden font-mono text-[9.5px] relative z-10 shadow-sm">
        {/* Header bar */}
        <div className="flex items-center justify-between bg-neutral-900/90 border-b border-white/[0.05] px-3 py-1.5 text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[8px] uppercase tracking-wider text-neutral-300 font-extrabold">AUTOMATION CONSOLE_</span>
          </div>
          <button 
            onClick={() => setIsActive(!isActive)}
            className="text-[7px] text-[#a87f65] hover:text-white bg-[#a87f65]/10 hover:bg-[#a87f65]/20 px-2 py-0.5 rounded flex items-center gap-1 font-bold border border-[#a87f65]/25 transition-all cursor-pointer select-none"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isActive ? 'animate-spin' : ''}`} />
            {isActive ? "PAUSE" : "RESUME"}
          </button>
        </div>

        {/* Log Lines */}
        <div 
          ref={scrollRef}
          className="p-3.5 space-y-1.5 text-neutral-300 min-h-[145px] max-h-[145px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-neutral-850"
        >
          {logs.map((log, index) => {
            const isGreen = log.includes("SUCCESS") || log.includes("ONLINE") || log.includes("APPROVED");
            const isWarning = log.includes("Triggering") || log.includes("PARSING");
            return (
              <div key={index} className="flex items-start gap-1">
                <span className="text-neutral-600 select-none">&gt;</span>
                <span className={`${isGreen ? 'text-emerald-450 font-bold' : isWarning ? 'text-amber-450 font-medium' : 'text-neutral-300 font-light'}`}>
                  {log}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-neutral-500 dark:text-neutral-400 font-sans text-xs leading-relaxed font-light border-t border-neutral-100 dark:border-neutral-800 pt-3 relative z-10">
        Highly specialized in developing reactive agent swarms, automated pipelines, and structural networks to eliminate tedious, manual work tasks.
      </div>
    </div>
  );
}

// Animated counter element that increments when in view
function AnimatedNumberCount({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const startTime = performance.now();

      const run = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quad out easing
        const ease = progress * (2 - progress);
        const currentVal = Math.floor(ease * end);
        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(run);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(run);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
    </span>
  );
}

// 3D Parallax Tilt Card Component
function ParallaxTiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Setup Framer Motion raw values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform coordinates to degree tilts (max 15 deg)
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);
  
  // Transform coordinates to soft interior shadow offsets
  const shadowX = useTransform(x, [-100, 100], [4, -4]);
  const shadowY = useTransform(y, [-100, 100], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Relative coordinates from center of card (-100 to 100 range)
    const relX = ((e.clientX - left) / width - 0.5) * 200;
    const relY = ((e.clientY - top) / height - 0.5) * 200;

    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    // Reset back to center slowly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-panel rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fefdfc] dark:bg-neutral-900 p-6 md:p-8 hover:border-accent-cyan/45 dark:hover:border-accent-cyan/40 hover:shadow-md transition-all duration-300 relative select-none w-full"
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 w-full bg-bg-dark overflow-hidden px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800"
    >
      {/* Editorial Hairline Grid Lines drawing on mount */}
      <div className="absolute inset-x-0 top-1/4 h-[1px] bg-border-glass z-0 select-none pointer-events-none" />
      <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-border-glass z-0 select-none pointer-events-none" />
      <div className="absolute left-[20vw] inset-y-0 w-[1px] bg-border-glass z-0 select-none pointer-events-none" />
      <div className="absolute right-[20vw] inset-y-0 w-[1px] bg-border-glass z-0 select-none pointer-events-none" />

      {/* Decorative Blueprint Markers */}
      <div className="absolute top-24 left-12 p-1 border-t border-l border-neutral-250/60 dark:border-neutral-800/60 pointer-events-none select-none text-[8px] font-mono text-neutral-400 dark:text-neutral-500">
        [SEC_TIMELINE_02]
      </div>
      <div className="absolute top-24 right-12 p-1 border-t border-r border-neutral-250/60 dark:border-neutral-800/60 pointer-events-none select-none text-[8px] font-mono text-neutral-400 dark:text-neutral-500">
        [COORD_INDEX_X2]
      </div>

      {/* Decorative Radial Grid */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-accent-gold/6 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-[9px] text-accent-cyan tracking-[0.3em] uppercase block mb-3 font-semibold"
            >
              // 02. TIMELINE & STATS
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-neutral-800 dark:text-neutral-200 tracking-normal leading-none uppercase overflow-hidden">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                PROFESSIONAL PIPELINE
              </motion.span>
            </h2>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="h-[1px] flex-grow bg-neutral-200 dark:bg-neutral-800 hidden md:block mx-8 mb-4 origin-left" 
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-mono text-xs text-neutral-500 dark:text-neutral-450 uppercase tracking-widest md:mb-4"
          >
            ALGORITHMS TO INTERACTIVE INTERFACES
          </motion.div>
        </div>

        {/* Dynamic Numerical Counters Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-20 md:mb-28"
        >
          {PORTFOLIO_DATA.stats.map((stat, sIndex) => {
            let IconSvg = Layers;
            if (stat.label.includes("LeetCode")) IconSvg = Trophy;
            if (stat.label.includes("Commits")) IconSvg = GitCommit;
            if (stat.label.includes("Repos")) IconSvg = FileSpreadsheet;
            if (stat.label.includes("API")) IconSvg = Briefcase;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + sIndex * 0.08 }}
                className="glass-panel p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 flex flex-col items-center justify-center text-center group hover:border-accent-cyan/40 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-all duration-300"
              >
                <IconSvg className="w-5 h-5 text-accent-cyan/85 group-hover:text-accent-cyan mb-3 transition-colors" />
                <span className="font-display text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight mb-1">
                  <AnimatedNumberCount value={stat.value} />
                  <span className="text-accent-cyan">{stat.suffix}</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-500 dark:text-neutral-450 uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Responsive 2-column construction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 items-start mt-12">
          
          {/* Left Column: Timeline Of Experience */}
          <div className="lg:col-span-7 relative pt-6">
            
            {/* Timeline line aligned to the left side */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[1px] bg-neutral-200 dark:bg-neutral-800 z-0" />

            <div className="space-y-12 md:space-y-14 relative z-10">
              {PORTFOLIO_DATA.experiences.map((exp, idx) => {
                return (
                  <motion.div 
                    key={exp.id} 
                    initial={{ opacity: 0, y: 45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col w-full relative pl-10 sm:pl-14"
                  >
                    
                    {/* Timeline point indicator */}
                    <div className="absolute left-4 sm:left-6 top-8 w-4.5 h-4.5 rounded-full bg-white dark:bg-neutral-900 border-4 border-[#96b2d1] -translate-x-1/2 flex items-center justify-center z-20 shadow-sm animate-pulse-subtle">
                      <span className="w-1.5 h-1.5 bg-[#96b2d1] rounded-full" />
                    </div>

                    {/* Card Section */}
                    <div className="w-full">
                      <ParallaxTiltCard>
                        <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                          <div>
                            <span className="font-mono text-[10px] text-[#547394] dark:text-[#96b2d1] font-bold tracking-widest bg-[#96b2d1]/15 px-2 py-0.5 rounded-full uppercase">
                              {exp.duration}
                            </span>
                            <h3 className="font-display text-lg font-medium text-neutral-800 dark:text-neutral-200 mt-1 uppercase tracking-wider">
                              {exp.role}
                            </h3>
                          </div>
                          <span className="font-mono text-[10px] text-[#a87f65] dark:text-[#e2bca8] uppercase tracking-widest bg-[#a87f65]/10 dark:bg-[#e2bca8]/10 px-2.5 py-1 rounded-full border border-[#a87f65]/10 dark:border-[#e2bca8]/10 font-semibold">
                            {exp.company}
                          </span>
                        </div>

                        {/* Accomplishments Bullets */}
                        <ul className="space-y-2.5 mb-4 text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed list-none pl-0 font-light">
                          {exp.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-1.5">
                              <span className="text-[#547394] dark:text-[#96b2d1] font-bold mt-0.5">›</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Custom Credentials & Work Links */}
                        {exp.links && exp.links.length > 0 && (
                          <div className="flex flex-wrap gap-3 mb-6 pt-2">
                            {exp.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[#547394] dark:text-[#96b2d1] hover:text-[#2b2927] dark:hover:text-[#f4f1eb] hover:bg-neutral-100 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 px-3 py-1.5 rounded transition-all font-semibold uppercase tracking-wider"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Associated Skill Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="font-mono text-[8px] text-neutral-600 dark:text-neutral-350 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded uppercase"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </ParallaxTiltCard>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Automation Lab and Swarm Log Simulation */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <AIAutomationHub />
          </div>

        </div>

      </div>
    </section>
  );
}
