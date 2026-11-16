'use client';

import React, { useState, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Heart,
  Layers,
} from 'lucide-react';
import {
  AiTool,
  COLLECTIONS,
  INITIAL_PROMPTS,
  Language,
  PromptCategory,
  PromptItem,
  UI_COPY,
  getCategoryLabel,
} from '@/lib/prompts-data';
import { Sidebar, ActiveView } from './Sidebar';
import { HeroBanner } from './HeroBanner';
import { PromptCard } from './PromptCard';
import { PromptModal } from './PromptModal';
import { AddPromptModal } from './AddPromptModal';
import { GuideModal } from './GuideModal';

const SAVED_STORAGE_KEY = 'helaprompt_saved_ids_v1';
const CUSTOM_STORAGE_KEY = 'helaprompt_custom_prompts_v1';
const STORAGE_EVENT = 'helaprompt-storage-change';

function subscribeToLocalStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function readLocalStorageRaw(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? '[]';
  } catch {
    return '[]';
  }
}

function writeLocalStorageJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // Ignore storage write errors
  }
}

const AI_TOOLS: AiTool[] = [
  'All AI tools',
  'ChatGPT',
  'Gemini',
  'Claude',
  'Midjourney',
];

export function HelapromptWorkspace() {
  const [lang, setLang] = useState<Language>('si');
  const [activeView, setActiveView] = useState<ActiveView>('explore');
  const [activeCategory, setActiveCategory] = useState<PromptCategory>('all');
  const [selectedTool, setSelectedTool] = useState<AiTool>('All AI tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrompt, setActivePrompt] = useState<PromptItem | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toolMenuOpen, setToolMenuOpen] = useState(false);

  const libraryRef = useRef<HTMLDivElement>(null);
  const toolMenuRef = useRef<HTMLDivElement>(null);

  const t = UI_COPY[lang];

  const savedRaw = useSyncExternalStore(
    subscribeToLocalStorage,
    () => readLocalStorageRaw(SAVED_STORAGE_KEY),
    () => '[]'
  );
  const customRaw = useSyncExternalStore(
    subscribeToLocalStorage,
    () => readLocalStorageRaw(CUSTOM_STORAGE_KEY),
    () => '[]'
  );

  const savedIds = useMemo<string[]>(() => {
    try {
      const parsed = JSON.parse(savedRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [savedRaw]);

  const customPrompts = useMemo<PromptItem[]>(() => {
    try {
      const parsed = JSON.parse(customRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [customRaw]);

  // Close tool dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        toolMenuRef.current &&
        !toolMenuRef.current.contains(e.target as Node)
      ) {
        setToolMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allPrompts = useMemo(
    () => [...customPrompts, ...INITIAL_PROMPTS],
    [customPrompts]
  );

  const handleToggleSave = (id: string) => {
    const next = savedIds.includes(id)
      ? savedIds.filter((item) => item !== id)
      : [...savedIds, id];
    writeLocalStorageJson(SAVED_STORAGE_KEY, next);
  };

  const handleAddPrompt = (item: PromptItem) => {
    const next = [item, ...customPrompts];
    writeLocalStorageJson(CUSTOM_STORAGE_KEY, next);
    setActiveView('explore');
    setActiveCategory('all');
  };

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allPrompts.filter((p) => {
      if (activeView === 'saved' && !savedIds.includes(p.id)) return false;

      if (
        activeView === 'explore' &&
        activeCategory !== 'all' &&
        p.category !== activeCategory
      ) {
        return false;
      }

      if (selectedTool !== 'All AI tools' && p.tool !== selectedTool) {
        return false;
      }

      if (!q) return true;

      const haystack = [
        p.titleSi,
        p.titleEn,
        p.descriptionSi,
        p.descriptionEn,
        p.promptSi,
        p.promptEn,
        p.tool,
        p.category,
        ...p.tags,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [allPrompts, activeView, activeCategory, selectedTool, searchQuery, savedIds]);

  const scrollToLibrary = () => {
    libraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedTool('All AI tools');
  };

  const currentBreadcrumbLabel = (() => {
    if (activeView === 'collections') return t.breadcrumbCollections;
    if (activeView === 'saved') return t.breadcrumbSaved;
    if (activeCategory !== 'all') return getCategoryLabel(activeCategory, lang);
    return t.breadcrumbExplore;
  })();

  return (
    <div className="min-h-screen flex bg-[#FAF9F6] text-[#1A241E]">
      {/* Left Sidebar */}
      <Sidebar
        lang={lang}
        activeView={activeView}
        activeCategory={activeCategory}
        savedCount={savedIds.length}
        onSelectView={(view) => {
          setActiveView(view);
          if (view === 'explore') {
            setActiveCategory('all');
          }
        }}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveView('explore');
        }}
        onOpenGuide={() => setGuideModalOpen(true)}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-[#ECEAE2]/70">
          <div className="max-w-[1160px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Mobile menu + Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="lg:hidden p-2 -ml-2 rounded-lg text-[#4B544C] hover:bg-[#EFECE4]"
              >
                <Menu className="w-5 h-5" />
              </button>

              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#7B8077] truncate"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('explore');
                    setActiveCategory('all');
                  }}
                  className="hover:text-[#1A241E] transition-colors whitespace-nowrap"
                >
                  {t.breadcrumbRoot}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#A5A9A0] shrink-0" />
                <span className="text-[#4F564F] font-medium truncate">
                  {currentBreadcrumbLabel}
                </span>
              </nav>
            </div>

            {/* Right: Language Switcher + Primary Add Prompt CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div
                role="group"
                aria-label="Language switcher"
                className="inline-flex items-center rounded-lg border border-[#E2E0D7] bg-white p-0.5 text-[12px]"
              >
                <button
                  type="button"
                  onClick={() => setLang('si')}
                  className={`px-2.5 py-1.5 rounded-[6px] font-medium transition-colors whitespace-nowrap ${
                    lang === 'si'
                      ? 'bg-[#EFECE4] text-[#1A241E] font-semibold'
                      : 'text-[#757C73] hover:text-[#1A241E]'
                  }`}
                >
                  සිං
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1.5 rounded-[6px] font-medium transition-colors whitespace-nowrap ${
                    lang === 'en'
                      ? 'bg-[#EFECE4] text-[#1A241E] font-semibold'
                      : 'text-[#757C73] hover:text-[#1A241E]'
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="rounded-lg bg-[#1D442B] hover:bg-[#275738] active:scale-[0.99] text-white px-3.5 sm:px-4 py-2 text-[12.5px] sm:text-[13px] font-semibold transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D442B] focus-visible:ring-offset-2"
              >
                {t.addPromptBtn}
              </button>
            </div>
          </div>
        </header>

        {/* Main Viewport Container */}
        <main className="flex-1 max-w-[1160px] w-full mx-auto px-5 sm:px-8 py-6 sm:py-8 space-y-8">
          {activeView === 'collections' ? (
            /* Collections View */
            <section className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7C8076] mb-1.5">
                  {t.libraryKicker}
                </p>
                <h1 className="text-[26px] font-bold text-[#1A241E] tracking-[-0.02em]">
                  {t.collectionsHeading}
                </h1>
                <p className="text-[14px] text-[#5B645C] mt-1">
                  {t.collectionsSub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLECTIONS.map((col) => {
                  const colPrompts = allPrompts.filter((p) =>
                    col.promptIds.includes(p.id)
                  );
                  const bgClass =
                    col.accent === 'forest'
                      ? 'bg-[#1D442B] text-white'
                      : col.accent === 'sage'
                      ? 'bg-[#E3EAD3] text-[#1A241E]'
                      : 'bg-[#EFECE4] text-[#1A241E]';

                  return (
                    <div
                      key={col.id}
                      className="rounded-2xl bg-white border border-[#E6E4DC] overflow-hidden flex flex-col"
                    >
                      <div className={`p-6 ${bgClass}`}>
                        <div className="flex items-center justify-between mb-3">
                          <Layers className="w-4 h-4 opacity-80" />
                          <span className="text-[11.5px] font-semibold tabular-nums opacity-80">
                            {colPrompts.length} prompts
                          </span>
                        </div>
                        <h2 className="text-[17px] font-bold leading-snug">
                          {lang === 'si' ? col.titleSi : col.titleEn}
                        </h2>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <p className="text-[13.5px] text-[#5B645C] leading-relaxed">
                          {lang === 'si'
                            ? col.descriptionSi
                            : col.descriptionEn}
                        </p>
                        <div className="space-y-2 border-t border-[#F0EFE9] pt-3.5">
                          {colPrompts.map((cp) => (
                            <button
                              key={cp.id}
                              type="button"
                              onClick={() => setActivePrompt(cp)}
                              className="w-full text-left flex items-center justify-between gap-2 py-1.5 px-2 -mx-2 rounded-lg hover:bg-[#F5F4EE] text-[13px] font-medium text-[#1A241E] transition-colors"
                            >
                              <span className="truncate">
                                {lang === 'si' ? cp.titleSi : cp.titleEn}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#757C73] shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (
            /* Explore or Saved View */
            <>
              {activeView === 'explore' && (
                <HeroBanner
                  lang={lang}
                  onStartClick={scrollToLibrary}
                  onIdeaStarterClick={() => {
                    const starter =
                      allPrompts.find((p) => p.id === 'fb-business-post') ||
                      allPrompts[0];
                    if (starter) setActivePrompt(starter);
                  }}
                />
              )}

              {/* Search Bar & Quick Suggestions */}
              <section aria-label="Search prompts" className="space-y-3">
                <div className="relative flex items-center bg-white border border-[#E4E2D9] rounded-xl px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus-within:border-[#1D442B] focus-within:ring-2 focus-within:ring-[#1D442B]/15 transition-all">
                  <Search
                    className="w-4 h-4 text-[#8D9289] shrink-0 mr-3"
                    strokeWidth={1.8}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-[14px] text-[#1A241E] placeholder:text-[#8E9389] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="p-1 rounded-md text-[#8D9289] hover:text-[#1A241E] hover:bg-[#F3F2EC]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-[#7D8278] mr-1">
                    {t.searchLabel}
                  </span>
                  {t.quickSearches.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setSearchQuery(item.query);
                        setActiveView('explore');
                        setActiveCategory('all');
                      }}
                      className="inline-flex items-center gap-1 rounded-md bg-[#ECEAE3] hover:bg-[#E1DFD6] px-2.5 py-1 text-[12px] font-medium text-[#545B52] transition-colors whitespace-nowrap"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#7D8278]" />
                    </button>
                  ))}
                </div>
              </section>

              {/* Library Section */}
              <section
                id="prompt-library"
                ref={libraryRef}
                className="pt-2 space-y-5 scroll-mt-20"
              >
                {/* Kicker + Heading + Count */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7C8076] mb-1.5">
                      {t.libraryKicker}
                    </p>
                    <h2 className="text-[23px] sm:text-[26px] font-bold text-[#1A241E] tracking-[-0.02em] leading-tight">
                      {activeView === 'saved'
                        ? t.navSaved
                        : t.libraryTitle}
                    </h2>
                  </div>

                  <p className="text-[12.5px] font-medium text-[#7C8076] tabular-nums shrink-0">
                    {filteredPrompts.length} {t.promptsCountSuffix}
                  </p>
                </div>

                {/* Filter Tabs + AI Tool Dropdown */}
                <div className="flex items-center justify-between gap-4 border-b border-[#E7E5DD]">
                  <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar">
                    {activeView === 'explore' ? (
                      t.tabs.map((tab) => {
                        const isActive = activeCategory === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() =>
                              setActiveCategory(tab.id as PromptCategory)
                            }
                            className={`inline-flex items-center gap-1.5 pb-3 text-[13.5px] whitespace-nowrap shrink-0 border-b-2 -mb-px transition-colors ${
                              isActive
                                ? 'border-[#1D442B] text-[#1A241E] font-semibold'
                                : 'border-transparent text-[#6A7067] hover:text-[#1A241E] font-medium'
                            }`}
                          >
                            {'hasStar' in tab && tab.hasStar && (
                              <Sparkles
                                className="w-3.5 h-3.5 text-[#1D442B]"
                                strokeWidth={2}
                              />
                            )}
                            <span>{tab.label}</span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="pb-3 text-[13.5px] font-semibold text-[#1A241E] border-b-2 border-[#1D442B] -mb-px inline-flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-[#1D442B] text-[#1D442B]" />
                        <span>{t.navSaved}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Tool Dropdown */}
                  <div ref={toolMenuRef} className="relative pb-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setToolMenuOpen((o) => !o)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3C443D] hover:text-[#1A241E] py-1 px-2 rounded-md hover:bg-[#EFECE4] transition-colors whitespace-nowrap"
                    >
                      <span>
                        {selectedTool === 'All AI tools'
                          ? t.allTools
                          : selectedTool}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#757C73]" />
                    </button>

                    {toolMenuOpen && (
                      <div className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-[#E4E2D9] shadow-lg py-1 z-20">
                        {AI_TOOLS.map((tool) => (
                          <button
                            key={tool}
                            type="button"
                            onClick={() => {
                              setSelectedTool(tool);
                              setToolMenuOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-[13px] transition-colors ${
                              selectedTool === tool
                                ? 'bg-[#E1E8D3] text-[#1B3122] font-semibold'
                                : 'text-[#4F564F] hover:bg-[#F5F4EE]'
                            }`}
                          >
                            {tool === 'All AI tools' ? t.allTools : tool}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cards Grid or Empty States */}
                {filteredPrompts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-1 pb-10">
                    {filteredPrompts.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        lang={lang}
                        isSaved={savedIds.includes(prompt.id)}
                        onToggleSave={handleToggleSave}
                        onOpen={(item) => setActivePrompt(item)}
                      />
                    ))}
                  </div>
                ) : activeView === 'saved' && savedIds.length === 0 ? (
                  <div className="rounded-2xl border border-[#E6E4DC] bg-white py-16 px-6 text-center">
                    <div className="w-11 h-11 rounded-full bg-[#F3F2EC] mx-auto mb-4 flex items-center justify-center text-[#5B645C]">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#1A241E] mb-1.5">
                      {t.savedEmptyTitle}
                    </h3>
                    <p className="text-[13.5px] text-[#6A7067] max-w-sm mx-auto mb-5">
                      {t.savedEmptyDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveView('explore')}
                      className="rounded-lg bg-[#1D442B] hover:bg-[#275738] text-white px-4 py-2 text-[13px] font-semibold transition-colors"
                    >
                      {t.navExplore}
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#E6E4DC] bg-white py-16 px-6 text-center">
                    <h3 className="text-[16px] font-bold text-[#1A241E] mb-1.5">
                      {t.emptyTitle}
                    </h3>
                    <p className="text-[13.5px] text-[#6A7067] max-w-sm mx-auto mb-5">
                      {t.emptyDesc}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="rounded-lg bg-[#1D442B] hover:bg-[#275738] text-white px-4 py-2 text-[13px] font-semibold transition-colors"
                    >
                      {t.emptyReset}
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <PromptModal
        prompt={activePrompt}
        lang={lang}
        isSaved={activePrompt ? savedIds.includes(activePrompt.id) : false}
        onToggleSave={handleToggleSave}
        onClose={() => setActivePrompt(null)}
      />

      <AddPromptModal
        open={addModalOpen}
        lang={lang}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddPrompt}
      />

      <GuideModal
        open={guideModalOpen}
        lang={lang}
        onClose={() => setGuideModalOpen(false)}
      />
    </div>
  );
}
