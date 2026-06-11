import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Github, ExternalLink, Cpu, BookOpen, Star, Sparkles, Orbit, Landmark, ShieldCheck, Database as DbIcon, Radio, CloudRain } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "../types";

const CATEGORIES: ("All" | "Web" | "Mobile" | "AI" | "Design")[] = [
  "All", "Web", "Mobile", "AI", "Design"
];

// Custon hand-crafted, high-contrast flat vector doodle SVG cover page component 
// matching the warm handcrafted organic theme of the website (cream canvas, charcoal ink, and terracotta accent lines)
function ProjectDoodleCover({ projectId }: { projectId: string }) {
  // Render high-fidelity custom doodle illustrations in a warm sketchbook style
  switch (projectId) {
    case "proj-1": // AutoReel AI Video Pipeline
      return (
        <div className="w-full h-full bg-[var(--color-doodle-canvas)] relative flex items-center justify-center overflow-hidden transition-colors duration-300">
          {/* Ambient Sketchbook Grid Background */}
          <div className="absolute inset-0 z-0 opacity-12 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-doodle-grid) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
          <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--color-doodle-stroke)] opacity-10" />
          
          <svg className="w-[85%] h-[85%] max-w-[270px] relative z-10 overflow-visible" viewBox="0 0 100 100" fill="none">
            {/* Hand-drawn phone frame */}
            <rect x="18" y="10" width="30" height="54" rx="4" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" fill="var(--color-doodle-bg)" />
            <line x1="28" y1="12" x2="38" y2="12" stroke="var(--color-doodle-stroke)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="33" cy="61" r="1.5" fill="var(--color-doodle-stroke)" />
            
            {/* video progress and play button */}
            <polygon points="30,32 30,42 38,37" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeLinejoin="round" />
            <rect x="22" y="48" width="22" height="2" rx="1" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.5" />
            <circle cx="33" cy="49" r="1" fill="var(--color-doodle-stroke)" />
            
            {/* Film strip sprockets running on the side */}
            <g transform="translate(56, 12)">
              <rect x="0" y="0" width="12" height="50" rx="1" stroke="var(--color-doodle-stroke)" strokeWidth="1.2" fill="var(--color-doodle-bg)" />
              {[2, 10, 18, 26, 34, 42, 48].map((y) => (
                <g key={y}>
                  <rect x="2" y={y} width="2.5" height="2" rx="0.5" stroke="var(--color-doodle-stroke)" strokeWidth="0.6" fill="none" />
                  <rect x="7.5" y={y} width="2.5" height="2" rx="0.5" stroke="var(--color-doodle-stroke)" strokeWidth="0.6" fill="none" />
                </g>
              ))}
              {/* Star inside film strip */}
              <path d="M 6,21 L 7.5,24 L 10.5,24 L 8,26 L 9.5,29 L 6,27 L 2.5,29 L 4,26 L 1.5,24 L 4.5,24 Z" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.5" />
            </g>

            {/* Connecting automation gears */}
            <motion.g 
              transform="translate(14, 52)"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              <circle cx="0" cy="0" r="6" stroke="var(--color-doodle-stroke)" strokeWidth="1" fill="var(--color-doodle-bg)" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <rect key={deg} x="-1" y="-8" width="2" height="3" rx="0.5" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" fill="var(--color-doodle-bg)" transform={`rotate(${deg})`} />
              ))}
            </motion.g>

            {/* Audio TTS sound wave */}
            <path d="M 14,18 L 14,24 M 10,19 L 10,23 M 6,20 L 6,22 M 2,21 L 2,21" stroke="var(--color-doodle-accent)" strokeWidth="1" strokeLinecap="round" />
            <path d="M 14,21 L 18,21" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

            {/* Robotic arrow flow */}
            <path d="M 48,22 Q 54,22 56,18" stroke="var(--color-doodle-accent)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
            <polygon points="56,16 57,20 54,19" fill="var(--color-doodle-accent)" />
            
            {/* Viral sparkles, hearts, and likes bubble */}
            <g transform="translate(68, 16)">
              {/* Viral heart */}
              <motion.path 
                d="M 12,30 C 12,28 10,24 6,24 C 2,24 0,27 0,30 C 0,35 6,39 12,42 C 18,39 24,35 24,30 C 24,27 22,24 18,24 C 14,24 12,28 12,30 Z" 
                stroke="var(--color-doodle-stroke)" 
                strokeWidth="1" 
                fill="#e06c64"
                transform="scale(0.5)"
                animate={{ scale: [0.45, 0.55, 0.45] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              {/* Floating likes text bubble */}
              <rect x="12" y="18" width="18" height="8" rx="2" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" fill="var(--color-doodle-bg)" />
              <text x="21" y="24.5" fill="var(--color-doodle-stroke)" fontSize="4.5" fontFamily="var(--font-mono)" textAnchor="middle" className="font-bold">+10k</text>
              <polygon points="15,26 15,29 18,26" fill="var(--color-doodle-bg)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              <line x1="15" y1="25" x2="18" y2="25" stroke="var(--color-doodle-bg)" strokeWidth="1" />
            </g>

            {/* Sparkle star */}
            <g transform="translate(10, 32)">
              <motion.path 
                d="M 5,0 Q 5,5 10,5 Q 5,5 5,10 Q 5,5 0,5 Q 5,5 5,0 Z" 
                fill="var(--color-doodle-accent)" 
                stroke="var(--color-doodle-stroke)" 
                strokeWidth="0.8"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              />
            </g>

            {/* Code labels */}
            <text x="50" y="80" fill="var(--color-doodle-stroke)" fontSize="5.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-black tracking-widest uppercase">
              // AUTOREEL_FLOW
            </text>
            <text x="50" y="86" fill="var(--color-doodle-accent)" fontSize="4.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-bold tracking-widest uppercase">
              REEL_GENERATOR_VIRAL_ENG_01
            </text>
          </svg>
        </div>
      );
    
    case "proj-2": // YieldSense Predictive Agriculture + Crypto
      return (
        <div className="w-full h-full bg-[var(--color-doodle-canvas)] relative flex items-center justify-center overflow-hidden transition-colors duration-300">
          {/* Blue grid line system */}
          <div className="absolute inset-0 z-0 opacity-8 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, var(--color-doodle-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--color-doodle-grid) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--color-doodle-stroke)] opacity-10" />
          
          <svg className="w-[85%] h-[85%] max-w-[270px] relative z-10 overflow-visible" viewBox="0 0 100 100" fill="none">
            {/* Cryptocoin Analysis Chart Area */}
            <rect x="10" y="12" width="46" height="34" rx="3" stroke="var(--color-doodle-stroke)" strokeWidth="1.2" fill="var(--color-doodle-bg)" />
            <line x1="10" y1="40" x2="56" y2="40" stroke="var(--color-doodle-stroke)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="10" y1="26" x2="56" y2="26" stroke="var(--color-doodle-stroke)" strokeWidth="0.5" strokeDasharray="2 2" />
            
            {/* Trading Candlestick lines */}
            <g stroke="var(--color-doodle-stroke)" strokeWidth="1">
              {/* Candlesticks */}
              <line x1="18" y1="36" x2="18" y2="42" />
              <rect x="15.5" y="38" width="5" height="3" fill="#e06c64" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              
              <line x1="28" y1="28" x2="28" y2="38" />
              <rect x="25.5" y="30" width="5" height="5" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              
              <line x1="38" y1="18" x2="38" y2="32" />
              <rect x="35.5" y="20" width="5" height="8" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />

              <line x1="48" y1="14" x2="48" y2="24" />
              <rect x="45.5" y="15" width="5" height="6" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
            </g>
            
            {/* Solana Coin Doodle */}
            <g transform="translate(70, 24)">
              <circle cx="10" cy="10" r="12" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" fill="var(--color-doodle-bg)" />
              {/* Solana Wavy parallel strips */}
              <path d="M 4,6 L 16,6 L 12,10 L 4,10 Z" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M 8,10 L 16,10 L 12,14 L 4,14 Z" fill="var(--color-doodle-stroke)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M 4,14 L 16,14 L 12,18 L 4,18 Z" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeLinejoin="round" />
            </g>

            {/* Ground Soil bed crop layout */}
            <path d="M 5,70 Q 30,66 60,69 Q 85,67 95,70" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 5,74 Q 40,71 95,74" stroke="var(--color-doodle-stroke)" strokeWidth="1.2" strokeDasharray="3 3" />
            
            {/* Sprouting farm crop seedling with moisture Telemetry lines */}
            <g transform="translate(22, 53)">
              {/* Seedling */}
              <path d="M 6,17 Q 5,10 0,6" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M 6,17 Q 8,8 14,5" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Leaves */}
              <path d="M 0,6 Q -5,3 -2,-1 Q 2,0 0,6 Z" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              <path d="M 14,5 Q 19,3 16,-1 Q 12,0 14,5 Z" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
            </g>

            <g transform="translate(56, 52)">
              {/* Seedling 2 */}
              <path d="M 6,18 Q 7,10 12,6" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M 12,6 Q 16,3 13,-1 Q 9,0 12,6 Z" fill="var(--color-doodle-stroke)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
            </g>

            {/* Smart agricultural monitoring telemetry sensors probe */}
            <g transform="translate(78, 54)">
              <rect x="0" y="0" width="8" height="14" rx="1.5" stroke="var(--color-doodle-stroke)" strokeWidth="1.2" fill="var(--color-doodle-bg)" />
              {/* Probe needle */}
              <line x1="4" y1="14" x2="4" y2="20" stroke="var(--color-doodle-stroke)" strokeWidth="1" />
              {/* Radiating WiFi telemetry wave of soil status */}
              <path d="M -2,4 Q 4,-2 10,4" stroke="var(--color-doodle-accent)" strokeWidth="0.8" strokeLinecap="round" />
            </g>

            {/* Label codes */}
            <text x="50" y="80" fill="var(--color-doodle-stroke)" fontSize="5.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-black tracking-widest uppercase">
              // YIELDSENSE_SOL_ANALYTICS
            </text>
            <text x="50" y="86" fill="var(--color-doodle-accent)" fontSize="4.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-bold tracking-widest uppercase">
              SOLANA_CROP_FORECASTING_NODE
            </text>
          </svg>
        </div>
      );

    case "proj-3": // Satellite Re-entry PINN (Physics ML)
      return (
        <div className="w-full h-full bg-[var(--color-doodle-canvas)] relative flex items-center justify-center overflow-hidden transition-colors duration-300">
          {/* Planetary Orbit lines */}
          <div className="absolute inset-0 z-0 opacity-8 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, var(--color-doodle-grid) 1px, transparent 1px)', backgroundSize: '24px 16px' }} />
          <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--color-doodle-stroke)] opacity-10" />
          
          <svg className="w-[85%] h-[85%] max-w-[270px] relative z-10 overflow-visible" viewBox="0 0 100 100" fill="none">
            {/* Atmospheric curvature (Earth sphere segment) */}
            <path d="M 5,82 Q 50,60 95,82" stroke="var(--color-doodle-stroke)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 5,86 Q 50,65 95,86" stroke="var(--color-doodle-accent)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            
            {/* Satellite Capsule falling tilted */}
            <g transform="translate(38, 30) rotate(32)">
              {/* Capsule body */}
              <rect x="-8" y="-12" width="16" height="20" rx="4" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" fill="var(--color-doodle-bg)" />
              {/* Intricate detailed electronics */}
              <line x1="-8" y1="-2" x2="8" y2="-2" stroke="var(--color-doodle-stroke)" strokeWidth="1" />
              <circle cx="-3" cy="4" r="2" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              <circle cx="3" cy="4" r="1.5" fill="var(--color-doodle-stroke)" />
              
              {/* Solar panels Left foldouts */}
              <g transform="translate(-8, -4) rotate(-15)">
                <rect x="-14" y="-4" width="14" height="8" rx="1" stroke="var(--color-doodle-stroke)" strokeWidth="1" fill="var(--color-doodle-bg)" />
                <line x1="-7" y1="-4" x2="-7" y2="4" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
                <line x1="-14" y1="0" x2="0" y2="0" stroke="var(--color-doodle-accent)" strokeWidth="0.8" />
              </g>

              {/* Solar panels Right foldouts */}
              <g transform="translate(8, -4) rotate(15)">
                <rect x="0" y="-4" width="14" height="8" rx="1" stroke="var(--color-doodle-stroke)" strokeWidth="1" fill="var(--color-doodle-bg)" />
                <line x1="7" y1="-4" x2="7" y2="4" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="14" y2="0" stroke="var(--color-doodle-accent)" strokeWidth="0.8" />
              </g>

              {/* Dish receiver antenna */}
              <path d="M -4,-12 Q 0,-18 4,-12" stroke="var(--color-doodle-stroke)" strokeWidth="1.2" fill="none" />
              <line x1="0" y1="-15" x2="0" y2="-21" stroke="var(--color-doodle-stroke)" strokeWidth="1" />
              <circle cx="0" cy="-21" r="1.2" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
            </g>

            {/* Plasma friction sparks and crash lines */}
            <g stroke="#e06c64" strokeWidth="1" strokeLinecap="round">
              {/* Speed lines */}
              <motion.line x1="68" y1="36" x2="72" y2="42" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
              <motion.line x1="61" y1="45" x2="63" y2="52" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} strokeWidth="1.5" />
              <motion.line x1="22" y1="22" x2="25" y2="28" animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
              
              {/* Hot Fire sparks */}
              <path d="M 52,54 Q 60,62 55,68" stroke="var(--color-doodle-accent)" strokeWidth="1.2" fill="none" />
              <path d="M 44,56 Q 52,65 43,69" stroke="var(--color-doodle-accent)" strokeWidth="1.2" fill="none" />
            </g>

            {/* Neural Net tracking analytics crosshair targeting coordinates */}
            <g transform="translate(56, 38)" stroke="var(--color-doodle-stroke)" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-60">
              <circle cx="0" cy="0" r="14" fill="none" strokeWidth="0.8" strokeDasharray="none" />
              <line x1="-18" y1="0" x2="18" y2="0" strokeWidth="0.8" />
              <line x1="0" y1="-18" x2="0" y2="18" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="#e06c64" strokeWidth="1" />
            </g>

            {/* Math formulation text */}
            <text x="82" y="16" fill="var(--color-doodle-accent)" fontSize="4.2" fontFamily="var(--font-mono)" textAnchor="end" className="font-bold">
              Loss = MSE_obs + PDE_res
            </text>
            <text x="5" y="16" fill="var(--color-doodle-stroke)" fontSize="4" fontFamily="var(--font-mono)" textAnchor="start">
              PINN Satellite Dec_v
            </text>

            {/* Label codes */}
            <text x="50" y="80" fill="var(--color-doodle-stroke)" fontSize="5.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-black tracking-widest uppercase">
              // PINN_SATELLITE_CRASH
            </text>
            <text x="50" y="86" fill="var(--color-doodle-accent)" fontSize="4.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-bold tracking-widest uppercase">
              ORBIT_DECAY_TRACKER_COMPETENCE
            </text>
          </svg>
        </div>
      );

    case "proj-4": // SQL Container Platform (Docker)
    default:
      return (
        <div className="w-full h-full bg-[var(--color-doodle-canvas)] relative flex items-center justify-center overflow-hidden transition-colors duration-300">
          {/* Blueprint grid lines */}
          <div className="absolute inset-0 z-0 opacity-12 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-doodle-stroke) 0.75px, transparent 0.75px)', backgroundSize: '16px 16px' }} />
          <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--color-doodle-stroke)] opacity-10" />
          
          <svg className="w-[85%] h-[85%] max-w-[270px] relative z-10 overflow-visible" viewBox="0 0 100 100" fill="none">
            {/* Cargo shipping dry container 1 (Lower Right) */}
            <g transform="translate(45, 34)">
              <rect x="0" y="0" width="38" height="26" rx="2" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" fill="var(--color-doodle-bg)" />
              {/* Cargo door lines */}
              {[4, 8, 12, 16, 20, 24, 28, 32, 34].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="26" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              ))}
              <rect x="11" y="5" width="16" height="15" rx="1" fill="var(--color-doodle-accent)" stroke="var(--color-doodle-stroke)" strokeWidth="1" />
              <text x="19" y="14" fill="var(--color-doodle-bg)" fontSize="5" fontFamily="var(--font-mono)" textAnchor="middle" className="font-bold text-[5.5px]">DOCK</text>
            </g>

            {/* Cargo shipping dry container 2 (Upper Left, stacked) */}
            <g transform="translate(18, 14)">
              <rect x="0" y="0" width="38" height="26" rx="2" stroke="var(--color-doodle-stroke)" strokeWidth="1.5" fill="var(--color-doodle-bg)" />
              {/* Container structural corrugation lines */}
              {[4, 8, 12, 16, 20, 24, 28, 32, 34].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="26" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              ))}
              
              {/* PostgreSQL database cylinder barrel inside */}
              <g transform="translate(10, 4)">
                <rect x="0" y="0" width="18" height="18" rx="2" fill="var(--color-doodle-bg)" stroke="var(--color-doodle-stroke)" strokeWidth="1" />
                {/* Drum rings */}
                <ellipse cx="9" cy="4" rx="7" ry="2" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" fill="var(--color-doodle-accent)" />
                <path d="M 2,4 L 2,14 Q 9,18 16,14 L 16,4" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" fill="none" />
                <path d="M 2,9 Q 9,13 16,9" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
                <path d="M 2,14 Q 9,18 16,14" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
                <text x="9" y="11" fill="var(--color-doodle-stroke)" fontSize="4.5" fontFamily="var(--font-mono)" textAnchor="middle" className="font-black text-[3.5px]">SQL</text>
              </g>
            </g>

            {/* Injected terminal execution test prompt checkmark bubble */}
            <g transform="translate(14, 52)">
              <rect x="0" y="0" width="28" height="14" rx="2" stroke="var(--color-doodle-stroke)" strokeWidth="1" fill="var(--color-doodle-bg)" />
              <text x="3" y="6" fill="var(--color-doodle-stroke)" fontSize="3" fontFamily="var(--font-mono)" textAnchor="start">READY [OK]</text>
              <text x="3" y="11" fill="var(--color-doodle-accent)" fontSize="2.8" fontFamily="var(--font-mono)" textAnchor="start">PASS: 8/8</text>
              
              {/* Round check badge */}
              <circle cx="21" cy="7" r="3.5" fill="var(--color-doodle-bg)" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" />
              <path d="M 19.5,7 L 20.5,8 L 22.5,5.5" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeLinecap="round" />
            </g>

            {/* Docker sandbox node connection wiring loops */}
            <path d="M 38,14 Q 44,4 54,14" stroke="var(--color-doodle-accent)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
            <polygon points="54,16 55,12 52,13" fill="var(--color-doodle-accent)" />
            
            <circle cx="85" cy="20" r="2" fill="var(--color-doodle-stroke)" />
            <line x1="56" y1="20" x2="83" y2="20" stroke="var(--color-doodle-stroke)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Label codes */}
            <text x="50" y="80" fill="var(--color-doodle-stroke)" fontSize="5.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-black tracking-widest uppercase">
              // SQL_DOCKER_SANDBOX
            </text>
            <text x="50" y="86" fill="var(--color-doodle-accent)" fontSize="4.2" fontFamily="var(--font-mono)" textAnchor="middle" className="font-bold tracking-widest uppercase">
              CONTAINERIZED_AUTO_EVAL_SANDBOX
            </text>
          </svg>
        </div>
      );
  }
}

// Lando Norris Inspired project card
function LandoProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  // Year mapping based on project ID/Title
  const projectYear = project.id === "proj-3" || project.id === "proj-4" ? "2024" : "2025";

  return (
    <motion.div
      className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden bg-[#fdfcf9] dark:bg-[#1e1c1b] border border-[#2b2927]/12 dark:border-white/12 shadow-sm group select-none cursor-pointer transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1. Project Cover hand-crafted doodle representation */}
      <div className="w-full h-full relative overflow-hidden bg-[#fdfcf9] dark:bg-[#1e1c1b]">
        
        {/* Dynamic flat vector doodle render */}
        <ProjectDoodleCover projectId={project.id} />
        
        {/* Subtle bottom vignette shadow for text block readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-transparent z-5 pointer-events-none" />

        {/* Featured indicator star badge */}
        {project.featured && (
          <div className="absolute top-5 left-5 p-2 bg-[#fffdfb] dark:bg-[#22201f] backdrop-blur-md rounded-full border border-[#2b2927]/12 dark:border-white/12 text-amber-500 z-10 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          </div>
        )}
      </div>

      {/* 2. Lando Norris Bottom-Right Curved Cutout Notch / Pod */}
      {/* This notch perfectly matches the page background color (#fbf9f6) and uses SVG fillets for a seamless molded look */}
      <div 
        className="absolute bottom-0 right-0 bg-bg-dark pt-[14px] pl-[14px] rounded-tl-[24px] z-10 transition-all duration-300 pointer-events-none"
        style={{
          boxShadow: "-1.5px -1.5px 0px 0px var(--color-border-glass)",
        }}
      >
        {/* Top-left corner inverse concave curve */}
        <div className="absolute -top-[24px] right-0 w-[24px] h-[24px] text-bg-dark pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 24V0C24 13.2548 13.2548 24 0 24H24Z" fill="currentColor" />
          </svg>
        </div>
        {/* Bottom-left corner inverse concave curve */}
        <div className="absolute bottom-0 -left-[24px] w-[24px] h-[24px] text-bg-dark pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 24H0C13.2548 24 24 13.2548 24 0V24Z" fill="currentColor" />
          </svg>
        </div>

        {/* The label body container */}
        <div className="flex items-center gap-2 pl-4 pr-3 py-1.5 bg-[#faf8f4] dark:bg-neutral-900 border border-[#2b2927]/10 dark:border-white/10 rounded-tl-2xl rounded-br-[18px] text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold text-neutral-800 dark:text-neutral-250">
          <span className="font-sans font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200">{project.title}</span>
          <span className="font-mono text-[#a87f65] dark:text-[#e2bca8] font-extrabold">{projectYear}</span>
        </div>
      </div>

      {/* 3. SVG Border Tracing Animation on Hover */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
        <defs>
          <linearGradient id={`borderGrad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#96b2d1" />
            <stop offset="50%" stopColor="#e2bca8" />
            <stop offset="100%" stopColor="#96b2d1" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          rx="30"
          fill="none"
          stroke={`url(#borderGrad-${project.id})`}
          strokeWidth="2.5"
          pathLength="100"
          style={{
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
            strokeDasharray: "100",
            strokeDashoffset: isHovered ? "0" : "100",
            transition: "stroke-dashoffset 0.8s ease-in-out",
          }}
        />
      </svg>

      {/* 4. Immersive Hover Over Spec Detail Information (from simulated project README.md) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[#0e0d0c]/97 backdrop-blur-md p-6 sm:p-7 z-20 overflow-y-auto"
          >
            {/* Top scanning bar animation */}
            <motion.div 
              className="absolute left-0 right-0 h-[60px] bg-gradient-to-b from-[#96b2d1]/10 to-transparent pointer-events-none z-30"
              initial={{ y: -60 }}
              animate={{ y: 400 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-between items-center mb-2 pb-1"
                >
                  <div>
                    <div className="flex items-center gap-1.5 h-3">
                      <span className="font-mono text-[9px] text-[#e2bca8] uppercase tracking-[0.22em] block font-bold animate-pulse">
                        // README.MD CLASSIFIED
                      </span>
                      <div className="relative w-24 h-3">
                        <motion.span 
                          className="absolute inset-0 font-mono text-[7.5px] text-[#96b2d1]/80 uppercase font-semibold leading-none flex items-center"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ delay: 0.8, duration: 0.1 }}
                        >
                          • DECRYPTING...
                        </motion.span>
                        <motion.span 
                          className="absolute inset-0 font-mono text-[7.5px] text-emerald-400 uppercase font-bold leading-none flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9, duration: 0.1 }}
                        >
                          • SECURE_CONN
                        </motion.span>
                      </div>
                    </div>
                    <h4 className="font-sans font-black text-lg sm:text-xl text-white tracking-tight uppercase mt-0.5">
                      {project.title}
                    </h4>
                  </div>
                  <span className="font-mono text-[8.5px] text-[#96b2d1] bg-[#96b2d1]/10 border border-[#96b2d1]/20 px-2.5 py-0.5 rounded uppercase font-bold">
                    {project.category}
                  </span>
                </motion.div>

                {/* Progress loading bar */}
                <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden mb-4 relative z-10">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#e2bca8] to-[#96b2d1]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-1.5 text-[9px] text-[#96b2d1] font-mono uppercase tracking-widest mb-2.5 font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>SPEC SUMMARY • DOCUMENT RESEARCH</span>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#bfbebd] font-sans text-xs leading-relaxed mb-6 font-light"
                >
                  {project.description}
                </motion.p>

                {/* Technologies Tag Group */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-1.5 mb-2"
                >
                  {project.tech.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[9px] text-[#96b2d1] border border-[#96b2d1]/25 bg-[#96b2d1]/5 px-2.5 py-0.5 rounded font-semibold uppercase tracking-wide cursor-default hover:bg-[#96b2d1]/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Source Code Action block links */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 border-t border-white/10 pt-4 mt-4"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-white/5 hover:bg-white/12 text-white border border-white/12 rounded-full py-2.5 text-[10px] font-mono tracking-widest uppercase font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                  Source Code
                </a>
                
                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#96b2d1] hover:bg-[#96b2d1]/88 text-neutral-900 rounded-full py-2.5 text-[10px] font-mono tracking-widest uppercase font-extrabold text-center flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-900" />
                  Live Build
                </a>
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Web" | "Mobile" | "AI" | "Design">("All");
  
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (proj) => activeFilter === "All" || proj.category === activeFilter
  );

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 w-full bg-bg-dark overflow-hidden px-6 md:px-12 border-t border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-300"
    >
      {/* Absolute background coordinate-mesh grid overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="currentColor" className="text-neutral-950 dark:text-neutral-200" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading with high fidelity reveal animations */}
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[9px] text-[#a87f65] dark:text-[#e2bca8] tracking-[0.4em] uppercase block mb-3 font-semibold"
            >
              // 03. ARTISANAL PORTFOLIO DATA
            </motion.span>
            
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[#2b2927] dark:text-neutral-200 tracking-normal leading-none uppercase overflow-hidden">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                REPRESENTATIVE WORK
              </motion.span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="h-[1px] flex-grow bg-neutral-200 dark:bg-neutral-800 hidden md:block mx-8 mb-4 origin-left" 
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 0.4 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-xs text-[#2b2927] dark:text-neutral-400 uppercase tracking-widest md:mb-4 font-bold"
          >
            SYSTEM ENGINE & PIPELINE CODE
          </motion.div>
        </div>

        {/* Filter Navigation controller pill blocks */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 w-full pb-5 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div className="flex flex-wrap bg-[#faf8f4] dark:bg-neutral-950 border border-[#2b2927]/10 dark:border-white/10 p-1.5 rounded-full backdrop-blur-md gap-1 shadow-xs">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none ${
                    isActive ? "text-neutral-900 dark:text-white font-extrabold" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-filter-pill-project"
                      className="absolute inset-0 bg-[#96b2d1]/50 dark:bg-[#96b2d1]/20 rounded-full z-0 pointer-events-none"
                      transition={{ type: "spring", stiffness: 320, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-semibold">
            <span>[HOVER CARD FOR README SPECIFICATIONS]</span>
            <Cpu className="w-3.5 h-3.5 text-[#96b2d1] animate-pulse" />
          </div>
        </div>

        {/* Full Lando Norris Inspired Grid Layout of Projects */}
        <div className="w-full">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <LandoProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 dark:text-neutral-500 mt-6 font-semibold tracking-widest uppercase">
            <span>[STAGE_GRID_INDEX_03]</span>
            <span>Total interactive nodes: {filteredProjects.length} loaded</span>
            <span>[TRACK_SECURED]</span>
          </div>
        </div>

      </div>
    </section>
  );
}
