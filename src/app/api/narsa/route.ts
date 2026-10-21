import { NextResponse } from 'next/server';
import { getDb, createNarsaRequest, addAuditLog } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = getSessionUser();
    const db = getDb();

    if (user && user.role === 'ADMIN') {
      return NextResponse.json({ success: true, requests: db.narsaRequests });
    }

    if (user) {
      const myRequests = db.narsaRequests.filter((r) => r.userId === user.id || r.phone === user.phone);
      return NextResponse.json({ success: true, requests: myRequests });
    }

    return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = getSessionUser();
    const body = await req.json();
    const { fullName, phone, licenseCategory, requestType, preferredDate, additionalNotes, privacyConsent } = body;

    if (!fullName || !phone || !licenseCategory || !requestType) {
      return NextResponse.json(
        { success: false, error: 'Veuillez renseigner vos coordonnées et l’objet de votre demande.' },
        { status: 400 }
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { success: false, error: 'Veuillez accepter le consentement de traitement des données (Loi 09-08).' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^(0[5-7]\d{8}|\+212[5-7]\d{8})$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Numéro de téléphone marocain invalide (ex: 0626783160).' },
        { status: 400 }
      );
    }

    const newReq = createNarsaRequest({
      userId: user?.id,
      fullName: fullName.trim(),
      phone: cleanPhone,
      licenseCategory,
      requestType,
      preferredDate,
      additionalNotes,
      privacyConsent: !!privacyConsent,
    });

    if (user) {
      addAuditLog(user.id, user.name, 'NARSA_REQUEST', `Demande ${newReq.reference} pour permis ${licenseCategory}`);
    }

    return NextResponse.json({
      success: true,
      request: newReq,
    });
  } catch (err: any) {
    console.error('NARSA request error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
