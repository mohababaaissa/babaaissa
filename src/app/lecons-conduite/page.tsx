'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  Car,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Award,
  Users,
  Compass,
} from 'lucide-react';

export default function DrivingLessonsPage() {
  const { t, language, isRTL } = useLanguage();
  const whatsappUrl = getWhatsAppLink(language);
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  const lessonTypes = [
    {
      id: 'beginner',
      title: t.lessonsPage.beginnerTitle,
      desc: t.lessonsPage.beginnerDesc,
      icon: Compass,
      duration: '60 min',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'city',
      title: t.lessonsPage.cityTitle,
      desc: t.lessonsPage.cityDesc,
      icon: Car,
      duration: '60 min',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'parking',
      title: t.lessonsPage.parkingTitle,
      desc: t.lessonsPage.parkingDesc,
      icon: ShieldCheck,
      duration: '60 min',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      id: 'practice',
      title: t.lessonsPage.practiceTitle,
      desc: t.lessonsPage.practiceDesc,
      icon: Users,
      duration: '60 min',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      id: 'exam-prep',
      title: t.lessonsPage.examPrepTitle,
      desc: t.lessonsPage.examPrepDesc,
      icon: Award,
      duration: '60 min',
      color: 'bg-rose-50 text-rose-700',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Car className="w-4 h-4" />
          <span>Formation Pratique • Bouarfa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.lessonsPage.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.lessonsPage.pageSubtitle}
        </p>

        <div className="pt-2">
          <Link
            href="/reserver-lecon"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>{t.lessonsPage.bookNowBtn}</span>
          </Link>
        </div>
      </div>

      {/* Lesson Types Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#072445]">
          {t.lessonsPage.typesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonTypes.map((lt) => {
            const Icon = lt.icon;
            return (
              <div
                key={lt.id}
                className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lt.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lt.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#072445]">
                    {lt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lt.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/reserver-lecon?type=${lt.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>{language === 'ar' ? 'حجز هذه الحصة' : 'Réserver ce créneau'}</span>
                    <DirectionArrow className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Commitment Section */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl space-y-6 border border-slate-800">
        <h2 className="text-xl sm:text-3xl font-extrabold text-white">
          {t.lessonsPage.pedagogyTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.lessonsPage.pedagogy1}</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.lessonsPage.pedagogy2}</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.lessonsPage.pedagogy3}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {language === 'ar' ? 'مقر المدرسة: حي الوحدة رقم 1، بوعرفة' : 'Localisation : Hay Al Wahda N°1, Bouarfa'}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow"
          >
            {t.hero.whatsappCta}
          </a>
        </div>
      </div>

    </div>
  );
}
