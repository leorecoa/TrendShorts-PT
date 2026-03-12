import { NextResponse } from 'next/server';
import { AIIdeaService } from '@/lib/ai/ideaService';

export async function POST(request: Request) {
  try {
    const { trendId } = await request.json();
    
    if (!trendId) {
      return NextResponse.json({ error: 'trendId is required' }, { status: 400 });
    }

    const aiService = new AIIdeaService();
    const generationId = await aiService.generateIdeasForTrend(trendId);

    return NextResponse.json({ generationId });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}
