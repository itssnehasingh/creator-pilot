import React, { useState } from 'react';
import { 
  ArrowBigUp, 
  Copy, 
  Check, 
  Sparkles, 
  Film, 
  Tag, 
  User, 
  Clock, 
  Send 
} from 'lucide-react';

export default function PromptCard({ 
  prompt, 
  onUpvote, 
  onUseInPlayground,
  onNotify 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    onNotify?.("Copied prompt to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const isHook = prompt.type === 'hook';

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isHook 
                ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20' 
                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
            }`}>
              {isHook ? <Sparkles className="w-3 h-3" /> : <Film className="w-3 h-3" />}
              {isHook ? 'Viral Hook' : 'AI Prompt'}
            </span>

            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
              {prompt.platform}
            </span>

            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
              {prompt.category}
            </span>
          </div>

          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {prompt.date}
          </span>
        </div>

        {/* Title & Author */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mb-1">
          {prompt.title}
        </h3>
        <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
          <User className="w-3 h-3 text-slate-500" /> by <span className="text-slate-300 font-medium">@{prompt.author}</span>
          {prompt.tool && <span className="text-slate-500">• {prompt.tool}</span>}
        </p>

        {/* Content Box */}
        <div className="relative bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 text-sm text-slate-300 leading-relaxed font-sans mb-4">
          <p className="line-clamp-4 select-text">
            {prompt.content}
          </p>
        </div>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {prompt.tags.map((t, i) => (
              <span key={i} className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/60">
        {/* Upvote Button */}
        <button
          onClick={() => onUpvote(prompt.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            prompt.hasUpvoted
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60'
          }`}
        >
          <ArrowBigUp className={`w-4 h-4 ${prompt.hasUpvoted ? 'fill-white' : ''}`} />
          <span>{prompt.upvotes}</span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Send to Playground Button */}
          <button
            onClick={() => onUseInPlayground(prompt)}
            title="Open in Script & Hook Playground"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700/60 hover:border-indigo-500/40 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Use as Topic</span>
          </button>

          {/* Copy Prompt Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
