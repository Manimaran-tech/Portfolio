import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Mail, Send, Github, Linkedin, MapPin, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    
    // Simulate server side submit lag
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
    // Display beautiful success toast
    setToast({
      message: `System message registered. Thank you, ${data.name}!`,
      type: "success"
    });
    
    setLoading(false);
    reset();

    // Auto dismiss toast after 5s
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 w-full bg-bg-dark overflow-hidden px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
    >
      {/* Editorial Hairline Grid Lines drawing on mount */}
      <div className="absolute inset-x-0 top-1/4 h-[1px] bg-neutral-200/45 dark:bg-neutral-850/20 z-0 select-none pointer-events-none" />
      <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-[#2b2927]/5 dark:bg-neutral-850/10 z-0 select-none pointer-events-none" />
      <div className="absolute left-[20vw] inset-y-0 w-[1px] bg-neutral-200/45 dark:bg-neutral-850/20 z-0 select-none pointer-events-none" />
      <div className="absolute right-[20vw] inset-y-0 w-[1px] bg-neutral-200/45 dark:bg-neutral-850/20 z-0 select-none pointer-events-none" />

      {/* Decorative Blueprint Markers */}
      <div className="absolute top-24 left-12 p-1 border-t border-l border-neutral-250/60 dark:border-neutral-800/40 pointer-events-none select-none text-[8px] font-mono text-neutral-400 dark:text-neutral-500">
        [SEC_CONTACT_05]
      </div>
      <div className="absolute top-24 right-12 p-1 border-t border-r border-neutral-250/60 dark:border-neutral-800/40 pointer-events-none select-none text-[8px] font-mono text-neutral-400 dark:text-neutral-500">
        [NODE_CHNL_SEC_M]
      </div>

      {/* Background vector spots */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[2%] left-[-10%] w-[380px] h-[380px] bg-accent-gold/8 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-[9px] text-accent-cyan tracking-[0.3em] uppercase block mb-3 font-semibold"
            >
              // 05. CONTACT CHANNELS
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-neutral-800 dark:text-neutral-200 tracking-normal leading-none uppercase overflow-hidden">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                SECURE CHANNELS
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
            className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest md:mb-4"
          >
            LET'S CONSTRUCT TOMORROW DIRECTLY
          </motion.div>
        </div>

        {/* Contact Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT PANEL: Interactive contact form validated with focus morphings */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fefdfc] dark:bg-[#1c1a19] relative shadow-sm transition-colors duration-300">
              <span className="font-mono text-[9px] text-accent-cyan uppercase tracking-widest block mb-1 font-semibold">
                // DISPATCH A FORMAL ENQUIRY
              </span>
              <h3 className="font-display text-lg font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-8">
                DIRECT SECURE INPUTS
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Name fields */}
                <div className="relative">
                  <label className="block font-mono text-[9px] text-neutral-500 dark:text-neutral-450 uppercase tracking-widest mb-1.5 pl-1 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name field is required" })}
                    placeholder="Enter full name"
                    className="w-full bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-850 rounded-lg px-4 py-3 text-xs text-neutral-850 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-550 outline-none hover:border-neutral-350 dark:hover:border-neutral-750 focus:border-accent-cyan focus:bg-white dark:focus:bg-neutral-900 focus:shadow-sm transition-all"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-[#a87f65] dark:text-[#e2bca8] font-mono flex items-center gap-1.5 mt-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="relative">
                  <label className="block font-mono text-[9px] text-neutral-500 dark:text-neutral-450 uppercase tracking-widest mb-1.5 pl-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z|a-z]{2,4}$/i,
                        message: "Invalid email syntax"
                      }
                    })}
                    placeholder="example@gmail.com"
                    className="w-full bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-850 rounded-lg px-4 py-3 text-xs text-neutral-850 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-550 outline-none hover:border-neutral-350 dark:hover:border-neutral-750 focus:border-accent-cyan focus:bg-white dark:focus:bg-neutral-900 focus:shadow-sm transition-all"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-[#a87f65] dark:text-[#e2bca8] font-mono flex items-center gap-1.5 mt-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Subject Topic */}
                <div className="relative">
                  <label className="block font-mono text-[9px] text-neutral-500 dark:text-neutral-450 uppercase tracking-widest mb-1.5 pl-1 font-semibold">
                    Subject Topic
                  </label>
                  <input
                    type="text"
                    {...register("subject", { required: "Subject topic is required" })}
                    placeholder="E.g., Collaboration, Job inquiries"
                    className="w-full bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-850 rounded-lg px-4 py-3 text-xs text-neutral-850 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-550 outline-none hover:border-neutral-350 dark:hover:border-neutral-750 focus:border-accent-cyan focus:bg-white dark:focus:bg-neutral-900 focus:shadow-sm transition-all"
                  />
                  {errors.subject && (
                    <span className="text-[10px] text-[#a87f65] dark:text-[#e2bca8] font-mono flex items-center gap-1.5 mt-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message block */}
                <div className="relative">
                  <label className="block font-mono text-[9px] text-neutral-500 dark:text-neutral-450 uppercase tracking-widest mb-1.5 pl-1 font-semibold">
                    Message Body
                  </label>
                  <textarea
                    rows={4}
                    {...register("message", { 
                      required: "Message is required",
                      minLength: { value: 10, message: "Minimal length is 10 chars" }
                    })}
                    placeholder="Draft your proposal here..."
                    className="w-full bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-850 rounded-lg px-4 py-3 text-xs text-neutral-850 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-550 outline-none hover:border-neutral-350 dark:hover:border-neutral-750 focus:border-accent-cyan focus:bg-white dark:focus:bg-neutral-900 focus:shadow-sm transition-all resize-none"
                  />
                  {errors.message && (
                    <span className="text-[10px] text-[#a87f65] dark:text-[#e2bca8] font-mono flex items-center gap-1.5 mt-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit button wrapper */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-cyan hover:bg-accent-cyan/95 text-neutral-900 font-sans font-semibold text-xs tracking-widest uppercase py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                      Securing transmission...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Dispatch Message
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

          {/* RIGHT PANEL: Timezone Details + Social shortcut card badges */}
          <motion.div 
            className="lg:col-span-6 flex flex-col gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            
            {/* Direct Contact channels detailed shortcuts card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fefdfc] dark:bg-[#1c1a19] shadow-sm transition-colors duration-300">
              <span className="font-mono text-[9px] text-[#a87f65] dark:text-[#e2bca8] uppercase tracking-widest block mb-1 font-semibold">
                // SYSTEM IDENTIFICATION MODULES
              </span>
              <h3 className="font-display text-sm font-medium text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                COORDINATE MAPS
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-accent-cyan">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Location Base</span>
                    <span className="text-xs text-neutral-700 dark:text-neutral-300 uppercase font-medium">{PORTFOLIO_DATA.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-accent-cyan">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Operational Mail</span>
                    <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-xs text-neutral-700 dark:text-neutral-300 hover:text-accent-cyan transition-colors underline decoration-dotted leading-none">
                      {PORTFOLIO_DATA.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Grid of clean staggered social action anchors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-8 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                
                <a
                  href={PORTFOLIO_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-accent-cyan/60 hover:bg-accent-cyan/10 dark:hover:bg-accent-cyan/5 transition-all group select-none shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-neutral-400 group-hover:text-accent-cyan transition-colors" />
                    <div>
                      <span className="font-display text-[11px] font-medium text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">GitHub Code</span>
                      <span className="font-mono text-[8.5px] text-neutral-400 dark:text-neutral-550 lowercase tracking-wider">&gt; Manimaran-tech</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-300 group-hover:text-accent-cyan transition-colors" />
                </a>

                <a
                  href={PORTFOLIO_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-accent-cyan/60 hover:bg-accent-cyan/10 dark:hover:bg-accent-cyan/5 transition-all group select-none shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-neutral-400 group-hover:text-accent-cyan transition-colors" />
                    <div>
                      <span className="font-display text-[11px] font-medium text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">LinkedIn Net</span>
                      <span className="font-mono text-[8.5px] text-neutral-400 dark:text-neutral-550 lowercase tracking-wider">&gt; Manimaran K</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-300 group-hover:text-accent-cyan transition-colors" />
                </a>

              </div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* Floating toast notification alert indicator */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg glass-panel border border-accent-cyan/55 dark:border-accent-cyan/35 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 flex items-center gap-3 max-w-sm"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 25 }}
          >
            <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0" />
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-mono tracking-wide">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
