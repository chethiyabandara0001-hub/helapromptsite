'use client';

import React, { useState } from 'react';
import { Heart, Copy, Check, ArrowUpRight } from 'lucide-react';
import {
  Language,
  PromptItem,
  UI_COPY,
  getCategoryLabel,
} from '@/lib/prompts-data';
import { BrandMark } from './BrandMark';

interface PromptCardProps {
  prompt: PromptItem;
  lang: Language;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpen: (prompt: PromptItem) => void;
}

export function PromptCard({
  prompt,
  lang,
  isSaved,
  onToggleSave,
  onOpen,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const t = UI_COPY[lang];

  const title = lang === 'si' ? prompt.titleSi : prompt.titleEn;
  const description = lang === 'si' ? prompt.descriptionSi : prompt.descriptionEn;
  const previewQuote = lang === 'si' ? prompt.previewQuoteSi : prompt.previewQuoteEn;
  const promptBody = lang === 'si' ? prompt.promptSi : prompt.promptEn;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(promptBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback silent
    }
  };

  const renderHeaderVisual = () => {
    if (prompt.theme === 'forest') {
      return (
        <div className="relative h-[148px] bg-gradient-to-br from-[#4D613D] to-[#2B3C22] p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#C7D9B4]">
              {prompt.previewLabel}
            </span>
          </div>
          <p className="text-[14px] font-semibold text-white/95 leading-snug max-w-[85%] line-clamp-2">
            {previewQuote}
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-25 pointer-events-none">
            <BrandMark size={86} color="#C3E285" />
          </div>
        </div>
      );
    }

    if (prompt.theme === 'paper') {
      return (
        <div className="relative h-[148px] bg-[#EFECE4] p-4 pb-0 flex flex-col justify-end overflow-hidden">
          <div className="bg-white rounded-t-xl border border-b-0 border-[#E2DFD5] p-4 pb-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] -rotate-[1deg] translate-y-1 transition-transform duration-200 group-hover:rotate-0">
            <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#8A877E] mb-1.5">
              {prompt.previewLabel}
            </p>
            <p className="text-[13.5px] font-semibold text-[#1E2620] leading-snug line-clamp-2">
              {previewQuote}
            </p>
          </div>
        </div>
      );
    }

    // Default 'sage' theme
    return (
      <div className="relative h-[148px] bg-[#E3EAD3] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#566C4B]">
            {prompt.previewLabel}
          </span>
        </div>
        <p className="text-[14px] font-semibold text-[#1E3323] leading-snug max-w-[85%] line-clamp-2">
          {previewQuote}
        </p>
        <div className="absolute -right-3 -bottom-3 opacity-35 pointer-events-none">
          <BrandMark size={74} color="#78A35A" />
        </div>
      </div>
    );
  };

  return (
    <article
      onClick={() => onOpen(prompt)}
      className="group relative flex flex-col rounded-2xl bg-white border border-[#E6E4DC] overflow-hidden cursor-pointer transition-all duration-150 hover:border-[#C7CFC2] hover:shadow-[0_6px_20px_rgba(26,36,30,0.05)]"
    >
      {/* Top Preview Surface */}
      <div className="relative">
        {renderHeaderVisual()}

        {/* Heart Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(prompt.id);
          }}
          aria-label={isSaved ? 'Remove from saved prompts' : 'Save prompt'}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-[#E6E4DC]/80 flex items-center justify-center text-[#566058] hover:text-[#1D442B] shadow-sm transition-transform duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E462B]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#1D442B] text-[#1D442B]' : ''
            }`}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Clean Unboxed Metadata */}
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#757C73] mb-2">
          <span>{getCategoryLabel(prompt.category, lang)}</span>
          <span aria-hidden="true">·</span>
          <span>{prompt.tool}</span>
          {prompt.isCustom && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#456B45]">
                {lang === 'si' ? 'ඔබේ එකතුව' : 'Custom'}
              </span>
            </>
          )}
        </div>

        <h3 className="text-[16px] font-bold text-[#1A241E] leading-[1.4] mb-2 group-hover:text-[#1D442B] transition-colors">
          {title}
        </h3>

        <p className="text-[13.5px] text-[#5B645C] leading-[1.6] line-clamp-2 mb-5">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-auto pt-3.5 border-t border-[#F0EFE9] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(prompt);
            }}
            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#3C4B3E] hover:text-[#1D442B] transition-colors whitespace-nowrap"
          >
            <span>{t.customizeBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
              copied
                ? 'bg-[#1D442B] text-white'
                : 'bg-[#F3F2EC] hover:bg-[#E1E8D3] text-[#1D3C27]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
                <span>{t.copiedBtn}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span>{t.copyBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
