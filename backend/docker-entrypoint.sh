#!/bin/sh
set -e

# Aguardar banco de dados
echo "Aguardando PostgreSQL..."
until pg_isready -h postgres -p 5432 -U postgres
do
  echo "Aguardando banco de dados..."
  sleep 2
done

echo "PostgreSQL está pronto!"

# Verificar se .env existe
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
fi

# Executar migrations se necessário
php artisan migrate --force || true

# Limpar cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Executar comando
exec "$@"
