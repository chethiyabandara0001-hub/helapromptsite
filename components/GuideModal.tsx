'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '@/lib/prompts-data';
import { BrandMark } from './BrandMark';

interface GuideModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
}

export function GuideModal({ open, lang, onClose }: GuideModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const steps =
    lang === 'si'
      ? [
          {
            num: '01.',
            title: 'ඔබේ අවශ්‍යතාවය තෝරන්න',
            desc: 'ව්‍යාපාර, අධ්‍යාපන, Content හෝ රූප නිර්මාණ වලින් ඔබට ගැලපෙන prompt එක සොයාගන්න.',
          },
          {
            num: '02.',
            title: '[වරහන්] තුළ ඇති විස්තර වෙනස් කරන්න',
            desc: 'Prompt එක විවෘත කර [ව්‍යාපාරයේ නම] වැනි කොටස් වලට ඔබේ සැබෑ තොරතුරු ඇතුළත් කරන්න.',
          },
          {
            num: '03.',
            title: 'Copy කර AI මෙවලමට Paste කරන්න',
            desc: 'ChatGPT, Gemini හෝ Claude වෙත Paste කර තත්පර කිහිපයකින් නිවැරදි ප්‍රතිඵලය ලබාගන්න.',
          },
        ]
      : [
          {
            num: '01.',
            title: 'Pick a prompt for your goal',
            desc: 'Browse by Business, Education, Content, Images, or Career — or search directly by task.',
          },
          {
            num: '02.',
            title: 'Fill in the [bracketed] details',
            desc: 'Open any prompt and replace placeholders like [Business Name] with your real context.',
          },
          {
            num: '03.',
            title: 'Copy and paste into your AI tool',
            desc: 'Paste the customized prompt into ChatGPT, Gemini, Claude, or Midjourney for sharper results.',
          },
        ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#DFEAD2] border-b border-[#D2DFC3]">
          <div className="flex items-center gap-2.5">
            <BrandMark size={16} color="#15803D" />
            <h2
              id="guide-modal-title"
              className="text-[16px] font-bold text-[#1A2D20]"
            >
              {lang === 'si' ? 'helaprompt. භාවිතා කරන හැටි' : 'How to use helaprompt.'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="w-8 h-8 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center text-[#1D3C27]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-3.5">
              <span className="text-[13px] font-bold tabular-nums text-[#4D7741] pt-0.5">
                {step.num}
              </span>
              <div>
                <h3 className="text-[14.5px] font-bold text-[#0F172A] mb-1">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#475569] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-[#15803D] hover:bg-[#166534] text-white py-2.5 text-[13px] font-semibold transition-colors"
            >
              {lang === 'si' ? 'තේරුණා, පටන් ගමු' : 'Got it, let’s start'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
