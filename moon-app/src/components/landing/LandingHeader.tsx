'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, ChevronDown, Check } from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';

interface LandingHeaderProps {
  onScrollToNewspaper: () => void;
}

export function LandingHeader({ onScrollToNewspaper }: LandingHeaderProps) {
  const { locale, setLocale, t } = useI18n();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleLanguage = (lang: Locale) => {
    setLocale(lang);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 w-full h-[72px] bg-paperCream border-b border-paperGray flex items-center justify-between z-50 select-none font-oswald text-paperDark">
      {/* LEFT: EN/ZH Dropdown + Search Box */}
      <div className="flex items-center h-full">
        {/* Language Selector */}
        <div className="relative h-full">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-6 border-r border-paperGray h-full cursor-pointer hover:bg-paperGray/20 transition-colors uppercase font-mono text-xs font-semibold"
          >
            <span>{locale === 'zh' ? '中文' : 'EN'}</span>
            <ChevronDown size={14} className="text-paperDark/60" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-[72px] left-0 w-[120px] bg-paperWhite border-r border-b border-paperGray shadow-md flex flex-col z-50 font-mono text-xs">
              <button 
                onClick={() => toggleLanguage('zh')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-paperCream transition-colors border-b border-paperGray/40 text-left font-semibold"
              >
                <span>中文</span>
                {locale === 'zh' && <Check size={12} className="text-brandRed" />}
              </button>
              <button 
                onClick={() => toggleLanguage('en')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-paperCream transition-colors text-left font-semibold"
              >
                <span>ENGLISH</span>
                {locale === 'en' && <Check size={12} className="text-brandRed" />}
              </button>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-6 h-full border-r border-paperGray relative group min-w-[200px] md:min-w-[240px]">
          <Search size={15} className="text-paperDark/50 group-focus-within:text-brandRed transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH MOONLESS..." 
            className="w-full bg-transparent border-none outline-none text-xs font-mono tracking-wider placeholder:text-paperDark/30 text-paperDark font-semibold uppercase"
          />
        </div>
      </div>

      {/* MIDDLE: Navigation Menu (01-05) */}
      <nav className="hidden lg:flex items-center h-full flex-1 justify-center">
        <ul className="flex items-center h-full text-xs tracking-widest font-semibold gap-0">
          <li className="h-full">
            <button 
              onClick={onScrollToNewspaper}
              className="flex items-center gap-1.5 px-6 h-full hover:text-brandRed hover:bg-paperGray/10 transition-all cursor-pointer uppercase"
            >
              <span className="text-[10px] text-brandRed font-mono font-medium">01</span>
              <span>{t('aboutUs')}</span>
            </button>
          </li>
          <li className="h-full">
            <button 
              onClick={onScrollToNewspaper}
              className="flex items-center gap-1.5 px-6 h-full hover:text-brandRed hover:bg-paperGray/10 transition-all cursor-pointer uppercase"
            >
              <span className="text-[10px] text-brandRed font-mono font-medium">02</span>
              <span>{t('technology')}</span>
            </button>
          </li>
          <li className="h-full">
            <button 
              onClick={onScrollToNewspaper}
              className="flex items-center gap-1.5 px-6 h-full hover:text-brandRed hover:bg-paperGray/10 transition-all cursor-pointer uppercase"
            >
              <span className="text-[10px] text-brandRed font-mono font-medium">03</span>
              <span>{t('service')}</span>
            </button>
          </li>
          <li className="h-full">
            <button 
              onClick={onScrollToNewspaper}
              className="flex items-center gap-1.5 px-6 h-full hover:text-brandRed hover:bg-paperGray/10 transition-all cursor-pointer uppercase"
            >
              <span className="text-[10px] text-brandRed font-mono font-medium">04</span>
              <span>{t('blog')}</span>
            </button>
          </li>
          <li className="h-full">
            <button 
              onClick={onScrollToNewspaper}
              className="flex items-center gap-1.5 px-6 h-full hover:text-brandRed hover:bg-paperGray/10 transition-all cursor-pointer uppercase"
            >
              <span className="text-[10px] text-brandRed font-mono font-medium">05</span>
              <span>{t('contacts')}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* RIGHT: Icons + CATALOG (PRODUCTS) Button */}
      <div className="flex items-center h-full">
        {/* Icons container */}
        <div className="flex items-center h-full px-2 md:px-4 border-l border-paperGray gap-1 md:gap-3">
          <button className="p-3 text-paperDark/70 hover:text-brandRed hover:scale-105 transition-all cursor-pointer" aria-label="Favorites">
            <Heart size={16} />
          </button>
          <button className="p-3 text-paperDark/70 hover:text-brandRed hover:scale-105 transition-all cursor-pointer" aria-label="Shopping Cart">
            <ShoppingCart size={16} />
          </button>
          <button className="p-3 text-paperDark/70 hover:text-brandRed hover:scale-105 transition-all cursor-pointer" aria-label="User Account">
            <User size={16} />
          </button>
        </div>
        
        {/* PRODUCTS (originally CATALOG) Button */}
        <Link 
          href="/home" 
          className="h-full flex items-center justify-center bg-brandRed hover:bg-brandRed/90 text-paperCream font-bold tracking-widest text-xs uppercase px-8 md:px-10 transition-all active:brightness-95 border-l border-paperGray cursor-pointer"
        >
          {t('products')}
        </Link>
      </div>
    </header>
  );
}
