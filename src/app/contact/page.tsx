'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Navigation,
} from 'lucide-react';

export default function ContactPage() {
  const { t, language, isRTL } = useLanguage();
  const whatsappUrl = getWhatsAppLink(language);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('0626783160');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Phone className="w-4 h-4" />
          <span>Bouarfa, Oriental, Maroc</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.contact.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.contact.pageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#072445]">
              {language === 'ar' ? 'معلومات التواصل الرسمية' : 'Coordonnées de l’établissement'}
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{t.contact.addressLabel}</span>
                  <span className="text-slate-600">{BUSINESS_INFO.address}</span>
                  <span className="text-xs text-slate-400 block mt-0.5">Bouarfa, Région de l&apos;Oriental, Maroc</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{t.contact.phoneLabel}</span>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-emerald-700 font-bold hover:underline">
                    {BUSINESS_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{t.contact.whatsappLabel}</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 font-bold hover:underline"
                  >
                    <span>{t.contact.whatsappBtn}</span>
                    <span className="text-xs">({BUSINESS_INFO.phoneFormatted})</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{t.contact.hoursLabel}</span>
                  <span className="text-slate-600">
                    {language === 'ar' ? BUSINESS_INFO.defaultSettings.openingHoursPlaceholderAr : BUSINESS_INFO.defaultSettings.openingHoursPlaceholderFr}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-emerald-500" />
                <span>{t.contact.whatsappBtn}</span>
              </a>
            </div>
          </div>

          {/* Map Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[#072445] text-sm">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>{t.contact.mapTitle}</span>
              </div>
              <span className="text-xs text-slate-400">Hay Al Wahda N°1</span>
            </div>

            {/* Simulated interactive map view for Bouarfa */}
            <div className="h-56 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900 text-sm">{BUSINESS_INFO.name}</div>
                <div className="text-xs text-slate-600">{BUSINESS_INFO.address}</div>
                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                  Bouarfa 61250, Maroc
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#072445]">
              {t.contact.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {language === 'ar' ? 'اترك لنا رسالة وسيقوم فريق مدرسة باباعيسى بالرد عليكم.' : 'Laissez-nous un message et notre équipe à Bouarfa vous recontactera rapidement.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">{t.contact.sendSuccess}</h3>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
              >
                {language === 'ar' ? 'إرسال رسالة أخرى' : 'Envoyer un autre message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.contact.nameInput} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Mohamed Alami"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.contact.phoneInput} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0626783160"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.contact.messageInput} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك أو استفسارك هنا...' : 'Votre question sur les leçons, les tarifs ou les examens...'}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.contact.sendBtn}</span>
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-slate-400">
            {t.auth.privacyNotice}
          </div>
        </div>

      </div>

    </div>
  );
}
