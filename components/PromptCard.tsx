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
        <div className="relative h-[148px] bg-[#2563EB] p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#DBEAFE]">
              {prompt.previewLabel}
            </span>
          </div>
          <p className="text-[14px] font-semibold text-white/95 leading-snug max-w-[85%] line-clamp-2">
            {previewQuote}
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-25 pointer-events-none">
            <BrandMark size={86} color="#BFDBFE" />
          </div>
        </div>
      );
    }

    if (prompt.theme === 'paper') {
      return (
        <div className="relative h-[148px] bg-[#FEF3C7] p-4 pb-0 flex flex-col justify-end overflow-hidden">
          <div className="bg-white rounded-t-xl border border-b-0 border-[#FDE68A] p-4 pb-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] -rotate-[1deg] translate-y-1 transition-transform duration-200 group-hover:rotate-0">
            <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#92400E] mb-1.5">
              {prompt.previewLabel}
            </p>
            <p className="text-[13.5px] font-semibold text-[#422006] leading-snug line-clamp-2">
              {previewQuote}
            </p>
          </div>
        </div>
      );
    }

    // Default 'sage' theme
    return (
      <div className="relative h-[148px] bg-[#DCFCE7] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#166534]">
            {prompt.previewLabel}
          </span>
        </div>
        <p className="text-[14px] font-semibold text-[#14532D] leading-snug max-w-[85%] line-clamp-2">
          {previewQuote}
        </p>
        <div className="absolute -right-3 -bottom-3 opacity-35 pointer-events-none">
          <BrandMark size={74} color="#22C55E" />
        </div>
      </div>
    );
  };

  return (
    <article
      onClick={() => onOpen(prompt)}
      className="group relative flex flex-col rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden cursor-pointer transition-all duration-150 hover:border-[#CBD5E1] hover:shadow-[0_6px_20px_rgba(26,36,30,0.05)]"
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
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-[#E2E8F0]/80 flex items-center justify-center text-[#64748B] hover:text-[#15803D] shadow-sm transition-transform duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#15803D] text-[#15803D]' : ''
            }`}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Clean Unboxed Metadata */}
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#64748B] mb-2">
          <span>{getCategoryLabel(prompt.category, lang)}</span>
          <span aria-hidden="true">·</span>
          <span>{prompt.tool}</span>
          {prompt.isCustom && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#15803D]">
                {lang === 'si' ? 'ඔබේ එකතුව' : 'Custom'}
              </span>
            </>
          )}
        </div>

        <h3 className="text-[16px] font-bold text-[#0F172A] leading-[1.4] mb-2 group-hover:text-[#15803D] transition-colors">
          {title}
        </h3>

        <p className="text-[13.5px] text-[#475569] leading-[1.6] line-clamp-2 mb-5">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-auto pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(prompt);
            }}
            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#334155] hover:text-[#15803D] transition-colors whitespace-nowrap"
          >
            <span>{t.customizeBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
              copied
                ? 'bg-[#15803D] text-white'
                : 'bg-[#F1F5F9] hover:bg-[#DCFCE7] text-[#166534]'
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
