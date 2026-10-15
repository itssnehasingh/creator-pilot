import React from 'react';
import { Plus, Film, CheckCircle2, FileEdit } from 'lucide-react';
import VideoCard from './VideoCard';

export default function KanbanColumn({ 
  stage, 
  cards, 
  onMoveStage, 
  onToggleChecklist, 
  onDelete, 
  onOpenAddModal 
}) {
  const stageIcons = {
    Drafting: <FileEdit className="w-4 h-4 text-amber-400" />,
    Production: <Film className="w-4 h-4 text-cyan-400" />,
    Published: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
  };

  return (
    <div className="flex flex-col flex-1 min-w-[300px] max-w-full glass-panel rounded-3xl p-4 sm:p-5 border border-slate-800/90 shadow-xl">
      
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
            {stageIcons[stage.id] || <Film className="w-4 h-4 text-indigo-400" />}
          </div>
          <h3 className="text-sm font-bold text-slate-100">
            {stage.title}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${stage.badge}`}>
            {cards.length}
          </span>
        </div>

        <button
          onClick={() => onOpenAddModal(stage.id)}
          title={`Add card to ${stage.title}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-4 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
        {cards.length > 0 ? (
          cards.map((card) => (
            <VideoCard
              key={card.id}
              card={card}
              onMoveStage={onMoveStage}
              onToggleChecklist={onToggleChecklist}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/20">
            <p className="text-xs text-slate-500 mb-2">No videos in {stage.title.toLowerCase()}</p>
            <button
              onClick={() => onOpenAddModal(stage.id)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              + Add a video card
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Button */}
      <button
        onClick={() => onOpenAddModal(stage.id)}
        className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-slate-800 hover:border-indigo-500/40 text-xs font-semibold text-slate-400 hover:text-indigo-300 bg-slate-900/40 hover:bg-indigo-600/10 transition-all"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Video Card</span>
      </button>

    </div>
  );
}
