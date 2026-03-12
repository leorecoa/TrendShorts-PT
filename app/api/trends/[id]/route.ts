import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trend = await prisma.trend.findUnique({
      where: { id },
      include: { snapshots: { take: 10, orderBy: { collectedAt: 'desc' } } },
    });

    if (!trend) {
      return NextResponse.json({ error: 'Trend not found' }, { status: 404 });
    }

    return NextResponse.json(trend);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trend' }, { status: 500 });
  }
}
