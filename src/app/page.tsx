'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  BookOpen,
  Award,
  CalendarCheck,
  ShieldCheck,
  Car,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export default function HomePage() {
  const { t, language, isRTL } = useLanguage();
  const whatsappUrl = getWhatsAppLink(language);
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072445] via-[#0a2f57] to-[#072445] text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Subtle patterned Moroccan & road decorative overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Glowing visual accent spheres */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.hero.tagline}</span>
            <span className="text-white/40">•</span>
            <span>{BUSINESS_INFO.city}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            {t.hero.headline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/code-de-la-route"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#072445] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>{t.hero.ctaCourses}</span>
            </Link>

            <Link
              href="/examens-blancs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Award className="w-5 h-5 text-white" />
              <span>{t.hero.ctaExam}</span>
            </Link>

            <Link
              href="/reserver-lecon"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm sm:text-base border border-emerald-500/40 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-5 h-5 text-emerald-400" />
              <span>{t.hero.ctaBooking}</span>
            </Link>
          </div>

          {/* WhatsApp Direct Hero Button */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-emerald-600" />
              <span>{t.hero.whatsappCta} : {BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>

          {/* Feature highlights pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto border-t border-white/10 text-xs sm:text-sm text-slate-300">
            <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 flex flex-col items-center">
              <span className="font-bold text-white text-base">12</span>
              <span>{t.hero.stats.categories}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 flex flex-col items-center">
              <span className="font-bold text-emerald-400 text-base">NARSA</span>
              <span>{t.hero.stats.support}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 flex flex-col items-center">
              <span className="font-bold text-white text-base">100%</span>
              <span>{t.hero.stats.simulator}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 flex flex-col items-center">
              <span className="font-bold text-white text-base">Bouarfa</span>
              <span>{t.hero.stats.location}</span>
            </div>
          </div>

        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.home.introSubtitle}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#072445] leading-tight">
              {t.home.introTitle}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t.home.introDesc}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  {language === 'ar'
                    ? 'منهجية بيداغوجية حديثة مطابقة للقانون 52.05 المنظم لقانون السير بالمغرب.'
                    : 'Pédagogie moderne et rigoureuse respectant la loi marocaine 52.05 sur la sécurité routière.'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  {language === 'ar'
                    ? 'سيارات تعليم حديثة ومجهزة بمكابح ودواسات مزدوجة لضمان أقصى درجات الأمان.'
                    : 'Véhicules récents et sécurisés avec double commande homologuée pour la conduite pratique.'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  {language === 'ar'
                    ? 'مقر مدرستنا في بوعرفة: حي الوحدة رقم 1، مع سهولة التواصل عبر الهاتف وواتساب.'
                    : 'Établissement situé à Hay Al Wahda N°1 à Bouarfa, accessible et réactif par téléphone et WhatsApp.'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 group"
              >
                <span>{language === 'ar' ? 'تعرف على المدرسة بالتفصيل' : 'En savoir plus sur notre école'}</span>
                <DirectionArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-[#072445] to-[#0c3d6e] p-8 text-white shadow-2xl space-y-6 border border-slate-700/60">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold">{BUSINESS_INFO.name}</h3>
                  <p className="text-xs text-emerald-400 font-arabic">{BUSINESS_INFO.nameAr}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Car className="w-6 h-6 text-emerald-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-400 block mb-1">Localisation</span>
                  <span className="font-semibold text-white">Bouarfa, Oriental</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-400 block mb-1">Téléphone & WhatsApp</span>
                  <span className="font-semibold text-emerald-300">06 26 78 31 60</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-400 block mb-1">Code de la route</span>
                  <span className="font-semibold text-white">12 Thèmes interactifs</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-400 block mb-1">Préparation</span>
                  <span className="font-semibold text-white">Examen Théorique & Pratique</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200">
                <div className="flex items-center gap-2 font-bold mb-1 text-emerald-300">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فضاء تفاعلي متكامل' : 'Espace 100% Fonctionnel'}</span>
                </div>
                <p>
                  {language === 'ar'
                    ? 'يمكنكم دراسة قانون السير، اجتياز امتحانات تجريبية مجانية، وحجز حصص السياقة مباشرة عبر موقعنا.'
                    : 'Étudiez le Code, réalisez des examens blancs gratuits avec correction instantanée et réservez vos leçons en ligne.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4-STEP LEARNING WORKFLOW */}
      <section className="bg-slate-100/80 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#072445]">
              {t.home.howItWorksTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {t.home.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#072445]">{t.home.step1Title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.home.step1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#072445]">{t.home.step2Title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.home.step2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#072445]">{t.home.step3Title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.home.step3Desc}</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#072445]">{t.home.step4Title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.home.step4Desc}</p>
            </div>

          </div>

        </div>
      </section>

      {/* CORE 3 TRAINING CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#072445]">
            {t.home.cardsTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.home.cardsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Code de la route */}
          <div className="group rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#072445]">{t.home.cardCodeTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.home.cardCodeDesc}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/code-de-la-route"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{t.home.cardCodeAction}</span>
                <DirectionArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Examens blancs */}
          <div className="group rounded-2xl bg-white border-2 border-emerald-500/40 p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
              {language === 'ar' ? 'محاكي تفاعلي' : 'Interactif'}
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100/70 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#072445]">{t.home.cardExamTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.home.cardExamDesc}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/examens-blancs"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{t.home.cardExamAction}</span>
                <DirectionArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3: Leçons de conduite */}
          <div className="group rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Car className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#072445]">{t.home.cardLessonsTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.home.cardLessonsDesc}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/lecons-conduite"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{t.home.cardLessonsAction}</span>
                <DirectionArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* BOOKING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#072445] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <CalendarCheck className="w-4 h-4" />
              <span>Bouarfa — Réservation Directe</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.home.bookingSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.home.bookingSectionDesc}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/reserver-lecon"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-lg transition"
            >
              {t.home.bookingSectionCta}
            </Link>
          </div>
        </div>
      </section>

      {/* NARSA ASSISTANCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-md border border-purple-200">
              <ShieldCheck className="w-4 h-4" />
              <span>Agence Nationale de la Sécurité Routière (NARSA)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#072445]">
              {t.home.narsaSectionTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.home.narsaSectionDesc}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/espace-narsa"
              className="px-6 py-3 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white font-bold text-sm shadow transition"
            >
              {t.home.narsaSectionCta}
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION SUMMARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">{t.contact.addressLabel}</h3>
            <p className="text-sm text-slate-600">{BUSINESS_INFO.address}</p>
            <p className="text-xs text-slate-500">Bouarfa, Oriental, Maroc</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">{t.contact.phoneLabel}</h3>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="text-sm font-semibold text-emerald-600 hover:underline">
              {BUSINESS_INFO.phoneFormatted}
            </a>
            <p className="text-xs text-slate-500">Appel direct & WhatsApp disponible</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">{t.contact.hoursLabel}</h3>
            <p className="text-sm text-slate-600">
              {language === 'ar' ? BUSINESS_INFO.defaultSettings.openingHoursPlaceholderAr : BUSINESS_INFO.defaultSettings.openingHoursPlaceholderFr}
            </p>
            <p className="text-xs text-slate-500">Accueil à Bouarfa</p>
          </div>

        </div>
      </section>

    </div>
  );
}
