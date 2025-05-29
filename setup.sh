#!/bin/bash

echo "🚀 Configurando Sistema de Cadastro de Livros..."

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    exit 1
fi

echo -e "${GREEN}✓ Docker encontrado${NC}"

# Copiar .env
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Arquivo .env criado${NC}"
fi

# Build dos containers
echo -e "${BLUE}🔨 Construindo containers...${NC}"
docker-compose build

# Iniciar containers
echo -e "${BLUE}🚀 Iniciando containers...${NC}"
docker-compose up -d

# Aguardar PostgreSQL
echo -e "${BLUE}⏳ Aguardando banco de dados...${NC}"
sleep 15

# Executar migrations
echo -e "${BLUE}📊 Executando migrations...${NC}"
docker-compose exec -T api php artisan key:generate
docker-compose exec -T api php artisan migrate --force

# Executar seeders
echo -e "${BLUE}🌱 Populando banco de dados...${NC}"
docker-compose exec -T api php artisan db:seed --force

echo -e "${GREEN}✅ Sistema configurado com sucesso!${NC}"
echo ""
echo "📌 Acesse:"
echo "   Frontend: http://localhost:4200"
echo "   API: http://localhost:8000"
echo "   pgAdmin: http://localhost:5050"
echo ""
echo "👤 pgAdmin:"
echo "   Email: admin@cadastrolivros.com"
echo "   Senha: admin123"
