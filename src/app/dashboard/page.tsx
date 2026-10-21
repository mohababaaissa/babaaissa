'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import {
  User,
  BookOpen,
  Award,
  CalendarCheck,
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  LogOut,
  Calendar,
  Phone,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { LessonBooking, ExamAttempt, NarsaAssistanceRequest, LessonProgress } from '@/lib/types';

export default function StudentDashboardPage() {
  const { t, language, isRTL } = useLanguage();
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'COURSES' | 'EXAMS' | 'BOOKINGS' | 'NARSA'>('OVERVIEW');
  const [bookings, setBookings] = useState<LessonBooking[]>([]);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [narsaRequests, setNarsaRequests] = useState<NarsaAssistanceRequest[]>([]);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/connexion');
      return;
    }

    if (user) {
      loadStudentData();
    }
  }, [user, isLoading, router]);

  async function loadStudentData() {
    setLoadingData(true);
    try {
      const [bookRes, examRes, narsaRes, progRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/exams/history'),
        fetch('/api/narsa'),
        fetch('/api/courses/progress'),
      ]);

      const [bookData, examData, narsaData, progData] = await Promise.all([
        bookRes.json(),
        examRes.json(),
        narsaRes.json(),
        progRes.json(),
      ]);

      if (bookData.success) setBookings(bookData.bookings || []);
      if (examData.success) setExamAttempts(examData.attempts || []);
      if (narsaData.success) setNarsaRequests(narsaData.requests || []);
      if (progData.success) setProgress(progData.progress || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  }

  const cancelBooking = async (id: string) => {
    if (!confirm('Confirmez-vous la demande d’annulation de cette leçon ?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' }),
      });
      if (res.ok) {
        loadStudentData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="py-24 text-center text-slate-500 font-medium">
        {t.common.loading}
      </div>
    );
  }

  // Calculate stats
  const completedLessonsCount = progress.filter((p) => p.completed).length;
  const examsCount = examAttempts.length;
  const avgExamScore =
    examsCount > 0
      ? Math.round(
          (examAttempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 40, 0) /
            examsCount) *
            10
        ) / 10
      : 0;

  const nextBooking = bookings.find((b) => b.status === 'CONFIRMED' || b.status === 'PENDING');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Top Welcome Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <User className="w-4 h-4" />
            <span>{t.dashboard.studentBadge} • Bouarfa</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.dashboard.welcome}, {user.name} !
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {user.email} • {user.phone} • Permis {user.licenseCategory || 'B'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/reserver-lecon"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow transition"
          >
            {t.nav.booking}
          </Link>
          <button
            onClick={() => logout()}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            title={t.nav.logout}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">{t.dashboard.statLessons}</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#072445]">
            {completedLessonsCount}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">{t.dashboard.statExams}</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#072445]">
            {examsCount}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">{t.dashboard.statAvgScore}</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {avgExamScore} / 40
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">{t.dashboard.statNextBooking}</span>
          <div className="text-sm font-bold text-slate-800 truncate">
            {nextBooking ? `${nextBooking.date} (${nextBooking.timeSlot})` : t.dashboard.noBookingPlanned}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'OVERVIEW', label: language === 'ar' ? 'نظرة عامة' : 'Aperçu', icon: User },
          { id: 'BOOKINGS', label: t.dashboard.tabBookings, icon: CalendarCheck, count: bookings.length },
          { id: 'EXAMS', label: t.dashboard.tabExams, icon: Award, count: examAttempts.length },
          { id: 'NARSA', label: t.dashboard.tabNarsa, icon: ShieldCheck, count: narsaRequests.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-[#072445] text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: BOOKINGS */}
      {(activeTab === 'OVERVIEW' || activeTab === 'BOOKINGS') && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.dashboard.tabBookings}
            </h2>
            <Link
              href="/reserver-lecon"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              + {t.booking.pageTitle}
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs sm:text-sm">
              {t.dashboard.noBookingPlanned}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                    <th className="pb-3">{t.dashboard.bookingRef}</th>
                    <th className="pb-3">{t.dashboard.bookingType}</th>
                    <th className="pb-3">{t.dashboard.bookingDate}</th>
                    <th className="pb-3">{t.dashboard.bookingStatus}</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-3.5 font-mono font-bold text-emerald-800">{b.reference}</td>
                      <td className="py-3.5 text-slate-900">{b.lessonTypeTitleFr}</td>
                      <td className="py-3.5 text-slate-600">{b.date} • {b.timeSlot}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {b.status === 'PENDING' && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="text-rose-600 hover:text-rose-700 text-xs font-semibold"
                          >
                            {t.dashboard.cancelBookingBtn}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: EXAMS */}
      {(activeTab === 'OVERVIEW' || activeTab === 'EXAMS') && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.dashboard.tabExams}
            </h2>
            <Link
              href="/examens-blancs"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              + {t.hero.ctaExam}
            </Link>
          </div>

          {examAttempts.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs sm:text-sm">
              {t.exam.noHistory}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {examAttempts.map((att) => (
                <div key={att.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {new Date(att.completedAt).toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {att.categoryFilter === 'all' ? t.exam.allCategories : att.categoryFilter}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-base">
                      {att.score} / {att.totalQuestions}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        att.passed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {att.passed ? (language === 'ar' ? 'ناجح' : 'Admis') : (language === 'ar' ? 'غير كافٍ' : 'Ajourné')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: NARSA REQUESTS */}
      {(activeTab === 'OVERVIEW' || activeTab === 'NARSA') && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.dashboard.tabNarsa}
            </h2>
            <Link
              href="/espace-narsa"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              + {language === 'ar' ? 'طلب مساعدة جديد' : 'Nouvelle demande'}
            </Link>
          </div>

          {narsaRequests.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs sm:text-sm">
              {language === 'ar' ? 'لم تقدم أي طلب مساعدة لنارسا بعد.' : 'Aucune demande d’assistance NARSA enregistrée.'}
            </div>
          ) : (
            <div className="space-y-4">
              {narsaRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-800">{req.reference}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      {req.status}
                    </span>
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold">Objet :</span> {req.requestType} • Permis {req.licenseCategory}
                  </div>
                  {req.internalNotes && (
                    <div className="text-xs text-slate-500 italic border-t border-slate-200 pt-2">
                      <span className="font-semibold text-slate-700 not-italic">Note de l&apos;école :</span> {req.internalNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
