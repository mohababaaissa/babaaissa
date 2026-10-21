'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import RoadSignIcon from '@/components/RoadSignIcon';
import {
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Filter,
  Sparkles,
} from 'lucide-react';
import { CourseCategory, Lesson, LessonProgress } from '@/lib/types';

export default function CoursesCatalogPage() {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();

  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress, setUserProgress] = useState<LessonProgress[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories || []);
          setLessons(data.lessons || []);
          setUserProgress(data.progress || []);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const completedLessonIds = new Set(
    userProgress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory =
      selectedCategory === 'all' || lesson.categoryId === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lesson.titleFr.toLowerCase().includes(q) ||
      lesson.titleAr.includes(q) ||
      lesson.descriptionFr.toLowerCase().includes(q) ||
      lesson.descriptionAr.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 relative overflow-hidden shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Plateforme d&apos;apprentissage du Code — Bouarfa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.courses.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.courses.pageSubtitle}
        </p>

        {user && (
          <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm">
            <span className="text-emerald-400 font-bold">
              {completedLessonIds.size} / {lessons.length} {language === 'ar' ? 'دروس مكتملة' : 'leçons terminées'}
            </span>
            <div className="w-36 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{
                  width: `${lessons.length > 0 ? (completedLessonIds.size / lessons.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className={`w-5 h-5 text-slate-400 absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.courses.searchPlaceholder}
            className={`w-full py-2.5 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm`}
          />
        </div>

        {/* Category count indicator */}
        <div className="text-xs text-slate-500 font-medium">
          <span>{filteredLessons.length} {t.courses.lessonCount}</span>
        </div>

      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
            selectedCategory === 'all'
              ? 'bg-[#072445] text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {t.courses.filterAll}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
              selectedCategory === cat.id
                ? 'bg-[#072445] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {language === 'ar' ? cat.titleAr : cat.titleFr}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-medium">
          {t.common.loading}
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-slate-600 font-medium">
            {language === 'ar' ? 'لم يتم العثور على دروس مطابقة لبحثك.' : 'Aucune leçon ne correspond à votre recherche.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessonIds.has(lesson.id);
            const title = language === 'ar' ? lesson.titleAr : lesson.titleFr;
            const description = language === 'ar' ? lesson.descriptionAr : lesson.descriptionFr;

            return (
              <div
                key={lesson.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Top status & badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {lesson.categoryId.replace('-', ' ')}
                    </span>

                    {user && (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isCompleted ? t.courses.completedBadge : t.courses.notCompletedBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Visual Diagram Preview */}
                  {lesson.diagramType && (
                    <div className="py-2 flex justify-center">
                      <RoadSignIcon type={lesson.diagramType} className="w-20 h-20" />
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-[#072445] group-hover:text-emerald-700 transition">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {description}
                  </p>

                </div>

                <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {lesson.quiz && lesson.quiz.length > 0
                      ? `${lesson.quiz.length} ${language === 'ar' ? 'سؤال اختبار' : 'question(s) quiz'}`
                      : `${language === 'ar' ? 'درس نظري' : 'Cours théorique'}`}
                  </span>

                  <Link
                    href={`/code-de-la-route/${lesson.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 hover:underline"
                  >
                    <span>{language === 'ar' ? 'بدء الدرس' : 'Étudier la leçon'}</span>
                    <DirectionArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Login notification for progress save */}
      {!user && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm text-amber-900 font-medium">
              {t.courses.loginPromptProgress}
            </p>
          </div>
          <Link
            href="/connexion"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition whitespace-nowrap"
          >
            {t.nav.login}
          </Link>
        </div>
      )}

    </div>
  );
}
