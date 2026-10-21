import { NextResponse } from 'next/server';
import { updateNarsaRequestStatus, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Accès réservé aux administrateurs' }, { status: 403 });
    }

    const { status, internalNotes } = await req.json();
    const updated = updateNarsaRequestStatus(params.id, status, internalNotes);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Demande introuvable' }, { status: 404 });
    }

    addAuditLog(user.id, user.name, 'NARSA_UPDATE', `Demande ${updated.reference} -> ${status}`);

    return NextResponse.json({ success: true, request: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
