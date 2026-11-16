'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import {
  AiTool,
  Language,
  PromptCategory,
  PromptItem,
  CardTheme,
} from '@/lib/prompts-data';

interface AddPromptModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
  onAdd: (item: PromptItem) => void;
}

export function AddPromptModal({
  open,
  lang,
  onClose,
  onAdd,
}: AddPromptModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState<Exclude<PromptCategory, 'all'>>('business');
  const [tool, setTool] = useState<Exclude<AiTool, 'All AI tools'>>('ChatGPT');
  const [description, setDescription] = useState('');
  const [promptBody, setPromptBody] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !promptBody.trim()) {
      setError(
        lang === 'si'
          ? 'කරුණාකර මාතෘකාව සහ Prompt එක ඇතුළත් කරන්න.'
          : 'Please enter both a title and the prompt text.'
      );
      return;
    }

    const themes: CardTheme[] = ['sage', 'forest', 'paper'];
    const pickedTheme = themes[Math.floor(Math.random() * themes.length)];

    const newItem: PromptItem = {
      id: `custom-${Date.now()}`,
      category,
      tool,
      theme: pickedTheme,
      previewLabel: tool.toUpperCase(),
      previewQuoteSi: title.trim(),
      previewQuoteEn: title.trim(),
      titleSi: title.trim(),
      titleEn: title.trim(),
      descriptionSi:
        description.trim() ||
        'ඔබ විසින් එකතු කරන ලද ප්‍රායෝගික AI prompt එකකි.',
      descriptionEn:
        description.trim() || 'A custom AI prompt added to your workspace.',
      promptSi: promptBody.trim(),
      promptEn: promptBody.trim(),
      variables: [],
      tags: [category, tool],
      isCustom: true,
    };

    onAdd(newItem);
    setTitle('');
    setDescription('');
    setPromptBody('');
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[#FAF9F6] border border-[#E4E2D9] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#EAE8DF]">
          <h2
            id="add-prompt-title"
            className="text-[17px] font-bold text-[#1A241E]"
          >
            {lang === 'si' ? 'නව Prompt එකක් එකතු කරන්න' : 'Add a New Prompt'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg border border-[#E4E2D9] bg-[#FAF9F6] hover:bg-[#EFECE4] flex items-center justify-center text-[#4F564F]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <p className="text-[12.5px] font-medium text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-[12.5px] font-semibold text-[#2E3830] mb-1.5">
              {lang === 'si' ? 'Prompt මාතෘකාව' : 'Prompt Title'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                lang === 'si'
                  ? 'උදා: Instagram Caption එකක් ලිවීම'
                  : 'e.g. Engaging Instagram Caption Writer'
              }
              className="w-full rounded-xl border border-[#DFDDD4] bg-white px-3.5 py-2.5 text-[13.5px] text-[#1A241E] placeholder:text-[#989E94] focus:outline-none focus:ring-2 focus:ring-[#1D442B]/30 focus:border-[#1D442B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12.5px] font-semibold text-[#2E3830] mb-1.5">
                {lang === 'si' ? 'වර්ගය' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Exclude<PromptCategory, 'all'>)
                }
                className="w-full rounded-xl border border-[#DFDDD4] bg-white px-3 py-2.5 text-[13.5px] text-[#1A241E] focus:outline-none focus:ring-2 focus:ring-[#1D442B]/30 focus:border-[#1D442B]"
              >
                <option value="business">
                  {lang === 'si' ? 'ව්‍යාපාර' : 'Business'}
                </option>
                <option value="education">
                  {lang === 'si' ? 'අධ්‍යාපනය' : 'Education'}
                </option>
                <option value="content">
                  {lang === 'si' ? 'Content නිර්මාණ' : 'Content'}
                </option>
                <option value="image">
                  {lang === 'si' ? 'රූප නිර්මාණ' : 'Image Generation'}
                </option>
                <option value="career">
                  {lang === 'si' ? 'වෘත්තීය ජීවිතය' : 'Career'}
                </option>
                <option value="daily">
                  {lang === 'si' ? 'එදිනෙදා වැඩ' : 'Daily Tasks'}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[#2E3830] mb-1.5">
                {lang === 'si' ? 'AI මෙවලම' : 'AI Tool'}
              </label>
              <select
                value={tool}
                onChange={(e) =>
                  setTool(
                    e.target.value as Exclude<AiTool, 'All AI tools'>
                  )
                }
                className="w-full rounded-xl border border-[#DFDDD4] bg-white px-3 py-2.5 text-[13.5px] text-[#1A241E] focus:outline-none focus:ring-2 focus:ring-[#1D442B]/30 focus:border-[#1D442B]"
              >
                <option value="ChatGPT">ChatGPT</option>
                <option value="Gemini">Gemini</option>
                <option value="Claude">Claude</option>
                <option value="Midjourney">Midjourney</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12.5px] font-semibold text-[#2E3830] mb-1.5">
              {lang === 'si' ? 'කෙටි විස්තරය (අත්‍යවශ්‍ය නොවේ)' : 'Short Description (Optional)'}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                lang === 'si'
                  ? 'මෙම prompt එකෙන් කරන දේ කෙටියෙන්...'
                  : 'Briefly describe what this prompt helps with...'
              }
              className="w-full rounded-xl border border-[#DFDDD4] bg-white px-3.5 py-2.5 text-[13.5px] text-[#1A241E] placeholder:text-[#989E94] focus:outline-none focus:ring-2 focus:ring-[#1D442B]/30 focus:border-[#1D442B]"
            />
          </div>

          <div>
            <label className="block text-[12.5px] font-semibold text-[#2E3830] mb-1.5">
              {lang === 'si' ? 'Prompt පෙළ' : 'Prompt Text'}
            </label>
            <textarea
              value={promptBody}
              onChange={(e) => setPromptBody(e.target.value)}
              rows={5}
              placeholder={
                lang === 'si'
                  ? 'ඔබේ prompt එක මෙහි ලියන්න. වෙනස් කළ යුතු තැන් [වරහන්] තුළ දක්වන්න.'
                  : 'Write your prompt here. Use [brackets] for customizable fields.'
              }
              className="w-full rounded-xl border border-[#DFDDD4] bg-white p-3.5 text-[13.5px] leading-relaxed text-[#1A241E] placeholder:text-[#989E94] focus:outline-none focus:ring-2 focus:ring-[#1D442B]/30 focus:border-[#1D442B]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#5B645C] hover:bg-[#EAE8E0] transition-colors"
            >
              {lang === 'si' ? 'අවලංගු කරන්න' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1D442B] hover:bg-[#275738] text-white px-4 py-2 text-[13px] font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'si' ? 'එකතු කරන්න' : 'Save Prompt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
