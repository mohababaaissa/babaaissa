'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  ExternalLink,
  CheckSquare,
  Send,
  User,
  Phone,
  Calendar,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';

export default function NarsaSpacePage() {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('0626783160');
  const [licenseCategory, setLicenseCategory] = useState('B');
  const [requestType, setRequestType] = useState('theory_exam');
  const [preferredDate, setPreferredDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.licenseCategory) setLicenseCategory(user.licenseCategory);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/narsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          licenseCategory,
          requestType,
          preferredDate,
          additionalNotes,
          privacyConsent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedRef(data.request.reference);
      } else {
        setErrorMsg(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Agence Nationale de la Sécurité Routière</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.narsa.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.narsa.pageSubtitle}
        </p>

        {/* Official Links Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={BUSINESS_INFO.officialLinks.narsaPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition shadow"
          >
            <span>{t.narsa.officialPortalBtn}</span>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </a>

          <a
            href={BUSINESS_INFO.officialLinks.khadamatNarsa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow"
          >
            <span>{t.narsa.khadamatPortalBtn}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mandatory Official Transparency Notice */}
      <div className="rounded-2xl bg-amber-50 border-2 border-amber-300/80 p-6 sm:p-8 space-y-2 text-amber-950 shadow-sm">
        <div className="flex items-center gap-2 font-extrabold text-amber-900 text-base sm:text-lg">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{language === 'ar' ? 'إشعار توضيحي بخصوص خدمات نارسا' : 'Avertissement officiel et clarification'}</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
          {t.narsa.importantNotice}
        </p>
      </div>

      {/* Overview of Exam Process */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#072445]">
          {t.narsa.examProcessTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.narsa.theoryStepTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.narsa.theoryStepDesc}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t.narsa.practicalStepTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.narsa.practicalStepDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Regulatory Documents Checklist */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-lg">
          <CheckSquare className="w-6 h-6" />
          <span>{t.narsa.checklistTitle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
          {[t.narsa.check1, t.narsa.check2, t.narsa.check3, t.narsa.check4, t.narsa.check5].map(
            (item, index) => (
              <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Assistance Request Form */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#072445]">
            {t.narsa.formTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.narsa.formDesc}
          </p>
        </div>

        {submittedRef ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#072445]">
              {t.narsa.requestSuccessTitle}
            </h3>
            <div className="font-mono font-black text-emerald-700 text-lg">
              {submittedRef}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {t.narsa.requestSuccessNote}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                {language === 'ar' ? 'تقديم طلب آخر' : 'Nouvelle demande'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.narsa.fullNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: Yassine Berrada"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.narsa.phoneLabel} *
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.narsa.licenseCategoryLabel} *
                </label>
                <select
                  value={licenseCategory}
                  onChange={(e) => setLicenseCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="B">{t.narsa.catB}</option>
                  <option value="A">{t.narsa.catA}</option>
                  <option value="C">{t.narsa.catC}</option>
                  <option value="D">{t.narsa.catD}</option>
                  <option value="EB">{t.narsa.catEB}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.narsa.requestTypeLabel} *
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="theory_exam">{t.narsa.typeTheory}</option>
                  <option value="practical_exam">{t.narsa.typePractical}</option>
                  <option value="file_deposit">{t.narsa.typeFile}</option>
                  <option value="renewal">{t.narsa.typeRenewal}</option>
                  <option value="general_info">{t.narsa.typeInfo}</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.narsa.preferredDateLabel}
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full sm:w-72 p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'ar' ? 'ملاحظات إضافية :' : 'Remarques complémentaires :'}
              </label>
              <textarea
                rows={3}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder={language === 'ar' ? 'أي تفاصيل عن وضعيتك...' : 'Précisez votre situation...'}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Privacy Consent Checkbox (Law 09-08) */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="privacyConsent"
                required
                checked={privacyConsent}
                onChange={(e) => setPrivacyConsent(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 mt-1 focus:ring-emerald-500"
              />
              <label htmlFor="privacyConsent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                {t.narsa.privacyConsentLabel}
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] disabled:opacity-50 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>{isSubmitting ? t.common.loading : t.narsa.submitRequestBtn}</span>
                <DirectionArrow className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
