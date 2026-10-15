# 🚀 CreatorPilot: Open Creator Workbench

> An open-source, high-retention digital creator workbench combining crowdsourced AI prompt discovery, algorithmic viral hook generation, and an interactive Kanban pipeline.

---

## 🌟 Hackathon Solution Highlights

Digital creators, indie filmmakers, and solo founders frequently hit three major bottlenecks:
1. **Finding What Works**: Discovering high-performing AI video prompts (Runway Gen-3, Sora, Midjourney, Kling) and viral hooks across platforms.
2. **Structuring Retentive Scripts**: Converting raw ideas into scene-by-scene script breakdowns formatted for short-form retention (0-3s hook, agitation, value drop, looping CTA).
3. **Execution Tracking**: Managing video ideas from initial drafting through production, voiceover, captioning, and publishing.

**CreatorPilot** solves this inside an offline-first, client-side workbench requiring zero API keys or backend setup.

---

## ⚡ Core Features

### 1. 💡 Open Strategy Hub
* **Crowdsourced Feed**: Realistic seed library of viral short-form hooks and high-contrast AI video prompts.
* **Filter & Search**: Instant filter across categories (`#Hooks`, `#B-RollPrompts`, `#TechExplainer`, `#CinematicAI`, `#E-Commerce`) and platforms (**YouTube Shorts**, **Instagram Reels**, **TikTok**, **X/Twitter**).
* **Upvoting**: Live upvote counters with optimistic client-side persistence in `localStorage`.
* **One-Click Actions**: Copy prompts to clipboard with instant toast notifications, or click **"Use as Topic"** to immediately import into the Playground.
* **Community Contributions**: Submit custom hooks or AI video generation recipes directly to the feed.

### 2. ⚡ Script & Hook Playground
* **Algorithmic Viral Generation**: Produces 3 psychological hook angles (The Contrarian Pattern Interrupt, The Curiosity Gap, and The High-Stakes Story) without requiring external paid LLM keys.
* **Scene-by-Scene Breakdown**: Generates 4 timestamped scene cards (Hook, Problem, Solution, Infinite Loop CTA) with visual cues, spoken voiceover text, and tailored AI video generator prompts.
* **Inline Script Editor**: Edit voiceover lines directly with real-time word count and estimated speech duration.
* **🚀 Direct Pipeline Bridge**: Push any generated script directly into an active card on the Kanban Pipeline Board.

### 3. 📋 Content Pipeline Board (Kanban)
* **3 Visual Production Stages**: `Drafting` ➔ `Production` ➔ `Published`.
* **Production Checklist**: Track Voiceover, AI B-Roll generation, Kinetic Captions, and Script Approval with live progress indicators.
* **Stage Progression**: One-click advance and return buttons with animated **confetti celebration** upon publishing.
* **Pipeline Metrics**: Live tracking of active video velocity, completed checklist tasks, and published counts.

---

## 📦 Repository Footprint (< 10 MB Verified)

This repository includes a strict [`.gitignore`](./.gitignore) ensuring all heavy folders (`node_modules/`, `dist/`, cache files, and OS metadata) are permanently excluded from Git. Total tracked source size is **< 1 MB**.

---

## 🛠️ Tech Stack & Setup

* **Framework**: React 18 SPA
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Micro-interactions**: Canvas Confetti

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```
