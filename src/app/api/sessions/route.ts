import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const sessions = await db.session.findMany({
      include: {
        speakers: { include: { speaker: true } },
        questions: { orderBy: { upvotes: 'desc' } },
      },
      orderBy: { startTime: 'asc' },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, startTime, endTime, roomName, roomColor, capacity, track, tags, speakerIds } = body;
    const session = await db.session.create({
      data: {
        title,
        description,
        startTime,
        endTime,
        roomName: roomName || 'Main Stage',
        roomColor: roomColor || '#A8FF3E',
        capacity: capacity || 100,
        track: track || 'Engineering',
        tags: tags || '[]',
        speakers: speakerIds ? {
          create: speakerIds.map((speakerId: string) => ({ speakerId })),
        } : undefined,
      },
      include: { speakers: { include: { speaker: true } } },
    });
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
