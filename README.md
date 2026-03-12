# TrendShorts PT 🚀

TrendShorts PT é um MVP SaaS projetado para ajudar criadores de conteúdo a dominar o YouTube Shorts no Brasil. Ele descobre tendências em tempo real e utiliza a IA do Google Gemini para gerar ideias de vídeos virais.

## 🛠 Stack Tecnológica

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Backend:** Next.js API Routes.
- **Banco de Dados:** PostgreSQL.
- **ORM:** Prisma.
- **IA:** Google Gemini (via `@google/genai`).
- **Containerização:** Docker & Docker Compose.

## 📂 Estrutura do Projeto

- `/app`: Páginas e rotas de API do Next.js.
- `/lib`: Lógica de negócio (AI, Trends, DB).
- `/components`: Componentes de interface reutilizáveis.
- `/prisma`: Schema do banco de dados e scripts de migração/seed.
- `/lib/providers`: Adaptadores para diferentes fontes de tendências (Google Trends, YouTube).

## 🚀 Como Rodar Localmente

### 1. Pré-requisitos
- Node.js 20+
- Docker & Docker Compose
- Uma chave de API do Google Gemini

### 2. Configuração
Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```
Edite o `.env` e insira sua `GEMINI_API_KEY`.

### 3. Subir o Banco de Dados
```bash
docker-compose up -d db
```

### 4. Instalar Dependências e Preparar o Banco
```bash
npm install
npx prisma migrate dev
npm run prisma:seed
```

### 5. Iniciar a Aplicação
```bash
npm run dev
```
Acesse `http://localhost:3000`.

## 🐳 Rodando com Docker (Full)

Para rodar a aplicação completa em containers:
```bash
docker-compose up --build
```

## 📡 Endpoints da API

- `GET /api/trends`: Lista tendências com filtros.
- `POST /api/trends/sync`: Sincroniza dados das fontes externas.
- `POST /api/ideas/generate`: Gera ideias de Shorts para uma tendência específica.
- `GET /api/ideas`: Histórico de ideias geradas.

## 🧠 Lógica de Trend Score

O score de tendência (0-100) é calculado com base em:
- **Baseline (30%):** Popularidade base histórica.
- **Velocity (50%):** Velocidade de crescimento atual.
- **Freshness (20%):** Quão recente é a informação.

## 🔮 Próximos Passos Sugeridos

1. **Integração Real:** Substituir os mocks em `lib/providers` por APIs reais (SerpApi para Google Trends, YouTube Data API v3).
2. **Autenticação:** Implementar NextAuth.js para login social.
3. **Exportação:** Permitir exportar ideias para PDF ou Notion.
4. **Filtros Avançados:** Adicionar filtros por volume de busca e concorrência.

---
Desenvolvido como um esqueleto de MVP pronto para escala.
