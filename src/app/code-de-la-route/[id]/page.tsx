'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import RoadSignIcon from '@/components/RoadSignIcon';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { Lesson } from '@/lib/types';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const lessonId = params.id as string;
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    async function loadLesson() {
      try {
        const [lessonRes, coursesRes] = await Promise.all([
          fetch(`/api/courses/${lessonId}`),
          fetch('/api/courses'),
        ]);

        const lessonData = await lessonRes.json();
        const coursesData = await coursesRes.json();

        if (lessonData.success) {
          setLesson(lessonData.lesson);
        }
        if (coursesData.success) {
          setAllLessons(coursesData.lessons || []);
          if (coursesData.progress) {
            const hasCompleted = coursesData.progress.some(
              (p: any) => p.lessonId === lessonId && p.completed
            );
            setIsCompleted(hasCompleted);
          }
        }
      } catch (err) {
        console.error('Error loading lesson:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLesson();
  }, [lessonId]);

  const toggleCompletion = async () => {
    if (!user) {
      router.push('/connexion');
      return;
    }
    try {
      const nextState = !isCompleted;
      const res = await fetch('/api/courses/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: nextState }),
      });
      if (res.ok) {
        setIsCompleted(nextState);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500 font-medium">
        {t.common.loading}
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Leçon introuvable</h2>
        <Link href="/code-de-la-route" className="text-emerald-600 font-bold hover:underline">
          {t.courses.backToList}
        </Link>
      </div>
    );
  }

  // Find previous and next lessons
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const title = language === 'ar' ? lesson.titleAr : lesson.titleFr;
  const content = language === 'ar' ? lesson.contentAr : lesson.contentFr;
  const keyPoints = language === 'ar' ? lesson.keyPointsAr : lesson.keyPointsFr;
  const diagramLabel = language === 'ar' ? lesson.diagramLabelAr : lesson.diagramLabelFr;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/code-de-la-route"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#072445]"
        >
          {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <span>{t.courses.backToList}</span>
        </Link>

        {user && (
          <button
            onClick={toggleCompletion}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? t.courses.markAsIncomplete : t.courses.markAsCompleted}</span>
          </button>
        )}
      </div>

      {/* Lesson Header Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            {lesson.categoryId.replace('-', ' ')}
          </span>
          <span className="text-xs text-slate-400 font-medium">Auto-école Babaaissa • Bouarfa</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#072445]">
          {title}
        </h1>

        {/* Visual Diagram If Present */}
        {lesson.diagramType && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-3">
            <RoadSignIcon type={lesson.diagramType} className="w-32 h-32" label={diagramLabel} />
          </div>
        )}

        {/* Educational Text Content */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base border-t border-slate-100 pt-6">
          {content}
        </div>
      </div>

      {/* Important Points to Remember Checklist */}
      {keyPoints && keyPoints.length > 0 && (
        <div className="rounded-2xl bg-emerald-950 text-white p-7 shadow-lg space-y-4 border border-emerald-800">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base sm:text-lg">
            <ShieldCheck className="w-6 h-6" />
            <span>{t.courses.keyPointsTitle}</span>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
            {keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* End-of-Lesson Interactive Mini-Quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
            <HelpCircle className="w-5 h-5" />
            <span>{t.courses.quizTitle}</span>
          </div>

          <div className="space-y-8">
            {lesson.quiz.map((q, qIndex) => {
              const qText = language === 'ar' ? q.questionAr : q.questionFr;
              const options = language === 'ar' ? q.optionsAr : q.optionsFr;
              const explanation = language === 'ar' ? q.explanationAr : q.explanationFr;
              const selectedIdx = selectedQuizAnswers[q.id];
              const isChecked = submittedQuiz[q.id];
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div key={q.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {qIndex + 1}. {qText}
                  </h3>

                  <div className="space-y-2">
                    {options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (selectedIdx === optIdx) {
                        btnStyle = 'bg-slate-900 text-white border-slate-900 font-semibold';
                      }
                      if (isChecked) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                        } else if (selectedIdx === optIdx) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isChecked}
                          onClick={() =>
                            setSelectedQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle} ${isRTL ? 'text-right' : ''}`}
                        >
                          <span>{opt}</span>
                          {isChecked && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isChecked ? (
                    <button
                      type="button"
                      disabled={selectedIdx === undefined}
                      onClick={() =>
                        setSubmittedQuiz((prev) => ({ ...prev, [q.id]: true }))
                      }
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition"
                    >
                      {t.courses.quizSubmit}
                    </button>
                  ) : (
                    <div
                      className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border border-rose-200 text-rose-900'
                      }`}
                    >
                      <span className="font-bold block mb-1">
                        {isCorrect ? t.courses.quizCorrect : t.courses.quizIncorrect}
                      </span>
                      <span>{explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Prev / Next Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        {prevLesson ? (
          <Link
            href={`/code-de-la-route/${prevLesson.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.courses.prevLesson}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/code-de-la-route/${nextLesson.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white text-xs sm:text-sm font-semibold shadow-sm"
          >
            <span>{t.courses.nextLesson}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        ) : (
          <Link
            href="/examens-blancs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md"
          >
            <span>{t.hero.ctaExam}</span>
            <DirectionArrow className="w-4 h-4" />
          </Link>
        )}
      </div>

    </div>
  );
}
