import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Code, Database, Compass, Calendar, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";


// Custom animated SVG Radar Chart for Skills
function SkillsRadar() {
  const [animatedMultiplier, setAnimatedMultiplier] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      // Animate skills radar outer expansion
      let start = 0;
      const duration = 1200; // 1.2s
      const startTime = performance.now();
      
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        setAnimatedMultiplier(ease);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView]);

  const skillCategories = [
    { name: "React", val: 92 },
    { name: "Node.js", val: 90 },
    { name: "TypeScript", val: 86 },
    { name: "WebGL/3D", val: 80 },
    { name: "Gemini API", val: 95 },
    { name: "SQL/Data", val: 78 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const numPoints = skillCategories.length;

  // Generate grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPaths = gridLevels.map((lvl) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * lvl * Math.cos(angle);
      const y = center + radius * lvl * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  });

  // Generate axes lines
  const axes = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI - Math.PI / 2;
    const ax = center + radius * Math.cos(angle);
    const ay = center + radius * Math.sin(angle);
    axes.push({ x: ax, y: ay });
  }

  // Generate Skills Polygon points
  const skillPoints = skillCategories.map((sk, i) => {
    const angle = (i / numPoints) * 2 * Math.PI - Math.PI / 2;
    const skillVal = (sk.val / 100) * radius * animatedMultiplier;
    const x = center + skillVal * Math.cos(angle);
    const y = center + skillVal * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div ref={containerRef} className="w-full flex justify-center items-center p-4">
      <svg width={size} height={size} className="overflow-visible select-none">
        {/* Background Grids */}
        {gridPaths.map((path, idx) => (
          <polygon
            key={idx}
            points={path}
            fill="none"
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-800"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {axes.map((axis, idx) => (
          <line
            key={idx}
            x1={center}
            y1={center}
            x2={axis.x}
            y2={axis.y}
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-800"
            strokeWidth="1"
          />
        ))}

        {/* Level labels */}
        <text x={center} y={center - radius * 0.5 + 4} fill="currentColor" fontSize="8" textAnchor="middle" className="font-mono text-neutral-400 dark:text-neutral-500">50%</text>
        <text x={center} y={center - radius + 4} fill="currentColor" fontSize="8" textAnchor="middle" className="font-mono text-neutral-400 dark:text-neutral-500">100%</text>

        {/* Radar Value Polygon Line */}
        {animatedMultiplier > 0 && (
          <polygon
            points={skillPoints}
            fill="rgba(150, 178, 209, 0.15)"
            stroke="#96b2d1"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}

        {/* Key Labels */}
        {skillCategories.map((sk, i) => {
          const angle = (i / numPoints) * 2 * Math.PI - Math.PI / 2;
          const labelDist = radius * 1.18;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          
          let anchor: "inherit" | "end" | "middle" | "start" = "middle";
          if (Math.cos(angle) > 0.1) anchor = "start";
          if (Math.cos(angle) < -0.1) anchor = "end";

          return (
            <text
              key={i}
              x={lx}
              y={ly + 4}
              fill="currentColor"
              fontSize="10"
              fontFamily="var(--font-mono)"
              textAnchor={anchor}
              className="uppercase font-semibold tracking-wider text-neutral-700 dark:text-neutral-300"
            >
              {sk.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const timeline = [
    {
      year: "2023",
      title: "Foundational Programming",
      subtitle: "Python Foundations & Initial Logic",
      desc: "Learned the foundational core of programming and focused extensively on Python. Configured initial custom automation programs, CLI scripts, and basic computational tasks to master sequential procedural flows.",
      icon: Code,
    },
    {
      year: "2024",
      title: "Languages & Computer Science Core",
      subtitle: "C, Java, Data Structures, & AI Basics",
      desc: "Expanded into systemic languages like C and Java to master compile-time safety and memory mechanics. Extensively practiced Data Structures & Algorithms (DSA) while exploring core neural concepts and foundational algorithms of Artificial Intelligence.",
      icon: Database,
    },
    {
      year: "2025",
      title: "ML Integration, Blockchain, & research",
      subtitle: "Full-Stack Machine Learning, Smart Contracts, & PINNs",
      desc: "Began deploying real-world machine learning predictive systems directly into web projects. Formulated Ethereum smart contracts on decentralized trust networks and researched Physics-Informed Neural Networks (PINNs) to map satellite decay matrices with under 5% errors.",
      icon: Compass,
    },
    {
      year: "2026 Present",
      title: "Agentic Swarms & System Design",
      subtitle: "Agent Orchestration & Core Automation Tools",
      desc: "Actively building advanced multi-agent workflows and high-fidelity system architectures. Orchestrate autonomous agent teams and design robust automation tools to streamline repetitive enterprise processes and optimize developer cycles dynamically.",
      icon: Layers,
    },
  ];

  const techBadges = [
    "React", "TypeScript", "Three.js", "GSAP", "Tailwind CSS", "Node.js", "Express", 
    "FastAPI", "Python", "Gemini API", "PostgreSQL", "Firebase DB", "Git", "Docker"
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-32 w-full bg-bg-dark overflow-hidden px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800"
    >
      {/* Decorative Glow Background Spots */}
      <div className="absolute top-[10%] left-[-15%] w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] bg-accent-gold/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-[9px] text-accent-cyan tracking-[0.3em] uppercase block mb-3 font-semibold"
            >
              // 01. PROFILE
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-neutral-800 dark:text-neutral-200 tracking-normal leading-none uppercase overflow-hidden">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                DEEP CODING ARCHITECTURE
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-xs text-neutral-500 dark:text-neutral-450 uppercase tracking-widest md:mb-4"
          >
            FRESH PERSPECTIVE • CONSTANT EVOLUTION
          </motion.div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Abstract 3D Avatar & Personal Bio */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 shadow-xs">
              {/* Technical grid coordinates and scanlines */}
              <div className="absolute top-2.5 left-2.5 font-mono text-[8px] text-neutral-400 dark:text-neutral-500 z-10 select-none">[02 // ENG]</div>
              <div className="absolute bottom-2.5 right-2.5 font-mono text-[8.5px] text-[#547394] dark:text-[#96b2d1] font-semibold z-10 select-none flex items-center gap-1 bg-white/70 dark:bg-neutral-950/70 px-2 py-0.5 rounded backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                SYSTEM_STABLE: //230806
              </div>

              {/* Mask reveal for the profile container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-950 border border-neutral-100/80 dark:border-neutral-900 flex items-center justify-center">
                
                {/* Horizontal sliding color reveal wipes */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  className="absolute inset-0 bg-[#96b2d1] z-20 origin-left"
                />
                
                <motion.img
                  initial={{ scale: 1.12, filter: "grayscale(100%) brightness(0.95)" }}
                  whileInView={{ scale: 1, filter: "grayscale(0%) brightness(1)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  src="https://github.com/Manimaran-tech.png"
                  alt="Manimaran K Profile"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000";
                  }}
                />

                {/* Creative border frame overlay */}
                <div className="absolute inset-0 bg-transparent opacity-15 mix-blend-overlay border-[3px] border-neutral-900 dark:border-neutral-100 pointer-events-none rounded-xs m-2" />
              </div>
            </div>

            {/* Quick narrative statements */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                Who stands behind the code?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 font-sans text-sm leading-relaxed font-light">
                As a fast-learning developer located in Tamil Nadu, India, I treat the design space as an organic projection of math. By blending clean typescript protocols with elegant layouts, I construct high-performance apps that behave naturally across all modern screen resolutions.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 font-sans text-sm leading-relaxed font-light">
                I dedicate significant time to optimizing rendering pipelines and crafting secure backend gateways—consistently experimenting with the latest features of the Generative AI workspace ecosystem.
              </p>
            </div>

            {/* Academic Foundations */}
            <div className="flex flex-col gap-5 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="font-display text-[10px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-[0.25em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#96b2d1] animate-pulse" />
                ACADEMIC PATHWAY
              </h3>
              
              <div className="flex flex-col gap-4">
                {PORTFOLIO_DATA.education?.map((edu, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/10 dark:bg-neutral-900/10 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40 transition-all flex flex-col gap-2">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <h4 className="font-display text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                          {edu.degree}
                        </h4>
                        <p className="font-sans text-[11px] text-neutral-500 dark:text-neutral-400">
                          {edu.institution}, {edu.location}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] text-[#a87f65] dark:text-[#e2bca8] border border-[#a87f65]/20 dark:border-[#e2bca8]/20 bg-[#a87f65]/5 dark:bg-[#e2bca8]/5 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                        {edu.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[9.5px] text-[#547394] dark:text-[#96b2d1] bg-[#96b2d1]/15 px-2 py-0.5 rounded font-bold">
                        {edu.grade}
                      </span>
                    </div>

                    {/* Coursework list */}
                    <div className="flex flex-wrap gap-1 mt-2.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/60">
                      {edu.coursework.map((course, cIdx) => (
                        <span 
                          key={cIdx} 
                          className="font-mono text-[8px] text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded px-1.5 py-0.5"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Timeline & Radar Chart */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            
            {/* Horizontal timeline of the evolution */}
            <div className="flex flex-col gap-6">
              <h4 className="font-mono text-xs text-[#547394] dark:text-[#96b2d1] tracking-widest uppercase font-semibold">
                &gt; STORY TIMELINE
              </h4>
              
              <div className="relative border-l border-neutral-200 dark:border-neutral-800 pl-6 space-y-8 py-2">
                {timeline.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                    >
                      {/* Node Bullet Ring */}
                      <span className="absolute -left-[35px] top-1.5 w-[18px] h-[18px] rounded-full bg-bg-dark border-2 border-[#96b2d1] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-[#96b2d1] rounded-full" />
                      </span>
                      
                      <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                        <span className="font-mono font-bold text-xs text-[#547394] dark:text-[#96b2d1] bg-[#96b2d1]/10 px-2 py-0.5 rounded-full">
                          {item.year}
                        </span>
                        <h5 className="font-display font-medium text-base text-neutral-800 dark:text-neutral-200 tracking-wide uppercase">
                          {item.title}
                        </h5>
                      </div>
                      <p className="font-mono text-[10px] text-[#a87f65] dark:text-[#e2bca8] uppercase tracking-wider mb-2 font-semibold">
                        {item.subtitle}
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-350 font-sans text-xs leading-relaxed max-w-xl font-light">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Radar and skills float block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/[0.01] dark:bg-white/[0.01] border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl backdrop-blur-sm">
              <div className="md:col-span-6">
                <h4 className="font-display text-sm font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                  System Multi-Domain Profile
                </h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs font-sans leading-relaxed mb-6 font-light">
                  This multi-vector dynamic map highlights the breakdown of my operational confidence in technical domains. By combining rapid reactive styling with generative AI agent integration, I cover both back and front ends.
                </p>
                
                {/* Tech Drift Cloud - Badges floating autonomously */}
                <div className="flex flex-wrap gap-2">
                  {techBadges.map((badge, index) => (
                    <motion.span
                      key={index}
                      className="px-2.5 py-1 rounded bg-black/[0.02] dark:bg-white/[0.02] border border-neutral-200 dark:border-neutral-800 hover:border-accent-cyan hover:bg-accent-cyan/10 text-neutral-600 dark:text-neutral-350 font-mono text-[9px] uppercase tracking-wide cursor-default transition-all"
                      animate={{
                        y: [0, Math.sin(index) * 4, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + (index % 3),
                        ease: "easeInOut"
                      }}
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-6 flex justify-center">
                <SkillsRadar />
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
