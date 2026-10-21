import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';
import { verifyPassword, generateToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Veuillez saisir votre e-mail et votre mot de passe.' },
        { status: 400 }
      );
    }

    const user = findUserByEmail(email);
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, error: 'Identifiants invalides.' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Identifiants invalides.' },
        { status: 401 }
      );
    }

    const token = generateToken(user);
    const { passwordHash, ...safeUser } = user;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      token,
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de la connexion.' },
      { status: 500 }
    );
  }
}
