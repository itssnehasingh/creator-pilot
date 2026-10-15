export const HOOK_FRAMEWORKS = [
  {
    id: "contrarian",
    name: "The Contrarian / Pattern Interrupt",
    badge: "High Retention",
    description: "Shatters conventional wisdom in the first 2 seconds to force the viewer to stop scrolling.",
    templates: [
      "Stop doing {topic} the old way. 99% of people are making this exact fatal mistake, and it's costing them months.",
      "Most experts will tell you that {topic} is dead. They're wrong, and here's the quiet hack working right now.",
      "You don't need a massive budget or 10 hours a day to master {topic}. In fact, that's what's keeping you stuck."
    ]
  },
  {
    id: "curiosity",
    name: "The Curiosity Gap / Secret Reveal",
    badge: "Viral Potential",
    description: "Creates an irresistible psychological itch that can only be resolved by watching the video.",
    templates: [
      "There is a hidden setting inside {topic} that almost nobody talks about. Here's how it works in 30 seconds.",
      "I tested every single {topic} trick on the internet for 30 days. Only these 2 actually moved the needle.",
      "If you're still struggling with {topic}, it's probably because nobody explained this one counter-intuitive rule."
    ]
  },
  {
    id: "story",
    name: "The Micro-Story / High Stakes",
    badge: "Emotional Connection",
    description: "Builds instant empathy by starting in the middle of a conflict or extreme transformation.",
    templates: [
      "6 months ago, I was completely overwhelmed trying to figure out {topic}. Today, I automate it in 5 minutes.",
      "Watch what happens when you apply this underground {topic} framework for just 7 straight days.",
      "I almost gave up on {topic} after losing hours of work. Then this single breakthrough changed everything."
    ]
  }
];

export const TONE_MODIFIERS = {
  "High Energy": {
    pacing: "Fast cuts, punchy delivery, beat drops",
    visualStyle: "Dynamic push-ins, neon kinetic text, rapid B-roll transitions",
    cta: "Drop a comment with '{topic}' and I'll send you the exact breakdown!"
  },
  "Contrarian": {
    pacing: "Deliberate pauses, direct eye contact, skeptical smirk",
    visualStyle: "Dim lighting, red/amber spotlight, harsh split-screen proofs",
    cta: "Do you agree, or am I crazy? Tell me your thoughts in the comments."
  },
  "Educational": {
    pacing: "Step-by-step clarity, crisp explanations, zero fluff",
    visualStyle: "Clean UI callouts, numbered badge overlays, subtle sound effects",
    cta: "Bookmark this video now so you don't lose it when you need it tomorrow."
  },
  "Cinematic": {
    pacing: "Atmospheric build-up, dramatic orchestral swell",
    visualStyle: "Anamorphic widescreen letterbox, slow motion Runway/Sora B-roll",
    cta: "Follow for more cinematic breakdowns and prompts."
  }
};
