import { GoogleGenAI, Type } from "@google/genai";
import { prisma } from "../db/prisma";

export interface GeneratedIdea {
  title: string;
  hook: string;
  summary: string;
  targetAudience: string;
  estimatedViralityReason: string;
  keywords: string[];
}

export class AIIdeaService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateIdeasForTrend(trendId: string): Promise<string> {
    const trend = await prisma.trend.findUnique({
      where: { id: trendId },
    });

    if (!trend) throw new Error("Trend not found");

    const prompt = `
      Você é um especialista em YouTube Shorts. 
      Gere 10 ideias de vídeos curtos (Shorts) baseadas na tendência: "${trend.title}".
      Categoria: ${trend.category}.
      Palavras-chave: ${trend.sampleKeywords.join(", ")}.
      
      A saída deve ser em PORTUGUÊS DO BRASIL e seguir estritamente o formato JSON solicitado.
      Cada ideia deve ser criativa, focada em retenção e viralização.
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              hook: { type: Type.STRING },
              summary: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              estimatedViralityReason: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["title", "hook", "summary", "targetAudience", "estimatedViralityReason", "keywords"],
          },
        },
      },
    });

    const ideas: GeneratedIdea[] = JSON.parse(response.text || "[]");

    // Salvar no banco
    const generation = await prisma.ideaGeneration.create({
      data: {
        trendId: trend.id,
        promptVersion: "v1",
        model: "gemini-3-flash-preview",
        items: {
          create: ideas.map((idea) => ({
            title: idea.title,
            hook: idea.hook,
            summary: idea.summary,
            targetAudience: idea.targetAudience,
            estimatedViralityReason: idea.estimatedViralityReason,
            keywords: idea.keywords,
          })),
        },
      },
      include: { items: true },
    });

    return generation.id;
  }
}
