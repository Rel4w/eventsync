import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const speakers = await db.speaker.findMany({
      include: { sessions: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(speakers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch speakers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, photo, bio, title, company, twitter, linkedin, website, github, tags } = body;
    const speaker = await db.speaker.create({
      data: {
        name,
        photo: photo || 'https://i.pravatar.cc/150?img=1',
        bio: bio || '',
        title: title || '',
        company: company || '',
        twitter: twitter || null,
        linkedin: linkedin || null,
        website: website || null,
        github: github || null,
        tags: tags || '[]',
      },
    });
    return NextResponse.json(speaker, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create speaker' }, { status: 500 });
  }
}
