import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const source = searchParams.get('source');

  try {
    const trends = await prisma.trend.findMany({
      where: {
        ...(category && { category }),
        ...(source && { source }),
      },
      orderBy: { trendScore: 'desc' },
    });

    return NextResponse.json(trends);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}
