import { RawTrend, TrendSource } from '../trends/types';

export class GoogleTrendsProvider implements TrendSource {
  name = 'google_trends';

  async fetchTrends(category?: string): Promise<RawTrend[]> {
    // Mocking Google Trends data for MVP
    // In a real scenario, you would use an API or scraper here
    return [
      {
        title: `Tendência de ${category || 'Geral'} no Google`,
        source: this.name,
        category: category || 'geral',
        baselineScore: 50,
        velocityScore: 30,
        freshnessScore: 100,
        sampleKeywords: ['google', 'search', 'trends'],
        rawPayload: { mock: true },
      },
    ];
  }
}

export class YouTubeProvider implements TrendSource {
  name = 'youtube';

  async fetchTrends(category?: string): Promise<RawTrend[]> {
    // Mocking YouTube data for MVP
    return [
      {
        title: `Shorts Viral de ${category || 'Entretenimento'}`,
        source: this.name,
        category: category || 'entretenimento',
        baselineScore: 60,
        velocityScore: 40,
        freshnessScore: 90,
        sampleKeywords: ['shorts', 'viral', 'youtube'],
        rawPayload: { mock: true },
      },
    ];
  }
}
