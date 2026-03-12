import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const trends = [
    {
      title: 'Inteligência Artificial no Dia a Dia',
      slug: 'ia-dia-a-dia',
      source: 'google_trends',
      category: 'tecnologia',
      trendScore: 85,
      baselineScore: 70,
      velocityScore: 15,
      freshnessScore: 100,
      sampleKeywords: ['IA', 'ChatGPT', 'Produtividade'],
    },
    {
      title: 'Como economizar investindo pouco',
      slug: 'economizar-investindo',
      source: 'youtube',
      category: 'finanças',
      trendScore: 92,
      baselineScore: 60,
      velocityScore: 32,
      freshnessScore: 90,
      sampleKeywords: ['Investimentos', 'Poupança', 'Tesouro Direto'],
    },
    {
      title: 'Rotina de 5 minutos para produtividade',
      slug: 'rotina-5-minutos',
      source: 'google_trends',
      category: 'produtividade',
      trendScore: 78,
      baselineScore: 50,
      velocityScore: 28,
      freshnessScore: 85,
      sampleKeywords: ['Hacks', 'Foco', 'Trabalho'],
    },
    {
      title: 'Novidades do entretenimento em 2026',
      slug: 'entretenimento-2026',
      source: 'youtube',
      category: 'entretenimento',
      trendScore: 65,
      baselineScore: 40,
      velocityScore: 25,
      freshnessScore: 70,
      sampleKeywords: ['Filmes', 'Séries', 'Games'],
    },
  ];

  for (const trend of trends) {
    await prisma.trend.upsert({
      where: { slug: trend.slug },
      update: {},
      create: trend,
    });
  }

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
