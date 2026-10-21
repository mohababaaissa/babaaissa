import crypto from 'crypto';
import { cookies, headers } from 'next/headers';
import { User } from './types';
import { findUserByEmail, findUserById } from './db';

const AUTH_COOKIE_NAME = 'babaaissa_auth_token';
const SECRET = process.env.AUTH_SECRET || 'babaaissa-super-secure-key-bouarfa-2026';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + SECRET).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  // Support either seeded plain sha256 or salted hash
  const salted = hashPassword(password);
  const plain = crypto.createHash('sha256').update(password).digest('hex');
  return salted === hash || plain === hash;
}

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
  return `${b64}.${signature}`;
}

export function verifyToken(token: string): { id: string; email: string; role: 'ADMIN' | 'STUDENT'; name: string } | null {
  try {
    const [b64, signature] = token.split('.');
    if (!b64 || !signature) return null;

    const expectedSig = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
    if (signature !== expectedSig) return null;

    const json = Buffer.from(b64, 'base64url').toString('utf-8');
    const payload = JSON.parse(json);

    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getSessionUser(): User | null {
  try {
    let token: string | undefined;

    const cookieStore = cookies();
    token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      const headerStore = headers();
      const authHeader = headerStore.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = findUserById(payload.id);
    if (!user) return null;

    // Do not return password hash
    const { passwordHash, ...safeUser } = user;
    return safeUser as User;
  } catch {
    return null;
  }
}

export { AUTH_COOKIE_NAME };
