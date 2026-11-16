'use client';

import React from 'react';
import {
  LayoutGrid,
  Layers,
  Heart,
  Sparkles,
  BookOpen,
  Play,
  Image as ImageIcon,
  Briefcase,
  Sun,
  X,
} from 'lucide-react';
import { BrandMark } from './BrandMark';
import { Language, PromptCategory, UI_COPY } from '@/lib/prompts-data';

export type ActiveView = 'explore' | 'collections' | 'saved';

interface SidebarProps {
  lang: Language;
  activeView: ActiveView;
  activeCategory: PromptCategory;
  savedCount: number;
  onSelectView: (view: ActiveView) => void;
  onSelectCategory: (cat: PromptCategory) => void;
  onOpenGuide: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  lang,
  activeView,
  activeCategory,
  savedCount,
  onSelectView,
  onSelectCategory,
  onOpenGuide,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const t = UI_COPY[lang];

  const categoryItems: {
    id: Exclude<PromptCategory, 'all'>;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'business',
      label: t.catBusiness,
      icon: <Sparkles className="w-4 h-4 shrink-0" strokeWidth={1.75} />,
    },
    {
      id: 'education',
      label: t.catEducation,
      icon: <BookOpen className="w-4 h-4 shrink-0" strokeWidth={1.75} />,
    },
    {
      id: 'content',
      label: t.catContent,
      icon: <Play className="w-4 h-4 shrink-0" strokeWidth={1.75} />,
    },
    {
      id: 'image',
      label: t.catImage,
      icon: <ImageIcon className="w-4 h-4 shrink-0" strokeWidth={1.75} />,
    },
    {
      id: 'career',
      label: t.catCareer,
      icon: <Briefcase className="w-4 h-4 shrink-0" strokeWidth={1.75} />,
    },
    {
      id: 'daily',
      label: t.catDaily,
      icon: <Sun className="w-4 h-4 shrink-0" strokeWidth={1.75} />,
    },
  ];

  const navContent = (
    <div className="flex flex-col h-full bg-[#F3F2EC] border-r border-[#E4E2D9] w-[224px] select-none">
      {/* Brand Lockup */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <button
          type="button"
          onClick={() => {
            onSelectView('explore');
            onSelectCategory('all');
            onCloseMobile();
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E462B] rounded-md"
        >
          <BrandMark size={19} color="#63944B" />
          <span className="text-[19px] font-bold tracking-[-0.02em] text-[#1A2D20] whitespace-nowrap">
            {t.brand}
          </span>
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation"
          className="lg:hidden p-1.5 rounded-md text-[#5B645C] hover:bg-[#E7E5DC]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-6">
        {/* Section 1: Workspace */}
        <div>
          <p className="px-2.5 mb-2 text-[11px] font-medium text-[#7C8279]">
            {t.sidebarWorkspaceTitle}
          </p>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => {
                onSelectView('explore');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                activeView === 'explore' && activeCategory === 'all'
                  ? 'bg-[#E1E8D3] text-[#1B3122]'
                  : 'text-[#4F564F] hover:bg-[#EAE8E0] hover:text-[#1A241E]'
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{t.navExplore}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectView('collections');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                activeView === 'collections'
                  ? 'bg-[#E1E8D3] text-[#1B3122]'
                  : 'text-[#4F564F] hover:bg-[#EAE8E0] hover:text-[#1A241E]'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{t.navCollections}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectView('saved');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                activeView === 'saved'
                  ? 'bg-[#E1E8D3] text-[#1B3122]'
                  : 'text-[#4F564F] hover:bg-[#EAE8E0] hover:text-[#1A241E]'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Heart className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{t.navSaved}</span>
              </span>
              {savedCount > 0 && (
                <span className="text-[11px] tabular-nums text-[#637161] font-semibold">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Section 2: Categories */}
        <div>
          <p className="px-2.5 mb-2 text-[11px] font-medium text-[#7C8279]">
            {t.sidebarCategoriesTitle}
          </p>
          <nav className="space-y-0.5">
            {categoryItems.map((item) => {
              const isActive =
                activeView === 'explore' && activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectView('explore');
                    onSelectCategory(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E1E8D3] text-[#1B3122]'
                      : 'text-[#4F564F] hover:bg-[#EAE8E0] hover:text-[#1A241E]'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Onboarding Card + Footer */}
      <div className="px-3.5 pb-4 pt-2 space-y-3">
        <div className="bg-[#DFEAD2] rounded-xl p-4 border border-[#D4E2C4]">
          <div className="mb-2.5">
            <BrandMark size={13} color="#3B5B39" />
          </div>
          <h3 className="text-[13.5px] font-bold text-[#1A2D20] leading-snug mb-1">
            {t.newToAiTitle}
          </h3>
          <p className="text-[12px] text-[#4C5E4A] leading-relaxed mb-3">
            {t.newToAiBody}
          </p>
          <button
            type="button"
            onClick={() => {
              onOpenGuide();
              onCloseMobile();
            }}
            className="text-[12px] font-semibold text-[#1D3C27] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E462B] rounded"
          >
            {t.newToAiCta}
          </button>
        </div>

        <p className="px-2 text-[11px] text-[#8E9389] flex items-center gap-1">
          <span>{t.madeFor}</span>
          <span aria-hidden="true" className="text-[#4F6B4B]">
            ♡
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-[1px]"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full">{navContent}</div>
        </div>
      )}
    </>
  );
}
