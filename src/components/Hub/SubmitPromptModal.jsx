import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../../data/initialPrompts';

export default function SubmitPromptModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'hook', // hook or ai_prompt
    category: 'Hooks',
    platform: 'TikTok',
    tool: '',
    tags: ''
  });

  if (!isOpen) return null;

  const validCategories = CATEGORIES.filter(c => c !== 'All');
  const validPlatforms = PLATFORMS.filter(p => p !== 'All Platforms');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`)
      : ['#OpenStrategy', '#CreatorPilot'];

    const newPrompt = {
      id: `prompt-${Date.now()}`,
      title: formData.title.trim(),
      content: formData.content.trim(),
      type: formData.type,
      category: formData.category,
      platform: formData.platform,
      tool: formData.tool.trim() || (formData.type === 'hook' ? 'Voiceover / A-Roll' : 'Midjourney / Runway'),
      author: 'creator_you',
      upvotes: 1,
      hasUpvoted: true,
      date: 'Just now',
      tags: tagsArray
    };

    onSubmit(newPrompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">Contribute to Open Strategy Hub</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Strategy Type Switcher */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Strategy Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'hook', category: 'Hooks' })}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  formData.type === 'hook'
                    ? 'bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Viral Hook Framework
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'ai_prompt', category: 'B-Roll Prompts' })}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  formData.type === 'ai_prompt'
                    ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                AI Video / Image Prompt
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Strategy Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Contrarian Pattern Interrupt or Sora Macro Studio Drone"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              {formData.type === 'hook' ? 'Hook Script Text' : 'Full AI Prompt & Parameters'}
            </label>
            <textarea
              required
              rows={4}
              placeholder={formData.type === 'hook' 
                ? "Stop doing X... Here's the 3-step psychology hack that 10x'd my reach..." 
                : "FPV cinematic drone shot through rain-slicked neon street, 8k, photorealistic --ar 9:16"}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Category & Platform */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {validCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Target Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {validPlatforms.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tool / Model & Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Tool / Model (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Runway Gen-3, Sora"
                value={formData.tool}
                onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="#Viral, #Retention"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Publish to Hub
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
