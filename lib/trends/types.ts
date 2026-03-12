export interface RawTrend {
  title: string;
  source: string;
  category: string;
  baselineScore: number;
  velocityScore: number;
  freshnessScore: number;
  sampleKeywords: string[];
  referenceUrl?: string;
  rawPayload: any;
}

export interface TrendSource {
  name: string;
  fetchTrends(category?: string): Promise<RawTrend[]>;
}
