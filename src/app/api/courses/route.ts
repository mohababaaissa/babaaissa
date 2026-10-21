import { NextResponse } from 'next/server';
import { getCategories, getLessons, saveLesson, getUserProgress, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category') || undefined;
    const user = getSessionUser();

    const categories = getCategories();
    const lessons = getLessons(categoryId);
    const progress = user ? getUserProgress(user.id) : [];

    return NextResponse.json({
      success: true,
      categories,
      lessons,
      progress,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 403 });
    }

    const body = await req.json();
    if (!body.titleFr || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: 'Le titre et la catégorie sont obligatoires.' },
        { status: 400 }
      );
    }

    const saved = saveLesson(body);
    addAuditLog(user.id, user.name, 'LESSON_UPSERT', `Leçon: ${saved.titleFr}`);

    return NextResponse.json({ success: true, lesson: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
