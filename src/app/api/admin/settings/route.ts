import { NextResponse } from 'next/server';
import { getDb, updateBusinessSettings, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json({ success: true, settings: db.settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 403 });
    }

    const updates = await req.json();
    const updated = updateBusinessSettings(updates);
    addAuditLog(user.id, user.name, 'SETTINGS_UPDATE', 'Mise à jour des paramètres de l’établissement');

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
