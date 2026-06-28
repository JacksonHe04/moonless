'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';

interface LandingHeaderProps {
  onScrollToNewspaper: () => void;
}

export function LandingHeader({ onScrollToNewspaper }: LandingHeaderProps) {
  const { locale, setLocale, t } = useI18n();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { key: 'aboutUs', index: '01' },
      { key: 'technology', index: '02' },
      { key: 'service', index: '03' },
      { key: 'blog', index: '04' },
      { key: 'contacts', index: '05' },
    ] as const,
    [],
  );

  const toggleLanguage = (lang: Locale) => {
    setLocale(lang);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-paperGray bg-paperCream select-none">
      <div className="h-[4px] w-full bg-brandRed" />

      {/* Top bar: language + search + nav + products */}
      <div className="flex h-[56px] items-center border-b border-paperGray">
        {/* Language selector */}
        <div className="relative flex-shrink-0 border-r border-paperGray">
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex h-full w-[72px] items-center justify-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-paperDark transition-colors hover:bg-paperGray/15"
          >
            <span>{locale === 'zh' ? 'ZH' : 'EN'}</span>
            <ChevronDown size={14} className="text-paperDark/70" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full z-50 w-[100px] border-b border-r border-l border-paperGray bg-paperWhite shadow-lg">
              <button
                onClick={() => toggleLanguage('zh')}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-paperCream"
              >
                <span>中文</span>
                {locale === 'zh' && <Check size={12} className="text-brandRed" />}
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-paperCream"
              >
                <span>EN</span>
                {locale === 'en' && <Check size={12} className="text-brandRed" />}
              </button>
            </div>
          )}
        </div>

        {/* Search - takes remaining space */}
        <div className="flex min-w-0 flex-1 items-center gap-3 px-6">
          <Search size={18} strokeWidth={1.75} className="text-paperDark/45 flex-shrink-0" />
          <input
            type="text"
            placeholder={t('landingSearchPlaceholder')}
            className="min-w-0 flex-1 bg-transparent font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-paperDark outline-none placeholder:text-paperDark/28"
          />
        </div>

        {/* Desktop: Navigation + Products */}
        <nav className="hidden xl:flex h-full flex-shrink-0 border-l border-paperGray">
          <ul className="flex h-full divide-x divide-paperGray">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={onScrollToNewspaper}
                  className="flex h-full flex-col items-center justify-center px-4 py-2 text-left transition-colors hover:bg-paperGray/12"
                >
                  <span className="font-mono text-[11px] leading-none tracking-[0.08em] text-paperDark">
                    {item.index}
                  </span>
                  <span className="mt-1 font-mono text-[10px] leading-[1.05] tracking-[0.05em] text-paperDark uppercase">
                    {t(item.key)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Link
            href="/home"
            className="flex items-center justify-center bg-brandRed px-6 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-paperCream transition-colors hover:bg-[#b13e35]"
          >
            {t('products')}
          </Link>
        </nav>
      </div>

      {/* Mobile: Navigation below search */}
      <nav className="flex xl:hidden overflow-x-auto border-t border-paperGray bg-paperCream">
        <ul className="flex min-w-max divide-x divide-paperGray">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={onScrollToNewspaper}
                className="flex h-[48px] flex-col items-center justify-center px-4 py-1.5 text-left transition-colors hover:bg-paperGray/12"
              >
                <span className="font-mono text-[10px] leading-none tracking-[0.08em] text-paperDark">
                  {item.index}
                </span>
                <span className="mt-0.5 font-mono text-[9px] leading-[1.05] tracking-[0.05em] text-paperDark uppercase">
                  {t(item.key)}
                </span>
              </button>
            </li>
          ))}
          <li>
            <Link
              href="/home"
              className="flex h-[48px] items-center justify-center bg-brandRed px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-paperCream"
            >
              {t('products')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
