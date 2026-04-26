import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const questions = await db.question.findMany({
      include: { session: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, author, sessionId, upvotes } = body;
    const question = await db.question.create({
      data: {
        content,
        author: author || null,
        sessionId,
        upvotes: upvotes || 0,
      },
    });
    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
