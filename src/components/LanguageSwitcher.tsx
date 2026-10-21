'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs font-semibold shadow-inner" role="group" aria-label={t.common.langSwitchLabel}>
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
          language === 'fr'
            ? 'bg-[#072445] text-white shadow-sm font-bold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        aria-pressed={language === 'fr'}
      >
        <span className="text-xs">🇲🇦</span>
        <span>FR</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-arabic ${
          language === 'ar'
            ? 'bg-[#072445] text-white shadow-sm font-bold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        aria-pressed={language === 'ar'}
      >
        <span className="text-xs">🇲🇦</span>
        <span>العربية</span>
      </button>
    </div>
  );
}
