import { HOOK_FRAMEWORKS, TONE_MODIFIERS } from '../data/promptTemplates';

export function generateScriptPackage(topic, platform = "TikTok", tone = "High Energy") {
  const cleanTopic = topic.trim() || "AI Content Creation";
  const toneData = TONE_MODIFIERS[tone] || TONE_MODIFIERS["High Energy"];

  // 1. Generate 3 viral hooks
  const hooks = HOOK_FRAMEWORKS.map((framework) => {
    const randomIndex = Math.floor(Math.random() * framework.templates.length);
    const text = framework.templates[randomIndex].replace(/\{topic\}/g, cleanTopic);

    return {
      id: framework.id,
      name: framework.name,
      badge: framework.badge,
      description: framework.description,
      text: text,
      retentionScore: Math.floor(Math.random() * 8) + 91 // 91% - 98%
    };
  });

  // 2. Generate Scene Breakdown
  const scenes = [
    {
      id: "scene-1",
      timestamp: "00:00 - 00:03",
      title: "The Visual & Audio Hook",
      spokenWords: hooks[0].text,
      visualDirection: `Extreme close-up fast zoom with kinetic glitch text displaying '${cleanTopic.toUpperCase()}'. Sudden whoosh sound effect, high visual contrast.`,
      aiPrompt: `Photorealistic 8k, dynamic push-in camera, high saturation neon glow, cinematic contrast, cinematic framing for ${platform} --ar 9:16 --motion 6`,
      notes: "First 3 seconds dictate 80% of retention. Zero pauses, immediate punch."
    },
    {
      id: "scene-2",
      timestamp: "00:03 - 00:15",
      title: "The Problem & Agitation",
      spokenWords: `Here is the painful truth: most people spend 4 hours trying to figure out ${cleanTopic}, only to end up with robotic results that get zero views. The reason? They are doing everything backwards.`,
      visualDirection: `Split-screen comparison showing 'Beginner Mistake' vs 'Pro Secret'. Subdued red gradient overlay on the mistake side.`,
      aiPrompt: `Frustrated creator looking at computer screen in dim dark room, glowing blue screen reflection, dramatic cinematic lighting, photorealistic --ar 9:16`,
      notes: "Agitate the friction. Make the viewer nod in agreement."
    },
    {
      id: "scene-3",
      timestamp: "00:15 - 00:45",
      title: "The Core Secret & Workflow",
      spokenWords: `Instead, do this 3-step flywheel: Step one, reverse-engineer what's already viral in your niche. Step two, use structured AI video prompts to generate high-contrast B-roll. Step three, pace your voiceover to cut out every single breath.`,
      visualDirection: `Fast 1-second B-roll cuts showcasing rapid AI prompt execution and timeline scrubbing in video editor. High visual tempo.`,
      aiPrompt: `Holographic cybernetic user interface assembling futuristic video timeline, glowing particles, ultra high quality cinematic 3D render --ar 9:16`,
      notes: "Deliver 10x value. High information density."
    },
    {
      id: "scene-4",
      timestamp: "00:45 - 00:60",
      title: "CTA & Infinite Loop",
      spokenWords: `${toneData.cta.replace(/\{topic\}/g, cleanTopic)} And that is the secret behind why...`,
      visualDirection: `Speaker points to the comment section, kinetic bookmark icon pulses on screen, last sentence seamlessly connects back into the hook for an infinite loop.`,
      aiPrompt: `Aesthetic creator studio desk with ambient purple LED bar, warm cup of coffee, clean cinematic depth of field --ar 9:16`,
      notes: "Infinite loop technique triggers instant replay, spiking algorithmic rank."
    }
  ];

  return {
    topic: cleanTopic,
    platform,
    tone,
    pacingTip: toneData.pacing,
    visualStyle: toneData.visualStyle,
    generatedAt: new Date().toLocaleTimeString(),
    hooks,
    selectedHook: hooks[0].text,
    scenes
  };
}
