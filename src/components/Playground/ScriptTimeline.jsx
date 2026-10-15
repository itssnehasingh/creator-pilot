import React, { useState } from 'react';
import { 
  Film, 
  Mic, 
  Eye, 
  Copy, 
  Check, 
  Clock, 
  Sparkles,
  Edit3
} from 'lucide-react';

export default function ScriptTimeline({ 
  scenes, 
  onSceneChange, 
  onNotify 
}) {
  const [copiedSceneId, setCopiedSceneId] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyPrompt = (scene) => {
    navigator.clipboard.writeText(scene.aiPrompt);
    setCopiedSceneId(scene.id);
    onNotify?.("AI Video Prompt copied!");
    setTimeout(() => setCopiedSceneId(null), 2000);
  };

  const handleCopyFullScript = () => {
    const fullScript = scenes.map(s => `[${s.timestamp}] ${s.title}\nVOICEOVER: "${s.spokenWords}"\nVISUAL CUE: ${s.visualDirection}\nAI VIDEO PROMPT: ${s.aiPrompt}\n`).join("\n---\n\n");
    navigator.clipboard.writeText(fullScript);
    setCopiedAll(true);
    onNotify?.("Full script & visual breakdown copied!");
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const totalWords = scenes.reduce((acc, s) => acc + (s.spokenWords ? s.spokenWords.split(/\s+/).filter(Boolean).length : 0), 0);
  const estSeconds = Math.round(totalWords / 2.5); // ~150 words per minute average speaking rate

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" />
            Scene-by-Scene Script Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            Paced for viral short-form retention with dedicated AI video prompts for each shot.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <span className="text-slate-200 font-bold">{totalWords}</span> words • ~<span className="text-cyan-400 font-bold">{estSeconds}s</span> duration
          </div>
          <button
            onClick={handleCopyFullScript}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Full</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Timeline items */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-800/80 before:hidden sm:before:block">
        {scenes.map((scene, idx) => (
          <div 
            key={scene.id}
            className="sm:pl-10 relative glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800/90 hover:border-slate-700 transition-all"
          >
            {/* Timeline node icon */}
            <div className="hidden sm:flex absolute -left-0.5 top-6 w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 items-center justify-center -translate-x-1/2 z-10 text-xs font-bold text-indigo-300">
              {idx + 1}
            </div>

            {/* Scene Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="sm:hidden w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-[10px] font-bold text-indigo-300">
                  {idx + 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {scene.timestamp}
                </span>
                <h4 className="text-sm font-bold text-slate-100">
                  {scene.title}
                </h4>
              </div>

              {scene.notes && (
                <span className="hidden md:inline-block text-[11px] text-slate-500 italic">
                  💡 {scene.notes}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Spoken Voiceover Words (Editable) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-slate-300">
                    <Mic className="w-3.5 h-3.5 text-amber-400" /> Spoken Voiceover:
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Click to edit
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={scene.spokenWords}
                  onChange={(e) => onSceneChange(scene.id, 'spokenWords', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Visual Direction & AI Prompt */}
              <div className="space-y-3">
                {/* Visual Direction */}
                <div className="space-y-1">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> Visual & Framing Cue:
                  </span>
                  <p className="text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                    {scene.visualDirection}
                  </p>
                </div>

                {/* AI Video Prompt */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-semibold text-indigo-300">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Video Prompt:
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(scene)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      {copiedSceneId === scene.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-indigo-500/20 text-xs font-mono text-indigo-200/90 leading-relaxed">
                    {scene.aiPrompt}
                  </div>
                </div>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
