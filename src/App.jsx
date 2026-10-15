import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Toast from './components/Toast';
import StrategyHub from './components/Hub/StrategyHub';
import ScriptPlayground from './components/Playground/ScriptPlayground';
import PipelineBoard from './components/Pipeline/PipelineBoard';
import { 
  getStoredPrompts, 
  saveStoredPrompts, 
  getStoredPipeline, 
  saveStoredPipeline, 
  exportProjectData, 
  resetToDefaults 
} from './utils/storage';
import { Sparkles, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub'); // hub, playground, pipeline
  const [prompts, setPrompts] = useState(getStoredPrompts);
  const [pipelineCards, setPipelineCards] = useState(getStoredPipeline);
  const [playgroundTopic, setPlaygroundTopic] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Sync state to LocalStorage
  useEffect(() => {
    saveStoredPrompts(prompts);
  }, [prompts]);

  useEffect(() => {
    saveStoredPipeline(pipelineCards);
  }, [pipelineCards]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Upvote prompt handler
  const handleUpvote = (promptId) => {
    setPrompts(prev => prev.map(p => {
      if (p.id === promptId) {
        const nextUpvoted = !p.hasUpvoted;
        return {
          ...p,
          hasUpvoted: nextUpvoted,
          upvotes: nextUpvoted ? p.upvotes + 1 : p.upvotes - 1
        };
      }
      return p;
    }));
  };

  // Add new crowdsourced prompt
  const handleAddPrompt = (newPrompt) => {
    setPrompts(prev => [newPrompt, ...prev]);
    showToast("Strategy contributed to the Open Hub!");
  };

  // Bridge: Send prompt from Hub into Playground
  const handleUseInPlayground = (prompt) => {
    setPlaygroundTopic(prompt.title);
    setActiveTab('playground');
    showToast(`Loaded "${prompt.title}" into Playground!`);
  };

  // Bridge: Push script from Playground into Pipeline
  const handlePushToPipeline = (newCard) => {
    setPipelineCards(prev => [newCard, ...prev]);
    setActiveTab('pipeline');
    showToast(`Pushed "${newCard.title}" to Content Pipeline!`);
  };

  // Update pipeline cards (drag/drop, checklist, delete, add)
  const handleUpdatePipeline = (updated) => {
    setPipelineCards(updated);
  };

  // Export JSON backup
  const handleExport = () => {
    exportProjectData(prompts, pipelineCards);
    showToast("Project backup exported to JSON!");
  };

  // Reset to seed defaults
  const handleReset = () => {
    if (window.confirm("Reset all prompts and pipeline cards back to hackathon default data?")) {
      const { prompts: defaultPrompts, pipeline: defaultPipeline } = resetToDefaults();
      setPrompts(defaultPrompts);
      setPipelineCards(defaultPipeline);
      showToast("Reset to default sample data.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        promptsCount={prompts.length}
        pipelineCards={pipelineCards}
        onExport={handleExport}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'hub' && (
          <StrategyHub
            prompts={prompts}
            onUpvote={handleUpvote}
            onAddPrompt={handleAddPrompt}
            onUseInPlayground={handleUseInPlayground}
            onNotify={showToast}
          />
        )}

        {activeTab === 'playground' && (
          <ScriptPlayground
            initialTopic={playgroundTopic}
            onPushToPipeline={handlePushToPipeline}
            onNotify={showToast}
          />
        )}

        {activeTab === 'pipeline' && (
          <PipelineBoard
            cards={pipelineCards}
            onUpdateCards={handleUpdatePipeline}
            onNotify={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">CreatorPilot</span>
            <span>• Open Innovation Hackathon Workbench</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Built with React, Vite & Tailwind CSS • Offline-First Storage
          </div>
        </div>
      </footer>

      {/* Notification Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

    </div>
  );
}
