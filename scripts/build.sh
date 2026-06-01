#!/bin/bash
# scripts/build.sh — rodado pelo Render antes de iniciar

echo "📦 Instalando dependências do shared..."
cd shared && npm install

echo "🔄 Gerando Prisma Client..."
npx prisma generate --schema=./prisma/schema.prisma

echo "🗄️ Rodando migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma

cd ..

echo "📦 Instalando dependências do server..."
cd server && npm install

echo "✅ Build concluído!"
