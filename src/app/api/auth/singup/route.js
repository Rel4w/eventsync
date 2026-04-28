import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return Response.json({ error: 'User already exists' }, { status: 400 });

  const hashed = await hashPassword(password);

  await db.user.create({
    data: { email, password: hashed, name, role: 'ADMIN' }
  });

  return Response.json({ success: true });
}