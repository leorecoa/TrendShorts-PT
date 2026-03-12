import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const ideas = await prisma.ideaGeneration.findMany({
      include: { 
        trend: { select: { title: true } },
        items: true 
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ideas' }, { status: 500 });
  }
}
