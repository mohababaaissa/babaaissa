'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { getWhatsAppLink, BUSINESS_INFO } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const { language, isRTL } = useLanguage();
  const whatsappUrl = getWhatsAppLink(language);

  return (
    <aside aria-label="Support WhatsApp" className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex items-center gap-3 group`}>
      {/* Tooltip hint */}
      <span className="hidden md:inline-flex items-center px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-medium shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {language === 'ar' ? 'تواصل معنا مباشرة عبر واتساب' : 'Discutez avec nous sur WhatsApp'}
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20"
        aria-label={`WhatsApp Auto-école Babaaissa ${BUSINESS_INFO.phoneFormatted}`}
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-emerald-500" />
      </a>
    </aside>
  );
}
