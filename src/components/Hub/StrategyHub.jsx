import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, SlidersHorizontal, TrendingUp } from 'lucide-react';
import PromptCard from './PromptCard';
import CategoryPills from './CategoryPills';
import SubmitPromptModal from './SubmitPromptModal';

export default function StrategyHub({ 
  prompts, 
  onUpvote, 
  onAddPrompt, 
  onUseInPlayground,
  onNotify 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [sortBy, setSortBy] = useState('upvotes'); // upvotes, newest
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Platform filter
        if (selectedPlatform !== 'All Platforms' && p.platform !== selectedPlatform) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchContent = p.content.toLowerCase().includes(q);
          const matchAuthor = p.author.toLowerCase().includes(q);
          const matchTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchContent || matchAuthor || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        }
        return 0;
      });
  }, [prompts, selectedCategory, selectedPlatform, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/20 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Crowdsourced Creator Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Open Strategy Hub
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore battle-tested viral hooks, high-retention video formulas, and prompt recipes for Runway Gen-3, Midjourney, Sora, and Kling. Upvote what works or contribute your own.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 shadow-xl shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Strategy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hooks, AI video prompts, tags (#Cyberpunk, #Retention)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="upvotes">🔥 Most Upvoted</option>
              <option value="newest">⚡ Newest Added</option>
            </select>
          </div>

        </div>

        {/* Category & Platform Filter Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
      </div>

      {/* Prompts Grid */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-slate-400">
          Showing {filteredPrompts.length} of {prompts.length} strategies
        </span>
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onUpvote={onUpvote}
              onUseInPlayground={onUseInPlayground}
              onNotify={onNotify}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200 mb-1">No strategies found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Try adjusting your search query, selecting different tags, or submit a new strategy for the community!
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedPlatform('All Platforms');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Submission Modal */}
      <SubmitPromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddPrompt}
      />

    </div>
  );
}
