    FROM php:8.2-fpm

    # Instalar dependências do sistema e extensões PHP
    RUN apt-get update && apt-get install -y \
        git \
        curl \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        zip \
        unzip \
        libpq-dev \
        libzip-dev \
        postgresql-client \
        && docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd zip \
        && pecl install redis && docker-php-ext-enable redis \
        && apt-get clean && rm -rf /var/lib/apt/lists/*

    # Copiar o restante dos arquivos
    COPY . .

    # Instalar Composer
    COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

    # Definir diretório de trabalho
    WORKDIR /var/www/html

    # Copiar arquivos essenciais e instalar dependências
    COPY composer.json composer.lock ./
    RUN composer install --no-interaction --prefer-dist --optimize-autoloader

    # Permissões
    RUN chown -R www-data:www-data /var/www/html \
        && chmod -R 755 storage bootstrap/cache

    # Expor porta
    EXPOSE 8000

    # Entrada
    COPY docker-entrypoint.sh /usr/local/bin/
    RUN chmod +x /usr/local/bin/docker-entrypoint.sh

    ENTRYPOINT ["docker-entrypoint.sh"]
    CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
