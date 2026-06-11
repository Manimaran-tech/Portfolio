import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Award, Trophy, ShieldCheck, ExternalLink, Calendar, MapPin, X, GraduationCap, Cpu, Code, BookOpen, Fingerprint, Sparkles, Trash, UploadCloud } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  award: string;
  issuer: string;
  date: string;
  location: string;
  details: string;
  badgeText: string;
  credentialsId: string;
  verifyUrl?: string;
  bgHex: string;
  accentHex: string;
  originalScanUrl?: string; // Secured production scan file path (lock editing if present)
}

const CERTIFICATES: Certificate[] = [
  {
    id: "cert-srm",
    title: "QUANTUMANIA",
    subtitle: "TEXUS'25 National level Symposium",
    award: "FIRST PLACE WINNER",
    issuer: "SRM Institute of Science & Technology",
    date: "March 28-29, 2025",
    location: "Ramapuram, Chennai, India",
    details: "Secured First Place in the high-stakes Quantumania physics-computational competition of TEXUS'25. Solved advanced mathematical challenges involving quantum algorithms and mechanical telemetry structures.",
    badgeText: "FIRST RANK",
    credentialsId: "SRM-TEXUS-Q5",
    verifyUrl: "https://ramapuram.srmist.edu.in/",
    bgHex: "#fffdf9",
    accentHex: "#d4af37", // gold
    originalScanUrl: "/achive/certificate%20_page-0001.jpg"
  },
  {
    id: "cert-easwari",
    title: "ESCAPE LOGIC",
    subtitle: "INVICTUS'25 Technical Symposium",
    award: "SECOND PLACE WINNER",
    issuer: "Easwari Engineering College",
    date: "April 12, 2025",
    location: "Ramapuram, Chennai, India",
    details: "Secured Second Place in the Escape Logic algorithm analysis and optimization track of INVICTUS'25, organized by the Department of Computer Science (AI & ML) in association with ATLAS society.",
    badgeText: "2ND RANK",
    credentialsId: "EEC-INVICTUS-EL8",
    verifyUrl: "https://easwariengg.ac.in/",
    bgHex: "#fffefa",
    accentHex: "#c0c0c0", // silver
    originalScanUrl: "/achive/certificate%202_page-0001.jpg"
  },
  {
    id: "cert-esim-sim",
    title: "CIRCUIT SIMULATION",
    subtitle: "eSim Simulation Project Intern",
    award: "FOSSEE FELLOWSHIP CERTIFICATION",
    issuer: "IIT Bombay (FOSSEE)",
    date: "Winter 2024",
    location: "IIT Bombay, Mumbai, India",
    details: "Successfully completed the complex circuit simulation and testing of the 'Analysis of Alternating Current Limiter Circuit For Circuit Protection And Power Management' under eSim EDA project guidelines.",
    badgeText: "VERIFIED COMPONENT",
    credentialsId: "ESIM-CS-2024-IITB",
    verifyUrl: "https://esim.fossee.in/circuit-simulation-project/certificates/verify",
    bgHex: "#fffefa",
    accentHex: "#547394", // slate blue
    originalScanUrl: "/achive/Manimaran-eSim-Circuit-Simulation-Certificate_page-0001.jpg"
  },
  {
    id: "cert-esim-mig",
    title: "RESEARCH MIGRATION",
    subtitle: "eSim FOSSEE Research Intern",
    award: "RESEARCH FELLOWSHIP CERTIFICATION",
    issuer: "IIT Bombay (FOSSEE)",
    date: "Winter 2024",
    location: "IIT Bombay, Mumbai, India",
    details: "Mapped, validated and migrated 'Analysis of Direct Current Limiter Circuit for Circuit Protection and Power Management' into open source EDA formats, addressing critical academic feedback.",
    badgeText: "VERIFIED RECON",
    credentialsId: "ESIM-RM-2024-IITB",
    verifyUrl: "https://esim.fossee.in/research-migration-project/certificates/verify",
    bgHex: "#fffdfa",
    accentHex: "#4169e1", // blue
    originalScanUrl: "/achive/Manimaran-esim-Research-Migration-Certificate%20(1)_page-0001.jpg"
  },
  {
    id: "cert-coming",
    title: "COMING SOON!!",
    subtitle: "5th Technical Milestone",
    award: "FUTURE ARCHITECTURE",
    issuer: "Autonomous Agents Ecosystem",
    date: "2026 Milestone",
    location: "Tamil Nadu, India",
    details: "Currently actively designing robust multi-agent orchestration structures, decentralized AI system design frameworks, and autonomous automation loops to eliminate repetitive workflows.",
    badgeText: "COMING SOON",
    credentialsId: "SYS_PENDING_2026",
    verifyUrl: "https://github.com/Manimaran-tech",
    bgHex: "#fafcff",
    accentHex: "#10b981" // emerald green
  }
];

export default function AchievementsSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"replica" | "original">("original");
  const [copiedState, setCopiedState] = useState(false);
  
  const handleSelectCert = (cert: Certificate) => {
    setSelectedCert(cert);
    if (cert.id === "cert-coming") {
      setViewMode("replica");
    } else {
      setViewMode("original");
    }
  };

  const [dragActive, setDragActive] = useState(false);
  const [originalCerts, setOriginalCerts] = useState<Record<string, string>>(() => {
    try {
      return {
        "cert-srm": localStorage.getItem("cert-original-cert-srm") || "",
        "cert-easwari": localStorage.getItem("cert-original-cert-easwari") || "",
        "cert-esim-sim": localStorage.getItem("cert-original-cert-esim-sim") || "",
        "cert-esim-mig": localStorage.getItem("cert-original-cert-esim-mig") || "",
        "cert-coming": localStorage.getItem("cert-original-cert-coming") || ""
      };
    } catch (e) {
      return {};
    }
  });

  const handleUploadOriginal = (certId: string, base64Data: string) => {
    setOriginalCerts(prev => {
      const updated = { ...prev, [certId]: base64Data };
      try {
        localStorage.setItem(`cert-original-${certId}`, base64Data);
      } catch (e) {
        console.error("Local storage quota exceeded or unavailable:", e);
      }
      return updated;
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, certId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            handleUploadOriginal(certId, event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, certId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            handleUploadOriginal(certId, event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  // Overlapping fanned values corresponding to the Lando Socials Deck
  const fannedStyles = [
    { rotate: -15, x: -160, y: 16 },
    { rotate: -7.5, x: -80, y: 4 },
    { rotate: 0, x: 0, y: 0 },
    { rotate: 7.5, x: 80, y: 4 },
    { rotate: 15, x: 160, y: 16 },
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 md:py-32 w-full bg-[#fbf9f6] dark:bg-[#0c0b0a] overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-300"
    >
      {/* Dynamic scrolling background vector line grids */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="0" x2="15%" y2="100%" stroke="currentColor" className="text-[#2b2927]/10 dark:text-neutral-800/30" strokeWidth="0.5" strokeDasharray="5 10" />
          <line x1="85%" y1="0" x2="85%" y2="100%" stroke="currentColor" className="text-[#2b2927]/10 dark:text-neutral-800/30" strokeWidth="0.5" strokeDasharray="5 10" />
          <path d="M 0,200 Q 300,150 600,250 T 1200,200" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 6" className="text-[#a87f65] dark:text-[#e2bca8] animate-pulse" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 md:px-12">
        {/* Section Heading with subtle enters and words reveal */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-[9px] text-[#a87f65] dark:text-[#e2bca8] tracking-[0.4em] uppercase block mb-3 font-semibold"
          >
            // 04. SECTOR VERIFIED ACCOMPLISHMENTS
          </motion.span>
          
          <h2 className="text-center font-display overflow-hidden">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block font-sans text-4xl sm:text-7xl font-extrabold tracking-tight text-[#2b2927] dark:text-neutral-250 uppercase leading-[0.9]"
            >
              WHAT'S UP IN
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="block font-display text-4xl sm:text-7xl italic font-light tracking-normal mt-1 leading-[0.9] text-[#a87f65] dark:text-[#e2bca8]"
            >
              competitions & reports
            </motion.span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 0.5, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-xs font-mono text-[#2b2927] dark:text-neutral-400 uppercase tracking-widest max-w-sm mx-auto"
          >
            Interactive arc stack. Click to inspect high-fidelity certificate replicas.
          </motion.p>
        </div>

        {/* FAN STACK OF CARDS */}
        <div className="relative flex justify-center items-center h-[380px] sm:h-[460px] md:h-[500px] mt-12 mb-16 px-4">
          <div className="hidden md:flex items-center justify-center relative w-full h-full max-w-4xl">
            {CERTIFICATES.map((cert, index) => {
              const fan = fannedStyles[index] || { rotate: 0, x: 0, y: 0 };
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <motion.div
                  key={cert.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSelectCert(cert)}
                  style={{
                    originX: 0.5,
                    originY: 1,
                  }}
                  initial={{ opacity: 0, y: 100, rotate: fan.rotate * 1.5 }}
                  whileInView={{ opacity: 1, y: fan.y, rotate: fan.rotate }}
                  viewport={{ once: true, margin: "-60px" }}
                  animate={{
                    x: isHovered ? fan.x * 1.15 : fan.x,
                    y: isHovered ? -35 : fan.y,
                    rotate: isHovered ? 0 : fan.rotate,
                    scale: isHovered ? 1.08 : isAnyHovered ? 0.94 : 1,
                    zIndex: isHovered ? 40 : index + 10,
                    boxShadow: isHovered 
                      ? "0 30px 60px -12px rgba(168, 127, 101, 0.25)" 
                      : "0 10px 25px -10px rgba(43, 41, 39, 0.08)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  className={`absolute w-[230px] h-[340px] md:w-[260px] md:h-[390px] rounded-[32px] overflow-hidden p-1 group cursor-pointer transition-all duration-300 ${
                    cert.id === "cert-coming"
                      ? "bg-[#0b0c10] border-neutral-800"
                      : "bg-[#faf8f4] dark:bg-[#161514] border-[#2b2927]/10 dark:border-neutral-800"
                  }`}
                >
                  <div className={`w-full h-full rounded-[28px] p-5 flex flex-col justify-between relative overflow-hidden border-[1.5px] ${
                    cert.id === "cert-coming"
                      ? "bg-neutral-950 border-neutral-800 text-white"
                      : "bg-white dark:bg-[#1c1a19] border-[#e2d5c3] dark:border-neutral-800 text-[#2b2927] dark:text-neutral-200 transition-colors duration-300"
                  }`}>
                    <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-750 pointer-events-none">
                      <Award className={`w-44 h-44 ${cert.id === "cert-coming" ? "text-accent-cyan" : "text-[#a87f65] dark:text-[#e2bca8]"}`} />
                    </div>

                    {/* Top Block */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0.5">
                        <span className={`font-mono text-[8px] tracking-widest uppercase block ${cert.id === "cert-coming" ? "text-neutral-500" : "text-[#2b2927]/40 dark:text-neutral-500"}`}>ESTABLISHED</span>
                        <span className={`font-mono text-[9px] font-bold block ${cert.id === "cert-coming" ? "text-neutral-450" : "text-[#2b2927]/80 dark:text-neutral-300"}`}>
                          {cert.date.split(",")[1]?.trim() || cert.date.slice(-4)}
                        </span>
                      </div>
                      
                      <span className={`font-mono text-[8.5px] border px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                        cert.id === "cert-coming"
                          ? "text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5"
                          : "text-[#2b2927] dark:text-neutral-300 border-[#2b2927]/10 dark:border-neutral-800 bg-[#2b2927]/5 dark:bg-neutral-800/40"
                      }`}>
                        {cert.badgeText}
                      </span>
                    </div>

                    {/* Middle Block */}
                    <div className="my-auto text-center flex flex-col items-center">
                      <div className={`mb-4 p-2 rounded-full shadow-xs group-hover:scale-110 transition-transform duration-300 ${
                        cert.id === "cert-coming"
                          ? "bg-neutral-900 border border-neutral-800 text-accent-cyan animate-pulse"
                          : "bg-[#fdfbf7] dark:bg-neutral-900 border border-[#e2d5c3] dark:border-neutral-800 text-[#a87f65] dark:text-[#e2bca8]"
                      }`}>
                        {cert.id === "cert-coming" ? (
                          <Sparkles className="w-5 h-5 stroke-[1.5]" />
                        ) : cert.id.includes("srm") || cert.id.includes("easwari") ? (
                          <Trophy className="w-5 h-5 stroke-[1.5]" />
                        ) : (
                          <Cpu className="w-5 h-5 stroke-[1.5]" />
                        )}
                      </div>

                      <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold mb-1 block ${
                        cert.id === "cert-coming" ? "text-accent-cyan" : "text-[#a87f65] dark:text-[#e2bca8]"
                      }`}>
                        {cert.award}
                      </span>
                      <h3 className={`font-sans font-extrabold text-base tracking-tight uppercase leading-tight mb-2 px-1 max-w-[200px] ${
                        cert.id === "cert-coming" ? "text-white" : "text-[#2b2927] dark:text-neutral-200"
                      }`}>
                        {cert.title}
                      </h3>
                      <p className={`text-[10px] font-display italic leading-tight block truncate max-w-[190px] ${
                        cert.id === "cert-coming" ? "text-neutral-400" : "text-[#2b2927]/60 dark:text-neutral-400"
                      }`}>
                        {cert.subtitle}
                      </p>
                    </div>

                    {/* Bottom Block */}
                    <div className={`flex items-end justify-between pt-3 border-t ${
                      cert.id === "cert-coming" ? "border-neutral-900" : "border-[#e2d5c3]/40 dark:border-neutral-800"
                    }`}>
                      <div className="flex flex-col">
                        <span className={`font-mono text-[8px] uppercase tracking-widest leading-none mb-0.5 ${
                          cert.id === "cert-coming" ? "text-neutral-500" : "text-[#2b2927]/40 dark:text-neutral-500"
                        }`}>ISSUED BY</span>
                        <span className={`font-sans text-[9px] font-semibold uppercase leading-none block max-w-[135px] truncate ${
                          cert.id === "cert-coming" ? "text-neutral-300" : "text-[#2b2927]/80 dark:text-neutral-300"
                        }`}>
                          {cert.issuer}
                        </span>
                      </div>
                      <ShieldCheck className={`w-4 h-4 opacity-50 ${
                        cert.id === "cert-coming" ? "text-accent-cyan" : "text-[#a87f65] dark:text-[#e2bca8]"
                      }`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop instructions */}
          <div className="absolute bottom-2 hidden md:block text-center z-15">
            <span className="text-[10px] font-mono text-[#a87f65]/70 dark:text-[#e2bca8]/70 uppercase tracking-widest animate-pulse">
              [ HOVER CARDS TO FAN OUT • CLICK TO OPEN CREDENTIAL INSPECTION ]
            </span>
          </div>

          {/* Mobile Grid */}
          <div className="flex md:hidden flex-col gap-6 w-full max-w-md">
            {CERTIFICATES.map((cert, idx) => {
              const isComing = cert.id === "cert-coming";
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => handleSelectCert(cert)}
                  className={`w-full rounded-2xl p-4 shadow-xs flex items-center gap-4 cursor-pointer transition-all ${
                    isComing
                      ? "bg-[#0c0d10] border border-neutral-800 hover:border-accent-cyan text-white"
                      : "bg-white dark:bg-[#1c1a19] border border-[#2b2927]/10 dark:border-neutral-850 hover:border-[#a87f65] dark:hover:border-[#e2bca8]"
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${
                    isComing ? "bg-neutral-900 border border-neutral-800 text-accent-cyan" : "bg-[#fdfbf7] dark:bg-neutral-900 border border-[#e2d5c3] dark:border-neutral-850 text-[#a87f65] dark:text-[#e2bca8]"
                  }`}>
                    {isComing ? (
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    ) : cert.id.includes("srm") || cert.id.includes("easwari") ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      <Cpu className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`font-mono text-[9px] uppercase font-bold tracking-wider ${
                        isComing ? "text-accent-cyan" : "text-[#a87f65] dark:text-[#e2bca8]"
                      }`}>{cert.badgeText}</span>
                      <span className={`font-mono text-[9px] ${
                        isComing ? "text-neutral-550" : "text-[#2b2927]/45 dark:text-neutral-500"
                      }`}>{cert.date.split(",")[1]?.trim() || cert.date.slice(-4)}</span>
                    </div>
                    <h3 className={`font-sans font-extrabold text-xs uppercase tracking-wider truncate ${
                      isComing ? "text-white" : "text-[#2b2927] dark:text-neutral-200"
                    }`}>{cert.title}</h3>
                    <p className={`text-[10px] font-sans max-w-xs truncate ${
                      isComing ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"
                    }`}>{cert.issuer}</p>
                  </div>
                  <ExternalLink className={`w-4 h-4 shrink-0 ${
                    isComing ? "text-neutral-600" : "text-neutral-400 dark:text-neutral-500"
                  }`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Resume Download Action Link */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 p-6 md:p-8 rounded-[24px] border border-[#2b2927]/10 dark:border-neutral-850 bg-white dark:bg-[#1c1a19] shadow-xs flex flex-col md:flex-row justify-between items-center gap-6 max-w-4xl mx-auto relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute inset-y-0 left-0 w-3 bg-[#a87f65] dark:bg-[#e2bca8]" />
          <div>
            <h4 className="font-sans font-extrabold text-sm sm:text-base text-[#2b2927] dark:text-neutral-200 uppercase tracking-wider mb-1">
              Continuously Expanding Technical Certifications
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 font-sans text-xs max-w-lg leading-relaxed font-light">
              Pursuing specialized badges from PyTorch organizations, AWS, and advanced Machine Learning engineering paths monthly to stay at the cutting-edge.
            </p>
          </div>
          <a
            href={PORTFOLIO_DATA.resume}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 font-mono text-[10px] tracking-widest font-extrabold bg-[#2b2927] dark:bg-neutral-800 hover:bg-[#a87f65] dark:hover:bg-[#e2bca8] text-white dark:text-neutral-200 px-6 py-3.5 rounded-full transition-all flex items-center gap-2 uppercase shadow-xs active:scale-95"
          >
            Download Resume
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      {/* DETAILED HIGH-FIDELITY IMMERSIVE REPLICATED MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-[#0c0d0c]/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="relative w-full max-w-5xl bg-[#fbf9f6] dark:bg-[#0c0b0a] rounded-[36px] overflow-hidden border border-[#2b2927]/10 dark:border-neutral-800 shadow-2xl z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible transition-colors duration-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 z-40 p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 hover:bg-[#2b2927] dark:hover:bg-neutral-800 text-[#2b2927] dark:text-neutral-200 hover:text-white dark:hover:text-white transition-all shadow-md cursor-pointer border border-transparent dark:border-neutral-800"
                aria-label="Close credentials panel"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT COLUMN: HIGH-FIDELITY DIGITAL REPLICA DESIGN */}
              <div className="lg:col-span-7 bg-white dark:bg-[#161514] border-b lg:border-b-0 lg:border-r border-[#2b2927]/10 dark:border-neutral-800 p-5 sm:p-8 flex flex-col justify-center items-center relative overflow-hidden select-none min-h-[440px] sm:min-h-[520px] transition-colors duration-300">
                
                {/* Floating viewMode switcher tabs */}
                {selectedCert.id !== "cert-coming" && (
                  <div className="absolute top-4 left-6 z-30 flex bg-[#faf8f4] dark:bg-neutral-900 border border-[#2b2927]/10 dark:border-neutral-850 p-1 rounded-full shadow-xs gap-0.5" id="cert-view-mode-tabs">
                    <button
                      onClick={() => setViewMode("replica")}
                      className={`px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                        viewMode === "replica" ? "bg-[#2b2927] dark:bg-neutral-800 text-white dark:text-neutral-200" : "text-[#2b2927] dark:text-neutral-400 hover:text-[#a87f65] dark:hover:text-[#e2bca8]"
                      }`}
                    >
                      Digital replica
                    </button>
                    <button
                      onClick={() => setViewMode("original")}
                      className={`px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                        viewMode === "original" ? "bg-[#2b2927] dark:bg-neutral-800 text-white dark:text-neutral-200" : "text-[#2b2927] dark:text-neutral-400 hover:text-[#2b2927]/60 dark:hover:text-neutral-350"
                      }`}
                    >
                      Original scan
                    </button>
                  </div>
                )}

                <div className="w-full h-full flex items-center justify-center pt-8">
                  {viewMode === "original" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2" id="cert-original-view-panel">
                      {selectedCert.originalScanUrl ? (
                        <div className="relative group w-full max-w-[480px] h-full flex flex-col justify-center items-center font-sans">
                          <img 
                            src={selectedCert.originalScanUrl} 
                            alt={`${selectedCert.title} original scan`} 
                            className="max-w-full max-h-[400px] sm:max-h-[440px] shadow-lg border border-neutral-250/50 object-contain rounded-xl"
                            referrerPolicy="no-referrer"
                          />
                          <div className="mt-3.5 flex items-center gap-2 text-[10px] font-mono text-emerald-700 bg-emerald-50/90 border border-emerald-250 font-extrabold px-4 py-2 rounded-full shadow-xs select-none">
                            <ShieldCheck className="w-4 h-4 ml-0.5 text-emerald-600 shrink-0" />
                            SECURE OFFICIAL VERIFIED CREDENTIAL
                          </div>
                        </div>
                      ) : originalCerts[selectedCert.id] ? (
                        <div className="relative group w-full max-w-[480px] h-full flex flex-col justify-center items-center">
                          <img 
                            src={originalCerts[selectedCert.id]} 
                            alt={`${selectedCert.title} original scan`} 
                            className="max-w-full max-h-[400px] sm:max-h-[440px] object-contain rounded-xl shadow-lg border border-neutral-250/50"
                            referrerPolicy="no-referrer"
                          />
                          <div className="mt-3.5 flex items-center gap-3">
                            <button
                              onClick={() => handleUploadOriginal(selectedCert.id, "")}
                              className="text-[9px] font-mono text-neutral-500 hover:text-red-550 font-extrabold transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider bg-neutral-100/80 hover:bg-neutral-200/50 px-3 py-1.5 rounded-full border border-neutral-200/60"
                            >
                              <Trash className="w-3 h-3" /> Remove Scan
                            </button>
                            <button
                              onClick={() => {
                                if (originalCerts[selectedCert.id]) {
                                  navigator.clipboard.writeText(originalCerts[selectedCert.id]);
                                  setCopiedState(true);
                                  setTimeout(() => setCopiedState(false), 2000);
                                }
                              }}
                              className="text-[9px] font-mono text-[#a87f65] hover:text-[#547394] font-extrabold transition-all cursor-pointer flex items-center gap-1.5 uppercase tracking-wider bg-[#a87f65]/5 hover:bg-[#a87f65]/10 px-3 py-1.5 rounded-full border border-[#a87f65]/20 font-bold"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                              {copiedState ? "Copied Base64!" : "Copy Base64 String"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={(e) => handleDrop(e, selectedCert.id)}
                          className={`w-full max-w-[460px] p-6 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center text-center justify-center min-h-[350px] cursor-pointer ${
                            dragActive 
                              ? "border-[#a87f65] dark:border-[#e2bca8] bg-[#a87f65]/5 dark:bg-[#e2bca8]/5 scale-[0.985]" 
                              : "border-neutral-200/80 dark:border-neutral-800 hover:border-[#a87f65] dark:hover:border-[#e2bca8] bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                          }`}
                        >
                          <input 
                            type="file" 
                            id={`file-upload-${selectedCert.id}`}
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, selectedCert.id)}
                          />
                          <label htmlFor={`file-upload-${selectedCert.id}`} className="cursor-pointer flex flex-col items-center w-full">
                            <span className="p-3 bg-amber-50 dark:bg-neutral-900 rounded-full border border-amber-200/40 dark:border-neutral-800 text-amber-600/85 dark:text-amber-550 mb-4 transition-colors duration-300">
                              <Award className="w-8 h-8 stroke-[1.25]" />
                            </span>
                            <h4 className="font-sans font-extrabold text-[#2b2927] dark:text-neutral-200 text-xs sm:text-sm uppercase tracking-wider mb-2">
                              No Scan Deposited
                            </h4>
                            <p className="font-sans text-[11px] text-neutral-500 dark:text-neutral-400 font-light max-w-xs mb-6 leading-relaxed">
                              Drag & drop your original SRM or Easwari certificate scan file here, or click to choose from system files.
                            </p>
                            <span className="font-mono text-[9px] tracking-widest bg-[#2b2927] dark:bg-neutral-800 hover:bg-[#a87f65] dark:hover:bg-[#e2bca8] text-white dark:text-neutral-200 px-5 py-2.5 rounded-full uppercase font-bold transition-all duration-300 shadow-xs">
                              Select scan file
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" id="cert-digital-replicas-wrapper">
                      {/* 1. SRM CERTIFICATE HIGH-FIDELITY RENDERING */}
                      {selectedCert.id === "cert-srm" && (
                  <div className="w-full max-w-[480px] bg-[#fefcf6] dark:bg-[#161514] border-[4px] double border-[#c5a880] dark:border-[#e2bca8]/40 p-4.5 sm:p-6 rounded-md shadow-xs flex flex-col justify-between h-full relative text-[#2b1f15] dark:text-neutral-300 selection:bg-transparent transition-colors duration-300">
                    {/* Inner thin frame */}
                    <div className="absolute inset-1.5 border border-[#d2bc9e] dark:border-[#e2bca8]/20 rounded-xs opacity-70 pointer-events-none" />
                    
                    {/* Header alignment */}
                    <div className="text-center mt-3 z-10">
                      {/* Logo seal decoration */}
                      <span className="inline-block mb-1.5 font-serif text-amber-700 dark:text-[#e2bca8] opacity-80 text-xl font-bold">SRM</span>
                      <h4 className="font-serif font-extrabold tracking-wider text-xs sm:text-sm uppercase leading-tight">
                        SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
                      </h4>
                      <p className="text-[7.5px] sm:text-[9px] font-sans font-medium tracking-wide text-neutral-500 dark:text-neutral-450 uppercase leading-none mt-1">
                        Faculty of Engineering and Technology
                      </p>
                      <p className="text-[6.5px] sm:text-[7.5px] font-sans tracking-wide text-neutral-400 dark:text-neutral-550 uppercase leading-none mt-0.5">
                        Ramapuram Campus, Chennai - 600089
                      </p>
                      
                      <div className="w-[120px] h-[0.75px] bg-[#c5a880] dark:bg-[#e2bca8]/30 mx-auto my-3 opacity-60" />
                      
                      <p className="font-mono text-[7px] text-[#a87f65] dark:text-[#e2bca8] tracking-[0.2em] font-bold">
                        TEXUS'25 — NATIONAL LEVEL TECHNICAL SYMPOSIUM
                      </p>
                    </div>

                    {/* Middle title body */}
                    <div className="text-center my-4 sm:my-6 z-10">
                      <p className="font-serif italic text-neutral-500 dark:text-neutral-450 mb-2">
                        Certificate of Appreciation
                      </p>
                      <p className="font-sans text-[7.5px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1 mb-2">
                        THIS IS TO CERTIFY THAT
                      </p>
                      <h5 className="font-serif font-bold text-lg sm:text-2xl text-neutral-900 dark:text-neutral-100 tracking-wide uppercase px-2 mb-1.5">
                        Manimaran K
                      </h5>
                      <p className="font-sans text-[8px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest border-b border-[#e5dcd0] dark:border-neutral-800 pb-2 max-w-[280px] mx-auto mb-3">
                        of Rajalakshmi Institute of Technology
                      </p>
                      <p className="text-[8.5px] font-sans leading-relaxed text-neutral-600 dark:text-neutral-350 max-w-[340px] mx-auto px-1">
                        has secured <span className="font-extrabold text-neutral-900 dark:text-white bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 px-2 py-0.5 rounded-sm">FIRST PLACE</span> in the competitive technical event <span className="font-bold text-neutral-900 dark:text-white">"QUANTUMANIA"</span> physics-computational track of TEXUS'25 organized at SRM IST Ramapuram during March 28-29, 2025.
                      </p>
                    </div>

                    {/* Footer alignments & signatures */}
                    <div className="flex xl:px-4 items-end justify-between text-[7px] font-mono mt-2 z-10">
                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-amber-900 dark:text-[#e2bca8] text-xs tracking-wide opacity-85 leading-none h-4">co_convener_sgn</span>
                        <div className="w-14 h-[0.5px] bg-neutral-300 dark:bg-neutral-800 mt-0.5 mb-1" />
                        <span className="text-[6.5px] text-neutral-500 dark:text-neutral-450 uppercase tracking-wider font-semibold">CO-CONVENER</span>
                      </div>

                      {/* Golden crest design */}
                      <div className="flex items-center justify-center w-11 h-11 rounded-full border border-dashed border-[#c5a880] dark:border-[#e2bca8]/40 text-[#c5a880] dark:text-[#e2bca8] transform rotate-12 scale-90">
                        <div className="text-center font-mono text-[5.5px] font-bold leading-tight uppercase">
                          SRM<br/>SEAL
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-amber-900 dark:text-[#e2bca8] text-xs tracking-wide opacity-85 leading-none h-4">convener_srm_sgn</span>
                        <div className="w-14 h-[0.5px] bg-neutral-300 dark:bg-neutral-800 mt-0.5 mb-1" />
                        <span className="text-[6.5px] text-neutral-500 dark:text-neutral-450 uppercase tracking-wider font-semibold">CONVENER</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. EASWARI CERTIFICATE HIGH-FIDELITY RENDERING */}
                {selectedCert.id === "cert-easwari" && (
                  <div className="w-full max-w-[480px] bg-[#0c0c0e] border-2 border-[#d4af37]/60 p-5 rounded-xl shadow-xl flex flex-col justify-between h-full relative text-white selection:bg-transparent">
                    {/* Futuristic corner framing brackets */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#d4af37]" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#d4af37]" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#d4af37]" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#d4af37]" />
                    
                    {/* Watermark Owl background */}
                    <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
                      <Trophy className="w-48 h-48 text-yellow-500" />
                    </div>

                    <div className="text-center mt-2 z-10">
                      <span className="text-[7px] font-mono tracking-[0.25em] text-[#d4af37] block mb-1">INVICTUS'25 SYMPOSIUM</span>
                      <h4 className="font-sans font-black tracking-tight text-xs sm:text-[13px] uppercase leading-tight text-neutral-100">
                        EASWARI ENGINEERING COLLEGE
                      </h4>
                      <p className="text-[6.5px] sm:text-[8px] font-mono text-neutral-400 uppercase tracking-wider mt-1">
                        DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (AI & ML)
                      </p>
                      <p className="text-[5.5px] sm:text-[7px] font-mono text-neutral-500 uppercase tracking-widest">
                        IN ASSOCIATION WITH ATLAS AUTOMATION SOCIETY
                      </p>
                      <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-2" />
                    </div>

                    <div className="text-center my-4 sm:my-5 z-10">
                      <span className="font-display italic text-[#d4af37] text-xs block mb-1.5">Certificate of Merit</span>
                      <p className="font-mono text-[7px] text-neutral-400 uppercase tracking-[0.3em] mb-1.5">THIS RECOGNITION IS PROUDLY GRANTED TO</p>
                      <h5 className="font-sans font-black text-lg sm:text-2xl text-white tracking-wider uppercase mb-1 drop-shadow-xs">
                        MANIMARAN K
                      </h5>
                      <p className="font-mono text-[7.5px] text-neutral-400 uppercase tracking-widest border-b border-[#2b2927] pb-1.5 max-w-[260px] mx-auto mb-3">
                        of Rajalakshmi Institute of Technology
                      </p>
                      <p className="text-[8px] sm:text-[9px] font-mono leading-relaxed text-neutral-300 max-w-[340px] mx-auto uppercase px-2">
                        for securing <span className="text-[#d4af37] font-bold">2ND PLACE</span> in the high-intensity algorithmic event <span className="text-neutral-100 underline decoration-[#d4af37] underline-offset-3">ESCAPE LOGIC</span> held on 12th April, 2025 during INVICTUS'25 national Level symposium.
                      </p>
                    </div>

                    <div className="flex items-end justify-between text-[6px] font-mono mt-3 px-3 z-10">
                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-neutral-300 leading-none h-4">student_conv_sgn</span>
                        <div className="w-12 h-[0.5px] bg-neutral-800" />
                        <span className="text-[5.5px] text-neutral-400 tracking-wider font-semibold uppercase mt-1">CONVENER</span>
                      </div>
                      
                      {/* Certified cryptographic stamp */}
                      <div className="flex flex-col items-center border border-dashed border-neutral-700 bg-neutral-900/40 p-1 rounded">
                        <Fingerprint className="w-4 h-4 text-[#d4af37] opacity-80" />
                        <span className="text-[5px] text-neutral-500 uppercase tracking-widest mt-0.5">VERIFIED AUTH</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-neutral-300 leading-none h-4">principal_sgn</span>
                        <div className="w-12 h-[0.5px] bg-neutral-800" />
                        <span className="text-[5.5px] text-neutral-400 tracking-wider font-semibold uppercase mt-1">PRINCIPAL</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. IIT BOMBAY CIRCUIT SIMULATION CERTIFICATE */}
                {selectedCert.id === "cert-esim-sim" && (
                  <div className="w-full max-w-[480px] bg-[#fafbff] dark:bg-[#161514] border border-[#e2e8f0] dark:border-neutral-800 rounded-xl shadow-xl flex flex-row items-stretch h-full relative overflow-hidden text-[#1e293b] dark:text-neutral-300 selection:bg-transparent transition-colors duration-300">
                    {/* Slate gray side banner */}
                    <div className="w-14 sm:w-16 bg-[#121824] dark:bg-[#0c0b0a] flex flex-col justify-between items-center py-4 text-center shrink-0 border-r border-[#1a2333] dark:border-neutral-900">
                      <div className="flex flex-col items-center gap-1">
                        <Cpu className="w-5 h-5 text-[#96b2d1]" />
                        <span className="text-[5px] sm:text-[6px] font-mono text-[#96b2d1] tracking-widest font-extrabold uppercase mt-1">eSim</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#96b2d1]/30 flex items-center justify-center transform rotate-[25deg]">
                        <span className="text-[5px] font-mono text-[#96b2d1] font-bold">FOSSEE</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[4.5px] text-neutral-500 font-mono tracking-widest uppercase">IITB</span>
                        <span className="text-[5px] text-neutral-400 font-mono font-semibold">2024</span>
                      </div>
                    </div>

                    {/* Master body panel */}
                    <div className="flex-grow p-4 sm:p-5 flex flex-col justify-between h-full bg-white dark:bg-[#1c1a19] relative transition-colors duration-300">
                      <div className="absolute top-2 right-2 border border-blue-100 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/20 px-2 py-0.5 rounded text-[6px] font-mono text-[#547394] dark:text-[#96b2d1] font-bold uppercase tracking-wider">
                        REG: {selectedCert.credentialsId}
                      </div>

                      <div className="mt-2">
                        <h4 className="font-sans font-black text-xs uppercase tracking-tight leading-tight mb-0.5 text-neutral-900 dark:text-white">
                          FOSSEE Internships Portfolio
                        </h4>
                        <p className="text-[7.5px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                          IIT BOMBAY METADATA FELLOWSHIPS
                        </p>
                        <div className="w-12 h-1 bg-[#547394] dark:bg-[#96b2d1] mt-2 rounded-full" />
                      </div>

                      <div className="my-3 text-left">
                        <p className="font-serif italic text-neutral-500 dark:text-neutral-450 text-[11px] mb-2">Certificate of Participation</p>
                        <p className="text-[7px] font-mono text-[#547394]/70 dark:text-[#96b2d1]/70 uppercase tracking-wider leading-none mb-1">
                          This is to certify that
                        </p>
                        <h5 className="text-[14px] sm:text-[17px] font-sans font-bold text-neutral-900 dark:text-white leading-tight">
                          Manimaran
                        </h5>
                        <p className="text-[8px] font-sans text-neutral-500 dark:text-neutral-450 leading-none mb-2">
                          from <span className="font-semibold text-neutral-800 dark:text-neutral-200">Rajalakshmi Institute Of Technology</span>
                        </p>
                        <p className="text-[7.5px] font-sans text-neutral-600 dark:text-neutral-350 leading-relaxed max-w-[270px]">
                          has successfully completed the digital circuit simulation of <span className="font-mono text-[7px] font-semibold text-[#1e293b] dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-900 px-1 py-0.5 border border-neutral-100 dark:border-neutral-800 rounded">"Analysis of Alternating Current Limiter Circuit For Circuit Protection And Power Management"</span> under eSim Circuit Simulation Project, IIT Bombay.
                        </p>
                      </div>

                      <div className="flex items-end justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[6.5px] font-mono">
                        <div className="flex flex-col items-start">
                          {/* QR Code outline */}
                          <div className="w-8 h-8 border border-neutral-300 dark:border-neutral-700 p-0.5 rounded flex items-center justify-center bg-white">
                            <div className="w-full h-full bg-neutral-900" style={{ clipPath: "polygon(0 0, 40% 0, 40% 40%, 0 40%, 0 0, 100% 0, 100% 30%, 70% 30%, 70% 70%, 100% 70%, 100% 100%, 0 100%, 0 70%, 30% 70%, 30% 100%)" }} />
                          </div>
                          <span className="text-[5px] text-neutral-400 dark:text-neutral-550 uppercase mt-1">VERIFY ID BLOCK</span>
                        </div>

                        <div className="flex flex-col items-right text-right">
                          <span className="font-serif italic text-neutral-700 dark:text-neutral-350 leading-none h-4">Prof_K_Moudgalya_sgn</span>
                          <div className="w-24 h-[0.5px] bg-neutral-200 dark:bg-neutral-800 mt-1 mb-0.5" />
                          <span className="text-[5.5px] text-neutral-500 dark:text-neutral-400 font-extrabold uppercase">Prof. Kannan Moudgalya</span>
                          <span className="text-[5px] text-neutral-400 dark:text-neutral-550 font-semibold leading-tight uppercase">Principal Investigator, FOSSEE, IIT Bombay</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. IIT BOMBAY RESEARCH MIGRATION CERTIFICATE */}
                {selectedCert.id === "cert-esim-mig" && (
                  <div className="w-full max-w-[480px] bg-[#f5fbf7] dark:bg-[#161514] border-2 border-emerald-600/40 dark:border-emerald-600/20 p-4.5 sm:p-6 rounded-xl shadow-xl flex flex-col justify-between h-full relative text-[#0f2d1e] dark:text-neutral-300 selection:bg-transparent transition-colors duration-300">
                    {/* Top title green stripe */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-emerald-600 dark:bg-emerald-700" />
                    
                    {/* Background circuit overlays */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                      <svg width="250" height="250" viewBox="0 0 100 100" stroke="currentColor" fill="none">
                        <path d="M 0,50 L 30,50 L 40,20 L 50,80 L 60,50 L 100,50" strokeWidth="1" />
                        <circle cx="30" cy="50" r="3" fill="currentColor" />
                        <circle cx="60" cy="50" r="3" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="text-center mt-2.5 z-10">
                      <div className="inline-block bg-emerald-550 dark:bg-emerald-950/45 border border-emerald-600 dark:border-emerald-900 text-white font-mono text-[7px] px-3 py-0.5 rounded uppercase tracking-widest font-extrabold mb-1">
                        eSim Research Migration Project
                      </div>
                      <h4 className="font-sans font-black tracking-tight text-[11px] sm:text-[12.5px] uppercase leading-none mt-1 text-neutral-900 dark:text-white">
                        FOSSEE OPEN STANDARDS INITIATIVE
                      </h4>
                      <p className="text-[7.5px] font-mono text-emerald-700/80 dark:text-emerald-500/80 uppercase tracking-widest mt-0.5">
                        REGIONAL STUDY GRANTS • IIT BOMBAY
                      </p>
                    </div>

                    <div className="my-3.5 text-center z-10">
                      <span className="font-serif italic text-emerald-800 dark:text-emerald-550 text-[11px] block">Certificate of Participation</span>
                      <p className="font-mono text-[6.5px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1 mb-1.5">THIS INTEGRATION CREDENTIAL APPLIES TO</p>
                      <h5 className="font-sans font-extrabold text-base sm:text-[20px] text-neutral-900 dark:text-white tracking-tight leading-none mb-1">
                        Mr. Manimaran
                      </h5>
                      <p className="text-[7.5px] font-sans text-neutral-500 dark:text-neutral-450 uppercase tracking-wider mb-2">
                        from <span className="font-bold text-neutral-800 dark:text-neutral-250">Rajalakshmi Institute of technology</span>
                      </p>
                      <p className="text-[8px] sm:text-[9px] font-sans leading-relaxed text-[#1c3a27] dark:text-neutral-300 max-w-[340px] mx-auto px-1.5">
                        who has successfully migrated and verified the direct current limiter circuit project <span className="font-mono text-[7px] font-bold text-emerald-800 dark:text-emerald-350 bg-emerald-50 dark:bg-emerald-950/20 px-1 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30">"Analysis of Direct Current Limiter Circuit for Circuit Protection and Power Management"</span> into open source circuit schematic simulators, monitored at IIT Bombay.
                      </p>
                    </div>

                    <div className="flex items-end justify-between text-[6.5px] font-mono pt-2 border-t border-emerald-100 dark:border-neutral-800 z-10">
                      <div className="flex flex-col text-left">
                        <span className="text-[5.5px] text-emerald-700 dark:text-emerald-550 font-extrabold tracking-wider uppercase leading-none">SEAL VERIFICATION</span>
                        <span className="text-neutral-500 dark:text-neutral-450 font-semibold uppercase font-mono mt-0.5">VAL_ESM_RM</span>
                      </div>

                      {/* Official status green rosette tag */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-500 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450">
                        <span className="font-mono text-[5px] font-black tracking-tight uppercase leading-none text-center">FOSSEE<br/>IITB</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-serif italic text-neutral-700 dark:text-neutral-350 leading-none h-4">Prof_K_M_sgn</span>
                        <div className="w-20 h-[0.5px] bg-neutral-300 dark:bg-neutral-800 mt-0.5" />
                        <span className="text-[5px] text-neutral-500 dark:text-neutral-550 uppercase mt-0.5">Principal Investigator, FOSSEE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. COOMING SOON ACHIEVEMENT REPLICA */}
                {selectedCert.id === "cert-coming" && (
                  <div className="w-full max-w-[480px] bg-[#0c0d10] border-2 border-neutral-800/85 p-6 rounded-xl shadow-2xl flex flex-col justify-between h-5/6 relative text-white overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25" />
                    
                    {/* Glowing color mesh rings */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-cyan/15 blur-2xl animate-pulse" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-[#a87f65]/15 blur-2xl animate-pulse" />

                    <div className="flex justify-between items-start mt-1 relative z-10">
                      <div className="flex items-center gap-1.5 self-start">
                        <Cpu className="w-4 h-4 text-accent-cyan animate-pulse" />
                        <span className="font-mono text-[8.5px] text-accent-cyan tracking-widest font-extrabold uppercase">ORCH_NODE</span>
                      </div>
                      <div className="border border-neutral-800 bg-neutral-900/80 px-2 py-0.5 rounded text-[6px] font-mono text-neutral-450 font-bold uppercase tracking-wider">
                        STATUS: ACTIVE_SCHEDULING
                      </div>
                    </div>

                    <div className="text-center my-6 relative z-10 flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-accent-cyan shadow-inner mb-4">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      
                      <h4 className="font-sans font-black tracking-wider text-xs uppercase leading-tight text-white mb-1">
                        MISSION_DIRECTIVE // COMING SOON
                      </h4>
                      <p className="font-mono text-[7px] text-neutral-400 uppercase tracking-[0.2em] mb-3 font-semibold">
                        2026-PRESENT SWARM RESEARCH
                      </p>
                      
                      <div className="w-10 h-[2px] bg-[#a87f65] rounded-full mb-4" />
                      
                      <p className="text-[10px] font-sans text-neutral-300 leading-relaxed max-w-[310px] uppercase tracking-wide">
                        Accelerating studies in autonomous multi-agent systems, neural physics-informed models (PINNs), and high-reliability swarm infrastructure.
                      </p>
                    </div>

                    <div className="flex items-end justify-between pt-3 border-t border-neutral-900 text-[6.5px] font-mono relative z-10 text-neutral-500">
                      <div className="flex flex-col items-start">
                        <span className="text-[5.5px] text-neutral-400 font-extrabold tracking-wider uppercase leading-none">TARGET LANDING</span>
                        <span className="text-neutral-500 font-semibold mt-0.5 uppercase">SWARM_SYSTEMS_2026</span>
                      </div>

                      <div className="flex flex-col items-end text-right">
                        <span className="font-serif italic text-neutral-350 leading-none h-4">Future_Core_Deploy</span>
                        <div className="w-20 h-[0.5px] bg-neutral-800 mt-1 mb-0.5" />
                        <span className="text-[5.5px] text-neutral-400 font-semibold leading-tight uppercase">System Orchestration Node</span>
                      </div>
                    </div>
                  </div>
                )}


                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Descriptive analysis and links */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-[#1c1a19] text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar className="w-4 h-4 text-[#a87f65] dark:text-[#e2bca8]" />
                    <span className="font-mono text-[9px] text-[#2b2927]/60 dark:text-neutral-450 tracking-wider font-semibold uppercase">
                      {selectedCert.date}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-[#2b2927] dark:text-white text-2xl tracking-tight uppercase leading-none mb-1">
                    {selectedCert.title}
                  </h3>
                  <p className="font-display italic text-[#a87f65] dark:text-[#e2bca8] text-sm tracking-normal mb-6">
                    {selectedCert.subtitle}
                  </p>

                  <div className="h-[1px] bg-[#2b2927]/10 dark:bg-neutral-800 mb-6" />

                  {/* Verified stats summary block */}
                  <div className="flex flex-col gap-5 mb-8">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-[#2b2927]/50 dark:text-neutral-500 tracking-wider uppercase mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#a87f65] dark:text-[#e2bca8]" />
                        <span>LOCATION</span>
                      </div>
                      <p className="text-[#2b2927] dark:text-neutral-200 font-sans text-xs font-semibold leading-relaxed">
                        {selectedCert.location}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-[#2b2927]/50 dark:text-neutral-500 tracking-wider uppercase mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#a87f65] dark:text-[#e2bca8]" />
                        <span>SPEC DETAILS</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-350 font-sans text-xs leading-relaxed font-light">
                        {selectedCert.details}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-[#2b2927]/50 dark:text-neutral-500 tracking-wider uppercase mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>METADATA INTEGRITY STATE</span>
                      </div>
                      <p className="text-neutral-500 dark:text-neutral-400 font-mono text-[9px] leading-tight flex items-center gap-1 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-150 dark:border-neutral-800 p-2 rounded">
                        <Sparkles className="w-3 h-3 text-[#a87f65] dark:text-[#e2bca8] shrink-0" />
                        <span>COHERENT_VERIFICATION_HASH: // {selectedCert.credentialsId}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to action button */}
                {selectedCert.verifyUrl && (
                  <div className="border-t border-[#2b2927]/10 dark:border-neutral-800 pt-5 mt-5">
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#2b2927] dark:bg-neutral-800 hover:bg-[#a87f65] dark:hover:bg-[#e2bca8] text-white dark:text-neutral-200 rounded-full py-3.5 text-xs font-mono font-bold tracking-widest text-center flex items-center justify-center gap-2 transition-all shadow-xs uppercase cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Official Credential URL
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
