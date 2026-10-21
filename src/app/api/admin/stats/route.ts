import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Accès réservé aux administrateurs' }, { status: 403 });
    }

    const db = getDb();

    const totalStudents = db.users.filter((u) => u.role === 'STUDENT').length;
    const pendingBookings = db.bookings.filter((b) => b.status === 'PENDING').length;
    const confirmedLessons = db.bookings.filter((b) => b.status === 'CONFIRMED').length;
    const pendingNarsaRequests = db.narsaRequests.filter(
      (r) => r.status === 'PENDING' || r.status === 'IN_PROGRESS'
    ).length;
    const publishedLessons = db.lessons.filter((l) => l.isPublished).length;
    const totalExams = db.examAttempts.length;

    const avgScore =
      totalExams > 0
        ? Math.round((db.examAttempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 40, 0) / totalExams) * 10) / 10
        : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalStudents,
        pendingBookings,
        confirmedLessons,
        pendingNarsaRequests,
        publishedLessons,
        totalExams,
        avgScore,
        recentAttempts: db.examAttempts.slice(0, 5),
        recentBookings: db.bookings.slice(0, 5),
        recentNarsaRequests: db.narsaRequests.slice(0, 5),
        auditLogs: db.auditLogs.slice(0, 10),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
