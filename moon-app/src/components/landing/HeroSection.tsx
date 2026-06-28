'use client';

import React from 'react';
import { PromptPlaceholder } from './PromptPlaceholder';
import { useI18n } from '@/lib/i18n';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="border-b border-paperGray bg-paperCream">
      {/* Desktop: 3-column layout */}
      <div className="relative mx-auto hidden max-w-[1920px] overflow-hidden xl:grid xl:grid-cols-[320px_1fr_160px] xl:min-h-[calc(100vh-120px)]">
        {/* Left Column: Text content */}
        <div className="flex flex-col justify-end border-r border-paperGray px-8 pb-12 pt-16">
          <div className="mb-5 inline-flex h-[38px] w-[60px] items-center justify-center rounded-[4px] bg-brandRed font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-paperCream">
            NEW
          </div>
          <p className="font-sans text-[13px] text-brandRed">{t('heroCategory')}</p>

          <h2 className="mt-6 max-w-[280px] font-sans text-[64px] font-semibold leading-[0.92] tracking-[-0.04em] text-paperDark">
            {t('sloganLine1')}
            <br />
            {t('sloganLine2')}
          </h2>

          <p className="mt-8 max-w-[260px] font-mono text-[13px] leading-[1.18] uppercase tracking-[0.04em] text-paperDark/72">
            {t('heroIntro')}
          </p>
        </div>

        {/* Center Column: Image with MOONLESS watermark */}
        <div className="relative flex items-center justify-center bg-paperCream px-12">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-oswald text-[180px] leading-[0.86] tracking-[0.01em] text-brandRed/15 xl:text-[220px]">
              {t('heroTitle')}
            </span>
          </div>
          <div className="relative z-10 w-full max-w-[800px]">
            <PromptPlaceholder
              id={1}
              width={880}
              height={720}
              ratio="4:3"
              className="border-0 bg-transparent p-0"
              imageClassName="object-contain"
              objectPosition="center bottom"
            />
          </div>
          <div className="absolute bottom-6 right-12 z-20 flex gap-4">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-paperGray bg-paperCream/92 font-mono text-[18px] text-paperDark/55">
              2
            </div>
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-paperGray bg-paperCream/92 font-mono text-[18px] text-paperDark/85">
              3
            </div>
          </div>
        </div>

        {/* Right Column: Decoration */}
        <aside className="relative overflow-hidden border-l border-paperGray">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paperGray/70" />
          <div className="absolute inset-x-0 top-[10%] px-4 font-oswald text-[100px] leading-[0.78] tracking-[0.02em] text-brandRed/12">
            MOON
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center px-4 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-paperDark/45">
            local knowledge system
          </div>
        </aside>
      </div>

      {/* Mobile/Tablet: Vertical stack layout */}
      <div className="relative xl:hidden">
        {/* MOONLESS watermark - top of image */}
        <div className="relative bg-paperCream px-4 pt-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center py-4">
            <span className="font-oswald text-[clamp(60px,20vw,120px)] leading-[0.86] tracking-[0.01em] text-brandRed/12">
              {t('heroTitle')}
            </span>
          </div>
          <div className="relative z-10">
            <PromptPlaceholder
              id={1}
              width={880}
              height={720}
              ratio="4:3"
              className="border-0 bg-transparent p-0"
              imageClassName="object-contain"
              objectPosition="center bottom"
            />
          </div>
        </div>

        {/* Hero text section */}
        <div className="border-t border-paperGray px-6 py-8">
          <div className="mb-4 inline-flex h-[32px] w-[52px] items-center justify-center rounded-[4px] bg-brandRed font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-paperCream">
            NEW
          </div>
          <p className="font-sans text-[12px] text-brandRed">{t('heroCategory')}</p>

          <h2 className="mt-4 max-w-full font-sans text-[36px] font-semibold leading-[0.92] tracking-[-0.04em] text-paperDark sm:text-[48px] md:text-[56px]">
            {t('sloganLine1')}
            <br />
            {t('sloganLine2')}
          </h2>

          <p className="mt-6 max-w-full font-mono text-[12px] leading-[1.3] uppercase tracking-[0.04em] text-paperDark/72">
            {t('heroIntro')}
          </p>

          {/* Navigation dots */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-paperGray bg-paperCream/92 font-mono text-[16px] text-paperDark/55">
              2
            </div>
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-paperGray bg-paperCream/92 font-mono text-[16px] text-paperDark/85">
              3
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
