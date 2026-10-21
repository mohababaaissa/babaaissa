'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import RoadSignIcon from '@/components/RoadSignIcon';
import {
  Award,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';
import { CourseCategory, ExamQuestion, ExamAttempt } from '@/lib/types';

export default function ExamSimulatorPage() {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();

  // State: 'CONFIG' | 'TEST' | 'RESULT'
  const [examState, setExamState] = useState<'CONFIG' | 'TEST' | 'RESULT'>('CONFIG');

  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTimedMode, setIsTimedMode] = useState<boolean>(true);

  // Active Test State
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Result State
  const [resultData, setResultData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  // Load categories and history
  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, histRes] = await Promise.all([
          fetch('/api/courses'),
          user ? fetch('/api/exams/history') : Promise.resolve(null),
        ]);
        const catData = await catRes.json();
        if (catData.success) {
          setCategories(catData.categories || []);
        }
        if (histRes) {
          const histData = await histRes.json();
          if (histData?.success) {
            setExamHistory(histData.attempts || []);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [user]);

  // Timer countdown
  useEffect(() => {
    if (examState === 'TEST' && isTimedMode) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [examState, isTimedMode]);

  // Start exam
  const handleStartExam = async () => {
    try {
      const url = `/api/exams/questions?category=${selectedCategory}&count=40`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.questions?.length > 0) {
        setQuestions(data.questions);
        setSelectedAnswers({});
        setCurrentQIndex(0);
        setSecondsRemaining(30 * 60);
        setTimeSpentSeconds(0);
        setExamState('TEST');
      } else {
        alert(language === 'ar' ? 'لا توجد أسئلة كافية لهذا المحور حالياً.' : 'Aucune question disponible pour ce thème.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit and calculate result
  const handleFinishExam = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitting(true);

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q.id,
        selectedOption: selectedAnswers[q.id] ?? -1,
      }));

      const res = await fetch('/api/exams/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryFilter: selectedCategory,
          answers: formattedAnswers,
          timeSpentSeconds,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResultData(data);
        setExamState('RESULT');

        if (data.passed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

        // Refresh user history
        if (user) {
          const histRes = await fetch('/api/exams/history');
          const histData = await histRes.json();
          if (histData.success) {
            setExamHistory(histData.attempts || []);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time
  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#072445] via-[#0c3d6e] to-[#072445] text-white p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Award className="w-4 h-4" />
          <span>Auto-école Babaaissa • Bouarfa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t.exam.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {t.exam.pageSubtitle}
        </p>

        {/* Legal Disclaimer Box */}
        <div className="pt-2">
          <div className="rounded-xl bg-slate-900/80 p-3.5 border border-slate-700 text-xs text-slate-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{t.exam.disclaimerNotice}</span>
          </div>
        </div>
      </div>

      {/* ----------------- STATE 1: CONFIGURATION ----------------- */}
      {examState === 'CONFIG' && (
        <div className="space-y-8">
          
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#072445]">
              {t.exam.startTitle}
            </h2>

            {/* Select Theme */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                {t.exam.selectCategory} :
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">{t.exam.allCategories}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'ar' ? c.titleAr : c.titleFr}
                  </option>
                ))}
              </select>
            </div>

            {/* Timer toggle */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-slate-700">
                {language === 'ar' ? 'نوع التوقيت :' : 'Mode de temps :'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsTimedMode(true)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition ${
                    isTimedMode
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  } ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm">{t.exam.timerModeLabel}</span>
                  </div>
                  {isTimedMode && <Check className="w-5 h-5 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsTimedMode(false)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition ${
                    !isTimedMode
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  } ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm">{t.exam.untimedModeLabel}</span>
                  </div>
                  {!isTimedMode && <Check className="w-5 h-5 text-emerald-600" />}
                </button>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                <span>{t.exam.startBtn}</span>
                <DirectionArrow className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Exam History Section */}
          {examHistory.length > 0 && (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#072445]">
                {t.exam.historyTitle}
              </h3>
              <div className="divide-y divide-slate-100">
                {examHistory.slice(0, 5).map((att) => (
                  <div key={att.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        {new Date(att.completedAt).toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {att.categoryFilter === 'all'
                          ? t.exam.allCategories
                          : att.categoryFilter}
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
                        {att.passed
                          ? language === 'ar' ? 'ناجح' : 'Admis'
                          : language === 'ar' ? 'غير كافٍ' : 'Ajourné'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ----------------- STATE 2: ACTIVE TEST SIMULATION ----------------- */}
      {examState === 'TEST' && questions.length > 0 && (
        <div className="space-y-6">
          
          {/* Top Test Progress & Countdown bar */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.exam.questionNumber} {currentQIndex + 1} {t.exam.of} {questions.length}
              </span>
              <div className="w-32 sm:w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {isTimedMode && (
              <div
                className={`flex items-center gap-2 font-mono font-bold text-sm px-3.5 py-1.5 rounded-xl border ${
                  secondsRemaining < 300
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{t.exam.timeLeft} {formatTimer(secondsRemaining)}</span>
              </div>
            )}
          </div>

          {/* Current Question Display Card */}
          {(() => {
            const currentQ = questions[currentQIndex];
            const qText = language === 'ar' ? currentQ.questionAr : currentQ.questionFr;
            const options = language === 'ar' ? currentQ.optionsAr : currentQ.optionsFr;
            const currentSelected = selectedAnswers[currentQ.id];

            return (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Visual Diagram If Available */}
                {currentQ.diagramType && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex justify-center">
                    <RoadSignIcon type={currentQ.diagramType} className="w-28 h-28" />
                  </div>
                )}

                <h2 className="text-lg sm:text-2xl font-extrabold text-[#072445] leading-relaxed">
                  {currentQIndex + 1}. {qText}
                </h2>

                {/* Multiple choice options */}
                <div className="space-y-3">
                  {options.map((opt, optIndex) => {
                    const isSelected = currentSelected === optIndex;
                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [currentQ.id]: optIndex,
                          }))
                        }
                        className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center justify-between text-sm sm:text-base ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/60 text-[#072445] font-bold shadow-sm'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                        } ${isRTL ? 'text-right' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Test Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 disabled:opacity-40 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    <span>{t.exam.prevQuestion}</span>
                  </button>

                  {currentQIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))
                      }
                      className="px-5 py-2.5 rounded-xl bg-[#072445] hover:bg-[#0c3d6e] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow"
                    >
                      <span>{t.exam.nextQuestion}</span>
                      {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleFinishExam}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg"
                    >
                      {isSubmitting ? t.common.loading : t.exam.finishExam}
                    </button>
                  )}
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* ----------------- STATE 3: RESULTS & PEDAGOGICAL REVIEW ----------------- */}
      {examState === 'RESULT' && resultData && (
        <div className="space-y-10">
          
          {/* Result Score Card */}
          <div
            className={`rounded-3xl p-8 sm:p-12 text-center text-white space-y-5 shadow-xl ${
              resultData.passed
                ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-[#072445]'
                : 'bg-gradient-to-br from-[#072445] via-[#0c3d6e] to-slate-900'
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center border border-white/20">
              {resultData.passed ? (
                <CheckCircle className="w-10 h-10 text-emerald-300" />
              ) : (
                <RotateCcw className="w-10 h-10 text-amber-300" />
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold">
              {t.exam.resultTitle}
            </h2>

            <div className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              {resultData.score}{' '}
              <span className="text-2xl sm:text-3xl font-medium text-slate-300">
                / {resultData.totalQuestions}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200">
              {t.exam.passingThreshold}
            </p>

            <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              {resultData.passed ? t.exam.passedMessage : t.exam.failedMessage}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setExamState('CONFIG')}
                className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm shadow hover:bg-slate-100 transition"
              >
                {t.exam.restartExam}
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-8">
            <h3 className="text-xl font-bold text-[#072445]">
              {t.exam.reviewTitle}
            </h3>

            <div className="space-y-6">
              {resultData.reviewDetails.map((item: any, idx: number) => {
                const qText = language === 'ar' ? item.questionAr : item.questionFr;
                const options = language === 'ar' ? item.optionsAr : item.optionsFr;
                const explanation = language === 'ar' ? item.explanationAr : item.explanationFr;

                return (
                  <div
                    key={item.questionId}
                    className={`p-6 rounded-2xl border-2 space-y-4 ${
                      item.isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Question {idx + 1}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                          item.isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{item.isCorrect ? (language === 'ar' ? 'صحيح' : 'Correct') : (language === 'ar' ? 'خطأ' : 'Incorrect')}</span>
                      </span>
                    </div>

                    {item.diagramType && (
                      <div className="py-2 flex justify-center">
                        <RoadSignIcon type={item.diagramType} className="w-20 h-20" />
                      </div>
                    )}

                    <h4 className="font-bold text-slate-900 text-base">
                      {qText}
                    </h4>

                    {/* Options list with highlight */}
                    <div className="space-y-2">
                      {options.map((opt: string, optIdx: number) => {
                        const isCorrectOption = optIdx === item.correctOption;
                        const isChosenOption = optIdx === item.selectedOption;

                        let style = 'bg-white border-slate-200 text-slate-600';
                        if (isCorrectOption) {
                          style = 'bg-emerald-600 text-white font-bold border-emerald-600';
                        } else if (isChosenOption && !item.isCorrect) {
                          style = 'bg-rose-600 text-white font-bold border-rose-600';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {isCorrectOption && (
                              <span className="text-xs uppercase tracking-wider font-bold">
                                {language === 'ar' ? 'الإجابة الصحيحة' : 'Bonne réponse'}
                              </span>
                            )}
                            {isChosenOption && !isCorrectOption && (
                              <span className="text-xs uppercase tracking-wider font-bold">
                                {language === 'ar' ? 'إجابتك' : 'Votre réponse'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation */}
                    {explanation && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-700">
                        <span className="font-bold text-[#072445] block mb-1">
                          {t.exam.explanation}
                        </span>
                        <span>{explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
