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

const CATEGORY_STYLES: Record<
  string,
  { chip: string; dot: string }
> = {
  business: { chip: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  education: { chip: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  content: { chip: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
  image: { chip: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  career: { chip: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  daily: { chip: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
};

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
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-[248px] select-none">
      {/* Brand Lockup */}
      <div className="flex items-center justify-between px-5 pt-5 pb-5 border-b border-slate-100">
        <button
          type="button"
          onClick={() => {
            onSelectView('explore');
            onSelectCategory('all');
            onCloseMobile();
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
            <BrandMark size={16} color="#ffffff" />
          </span>
          <span className="text-[18px] font-extrabold tracking-[-0.03em] text-slate-900 whitespace-nowrap">
            helaprompt<span className="text-blue-600">.</span>
          </span>
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation"
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Color strip — green / blue / yellow */}
      <div className="flex h-1 shrink-0" aria-hidden="true">
        <span className="flex-1 bg-green-500" />
        <span className="flex-1 bg-blue-500" />
        <span className="flex-1 bg-yellow-400" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Section 1: Workspace */}
        <div>
          <p className="px-2.5 mb-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400">
            {t.sidebarWorkspaceTitle}
          </p>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => {
                onSelectView('explore');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all whitespace-nowrap ${
                activeView === 'explore' && activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all whitespace-nowrap ${
                activeView === 'collections'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all whitespace-nowrap ${
                activeView === 'saved'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Heart className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{t.navSaved}</span>
              </span>
              {savedCount > 0 && (
                <span
                  className={`text-[11px] tabular-nums font-bold px-1.5 py-0.5 rounded-full ${
                    activeView === 'saved'
                      ? 'bg-white/20 text-white'
                      : 'bg-yellow-400 text-slate-900'
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Section 2: Categories */}
        <div>
          <p className="px-2.5 mb-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400">
            {t.sidebarCategoriesTitle}
          </p>
          <nav className="space-y-0.5">
            {categoryItems.map((item) => {
              const isActive =
                activeView === 'explore' && activeCategory === item.id;
              const style = CATEGORY_STYLES[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectView('explore');
                    onSelectCategory(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                      isActive ? 'bg-white/15 text-white' : style.chip
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {!isActive && (
                    <span className={`h-2 w-2 rounded-full shrink-0 ${style.dot}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Onboarding Card + Footer */}
      <div className="px-3 pb-4 pt-2 space-y-3">
        <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-yellow-400">
              <BrandMark size={12} color="#0f172a" />
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </div>
          <h3 className="text-[13.5px] font-bold text-slate-900 leading-snug mb-1">
            {t.newToAiTitle}
          </h3>
          <p className="text-[12px] text-slate-600 leading-relaxed mb-3">
            {t.newToAiBody}
          </p>
          <button
            type="button"
            onClick={() => {
              onOpenGuide();
              onCloseMobile();
            }}
            className="text-[12px] font-bold text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            {t.newToAiCta}
          </button>
        </div>

        <p className="px-2 text-[11px] text-slate-400 flex items-center gap-1.5">
          <span>{t.madeFor}</span>
          <span aria-hidden="true" className="text-green-600 font-bold">
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full shadow-2xl">{navContent}</div>
        </div>
      )}
    </>
  );
}
