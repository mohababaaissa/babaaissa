import { NextResponse } from 'next/server';
import { getExamQuestions, saveExamQuestion, deleteExamQuestion, addAuditLog, getDb } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category') || undefined;
    const count = parseInt(searchParams.get('count') || '40', 10);
    const user = getSessionUser();

    let questions = getExamQuestions(categoryId);

    // If request is from regular user taking exam, optionally shuffle or slice to count
    if (!user || user.role !== 'ADMIN') {
      // Return safe version
      return NextResponse.json({
        success: true,
        questions: questions.slice(0, count),
      });
    }

    // Admin sees all questions with full detail
    return NextResponse.json({
      success: true,
      questions,
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
    if (!body.questionFr || !Array.isArray(body.optionsFr) || body.correctIndex === undefined) {
      return NextResponse.json(
        { success: false, error: 'Question, options et réponse correcte sont requises.' },
        { status: 400 }
      );
    }

    const saved = saveExamQuestion(body);
    addAuditLog(user.id, user.name, 'QUESTION_UPSERT', `Question ID: ${saved.id}`);

    return NextResponse.json({ success: true, question: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID requis' }, { status: 400 });
    }

    const deleted = deleteExamQuestion(id);
    if (deleted) {
      addAuditLog(user.id, user.name, 'QUESTION_DELETE', `ID: ${id}`);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Question non trouvée' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
