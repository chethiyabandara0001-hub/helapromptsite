'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Heart } from 'lucide-react';
import {
  Language,
  PromptItem,
  getCategoryLabel,
} from '@/lib/prompts-data';

interface PromptModalProps {
  prompt: PromptItem | null;
  lang: Language;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
}

interface PromptModalBodyProps {
  prompt: PromptItem;
  lang: Language;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
}

function PromptModalBody({
  prompt,
  lang,
  isSaved,
  onToggleSave,
  onClose,
}: PromptModalBodyProps) {
  const [promptLang, setPromptLang] = useState<Language>(lang);
  const [editedText, setEditedText] = useState<string>(() =>
    lang === 'si' ? prompt.promptSi : prompt.promptEn
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const title = lang === 'si' ? prompt.titleSi : prompt.titleEn;
  const description = lang === 'si' ? prompt.descriptionSi : prompt.descriptionEn;

  const handleSwitchPromptLang = (nextLang: Language) => {
    setPromptLang(nextLang);
    setEditedText(nextLang === 'si' ? prompt.promptSi : prompt.promptEn);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-white border-b border-[#EAE8DF]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#64748B] mb-1.5">
              <span>{getCategoryLabel(prompt.category, lang)}</span>
              <span aria-hidden="true">·</span>
              <span>{prompt.tool}</span>
            </div>
            <h2
              id="prompt-modal-title"
              className="text-[19px] font-bold text-[#0F172A] leading-snug"
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleSave(prompt.id)}
              aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
              className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] flex items-center justify-center text-[#475569] transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-[#15803D] text-[#15803D]' : ''
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] flex items-center justify-center text-[#475569] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-[13.5px] text-[#475569] leading-relaxed">
            {description}
          </p>

          {/* Language Switcher for Prompt Text */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] font-medium text-[#6C7369]">
              {lang === 'si'
                ? 'අවශ්‍ය තැන් ([...]) වෙනස් කර Copy කරගන්න:'
                : 'Edit bracketed placeholders ([...]) before copying:'}
            </span>

            <div className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-white p-0.5 text-[12px] font-medium shrink-0">
              <button
                type="button"
                onClick={() => handleSwitchPromptLang('si')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  promptLang === 'si'
                    ? 'bg-[#DCFCE7] text-[#166534] font-semibold'
                    : 'text-[#6E756B] hover:text-[#0F172A]'
                }`}
              >
                සිංහල
              </button>
              <button
                type="button"
                onClick={() => handleSwitchPromptLang('en')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  promptLang === 'en'
                    ? 'bg-[#DCFCE7] text-[#166534] font-semibold'
                    : 'text-[#6E756B] hover:text-[#0F172A]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={9}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-4 text-[13.5px] leading-[1.65] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#15803D]/30 focus:border-[#15803D] resize-y"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() =>
                setEditedText(
                  promptLang === 'si' ? prompt.promptSi : prompt.promptEn
                )
              }
              className="text-[12.5px] font-medium text-[#6C7369] hover:text-[#0F172A] transition-colors"
            >
              {lang === 'si' ? 'මුල් පිටපතට යන්න' : 'Reset text'}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white px-5 py-2.5 text-[13px] font-semibold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={2.2} />
                  <span>{lang === 'si' ? 'Copy වුණා!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" strokeWidth={1.8} />
                  <span>
                    {lang === 'si' ? 'Prompt එක Copy කරන්න' : 'Copy Prompt'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PromptModal({
  prompt,
  lang,
  isSaved,
  onToggleSave,
  onClose,
}: PromptModalProps) {
  if (!prompt) return null;

  return (
    <PromptModalBody
      key={`${prompt.id}-${lang}`}
      prompt={prompt}
      lang={lang}
      isSaved={isSaved}
      onToggleSave={onToggleSave}
      onClose={onClose}
    />
  );
}
