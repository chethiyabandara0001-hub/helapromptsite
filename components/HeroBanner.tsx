'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { Language, UI_COPY } from '@/lib/prompts-data';

interface HeroBannerProps {
  lang: Language;
  onStartClick: () => void;
  onIdeaStarterClick: () => void;
}

export function HeroBanner({
  lang,
  onStartClick,
  onIdeaStarterClick,
}: HeroBannerProps) {
  const t = UI_COPY[lang];

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden rounded-[22px] bg-[#1D442B] px-7 py-9 sm:px-11 sm:py-12 text-white"
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Column */}
        <div className="max-w-xl">
          <p className="text-[12.5px] font-medium text-[#A9C2AE] mb-5 tracking-[0.01em]">
            <span aria-hidden="true" className="mr-2 text-[#88AB8E]">
              •
            </span>
            {t.heroKicker}
          </p>

          <h1 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold leading-[1.22] tracking-[-0.02em] text-white text-balance">
            <span className="block">{t.heroTitleStart}</span>
            <span className="block mt-1">
              {t.heroTitleMid}
              <span className="text-[#C5E488]">{t.heroTitleAccent}</span>
            </span>
          </h1>

          <p className="mt-4 text-[14px] sm:text-[14.5px] leading-[1.65] text-[#C5D5C8] max-w-[440px]">
            {t.heroSubtitle}
          </p>

          <div className="mt-7">
            <button
              type="button"
              onClick={onStartClick}
              className="inline-flex items-center gap-2 rounded-lg bg-[#345940] hover:bg-[#3F694C] active:scale-[0.99] px-5 py-2.5 text-[13.5px] font-medium text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5E488]"
            >
              <span>{t.heroCta}</span>
              <ArrowDown className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Right Visual: Botanical Asterisk + Tilted Idea Starter Card */}
        <div className="relative flex items-center justify-center lg:justify-end lg:pr-6 py-2">
          {/* Large Pale Lime Botanical Mark */}
          <div className="hidden sm:block pointer-events-none select-none mr-1">
            <BrandMark size={142} color="#C3E285" />
          </div>

          {/* Tilted Floating Cream Card */}
          <button
            type="button"
            onClick={onIdeaStarterClick}
            className="relative sm:-ml-20 w-full max-w-[300px] sm:w-[278px] text-left rounded-2xl bg-[#F8F7F2] text-[#1A241E] p-5 sm:p-6 shadow-[0_14px_34px_rgba(8,22,13,0.28)] -rotate-[2.5deg] hover:rotate-0 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5E488]"
          >
            <p className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#7B8477] mb-3.5">
              {t.ideaStarterTag}
            </p>
            <p className="text-[17px] sm:text-[18px] font-bold leading-[1.45] text-[#18241C] mb-5">
              {t.ideaStarterQuote}
            </p>
            <p className="text-[11px] font-medium text-[#7C8378]">
              {t.ideaStarterLang}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
