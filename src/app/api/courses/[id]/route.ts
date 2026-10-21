import { NextResponse } from 'next/server';
import { getLessonById, deleteLesson, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const lesson = getLessonById(params.id);
    if (!lesson) {
      return NextResponse.json({ success: false, error: 'Leçon introuvable' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lesson });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 403 });
    }

    const deleted = deleteLesson(params.id);
    if (deleted) {
      addAuditLog(user.id, user.name, 'LESSON_DELETE', `ID de leçon supprimée: ${params.id}`);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Leçon non trouvée' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
