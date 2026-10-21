'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useLanguage } from './LanguageProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import { MapPin, Phone, MessageCircle, ShieldCheck, ExternalLink, Calendar, BookOpen, Clock } from 'lucide-react';

export default function Footer() {
  const { t, language, isRTL } = useLanguage();
  const whatsappUrl = getWhatsAppLink(language);

  return (
    <footer className="bg-[#072445] text-slate-200 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bouarfa info */}
          <div className="space-y-4">
            <Logo size="md" light showSubtitle />
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="space-y-2 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-emerald-400 font-semibold tracking-wide">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  {language === 'ar' ? BUSINESS_INFO.defaultSettings.openingHoursPlaceholderAr : BUSINESS_INFO.defaultSettings.openingHoursPlaceholderFr}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 border-b border-emerald-500/40 pb-2 inline-block">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route" className="hover:text-emerald-400 transition">
                  {t.nav.courses}
                </Link>
              </li>
              <li>
                <Link href="/examens-blancs" className="hover:text-emerald-400 transition">
                  {t.nav.exams}
                </Link>
              </li>
              <li>
                <Link href="/lecons-conduite" className="hover:text-emerald-400 transition">
                  {t.nav.lessons}
                </Link>
              </li>
              <li>
                <Link href="/reserver-lecon" className="text-emerald-400 font-semibold hover:underline">
                  {t.nav.booking}
                </Link>
              </li>
              <li>
                <Link href="/espace-narsa" className="hover:text-emerald-400 transition">
                  {t.nav.narsa}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Tools & Official Resources */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 border-b border-emerald-500/40 pb-2 inline-block">
              {language === 'ar' ? 'بوابات رسمية وخدمات' : 'Portails Officiels & Services'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={BUSINESS_INFO.officialLinks.narsaPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>Portail Officiel NARSA</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.officialLinks.khadamatNarsa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>Khadamat NARSA Maroc</span>
                </a>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-emerald-400 transition">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  {t.nav.contact}
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp : {BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Official Disclaimer */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white mb-4 border-b border-emerald-500/40 pb-2 inline-block">
              {t.footer.legalTitle}
            </h3>
            <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'ar' ? 'إشعار توضيحي' : 'Transparence & Éthique'}</span>
              </div>
              <p>
                {t.footer.disclaimerNarsa}
              </p>
              <p className="text-[11px] text-slate-400">
                {t.auth.privacyNotice}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name} — Hay Al Wahda N°1, Bouarfa. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Bouarfa, Oriental, Maroc</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Bilingual FR / AR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
