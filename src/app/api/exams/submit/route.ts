import { NextResponse } from 'next/server';
import { getDb, recordExamAttempt } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = getSessionUser();
    const { answers, categoryFilter, timeSpentSeconds } = await req.json();

    if (!Array.isArray(answers)) {
      return NextResponse.json({ success: false, error: 'Format de réponses invalide' }, { status: 400 });
    }

    const db = getDb();
    const questionsMap = new Map(db.examQuestions.map((q) => [q.id, q]));

    let correctCount = 0;
    const reviewDetails = answers.map((ans: { questionId: string; selectedOption: number }) => {
      const q = questionsMap.get(ans.questionId);
      const isCorrect = q ? q.correctIndex === ans.selectedOption : false;
      if (isCorrect) correctCount++;

      return {
        questionId: ans.questionId,
        questionFr: q?.questionFr || '',
        questionAr: q?.questionAr || '',
        optionsFr: q?.optionsFr || [],
        optionsAr: q?.optionsAr || [],
        selectedOption: ans.selectedOption,
        correctOption: q?.correctIndex ?? -1,
        isCorrect,
        explanationFr: q?.explanationFr || '',
        explanationAr: q?.explanationAr || '',
        diagramType: q?.diagramType,
      };
    });

    const totalQuestions = answers.length;
    const settings = db.settings;
    // Pass threshold calculation: proportional to standard passing score (e.g. 32/40 = 80%)
    const passThresholdRatio = settings.examPassingScore / settings.totalExamQuestions;
    const minPassScore = Math.ceil(totalQuestions * passThresholdRatio);
    const passed = correctCount >= minPassScore;

    // Record attempt if student is authenticated
    let attemptRecord = null;
    if (user) {
      attemptRecord = recordExamAttempt({
        userId: user.id,
        userName: user.name,
        categoryFilter: categoryFilter || 'all',
        score: correctCount,
        totalQuestions,
        passed,
        timeSpentSeconds: timeSpentSeconds || 0,
        answers: reviewDetails.map((r) => ({
          questionId: r.questionId,
          selectedOption: r.selectedOption,
          correctOption: r.correctOption,
          isCorrect: r.isCorrect,
        })),
      });
    }

    return NextResponse.json({
      success: true,
      score: correctCount,
      totalQuestions,
      minPassScore,
      passed,
      reviewDetails,
      attemptId: attemptRecord?.id,
    });
  } catch (err: any) {
    console.error('Submit exam error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
