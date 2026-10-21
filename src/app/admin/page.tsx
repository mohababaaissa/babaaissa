'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import { BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import {
  Shield,
  Users,
  CalendarCheck,
  Award,
  BookOpen,
  Settings,
  HelpCircle,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  Trash2,
  Edit,
  Plus,
  Phone,
  MessageCircle,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import {
  User as UserType,
  Lesson,
  ExamQuestion,
  LessonBooking,
  NarsaAssistanceRequest,
  BusinessSettings,
} from '@/lib/types';

export default function AdminDashboardPage() {
  const { t, language, isRTL } = useLanguage();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'STUDENTS' | 'COURSES' | 'QUESTIONS' | 'BOOKINGS' | 'NARSA' | 'SETTINGS'
  >('OVERVIEW');

  // Live DB State
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<UserType[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [bookings, setBookings] = useState<LessonBooking[]>([]);
  const [narsaRequests, setNarsaRequests] = useState<NarsaAssistanceRequest[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Protect Admin route
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/connexion');
      return;
    }

    if (user && user.role === 'ADMIN') {
      loadAllAdminData();
    }
  }, [user, isLoading, router]);

  async function loadAllAdminData() {
    setLoading(true);
    try {
      const [statsRes, usersRes, coursesRes, qRes, bookRes, narsaRes, setRes] =
        await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/users'),
          fetch('/api/courses'),
          fetch('/api/exams/questions'),
          fetch('/api/bookings'),
          fetch('/api/narsa'),
          fetch('/api/admin/settings'),
        ]);

      const [statsD, usersD, coursesD, qD, bookD, narsaD, setD] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        coursesRes.json(),
        qRes.json(),
        bookRes.json(),
        narsaRes.json(),
        setRes.json(),
      ]);

      if (statsD.success) setStats(statsD.stats);
      if (usersD.success) setStudents(usersD.users);
      if (coursesD.success) setLessons(coursesD.lessons);
      if (qD.success) setQuestions(qD.questions);
      if (bookD.success) setBookings(bookD.bookings);
      if (narsaD.success) setNarsaRequests(narsaD.requests);
      if (setD.success) setSettings(setD.settings);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // Booking actions
  const handleBookingAction = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showFeedback(`Réservation mise à jour : ${status}`);
        loadAllAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // NARSA actions
  const handleNarsaAction = async (id: string, status: string, internalNotes?: string) => {
    try {
      const res = await fetch(`/api/narsa/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, internalNotes }),
      });
      if (res.ok) {
        showFeedback(`Demande NARSA mise à jour : ${status}`);
        loadAllAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showFeedback('Paramètres enregistrés avec succès !');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  if (isLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="py-24 text-center text-slate-500 font-medium">
        {t.common.loading}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Top Admin Header */}
      <div className="rounded-3xl bg-[#072445] text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Shield className="w-4 h-4" />
            <span>{t.admin.title}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.admin.schoolHeader}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {BUSINESS_INFO.address} • Tél: {BUSINESS_INFO.phoneFormatted}
          </p>
        </div>

        <button
          onClick={loadAllAdminData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{language === 'ar' ? 'تحديث البيانات' : 'Actualiser'}</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 font-bold shadow-sm animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold">{t.admin.kpiStudents}</span>
            <div className="text-2xl font-black text-[#072445]">{stats.totalStudents}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold">{t.admin.kpiPendingBookings}</span>
            <div className="text-2xl font-black text-amber-600">{stats.pendingBookings}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold">{t.admin.kpiUpcomingLessons}</span>
            <div className="text-2xl font-black text-emerald-600">{stats.confirmedLessons}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold">{t.admin.kpiNarsaRequests}</span>
            <div className="text-2xl font-black text-purple-600">{stats.pendingNarsaRequests}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold">{t.admin.kpiPublishedLessons}</span>
            <div className="text-2xl font-black text-blue-600">{stats.publishedLessons}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold">{t.admin.kpiTotalExams}</span>
            <div className="text-2xl font-black text-slate-700">{stats.totalExams}</div>
          </div>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'OVERVIEW', label: t.admin.tabOverview, icon: Shield },
          { id: 'BOOKINGS', label: t.admin.tabBookings, icon: CalendarCheck, badge: stats?.pendingBookings },
          { id: 'NARSA', label: t.admin.tabNarsa, icon: AlertCircle, badge: stats?.pendingNarsaRequests },
          { id: 'STUDENTS', label: t.admin.tabStudents, icon: Users },
          { id: 'COURSES', label: t.admin.tabCourses, icon: BookOpen },
          { id: 'QUESTIONS', label: t.admin.tabQuestions, icon: HelpCircle },
          { id: 'SETTINGS', label: t.admin.tabSettings, icon: Settings },
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
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ----------------- TAB: OVERVIEW ----------------- */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Bookings Queue */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
              <span>{t.admin.tabBookings} (Récents)</span>
              <button
                onClick={() => setActiveTab('BOOKINGS')}
                className="text-xs text-emerald-600 font-semibold hover:underline"
              >
                Voir tout
              </button>
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{b.studentName}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{b.reference} • {b.date} ({b.timeSlot})</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent NARSA Requests Queue */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
              <span>{t.admin.tabNarsa} (Récents)</span>
              <button
                onClick={() => setActiveTab('NARSA')}
                className="text-xs text-emerald-600 font-semibold hover:underline"
              >
                Voir tout
              </button>
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {narsaRequests.slice(0, 5).map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{req.fullName} ({req.phone})</span>
                    <span className="text-slate-500 text-[11px] font-mono">{req.reference} • Permis {req.licenseCategory}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ----------------- TAB: BOOKINGS MANAGEMENT ----------------- */}
      {activeTab === 'BOOKINGS' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.admin.tabBookings}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {bookings.length} {language === 'ar' ? 'حجوزات مسجلة' : 'réservations totales'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                  <th className="pb-3">Réf</th>
                  <th className="pb-3">Élève</th>
                  <th className="pb-3">Téléphone</th>
                  <th className="pb-3">Leçon</th>
                  <th className="pb-3">Date & Heure</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono font-bold text-emerald-800">{b.reference}</td>
                    <td className="py-3 font-semibold text-slate-900">{b.studentName}</td>
                    <td className="py-3">
                      <a href={`tel:${b.studentPhone}`} className="text-emerald-700 hover:underline">
                        {b.studentPhone}
                      </a>
                    </td>
                    <td className="py-3 text-slate-700">{b.lessonTypeTitleFr}</td>
                    <td className="py-3 text-slate-600">{b.date} • {b.timeSlot}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
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
                    <td className="py-3 text-right space-x-1">
                      {b.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleBookingAction(b.id, 'CONFIRMED')}
                            className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                          >
                            {t.admin.actionApprove}
                          </button>
                          <button
                            onClick={() => handleBookingAction(b.id, 'REJECTED')}
                            className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
                          >
                            {t.admin.actionReject}
                          </button>
                        </>
                      )}
                      {b.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleBookingAction(b.id, 'COMPLETED')}
                          className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold text-xs hover:bg-slate-900"
                        >
                          Terminer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- TAB: NARSA ASSISTANCE REQUESTS ----------------- */}
      {activeTab === 'NARSA' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.admin.tabNarsa}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {narsaRequests.length} {language === 'ar' ? 'طلبات مساعدة' : 'demandes'}
            </span>
          </div>

          <div className="space-y-4">
            {narsaRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs sm:text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-800">{req.reference}</span>
                    <span className="font-bold text-slate-900 text-base">{req.fullName}</span>
                    <span className="text-slate-500 font-medium">{req.phone}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700">
                  <div>
                    <span className="font-semibold block text-slate-500">Objet :</span>
                    <span>{req.requestType}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-500">Catégorie Permis :</span>
                    <span className="font-bold text-[#072445]">Permis {req.licenseCategory}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-500">Date souhaitée :</span>
                    <span>{req.preferredDate || 'Non spécifiée'}</span>
                  </div>
                </div>

                {req.additionalNotes && (
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-slate-600">
                    <span className="font-bold block text-slate-800">Remarques de l&apos;élève :</span>
                    {req.additionalNotes}
                  </div>
                )}

                {/* Status action buttons */}
                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/212${req.phone.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Élève</span>
                    </a>
                    <a
                      href={`tel:${req.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Appeler</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNarsaAction(req.id, 'IN_PROGRESS', 'Dossier pris en charge par l’école')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
                    >
                      En cours
                    </button>
                    <button
                      onClick={() => handleNarsaAction(req.id, 'CONFIRMED_BY_SCHOOL', 'Dossier complet et validé')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                    >
                      Validé école
                    </button>
                    <button
                      onClick={() => handleNarsaAction(req.id, 'COMPLETED', 'Examen passé avec succès')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-xs"
                    >
                      Terminé
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB: STUDENTS LIST ----------------- */}
      {activeTab === 'STUDENTS' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.admin.tabStudents}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {students.length} {language === 'ar' ? 'مترشحين مسجلين' : 'élèves inscrits'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                  <th className="pb-3">Nom</th>
                  <th className="pb-3">E-mail</th>
                  <th className="pb-3">Téléphone</th>
                  <th className="pb-3">Rôle</th>
                  <th className="pb-3">Permis</th>
                  <th className="pb-3">Date d&apos;inscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {students.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3 text-slate-600">{u.email}</td>
                    <td className="py-3 text-slate-600">{u.phone}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-slate-800">Permis {u.licenseCategory || 'B'}</td>
                    <td className="py-3 text-slate-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- TAB: COURSES & LESSONS ----------------- */}
      {activeTab === 'COURSES' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.admin.tabCourses}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {lessons.length} {language === 'ar' ? 'دروس' : 'leçons'}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {lessons.map((l) => (
              <div key={l.id} className="py-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {l.titleFr} / <span className="font-arabic font-normal text-slate-600">{l.titleAr}</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    Catégorie : {l.categoryId}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {l.isPublished ? 'Publiée' : 'Brouillon'}
                  </span>
                  <Link
                    href={`/code-de-la-route/${l.id}`}
                    target="_blank"
                    className="p-1.5 text-slate-500 hover:text-slate-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB: QUESTION BANK ----------------- */}
      {activeTab === 'QUESTIONS' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#072445]">
              {t.admin.tabQuestions}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {questions.length} {language === 'ar' ? 'سؤال بالمخزون' : 'questions enregistrées'}
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIndex) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#072445]">
                    {qIndex + 1}. {q.questionFr}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase">
                    {q.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {q.optionsFr.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2 rounded border ${optIdx === q.correctIndex ? 'bg-emerald-100 border-emerald-300 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}`}
                    >
                      {opt} {optIdx === q.correctIndex && '✓'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB: BUSINESS SETTINGS ----------------- */}
      {activeTab === 'SETTINGS' && settings && (
        <form onSubmit={handleSaveSettings} className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#072445]">
            {t.admin.tabSettings}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Nom de l&apos;établissement (FR)</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Nom en Arabe</label>
              <input
                type="text"
                value={settings.nameAr}
                onChange={(e) => setSettings({ ...settings, nameAr: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-arabic focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Adresse officielle (FR)</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Téléphone de l&apos;école</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Seuil de réussite examen blanc</label>
              <input
                type="number"
                value={settings.examPassingScore}
                onChange={(e) => setSettings({ ...settings, examPassingScore: parseInt(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Nombre de questions examen</label>
              <input
                type="number"
                value={settings.totalExamQuestions}
                onChange={(e) => setSettings({ ...settings, totalExamQuestions: parseInt(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Limite de temps (minutes)</label>
              <input
                type="number"
                value={settings.examTimeLimitMinutes}
                onChange={(e) => setSettings({ ...settings, examTimeLimitMinutes: parseInt(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{t.admin.actionSave}</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
