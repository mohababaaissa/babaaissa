import { NextResponse } from 'next/server';
import { getDb, updateBookingStatus, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });
    }

    const { status, adminNotes, instructor, vehicle } = await req.json();
    const db = getDb();
    const existing = db.bookings.find((b) => b.id === params.id);

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Réservation introuvable' }, { status: 404 });
    }

    // Role check:
    if (user.role !== 'ADMIN') {
      // Student can only cancel their own booking
      if (existing.userId !== user.id && existing.studentEmail !== user.email) {
        return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 403 });
      }
      if (status !== 'CANCELLED') {
        return NextResponse.json({ success: false, error: 'Action non autorisée' }, { status: 403 });
      }
    }

    const updated = updateBookingStatus(params.id, status, adminNotes, instructor, vehicle);
    addAuditLog(user.id, user.name, 'BOOKING_UPDATE', `Réservation ${existing.reference} -> ${status}`);

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
