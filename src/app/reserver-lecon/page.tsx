'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  CalendarCheck,
  Clock,
  Car,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { LessonType } from '@/lib/types';

const STANDARD_TIME_SLOTS = [
  '08:30 - 09:30',
  '09:30 - 10:30',
  '10:30 - 11:30',
  '11:30 - 12:30',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
];

function BookingContent() {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(1);
  const [lessonTypes, setLessonTypes] = useState<LessonType[]>([]);

  // Form State
  const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') || 'beginner');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Student contact info
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('0626783160');
  const [studentEmail, setStudentEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);

  // Autofill user if logged in
  useEffect(() => {
    if (user) {
      if (!studentName) setStudentName(user.name);
      if (user.phone) setStudentPhone(user.phone);
      if (user.email) setStudentEmail(user.email);
    }
  }, [user]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  // Fetch booked slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;
    async function checkAvailability() {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/bookings/availability?date=${selectedDate}`);
        const data = await res.json();
        if (data.success) {
          setBookedSlots(data.bookedSlots || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSlots(false);
      }
    }
    checkAvailability();
  }, [selectedDate]);

  // Submit Booking
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentPhone,
          studentEmail,
          lessonTypeId: selectedType,
          date: selectedDate,
          timeSlot: selectedSlot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingConfirmation(data.booking);
        setStep(4); // Success step
      } else {
        setErrorMsg(data.error || 'Erreur lors de la réservation.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 45); // up to 45 days in advance
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <CalendarCheck className="w-4 h-4" />
          <span>Réservation en ligne • Bouarfa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.booking.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.booking.pageSubtitle}
        </p>
      </div>

      {/* Booking Form Wizard Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* Wizard Steps indicator */}
        <div className="grid grid-cols-4 gap-2 border-b border-slate-200 pb-6 text-xs sm:text-sm font-bold">
          <div className={`text-center pb-2 border-b-2 transition ${step >= 1 ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>
            {t.booking.step1}
          </div>
          <div className={`text-center pb-2 border-b-2 transition ${step >= 2 ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>
            {t.booking.step2}
          </div>
          <div className={`text-center pb-2 border-b-2 transition ${step >= 3 ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>
            {t.booking.step3}
          </div>
          <div className={`text-center pb-2 border-b-2 transition ${step === 4 ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>
            {t.booking.step4}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: LESSON TYPE */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.booking.selectTypeLabel}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'beginner', title: t.lessonsPage.beginnerTitle, desc: t.lessonsPage.beginnerDesc },
                { id: 'city', title: t.lessonsPage.cityTitle, desc: t.lessonsPage.cityDesc },
                { id: 'parking', title: t.lessonsPage.parkingTitle, desc: t.lessonsPage.parkingDesc },
                { id: 'practice', title: t.lessonsPage.practiceTitle, desc: t.lessonsPage.practiceDesc },
                { id: 'exam-prep', title: t.lessonsPage.examPrepTitle, desc: t.lessonsPage.examPrepDesc },
              ].map((lt) => {
                const isSelected = selectedType === lt.id;
                return (
                  <button
                    key={lt.id}
                    type="button"
                    onClick={() => setSelectedType(lt.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    } ${isRTL ? 'text-right' : ''}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-slate-900 text-base">{lt.title}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{lt.desc}</p>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded inline-block w-fit">
                      Durée : 60 minutes
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white font-bold text-sm shadow transition"
              >
                {language === 'ar' ? 'متابعة إلى اختيار الموعد' : 'Continuer vers le calendrier'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME SLOT */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#072445]">
              {language === 'ar' ? 'اختر اليوم والتوقيت المناسب في بوعرفة' : 'Choisissez le jour et le créneau horaire à Bouarfa'}
            </h2>

            {/* Date Picker Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                {t.booking.selectDateLabel}
              </label>
              <input
                type="date"
                min={getMinDate()}
                max={getMaxDate()}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot('');
                }}
                className="w-full sm:w-72 p-3 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">
                {t.booking.availableSlotsLabel}
              </label>

              {loadingSlots ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  {t.common.loading}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {STANDARD_TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3.5 rounded-xl border text-center text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                          isBooked
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        <span>{slot}</span>
                        <span className="text-[10px] font-normal opacity-80">
                          {isBooked ? (language === 'ar' ? 'محجوز' : 'Réservé') : (language === 'ar' ? 'متاح' : 'Disponible')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                {t.common.back}
              </button>

              <button
                type="button"
                disabled={!selectedDate || !selectedSlot}
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow transition"
              >
                {language === 'ar' ? 'متابعة إلى معلومات الاتصال' : 'Continuer vers vos coordonnées'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STUDENT CONTACT INFO */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-6">
            <h2 className="text-lg font-bold text-[#072445]">
              {language === 'ar' ? 'بيانات المترشح للتأكيد' : 'Vos coordonnées de réservation'}
            </h2>

            {/* Summary preview badge */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 block">{language === 'ar' ? 'الحصة المختارة' : 'Leçon choisie'} :</span>
                <span className="font-bold text-[#072445]">{selectedType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'ar' ? 'الموعد' : 'Date & Heure'} :</span>
                <span className="font-bold text-[#072445]">{selectedDate} à {selectedSlot}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lieu :</span>
                <span className="font-bold text-emerald-700">{BUSINESS_INFO.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.booking.nameLabel} *
                </label>
                <div className="relative">
                  <User className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="ex: Ahmed Mansouri"
                    className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.booking.phoneLabel} *
                </label>
                <div className="relative">
                  <Phone className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="0626783160"
                    className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                  />
                </div>
                <span className="text-[11px] text-slate-500">{t.booking.phoneHelp}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {t.booking.emailLabel}
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className={`w-full py-2.5 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                {t.common.back}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
              >
                {isSubmitting ? t.booking.submitting : t.booking.submitBtn}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && bookingConfirmation && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#072445]">
                {t.booking.successTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                {t.booking.statusNotice}
              </p>
            </div>

            {/* Reference Badge Card */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs text-slate-500">{t.booking.referenceLabel}</span>
                <span className="font-mono font-black text-emerald-700 text-base">
                  {bookingConfirmation.reference}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{language === 'ar' ? 'نوع الحصة :' : 'Type de leçon :'}</span>
                <span className="font-semibold text-slate-800">{bookingConfirmation.lessonTypeTitleFr}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{language === 'ar' ? 'الموعد :' : 'Date & Heure :'}</span>
                <span className="font-semibold text-slate-800">{bookingConfirmation.date} • {bookingConfirmation.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{language === 'ar' ? 'الحالة :' : 'Statut :'}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                  {t.dashboard.statusPending}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setBookingConfirmation(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs"
              >
                {language === 'ar' ? 'حجز حصة أخرى' : 'Réserver une autre leçon'}
              </button>

              <a
                href={getWhatsAppLink(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? 'تأكيد عبر واتساب' : 'Confirmer sur WhatsApp'}</span>
              </a>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-slate-500 font-medium">Chargement du système de réservation...</div>}>
      <BookingContent />
    </Suspense>
  );
}
