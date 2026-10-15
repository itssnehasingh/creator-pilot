import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Wand2, 
  Layers, 
  Smartphone, 
  Activity, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { generateScriptPackage } from '../../utils/generator';
import HookCard from './HookCard';
import ScriptTimeline from './ScriptTimeline';

const SUGGESTED_TOPICS = [
  "5 AI Tools that Feel Illegal to Know",
  "Why 99% of Content Creators Fail in 2026",
  "How I Generate 100 Short-Form Videos with One Prompt",
  "Stop Making Boring B-Roll: The 3-Layer Visual Hook"
];

const PLATFORMS = ["TikTok", "YouTube Shorts", "Instagram Reels", "X (Twitter)"];
const TONES = ["High Energy", "Contrarian", "Educational", "Cinematic"];

export default function ScriptPlayground({ 
  initialTopic = "", 
  onPushToPipeline, 
  onNotify 
}) {
  const [topic, setTopic] = useState(initialTopic || "5 AI Tools that Feel Illegal to Know");
  const [platform, setPlatform] = useState("TikTok");
  const [tone, setTone] = useState("High Energy");
  const [scriptPackage, setScriptPackage] = useState(() => 
    generateScriptPackage("5 AI Tools that Feel Illegal to Know", "TikTok", "High Energy")
  );
  const [selectedHookIndex, setSelectedHookIndex] = useState(0);

  const handleGenerate = (customTopic) => {
    const targetTopic = customTopic !== undefined ? customTopic : topic;
    const result = generateScriptPackage(targetTopic, platform, tone);
    setScriptPackage(result);
    setSelectedHookIndex(0);
    onNotify?.("Generated 3 viral hooks & full scene breakdown!");
  };

  const handleSelectHook = (index) => {
    setSelectedHookIndex(index);
    const chosenHook = scriptPackage.hooks[index];
    // Update scene 1 with this hook text
    const updatedScenes = [...scriptPackage.scenes];
    updatedScenes[0] = {
      ...updatedScenes[0],
      spokenWords: chosenHook.text
    };
    setScriptPackage({
      ...scriptPackage,
      selectedHook: chosenHook.text,
      scenes: updatedScenes
    });
  };

  const handleSceneChange = (sceneId, field, value) => {
    setScriptPackage(prev => ({
      ...prev,
      scenes: prev.scenes.map(s => s.id === sceneId ? { ...s, [field]: value } : s)
    }));
  };

  const handlePushToPipeline = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: scriptPackage.topic,
      stage: "Drafting",
      platform: scriptPackage.platform,
      hook: scriptPackage.selectedHook,
      duration: "45s",
      priority: "High",
      dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
      tags: [`#${scriptPackage.platform.replace(/\s+/g, '')}`, `#${scriptPackage.tone.replace(/\s+/g, '')}`],
      checklist: [
        { id: `c-${Date.now()}-1`, label: "Hook & Scene 1 Script Verified", done: true },
        { id: `c-${Date.now()}-2`, label: "Generate AI B-Roll in Runway/Midjourney", done: false },
        { id: `c-${Date.now()}-3`, label: "Record Voiceover Audio", done: false },
        { id: `c-${Date.now()}-4`, label: "Edit & Add Kinetic Captions", done: false }
      ],
      notes: `Tone: ${scriptPackage.tone} • Style: ${scriptPackage.visualStyle}`,
      scenes: scriptPackage.scenes
    };

    onPushToPipeline(newCard);
  };

  return (
    <div className="space-y-8">
      
      {/* Playground Config Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Formula Engine</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Script & Hook Playground
              </h2>
              <p className="text-xs text-slate-400">
                Input your concept to algorithmically craft 3 psychological viral hooks and a complete scene timeline.
              </p>
            </div>

            {/* Quick Topic Suggestions */}
            <div className="hidden lg:flex flex-col items-end gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Trending Creator Prompts:</span>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {SUGGESTED_TOPICS.slice(0, 2).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTopic(item);
                      handleGenerate(item);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 transition-colors"
                  >
                    "{item}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Topic Input */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Video Topic / Core Angle
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Why 90% of AI Video Creators Fail..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            {/* Platform Selector */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {PLATFORMS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Tone Selector */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Delivery Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {TONES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Generate Button Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Target: <strong className="text-slate-200">{platform}</strong></span>
              <span>•</span>
              <span>Pacing: <strong className="text-slate-200">{scriptPackage.pacingTip}</strong></span>
            </div>

            <button
              onClick={() => handleGenerate()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Wand2 className="w-4 h-4" />
              <span>Regenerate Viral Breakdown</span>
            </button>
          </div>

        </div>
      </div>

      {/* Generated Hooks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-slate-100">
              3 Psychological Hook Variations
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Select a hook to lock it into Scene 1 of your timeline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scriptPackage.hooks.map((hook, index) => (
            <HookCard
              key={hook.id}
              hook={hook}
              isSelected={selectedHookIndex === index}
              onSelect={() => handleSelectHook(index)}
              onNotify={onNotify}
            />
          ))}
        </div>
      </div>

      {/* Scene Script Breakdown */}
      <div className="space-y-4">
        <ScriptTimeline
          scenes={scriptPackage.scenes}
          onSceneChange={handleSceneChange}
          onNotify={onNotify}
        />
      </div>

      {/* Action Footer: Push to Pipeline */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Ready to track this video into production?
          </h4>
          <p className="text-xs text-slate-300">
            Push this script, hook, and production checklist straight to your Content Pipeline Board.
          </p>
        </div>

        <button
          onClick={handlePushToPipeline}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
        >
          <Send className="w-4 h-4" />
          <span>🚀 Push to Pipeline Board</span>
        </button>
      </div>

    </div>
  );
}
