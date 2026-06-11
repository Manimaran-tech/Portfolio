export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Web" | "Mobile" | "AI" | "Design" | "All";
  tech: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
  skills: string[];
  links?: { label: string; url: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  location: string;
  coursework: string[];
}

export const PORTFOLIO_DATA = {
  name: "Manimaran K",
  primaryTitle: "AI Agent & Machine Learning Engineer",
  cyclingTitles: ["AI Agent Builder", "ML Researcher", "Full Stack Developer", "Open Source Contributor"],
  bio: "Third-year Computer Science undergraduate with production experience building AI agent pipelines (LangChain, LangGraph, Pydantic AI), ML systems (PyTorch, TensorFlow, PINNs), and robust full-stack software. Open-source contributor to PyTorch-Ignite (4.9K★) and research intern at IIT Bombay FOSSEE.",
  location: "Chennai, Tamil Nadu, India",
  timezone: "Asia/Kolkata (UTC+5:30)",
  email: "manimaran230806@gmail.com",
  github: "https://github.com/Manimaran-tech",
  linkedin: "https://www.linkedin.com/in/manimaran-k",
  resume: "/Manimaran_Resume.pdf",

  stats: [
    { id: "stat-1", label: "Ignite Stars Contributed", value: 4900, suffix: "★" },
    { id: "stat-2", label: "Merged Ignite PRs", value: 12, suffix: "+" },
    { id: "stat-3", label: "eSim Users Served", value: 10000, suffix: "+" },
    { id: "stat-4", label: "LeetCode Solved", value: 150, suffix: "+" },
    { id: "stat-5", label: "Academic Grade", value: 85, suffix: "%" },
  ] as StatItem[],

  education: [
    {
      institution: "Rajalakshmi Institute of Technology",
      degree: "B.E. Computer Science & Business Systems",
      duration: "2024 - 2028",
      grade: "GPA: 8.5 / 10",
      location: "Chennai, India",
      coursework: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering"]
    },
    {
      institution: "Velammal Vidyalaya (CBSE)",
      degree: "Class XII",
      duration: "2022 - 2024",
      grade: "93.4% (Class XII) | 88% (Class X)",
      location: "Chennai, India",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
    }
  ] as EducationItem[],

  skills: {
    frontend: [
      { name: "React / Next.js", rating: 92 },
      { name: "TypeScript / JS", rating: 90 },
      { name: "Tailwind CSS", rating: 95 },
      { name: "HTML5 / CSS3", rating: 90 },
      { name: "Framer Motion", rating: 88 },
    ],
    backend: [
      { name: "FastAPI / Python", rating: 95 },
      { name: "Node.js / Express", rating: 90 },
      { name: "PostgreSQL / SQL", rating: 85 },
      { name: "Docker Containers", rating: 80 },
      { name: "Firebase (Firestore/Auth)", rating: 92 },
    ],
    aiCloud: [
      { name: "AI Agents (LangGraph, n8n)", rating: 95 },
      { name: "PyTorch & TensorFlow", rating: 88 },
      { name: "Vector DBs (Chroma, FAISS)", rating: 90 },
      { name: "GitHub Actions CI/CD", rating: 85 },
      { name: "RAG & Prompt Engineering", rating: 92 },
    ]
  },

  projects: [
    {
      id: "proj-1",
      title: "AutoReel",
      description: "A highly complex, multi-stage agentic pipeline built using LangGraph orchestrators. Automates the full production workflow from web scraping to RAG-based LLM generative text, text-to-speech synthesis, and synchronized video rendering, running end-to-end under 3 minutes with zero human intervention. Powered by a FastAPI server and ChromaDB semantic vector search.",
      category: "AI",
      tech: ["LangChain", "LangGraph", "FastAPI", "RAG", "ChromaDB", "Python"],
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      githubUrl: "https://github.com/Manimaran-tech/Auto-Reel",
      liveUrl: "https://github.com/Manimaran-tech/Auto-Reel",
      featured: true
    },
    {
      id: "proj-2",
      title: "YieldSense",
      description: "A live, fully deployed production predictive agriculture application that features 100% automated CI/CD monitoring with sub-5-minute failure alert thresholds pushed to Telegram. Embeds custom Scikit-learn machine learning forecasting models and serves an interactive responsive telemetry control dashboard hosted securely on Firebase Cloud ecosystems.",
      category: "Web",
      tech: ["Firebase", "Cloud Functions", "Scikit-learn", "CI/CD", "Telegram API", "React"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      githubUrl: "https://github.com/Manimaran-tech/stable_yeildsense",
      liveUrl: "https://yieldsense-app.web.app/",
      featured: true
    },
    {
      id: "proj-3",
      title: "Satellite Re-entry PINN",
      description: "Developed and trained highly optimized Physics-Informed Neural Networks inside PyTorch to calculate and map orbital decay vectors. Formulated a customized dual-objective math loss engine joining empirical mechanical constraints with tracking telemetry, bringing decay calculation errors under 5%.",
      category: "AI",
      tech: ["PyTorch", "PINNs", "Physics Engine", "Python", "Numerical Math"],
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      githubUrl: "https://github.com/Manimaran-tech/pinn-orbital-reentry-prediction",
      featured: false
    },
    {
      id: "proj-4",
      title: "SQL Container Platform",
      description: "An automated grading and execution sandbox. Spawns isolated PostgreSQL instances inside Docker environments to validate and test analytical SQL structures. Flexes queries against intensive 8-table mock schemas housing 5,000+ data rows, validating injected edge-cases prior to LLM evaluation passes.",
      category: "Web",
      tech: ["Docker", "PostgreSQL", "Python", "Automated Testing", "SQL Sandbox"],
      imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      githubUrl: "https://github.com/Manimaran-tech/sql_data_analyst",
      featured: false
    }
  ] as Project[],

  experiences: [
    {
      id: "exp-1",
      company: "FOSSEE, IIT Bombay",
      role: "eSim Circuit Simulation Intern",
      duration: "Winter 2024",
      description: [
        "Tested, debugged, and patched the open-source EDA tool eSim (Python), serving 10,000+ users globally; all patches successfully delivered via Git Pull Requests reviewed and approved by IIT Bombay faculty.",
        "Authored rigorous automated regression test suites for the eSim 2.4 release using pytest inside CI workflows; documented thorough root-cause runbooks integrated into project source trees.",
        "Completed rigorous digital and analog integrated circuit design simulation, research migration, and extensive report documentation."
      ],
      skills: ["eSim", "Python", "pytest", "EDA Tools", "Circuit Simulation", "CI/CD Git"],
      links: [
        { label: "View Work Report", url: "https://static.fossee.in/fossee/reports-2024/winter_internship/Manimaran_K_eSIM_report.pdf" },
        { label: "Verify Certificate", url: "/experience/INT2024Pcertificate.pdf" }
      ]
    },
    {
      id: "exp-2",
      company: "PyTorch-Ignite & Gammapy",
      role: "Open-Source Contributor",
      duration: "2024 - Present",
      description: [
        "Authored 12+ merged Pull Requests into PyTorch-Ignite (4.9K★ GitHub stars), streamlining core assessment components and implementing major modernizations across metrics and handlers verified by GitHub Actions.",
        "Refactored legacy routines and addressed critical deprecations on the Gammapy astrophysics ecosystem, satisfying demanding peer-review standards.",
        "Earned the GitHub 'Pull Shark' achievement for persistent, high-standard community contributions."
      ],
      skills: ["PyTorch", "Github Actions", "Git", "Unittest", "Python Modules"]
    }
  ] as ExperienceItem[],

  achievements: [
    {
      id: "ach-1",
      title: "PyTorch-Ignite Contributor Achievement",
      issuer: "PyTorch Foundation Community",
      date: "2024",
      description: "Successfully implemented core evaluation modules and handled modern code standards for PyTorch-Ignite metrics.",
      iconName: "Code"
    },
    {
      id: "ach-2",
      title: "FOSSEE Research Internship Certificate",
      issuer: "FOSSEE, IIT Bombay",
      date: "2025",
      description: "Successfully completed digital and analog integrated circuit design and open-source contributions in eSim (Verification Code: 70691).",
      iconName: "Award"
    },
    {
      id: "ach-3",
      title: "Google Cloud Skill Badges",
      issuer: "Google Cloud Training",
      date: "2024",
      description: "Earned theoretical and hands-on skill recognition for generative model pipelines and prompt tuning designs.",
      iconName: "FileCheck"
    }
  ] as Achievement[]
};
