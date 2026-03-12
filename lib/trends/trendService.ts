import { RawTrend } from './types';
import { prisma } from '../db/prisma';

export class TrendService {
  /**
   * Lógica de cálculo de Trend Score
   * trendScore = (baseline * 0.3) + (velocity * 0.5) + (freshness * 0.2)
   */
  static calculateTrendScore(trend: Pick<RawTrend, 'baselineScore' | 'velocityScore' | 'freshnessScore'>): number {
    const score = (trend.baselineScore * 0.3) + (trend.velocityScore * 0.5) + (trend.freshnessScore * 0.2);
    return Math.round(score * 10) / 10; // 1 casa decimal
  }

  static async syncFromSource(source: any) {
    const rawTrends = await source.fetchTrends();
    
    for (const raw of rawTrends) {
      const trendScore = this.calculateTrendScore(raw);
      const slug = raw.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

      const trend = await prisma.trend.upsert({
        where: { slug },
        update: {
          trendScore,
          baselineScore: raw.baselineScore,
          velocityScore: raw.velocityScore,
          freshnessScore: raw.freshnessScore,
          updatedAt: new Date(),
        },
        create: {
          title: raw.title,
          slug,
          source: raw.source,
          category: raw.category,
          trendScore,
          baselineScore: raw.baselineScore,
          velocityScore: raw.velocityScore,
          freshnessScore: raw.freshnessScore,
          sampleKeywords: raw.sampleKeywords,
          referenceUrl: raw.referenceUrl,
        },
      });

      // Salvar snapshot para histórico
      await prisma.trendSnapshot.create({
        data: {
          trendId: trend.id,
          rawPayload: raw.rawPayload,
          baselineScore: raw.baselineScore,
          velocityScore: raw.velocityScore,
          freshnessScore: raw.freshnessScore,
          trendScore,
        },
      });
    }
  }
}
