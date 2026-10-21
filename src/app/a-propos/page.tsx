'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  ShieldCheck,
  Award,
  Users,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const whatsappUrl = getWhatsAppLink(language);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Auto-école Babaaissa • Bouarfa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.about.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.about.pageSubtitle}
        </p>
      </div>

      {/* History and Location Section */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#072445]">
          {t.about.historyTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {t.about.historyDesc}
        </p>

        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-sm block">Adresse officielle</span>
              <span className="text-xs text-slate-600">{BUSINESS_INFO.address}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-sm block">Téléphone direct</span>
              <span className="text-xs text-slate-600">{BUSINESS_INFO.phoneFormatted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#072445]">
          {t.about.missionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.about.mission1Title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.about.mission1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.about.mission2Title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.about.mission2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.about.mission3Title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.about.mission3Desc}</p>
          </div>
        </div>
      </div>

      {/* Ethics & Transparency Card */}
      <div className="rounded-2xl bg-emerald-950 text-white p-8 sm:p-10 shadow-lg space-y-4 border border-emerald-800">
        <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg">
          <HeartHandshake className="w-6 h-6" />
          <span>{t.about.transparencyTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
          {t.about.transparencyDesc}
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow transition"
          >
            {t.nav.contact}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp : {BUSINESS_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
