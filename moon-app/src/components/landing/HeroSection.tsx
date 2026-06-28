'use client';

import React from 'react';
import { PromptPlaceholder } from './PromptPlaceholder';
import { useI18n } from '@/lib/i18n';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-[700px] bg-paperCream flex items-center justify-between px-[60px] max-w-[1440px] mx-auto select-none overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-brandOrange/5 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-brandRed/3 blur-[60px] pointer-events-none"></div>

      {/* LEFT COLUMN: Text Content (38% width) */}
      <div className="w-[38%] flex flex-col justify-center items-start text-paperDark z-10 pr-6">
        {/* NEW tag + Category */}
        <div className="flex items-center gap-3 mb-5">
          <span className="bg-brandRed text-paperCream text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] tracking-wider uppercase">
            NEW
          </span>
          <span className="text-xs font-mono text-brandOrange font-bold tracking-wider lowercase">
            local okf knowledge system
          </span>
        </div>

        {/* Large lowercase slogan */}
        <h2 className="text-[52px] md:text-[64px] font-sans font-bold leading-[1.05] tracking-tighter text-paperDark lowercase mb-4">
          {t('sloganLine1')}<br />
          {t('sloganLine2')}
        </h2>

        {/* Big product title (Oswald compressed caps) */}
        <h1 className="text-[44px] md:text-[56px] font-oswald font-bold leading-none tracking-wide text-brandRed uppercase mb-6 drop-shadow-sm select-all">
          {t('heroTitle')}
        </h1>

        {/* Subtitle description */}
        <p className="text-xs font-mono text-paperDark/60 leading-relaxed uppercase max-w-[420px] border-t border-paperGray pt-6 font-medium">
          {t('heroIntro')}
        </p>
      </div>

      {/* RIGHT COLUMN: Product visual image placeholder (62% width) */}
      <div className="w-[62%] flex justify-center items-center z-10 pl-6">
        <div className="w-full max-w-[880px] hover:translate-y-[-4px] transition-transform duration-500 ease-out shadow-[0_20px_50px_rgba(18,18,18,0.06)] hover:shadow-[0_30px_60px_rgba(18,18,18,0.1)] rounded-sm bg-paperWhite p-2 border border-paperGray/50">
          <PromptPlaceholder 
            id={1}
            width={880} 
            height={720} 
            ratio="11:9" 
          />
        </div>
      </div>

      {/* BOTTOM RIGHT: Pagination Pager widget (Visual decoration) */}
      <div className="absolute bottom-[40px] right-[60px] flex gap-3 z-20">
        <div className="w-[42px] h-[42px] rounded-full border border-paperGray bg-paperWhite flex items-center justify-center text-xs font-mono font-bold text-paperDark/40 cursor-default hover:border-brandRed hover:text-brandRed transition-colors">
          2
        </div>
        <div className="w-[42px] h-[42px] rounded-full border border-paperGray bg-paperWhite flex items-center justify-center text-xs font-mono font-bold text-paperDark/40 cursor-default hover:border-brandRed hover:text-brandRed transition-colors">
          3
        </div>
      </div>
    </section>
  );
}
