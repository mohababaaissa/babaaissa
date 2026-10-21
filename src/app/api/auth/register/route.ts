import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/db';
import { hashPassword, generateToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, licenseCategory } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Le mot de passe doit comporter au moins 6 caractères.' },
        { status: 400 }
      );
    }

    // Phone validation for Morocco
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^(0[5-7]\d{8}|\+212[5-7]\d{8})$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Veuillez entrer un numéro de téléphone marocain valide (ex: 0626783160).' },
        { status: 400 }
      );
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Cette adresse e-mail est déjà utilisée.' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);
    const newUser = createUser({
      name,
      email: email.toLowerCase().trim(),
      phone: cleanPhone,
      role: 'STUDENT',
      licenseCategory: licenseCategory || 'B',
      passwordHash,
    });

    const token = generateToken(newUser);
    const { passwordHash: _, ...safeUser } = newUser;

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
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de l'inscription." },
      { status: 500 }
    );
  }
}
