echo "🚀 Criando projeto Sistema de Cadastro de Livros..."

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Criar docker-compose.yml
echo -e "${BLUE}📝 Criando docker-compose.yml...${NC}"
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: cadastro_livros_db
    environment:
      POSTGRES_DB: cadastro_livros_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
      PGDATA: /data/postgres
    volumes:
      - postgres_data:/data/postgres
    ports:
      - "5432:5432"
    networks:
      - livros_network
    restart: unless-stopped

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: cadastro_livros_redis
    ports:
      - "6379:6379"
    networks:
      - livros_network
    restart: unless-stopped

  # Laravel API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: cadastro_livros_api
    environment:
      DB_CONNECTION: pgsql
      DB_HOST: postgres
      DB_PORT: 5432
      DB_DATABASE: cadastro_livros_db
      DB_USERNAME: postgres
      DB_PASSWORD: postgres123
      REDIS_HOST: redis
      REDIS_PORT: 6379
      APP_ENV: local
      APP_DEBUG: "true"
    volumes:
      - ./backend:/var/www/html
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    networks:
      - livros_network
    restart: unless-stopped

  # Angular Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: cadastro_livros_frontend
    ports:
      - "4200:4200"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - livros_network
    restart: unless-stopped

  # pgAdmin
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: cadastro_livros_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@cadastrolivros.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    networks:
      - livros_network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  livros_network:
    driver: bridge
EOF

# Criar Dockerfile do Backend
echo -e "${BLUE}📝 Criando Backend Dockerfile...${NC}"
cat > backend/Dockerfile << 'EOF'
FROM php:8.2-fpm

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    zip unzip libpq-dev libzip-dev

# Instalar extensões PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Instalar Laravel
RUN composer create-project laravel/laravel . "10.*"

# Permissões
RUN chown -R www-data:www-data /var/www/html

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
EOF

# Criar Dockerfile do Frontend
echo -e "${BLUE}📝 Criando Frontend Dockerfile...${NC}"
cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine

RUN npm install -g @angular/cli@14

WORKDIR /app

# Criar novo projeto Angular
RUN ng new cadastro-livros --routing --style=scss --skip-git

WORKDIR /app/cadastro-livros

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
EOF

# Criar .gitignore
echo -e "${BLUE}📝 Criando .gitignore...${NC}"
cat > .gitignore << 'EOF'
# Backend
backend/vendor/
backend/node_modules/
backend/.env
backend/.env.backup
backend/.phpunit.result.cache
backend/storage/*.key
backend/storage/logs/*.log

# Frontend
frontend/node_modules/
frontend/dist/
frontend/.angular/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Docker
postgres_data/
EOF

# Criar README inicial
echo -e "${BLUE}📝 Criando README.md...${NC}"
cat > README.md << 'EOF'
# Sistema de Cadastro de Livros 📚

Sistema completo de gerenciamento de livros desenvolvido com Laravel 10 e Angular 14+.

## 🚀 Iniciando o Projeto

1. Execute o Docker Compose:
```bash
docker-compose up -d
```

2. Aguarde a inicialização e acesse:
- Frontend: http://localhost:4200
- API: http://localhost:8000
- pgAdmin: http://localhost:5050

## 🛠️ Tecnologias

- **Backend**: Laravel 10 (PHP 8.2)
- **Frontend**: Angular 14+
- **Banco de Dados**: PostgreSQL 15
- **Cache**: Redis
- **Containerização**: Docker
EOF

echo -e "${GREEN}✅ Estrutura inicial criada!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Execute: docker-compose up -d"
echo "2. Aguarde os containers iniciarem"
echo "3. Configure o Laravel no container"
echo ""
echo "Para abrir no VS Code do Windows:"
echo "code ."


# Tornar o script executável
chmod +x setup-project.sh