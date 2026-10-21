import { NextResponse } from 'next/server';
import { markLessonProgress, getUserProgress } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const user = getSessionUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });
  }
  const progress = getUserProgress(user.id);
  return NextResponse.json({ success: true, progress });
}

export async function POST(req: Request) {
  try {
    const user = getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Connexion requise pour enregistrer la progression' }, { status: 401 });
    }

    const { lessonId, completed, quizScore } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ success: false, error: 'ID de leçon manquant' }, { status: 400 });
    }

    const updated = markLessonProgress(user.id, lessonId, !!completed, quizScore);
    return NextResponse.json({ success: true, progress: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
