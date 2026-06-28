'use client';

import React from 'react';
import { PromptPlaceholder } from './PromptPlaceholder';
import { useI18n } from '@/lib/i18n';
import { Sparkles, ArrowRight, Sun } from 'lucide-react';

export function NewspaperSection() {
  const { locale, t } = useI18n();

  return (
    <section id="newspaper-section" className="w-full bg-paperCream py-[100px] border-t border-paperGray select-none">
      <div className="max-w-[1440px] mx-auto px-[60px] flex flex-col xl:flex-row gap-[40px]">
        
        {/* LEFT NEWSPAPER: Main/Large Paper (THE MOONLESS TIMES) */}
        <article className="flex-1 bg-paperWhite border border-paperGray p-[30px] shadow-sm flex flex-col justify-between text-paperDark font-old-standard">
          
          {/* Header Masthead */}
          <div className="border-b-4 border-double border-paperDark pb-4 mb-4">
            <div className="flex justify-between items-end mb-1">
              {/* Weather Block */}
              <div className="w-[200px] text-[10px] leading-tight font-sans tracking-wide uppercase text-paperDark/70 hidden md:block">
                <div className="font-bold border-b border-paperGray pb-0.5 mb-1 flex items-center gap-1">
                  <Sun size={10} className="text-brandOrange" />
                  <span>WEATHER STATUS</span>
                </div>
                <span>{t('weatherStatus')}</span>
              </div>
              
              {/* Main Newspaper Masthead Title */}
              <h2 className="text-[44px] md:text-[52px] font-fraunces font-black tracking-tight text-center leading-none text-paperDark">
                THE MOONLESS TIMES
              </h2>
              
              {/* Extra Header Info */}
              <div className="w-[200px] text-[10px] leading-tight text-right font-sans tracking-wide uppercase text-paperDark/70 hidden md:block">
                <div className="font-bold border-b border-paperGray pb-0.5 mb-1">EDITION INFO</div>
                <span>{t('editionInfo')}</span>
              </div>
            </div>
            
            {/* Meta Info Line (Date & Mini-Nav) */}
            <div className="border-t border-paperDark py-1.5 flex justify-between items-center text-[11px] font-sans tracking-wider uppercase font-semibold">
              <span>{locale === 'zh' ? '2026年6月28日 星期三' : 'Wednesday, June 28, 2026'}</span>
              <div className="flex gap-4">
                <a href="#latest" className="hover:text-brandRed hover:underline">{t('latestEventBadge')}</a>
                <span>|</span>
                <a href="#epaper" className="hover:text-brandRed hover:underline">{t('epaper')}</a>
                <span>|</span>
                <a href="#today" className="hover:text-brandRed hover:underline">{t('todaysPaper')}</a>
              </div>
            </div>
          </div>

          {/* SECTION 1: LATEST EVENT - Main Headline (WWDC Box layout style) */}
          <div className="border border-paperDark p-5 relative bg-paperWhite mb-8">
            {/* Border label tag */}
            <span className="absolute -top-3 left-4 bg-paperWhite px-3 text-xs font-sans tracking-widest font-extrabold uppercase border border-paperDark">
              {t('latestEventBadge')}
            </span>
            
            <div className="flex flex-col lg:flex-row gap-6 items-start mt-2">
              <div className="flex-1">
                <span className="inline-block bg-paperDark text-paperWhite text-[10px] font-mono tracking-widest font-bold px-2 py-0.5 mb-3 uppercase">
                  OKF V0.1 RELEASE
                </span>
                
                <h3 className="text-2xl md:text-3xl font-playfair font-black leading-tight tracking-tight uppercase mb-4 text-paperDark">
                  {t('escapeTitle')}
                </h3>
                
                <p className="text-sm text-paperDark/85 leading-relaxed text-justify mb-4">
                  {t('escapeText')}
                </p>
              </div>

              {/* Headline Image Placeholder */}
              <div className="w-full lg:w-[320px] shrink-0 border border-paperGray p-1 bg-paperCream/30">
                <PromptPlaceholder 
                  id={2}
                  width={420} 
                  height={320} 
                  ratio="4:3" 
                />
              </div>
            </div>

            {/* Jagged Stamp and pointing hand decoration */}
            <div className="absolute -bottom-6 right-6 flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono tracking-widest text-paperDark/50 uppercase font-semibold">
                {locale === 'zh' ? '探索未知 ☞' : 'DISCOVER THE UNKNOWN ☞'}
              </span>
              
              {/* Jagged Explore Stamp */}
              <div className="w-[52px] h-[52px] bg-paperDark text-paperWhite rounded-full flex items-center justify-center text-[10px] font-sans font-black tracking-widest uppercase hover:bg-brandRed hover:scale-105 transition-all shadow-md cursor-pointer select-none origin-center rotate-[-8deg] border-2 border-dashed border-paperWhite outline outline-1 outline-paperDark">
                {t('explore')}
              </div>
            </div>
          </div>

          {/* SECTION 2: Bottom 2-Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-paperGray pt-6">
            
            {/* Left Column: JOIN US (占 5/12 宽度) */}
            <div className="md:col-span-5 flex flex-col justify-between border-r-0 md:border-r border-paperGray pr-0 md:pr-6">
              <div>
                <h4 className="text-lg font-playfair font-bold uppercase tracking-tight text-paperDark border-b border-paperGray pb-2 mb-3">
                  {t('joinUsTitle')}
                </h4>
                <p className="text-[13px] text-paperDark/85 leading-relaxed text-justify mb-4">
                  {t('joinUsText')}
                </p>
              </div>

              {/* Woodcut style Astronaut Image */}
              <div className="w-full border border-paperGray p-1 bg-paperCream/30 mt-2">
                <PromptPlaceholder 
                  id={3}
                  width={200} 
                  height={360} 
                  ratio="5:9" 
                />
              </div>
            </div>

            {/* Right Column: Mini News Articles (占 7/12 宽度) */}
            <div className="md:col-span-7 flex flex-col justify-between pl-0 md:pl-2">
              {/* Sub-Article 1 */}
              <div className="pb-6 border-b border-paperGray mb-6">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-sans font-bold tracking-wider text-brandRed uppercase">
                    {t('escapeReleasedHeader')}
                  </span>
                  <span className="text-[10px] font-mono text-paperDark/60 font-semibold uppercase">
                    {locale === 'zh' ? '现已推出' : 'Now Available'}
                  </span>
                </div>
                <h4 className="text-md font-playfair font-bold uppercase text-paperDark mb-2 leading-snug">
                  {t('escapeReleasedTitle')}
                </h4>
                <p className="text-[12.5px] text-paperDark/80 leading-relaxed text-justify mb-3">
                  {t('escapeReleasedText')}
                </p>
                <a href="#read-more-escape" className="text-xs font-mono font-bold text-brandRed hover:underline flex items-center gap-1.5">
                  {t('learnMore').toUpperCase()} <ArrowRight size={12} />
                </a>
              </div>

              {/* Sub-Article 2 */}
              <div>
                <span className="text-[10px] font-sans font-bold tracking-wider text-brandOrange uppercase mb-1.5 block">
                  {t('editorNeedsHeader')}
                </span>
                <h4 className="text-md font-playfair font-bold uppercase text-paperDark mb-2 leading-snug">
                  {t('editorNeedsTitle')}
                </h4>
                <p className="text-[12.5px] text-paperDark/80 leading-relaxed text-justify">
                  {t('editorNeedsText')}
                </p>
              </div>
            </div>

          </div>

        </article>

        {/* RIGHT NEWSPAPER: Secondary/Narrow Paper (MOONLESS TIMES) */}
        <article className="w-full xl:w-[480px] shrink-0 bg-paperWhite border border-paperGray p-[25px] shadow-sm flex flex-col justify-between text-paperDark font-old-standard">
          
          <div>
            {/* Header Masthead */}
            <div className="border-b-2 border-paperDark pb-3 mb-4">
              <h3 className="text-3xl font-playfair font-bold text-center tracking-tight leading-none text-paperDark mb-2 select-all">
                MOONLESS TIMES
              </h3>
              
              {/* Secondary Navigation */}
              <div className="border-t border-paperGray/60 pt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] font-sans font-bold tracking-wider uppercase text-paperDark/70">
                <a href="#home" className="hover:text-brandRed">{t('home')}</a>
                <span>·</span>
                <a href="#latest" className="hover:text-brandRed">{t('latest')}</a>
                <span>·</span>
                <a href="#world" className="hover:text-brandRed">{t('world')}</a>
                <span>·</span>
                <a href="#opinions" className="hover:text-brandRed">{t('editors')}</a>
                <span>·</span>
                <a href="#sports" className="hover:text-brandRed">{t('sports')}</a>
                <span>·</span>
                <a href="#lifestyle" className="hover:text-brandRed">{t('lifestyle')}</a>
                <span>·</span>
                <a href="#epaper" className="hover:text-brandRed">{t('epaper')}</a>
              </div>
            </div>

            {/* SECTION 1: Architecture & Data Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Architecture Info */}
              <div className="text-[11px] text-paperDark/80 leading-relaxed">
                <h4 className="text-xs font-sans font-bold text-paperDark uppercase border-b border-paperGray pb-1 mb-2 tracking-wide">
                  {t('architectureHeader')}
                </h4>
                <p className="text-justify font-serif">
                  {t('architectureText')}
                </p>
              </div>

              {/* THIS WEEK: DATA FLOW Card (Gray background) */}
              <div className="bg-paperCream/60 border border-paperGray/60 p-3 rounded-sm">
                <h4 className="text-[11px] font-sans font-black tracking-wider text-brandRed uppercase border-b border-brandRed/20 pb-1 mb-2">
                  {t('thisWeekHeader')}
                </h4>
                <div className="text-[10px] text-paperDark/85 leading-normal flex flex-col gap-1.5 font-sans">
                  <div className="font-semibold text-paperDark border-l-2 border-brandRed pl-1">{t('dataFlowTitle')}</div>
                  <p className="leading-snug">
                    {t('dataFlow1')}
                  </p>
                  <p className="leading-snug">
                    {t('dataFlow2')}
                  </p>
                  <p className="leading-snug">
                    {t('dataFlow3')}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 2: E-MAGAZINE (Three Vogue Covers) */}
            <div className="border-t border-paperGray pt-5 mb-6">
              <h4 className="text-xs font-sans font-bold text-paperDark uppercase tracking-wider mb-3.5 text-center flex items-center justify-center gap-1.5">
                <Sparkles size={11} className="text-brandOrange" />
                <span>{t('emagazineHeader')}</span>
                <Sparkles size={11} className="text-brandOrange" />
              </h4>
              
              {/* Three Covers Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Cover 1 (MOON) */}
                <div className="flex flex-col items-center">
                  <div className="w-full border border-paperGray p-0.5 bg-paperWhite hover:shadow-md transition-shadow">
                    <PromptPlaceholder 
                      id={4}
                      width={220} 
                      height={280} 
                      ratio="11:14" 
                      className="p-1"
                    />
                  </div>
                  <span className="text-[10px] font-sans font-bold text-paperDark mt-2 uppercase tracking-wide">
                    MOON
                  </span>
                  <span className="text-[8px] font-serif text-paperDark/60 text-center leading-none mt-1">
                    {locale === 'zh' ? '富文本编辑器' : 'WYSIWYG OKF Editor'}
                  </span>
                </div>

                {/* Cover 2 (ESCAPE) */}
                <div className="flex flex-col items-center">
                  <div className="w-full border border-paperGray p-0.5 bg-paperWhite hover:shadow-md transition-shadow">
                    <PromptPlaceholder 
                      id={5}
                      width={220} 
                      height={280} 
                      ratio="11:14" 
                      className="p-1"
                    />
                  </div>
                  <span className="text-[10px] font-sans font-bold text-paperDark mt-2 uppercase tracking-wide">
                    ESCAPE
                  </span>
                  <span className="text-[8px] font-serif text-paperDark/60 text-center leading-none mt-1">
                    {locale === 'zh' ? '云端流拉取 CLI' : 'Platform Puller CLI'}
                  </span>
                </div>

                {/* Cover 3 (SHOT) */}
                <div className="flex flex-col items-center">
                  <div className="w-full border border-paperGray p-0.5 bg-paperWhite hover:shadow-md transition-shadow">
                    <PromptPlaceholder 
                      id={6}
                      width={220} 
                      height={280} 
                      ratio="11:14" 
                      className="p-1"
                    />
                  </div>
                  <span className="text-[10px] font-sans font-bold text-paperDark mt-2 uppercase tracking-wide">
                    SHOT
                  </span>
                  <span className="text-[8px] font-serif text-paperDark/60 text-center leading-none mt-1">
                    {locale === 'zh' ? 'RAG 检索知识引擎' : 'RAG Knowledge Engine'}
                  </span>
                </div>
              </div>

              {/* See More Link */}
              <div className="flex justify-center mt-4">
                <a href="#see-more" className="px-5 py-1 border border-paperDark/80 text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-paperDark hover:text-paperWhite transition-colors">
                  {t('seeMore')}
                </a>
              </div>
            </div>
          </div>

          {/* SECTION 3: Bottom Large Feature (SHOT Engine & Astronaut) */}
          <div className="border-t border-paperGray pt-5">
            <span className="inline-block bg-brandRed text-paperCream text-[9px] font-mono tracking-widest font-extrabold px-1.5 py-0.5 mb-2.5 uppercase">
              {t('shotRoadmap')}
            </span>
            
            <h4 className="text-md font-playfair font-bold uppercase tracking-tight text-paperDark mb-3">
              {t('shotTitle')}
            </h4>
            
            <div className="border border-paperGray p-1 bg-paperCream/30 mb-3.5">
              <PromptPlaceholder 
                id={7}
                width={480} 
                height={260} 
                ratio="16:9" 
              />
            </div>
            
            <p className="text-[12px] text-paperDark/80 leading-relaxed text-justify font-serif">
              {t('shotText')}
            </p>
          </div>

        </article>

      </div>
    </section>
  );
}
