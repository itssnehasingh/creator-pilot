import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Kanban, 
  Download, 
  RotateCcw,
  Film,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  promptsCount, 
  pipelineCards, 
  onExport, 
  onReset 
}) {
  const draftingCount = pipelineCards.filter(c => c.stage === 'Drafting').length;
  const productionCount = pipelineCards.filter(c => c.stage === 'Production').length;
  const publishedCount = pipelineCards.filter(c => c.stage === 'Published').length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  CreatorPilot
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full">
                  Open Workbench
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-400">
                Crowdsourced AI Strategy • Script Playground • Visual Pipeline
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 shadow-inner">
            <button
              onClick={() => setActiveTab('hub')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'hub'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Strategy Hub</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-500/20">
                {promptsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'playground'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Playground</span>
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span className="hidden sm:inline">Pipeline Board</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {pipelineCards.length}
              </span>
            </button>
          </nav>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Flame className="w-3.5 h-3.5" /> {draftingCount + productionCount} In Flight
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> {publishedCount} Published
              </span>
            </div>

            <button
              onClick={onExport}
              title="Export project data backup (JSON)"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onReset}
              title="Reset data to initial state"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
