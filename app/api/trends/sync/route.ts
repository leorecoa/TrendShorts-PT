import { NextResponse } from 'next/server';
import { TrendService } from '@/lib/trends/trendService';
import { GoogleTrendsProvider, YouTubeProvider } from '@/lib/providers/trendProviders';
import { prisma } from '@/lib/db/prisma';

export async function POST() {
  const log = await prisma.sourceSyncLog.create({
    data: { source: 'all', status: 'running' },
  });

  try {
    const googleProvider = new GoogleTrendsProvider();
    const youtubeProvider = new YouTubeProvider();

    await TrendService.syncFromSource(googleProvider);
    await TrendService.syncFromSource(youtubeProvider);

    await prisma.sourceSyncLog.update({
      where: { id: log.id },
      data: { status: 'success', finishedAt: new Date() },
    });

    return NextResponse.json({ message: 'Sync completed successfully' });
  } catch (error) {
    await prisma.sourceSyncLog.update({
      where: { id: log.id },
      data: { 
        status: 'error', 
        finishedAt: new Date(), 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
    });
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
