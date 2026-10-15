import React from 'react';
import { 
  CheckSquare, 
  Square, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function VideoCard({ 
  card, 
  onMoveStage, 
  onToggleChecklist, 
  onDelete 
}) {
  const completedChecklistCount = card.checklist ? card.checklist.filter(c => c.done).length : 0;
  const totalChecklistCount = card.checklist ? card.checklist.length : 0;
  const progressPercent = totalChecklistCount > 0 ? Math.round((completedChecklistCount / totalChecklistCount) * 100) : 0;

  const priorityStyles = {
    Urgent: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    High: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Medium: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    Low: "bg-slate-800 text-slate-400 border-slate-700",
    Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
  };

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-slate-700 transition-all shadow-md group">
      
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800/90 text-cyan-300 border border-slate-700/60">
            {card.platform}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${priorityStyles[card.priority] || priorityStyles.Medium}`}>
            {card.priority}
          </span>
        </div>

        <button
          onClick={() => onDelete(card.id)}
          title="Delete video card"
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Title */}
      <h4 className="text-sm font-bold text-slate-100 mb-1.5 leading-snug">
        {card.title}
      </h4>

      {/* Hook snippet */}
      {card.hook && (
        <p className="text-xs text-slate-400 line-clamp-2 italic mb-3 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
          "{card.hook}"
        </p>
      )}

      {/* Production Checklist */}
      {card.checklist && card.checklist.length > 0 && (
        <div className="space-y-1.5 mb-3 pt-1 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Production Checklist</span>
            <span className="font-mono text-indigo-300">{completedChecklistCount}/{totalChecklistCount} ({progressPercent}%)</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="space-y-1">
            {card.checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => onToggleChecklist(card.id, item.id)}
                className="w-full flex items-center gap-2 text-left text-xs py-0.5 text-slate-300 hover:text-white transition-colors"
              >
                {item.done ? (
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                )}
                <span className={`text-[11px] truncate ${item.done ? 'line-through text-slate-500' : ''}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info: Due date & tags */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-500" />
          {card.dueDate || "No date"}
        </span>
        <span className="text-slate-500 font-mono">
          {card.duration}
        </span>
      </div>

      {/* Stage Progression Buttons */}
      <div className="flex items-center justify-between gap-1.5 pt-1">
        {card.stage !== 'Drafting' ? (
          <button
            onClick={() => onMoveStage(card.id, 'prev')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-[11px]">Back</span>
          </button>
        ) : <div className="flex-1" />}

        {card.stage !== 'Published' ? (
          <button
            onClick={() => onMoveStage(card.id, 'next')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
          >
            <span className="text-[11px]">
              {card.stage === 'Drafting' ? 'To Production' : 'Publish 🚀'}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-1 py-1 px-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Published</span>
          </div>
        )}
      </div>

    </div>
  );
}
