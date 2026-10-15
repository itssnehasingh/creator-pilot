import React from 'react';
import { CATEGORIES, PLATFORMS } from '../../data/initialPrompts';
import { Layers, Smartphone } from 'lucide-react';

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform
}) {
  return (
    <div className="space-y-3">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 shrink-0 uppercase tracking-wider pl-1">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> Topic:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Platform Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 shrink-0 uppercase tracking-wider pl-1">
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Platform:
        </span>
        {PLATFORMS.map((plat) => {
          const isActive = selectedPlatform === plat;
          return (
            <button
              key={plat}
              onClick={() => onSelectPlatform(plat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                  : 'bg-slate-900/50 text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 border border-slate-800/80'
              }`}
            >
              {plat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
