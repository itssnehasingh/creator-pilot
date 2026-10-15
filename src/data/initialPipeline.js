export const INITIAL_PIPELINE = [
  {
    id: "card-1",
    title: "Why 90% of AI Video Creators Quit",
    stage: "Drafting", // Drafting, Production, Published
    platform: "YouTube Shorts",
    hook: "Most creators think better prompts make better videos. They're dead wrong. Here's what actually drives 10M+ views.",
    duration: "45s",
    priority: "High",
    dueDate: "2026-10-18",
    tags: ["#AIStorytelling", "#ShortsGrowth"],
    checklist: [
      { id: "c1", label: "Finalize Scene 2 Script", done: true },
      { id: "c2", label: "Select Runway Gen-3 B-roll", done: false },
      { id: "c3", label: "Record Voiceover", done: false },
      { id: "c4", label: "Burn-in Kinetic Subtitles", done: false }
    ],
    notes: "Focus heavily on the first 3 seconds pattern interrupt with sound effect."
  },
  {
    id: "card-2",
    title: "How to Build a Custom GPT in 60 Seconds",
    stage: "Drafting",
    platform: "TikTok",
    hook: "If you don't have your own custom AI agent by Friday, you're competing at a massive disadvantage. Watch this.",
    duration: "60s",
    priority: "Medium",
    dueDate: "2026-10-19",
    tags: ["#Tutorial", "#NoCodeAI"],
    checklist: [
      { id: "c1", label: "Screen record step-by-step setup", done: true },
      { id: "c2", label: "Generate hook B-roll", done: false },
      { id: "c3", label: "Add background trending audio", done: false }
    ],
    notes: "Keep screen captures rapid-fire, zoomed in on crucial click areas."
  },
  {
    id: "card-3",
    title: "Sora vs Runway Gen-3: Side-by-Side Test",
    stage: "Production",
    platform: "Instagram Reels",
    hook: "We generated the exact same prompt in Sora and Runway Gen-3. The results will shock 99% of digital filmmakers.",
    duration: "55s",
    priority: "Urgent",
    dueDate: "2026-10-16",
    tags: ["#Benchmark", "#VisualComparison"],
    checklist: [
      { id: "c1", label: "Generate prompt test clips", done: true },
      { id: "c2", label: "Record side-by-side comparison", done: true },
      { id: "c3", label: "Render 9:16 split screen", done: true },
      { id: "c4", label: "Color grade & add sound design", done: false }
    ],
    notes: "Split-screen vertical video layout with animated arrows."
  },
  {
    id: "card-4",
    title: "Micro-SaaS Solo Founder Workflow Breakdown",
    stage: "Production",
    platform: "X (Twitter)",
    hook: "I run a $12k/month SaaS with zero employees. Here is the automated video flywheel I use every morning.",
    duration: "40s",
    priority: "Medium",
    dueDate: "2026-10-17",
    tags: ["#BuildInPublic", "#IndieHacker"],
    checklist: [
      { id: "c1", label: "Prepare slide deck graphics", done: true },
      { id: "c2", label: "Record loom walk-through", done: true },
      { id: "c3", label: "Trim pauses with auto-cut", done: false }
    ],
    notes: "High authority tone, clean font overlays."
  },
  {
    id: "card-5",
    title: "The 3-Second Audio Hook Formula",
    stage: "Published",
    platform: "TikTok",
    hook: "Stop putting your best punchline at the end. Flip it to second 0:01 and watch your completion rate skyrocket.",
    duration: "35s",
    priority: "Completed",
    dueDate: "2026-10-14",
    tags: ["#ViralTips", "#AudioDesign"],
    checklist: [
      { id: "c1", label: "Script drafted", done: true },
      { id: "c2", label: "Visuals animated", done: true },
      { id: "c3", label: "Voiceover recorded", done: true },
      { id: "c4", label: "Posted with tags", done: true }
    ],
    notes: "Gained 48k views in first 24h. Save template for future videos!"
  }
];

export const PIPELINE_STAGES = [
  { id: "Drafting", title: "Drafting", color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/40", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  { id: "Production", title: "In Production", color: "from-indigo-500/20 to-cyan-500/20", border: "border-indigo-500/40", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
  { id: "Published", title: "Published", color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/40", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" }
];
