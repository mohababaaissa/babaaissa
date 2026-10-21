import { NextResponse } from 'next/server';
import { getDb, createLessonBooking, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = getSessionUser();
    const db = getDb();

    // If Admin, return all bookings
    if (user && user.role === 'ADMIN') {
      return NextResponse.json({ success: true, bookings: db.bookings });
    }

    // If authenticated Student, return only their bookings
    if (user) {
      const userBookings = db.bookings.filter((b) => b.userId === user.id || b.studentEmail === user.email);
      return NextResponse.json({ success: true, bookings: userBookings });
    }

    return NextResponse.json({ success: false, error: 'Connexion requise pour consulter les réservations' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = getSessionUser();
    const body = await req.json();
    const { studentName, studentPhone, studentEmail, lessonTypeId, date, timeSlot } = body;

    // Strict Server-Side Validation
    if (!studentName || !studentPhone || !lessonTypeId || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Veuillez remplir toutes les informations requises.' },
        { status: 400 }
      );
    }

    // Validate phone number for Morocco
    const cleanPhone = studentPhone.replace(/\s+/g, '');
    if (!/^(0[5-7]\d{8}|\+212[5-7]\d{8})$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Veuillez entrer un numéro de téléphone marocain valide (ex: 0626783160).' },
        { status: 400 }
      );
    }

    // Validate date is not in past
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return NextResponse.json(
        { success: false, error: 'La date de réservation ne peut pas être passée.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const lessonType = db.lessonTypes.find((lt) => lt.id === lessonTypeId);
    const lessonTypeTitleFr = lessonType ? lessonType.titleFr : 'Leçon de conduite';
    const lessonTypeTitleAr = lessonType ? lessonType.titleAr : 'درس سياقة';

    // Submit booking with concurrency lock & double-booking prevention
    const result = await createLessonBooking({
      userId: user?.id,
      studentName: studentName.trim(),
      studentPhone: cleanPhone,
      studentEmail: studentEmail?.trim() || user?.email,
      lessonTypeId,
      lessonTypeTitleFr,
      lessonTypeTitleAr,
      date,
      timeSlot,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 409 });
    }

    if (user) {
      addAuditLog(user.id, user.name, 'BOOKING_CREATE', `Réservation ${result.booking?.reference} pour le ${date} à ${timeSlot}`);
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
    });
  } catch (err: any) {
    console.error('Booking error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
