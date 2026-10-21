import { NextResponse } from 'next/server';
import { getUserExamAttempts } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Connexion requise' }, { status: 401 });
    }

    const attempts = getUserExamAttempts(user.id);
    return NextResponse.json({ success: true, attempts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
