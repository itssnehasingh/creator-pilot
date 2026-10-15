import React, { useState } from 'react';
import { Check, Copy, Zap, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export default function HookCard({ 
  hook, 
  isSelected, 
  onSelect, 
  onNotify 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hook.text);
    setCopied(true);
    onNotify?.("Hook copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeIcons = {
    "High Retention": <Flame className="w-3 h-3 text-orange-400" />,
    "Viral Potential": <Zap className="w-3 h-3 text-cyan-400" />,
    "Emotional Connection": <Sparkles className="w-3 h-3 text-fuchsia-400" />
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 relative group flex flex-col justify-between ${
        isSelected
          ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-600/20 ring-1 ring-indigo-500'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
              isSelected ? 'border-indigo-400 bg-indigo-600' : 'border-slate-600'
            }`}>
              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
            </span>
            <span className="text-xs font-bold text-slate-200">
              {hook.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {badgeIcons[hook.badge] || <Zap className="w-3 h-3" />}
              {hook.badge}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {hook.retentionScore}%
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[11px] text-slate-400 mb-3 italic">
          {hook.description}
        </p>

        {/* Hook Text */}
        <div className={`p-3 rounded-xl border text-sm font-medium leading-relaxed mb-3 ${
          isSelected 
            ? 'bg-slate-950/80 text-white border-indigo-500/40 shadow-inner' 
            : 'bg-slate-950/40 text-slate-300 border-slate-800/80'
        }`}>
          "{hook.text}"
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
        <span className="text-[11px] text-slate-500">
          {isSelected ? '★ Active Scene 1 Hook' : 'Click to select for script'}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="text-[11px]">Copy Hook</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
