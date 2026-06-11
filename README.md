# Immersive 3D Creative Developer Portfolio

A production-ready, cinematic, physics-backed, and immersive developer portfolio engineered specifically for **Manimaran K** to showcase **Full Stack AI Development** and **Creative Systems Engineering**.

## 🎨 Visual Identity & Aesthetic Philosophy

- **Deep Space Theme**: Features near-black canvases (`#080808` base) paired with electric neon cyan (`#00f5d4`) and warm solar gold (`#f5a623`) highlights.
- **Glassmorphic Surfaces**: Glass-panel cards crafted with solid borders (`rgba(255,255,255,0.08)`) and high-index blur, creating layers of visual depth.
- **Typography Pairings**: Pairings of **Syne** (for bold display tracking headers) and **DM Sans** (for highly responsive, comfortable reading columns).
- **Cinematic Fluidity**: Smooth spring physics, staggered entrances, magnetic hover attractions, and custom dual-ring cursors.

---

## 🛠️ Technology Stack Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Framework & Router** | React 18/19 & Vite |
| **3D Graphic Core** | Three.js + React Three Fiber (R3F) |
| **Animation Engines** | Framer Motion (`motion/react`) for spring interpolations |
| **Styling Module** | Tailwind CSS v4 (native CSS variables & `@theme`) |
| **Form Orchestrators** | React Hook Form (comprehensive local rules validation) |
| **Icon Libraries** | Lucide React |

---

## 📟 Project Modules & Core Sections

### 1. Hero Field
Embedded full-viewport Three.js Canvas. Features a procedural fluid **Morphing Blob** utilizing custom GLSL vertex and fragment shaders that react to scroll offsets, combined with an interactive **Point Cloud Particle System** (5,000+ nodes) that follows the user's cursor. Character-by-character text triggers staggered entrance animations.

### 2. Core Profile (About)
Combines multi-domain stories of professional timeline entries (Foundations, Full-Stack Mastery, AI Systems) with an animated, custom **SVG Radar Chart** mapping technical capacities. Badges float and drift autonomously over wave-equations.

### 3. Professional Timeline (Experience)
A vertical column rendering cards with **3D Parallax Hover Tilt** (calculating relative mouse vectors to rotate with a capped 15-degree limit). Numbers representing metrics count up seamlessly when scrolled into view.

### 4. Coded Artifacts (Projects)
A category-filtered grid (Web, Mobile, AI, Design). Every project card is built as a double-sided interactive container, utilizing a custom 3D hardware-accelerated CSS flip rotation on hover to reveal tech structures and GitHub action links.

### 5. Milestone & Credentials (Achievements)
Displays verified badges over a continuous infinite horizontal ribbon marquee. Achievements are styled with visual watermark stamps that pulse and scale on mouse triggers.

### 6. Secure Matrix Initiator (Contact)
A split container:
- **Left Panel**: Highly validated message dispatcher styled with sliding neon focus borders. Included out-of-the-box local pop-up toast confirmations upon submit.
- **Right Panel**: A dark cybernetic **3D Coordinate Globe** pointing a pulsing physical coordinate pin at Tamil Nadu, India. Supports touch and drag rotators.

---

## 🚀 Performance & Device Optimization

- **Lighthouse Performance Optimization**: Detects mobile client configurations dynamically to suppress WebGL render processes, replacing heavy 3D canvases with lightweight CSS animations and vector grids.
- **WASM Bounds Handling**: Isolates physics calculations and optimizes memory constraints of R3F loops.
- **Hardware Acceleration**: Harnesses standard standard WebGL, CSS variables, and modern browsers' paint threads to sustain a constant 60fps layout target.

---

## 📦 Setting Up and Launching Locally

### Prerequisites
Installs require Node.js environment (v18 or higher recommended).

### 1. Clone the codebase and navigate inside
```bash
cd immersive-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Spin up development server
```bash
npm run dev
```
The server will boot locally over `http://localhost:3000`.

### 4. Build package for production
```bash
npm run build
```
Generates statically optimized files inside the `/dist` directory.
