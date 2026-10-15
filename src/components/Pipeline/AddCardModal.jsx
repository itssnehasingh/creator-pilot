import React, { useState } from 'react';
import { X, Kanban, Plus } from 'lucide-react';
import { PLATFORMS } from '../../data/initialPrompts';
import { PIPELINE_STAGES } from '../../data/initialPipeline';

export default function AddCardModal({ isOpen, onClose, onAdd, defaultStage = "Drafting" }) {
  const [formData, setFormData] = useState({
    title: '',
    stage: defaultStage,
    platform: 'TikTok',
    hook: '',
    duration: '45s',
    priority: 'High',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    tags: '#Shorts, #Viral'
  });

  if (!isOpen) return null;

  const validPlatforms = PLATFORMS.filter(p => p !== 'All Platforms');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`)
      : ['#CreatorPilot'];

    const newCard = {
      id: `card-${Date.now()}`,
      title: formData.title.trim(),
      stage: formData.stage,
      platform: formData.platform,
      hook: formData.hook.trim() || 'Custom video hook to be finalized.',
      duration: formData.duration || '45s',
      priority: formData.priority,
      dueDate: formData.dueDate,
      tags: tagsArray,
      checklist: [
        { id: `c-${Date.now()}-1`, label: 'Script & Hook Approved', done: formData.stage !== 'Drafting' },
        { id: `c-${Date.now()}-2`, label: 'AI B-Roll Generated', done: formData.stage === 'Published' },
        { id: `c-${Date.now()}-3`, label: 'Voiceover & Audio Design', done: formData.stage === 'Published' },
        { id: `c-${Date.now()}-4`, label: 'Kinetic Captions & Render', done: formData.stage === 'Published' }
      ],
      notes: 'Created via Content Pipeline Board'
    };

    onAdd(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Kanban className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">Add Pipeline Card</h2>
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
          
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Video Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 5 AI Secrets for 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Selected Hook / Angle
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Stop doing X if you want Y..."
              value={formData.hook}
              onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {PIPELINE_STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Platform
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Urgent">🔥 Urgent</option>
                <option value="High">⚡ High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Target Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Tags (Comma-separated)
            </label>
            <input
              type="text"
              placeholder="#Viral, #Tutorial"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

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
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Video
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
