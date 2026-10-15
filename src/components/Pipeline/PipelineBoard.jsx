import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Kanban, 
  Plus, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Smartphone,
  BarChart3
} from 'lucide-react';
import { PIPELINE_STAGES } from '../../data/initialPipeline';
import { PLATFORMS } from '../../data/initialPrompts';
import KanbanColumn from './KanbanColumn';
import AddCardModal from './AddCardModal';

export default function PipelineBoard({ 
  cards, 
  onUpdateCards, 
  onNotify 
}) {
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState('Drafting');

  const filteredCards = cards.filter(c => {
    if (selectedPlatform !== 'All Platforms' && c.platform !== selectedPlatform) {
      return false;
    }
    return true;
  });

  const handleMoveStage = (cardId, direction) => {
    const stageOrder = ['Drafting', 'Production', 'Published'];
    const updated = cards.map(c => {
      if (c.id !== cardId) return c;
      const currentIndex = stageOrder.indexOf(c.stage);
      let newIndex = currentIndex;
      if (direction === 'next' && currentIndex < stageOrder.length - 1) {
        newIndex = currentIndex + 1;
      } else if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      }
      const newStage = stageOrder[newIndex];

      // If moving to Published, launch celebration confetti!
      if (newStage === 'Published' && c.stage !== 'Published') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onNotify?.(`🎉 Video Published: "${c.title}"!`);
      } else if (newStage !== c.stage) {
        onNotify?.(`Moved "${c.title}" to ${newStage}`);
      }

      return {
        ...c,
        stage: newStage,
        priority: newStage === 'Published' ? 'Completed' : c.priority
      };
    });

    onUpdateCards(updated);
  };

  const handleToggleChecklist = (cardId, checklistId) => {
    const updated = cards.map(c => {
      if (c.id !== cardId) return c;
      const updatedChecklist = c.checklist.map(item => {
        if (item.id === checklistId) {
          return { ...item, done: !item.done };
        }
        return item;
      });
      return { ...c, checklist: updatedChecklist };
    });
    onUpdateCards(updated);
  };

  const handleDeleteCard = (cardId) => {
    const target = cards.find(c => c.id === cardId);
    if (window.confirm(`Delete "${target?.title || 'this card'}" from pipeline?`)) {
      const updated = cards.filter(c => c.id !== cardId);
      onUpdateCards(updated);
      onNotify?.("Card removed from pipeline.");
    }
  };

  const handleAddCard = (newCard) => {
    onUpdateCards([newCard, ...cards]);
    onNotify?.(`Added "${newCard.title}" to ${newCard.stage}!`);
  };

  const openAddModal = (stageId = 'Drafting') => {
    setModalStage(stageId);
    setIsAddModalOpen(true);
  };

  // Pipeline metrics
  const activeCount = cards.filter(c => c.stage !== 'Published').length;
  const publishedCount = cards.filter(c => c.stage === 'Published').length;
  const allChecklistItems = cards.flatMap(c => c.checklist || []);
  const completedChecklistItems = allChecklistItems.filter(i => i.done).length;
  const pipelineProgress = allChecklistItems.length > 0 
    ? Math.round((completedChecklistItems / allChecklistItems.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Metrics */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Kanban className="w-3.5 h-3.5" />
            <span>Interactive Production Pipeline</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Content Pipeline Board
          </h2>
          <p className="text-xs text-slate-400">
            Track video concepts from initial hook drafting through AI B-roll generation to final social publication.
          </p>
        </div>

        {/* Metrics Badges */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">{activeCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Active In Pipeline</div>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">{publishedCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Published</div>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">{pipelineProgress}%</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Tasks Completed</div>
            </div>
          </div>

          <button
            onClick={() => openAddModal('Drafting')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Video Card</span>
          </button>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> Filter Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isActive = selectedPlatform === plat;
            return (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {plat}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 shrink-0">
          Showing {filteredCards.length} of {cards.length} cards
        </span>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {PIPELINE_STAGES.map((stage) => {
          const stageCards = filteredCards.filter(c => c.stage === stage.id);
          return (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              cards={stageCards}
              onMoveStage={handleMoveStage}
              onToggleChecklist={handleToggleChecklist}
              onDelete={handleDeleteCard}
              onOpenAddModal={openAddModal}
            />
          );
        })}
      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCard}
        defaultStage={modalStage}
      />

    </div>
  );
}
