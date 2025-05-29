FROM node:16-alpine

WORKDIR /app

# Instalar Angular CLI
RUN npm install -g @angular/cli@14.2.13

# Script de entrada
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copiar apenas os arquivos necessários primeiro
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# Instalar dependências
RUN npm install || npm ci

# Copiar o resto do código
COPY . .

EXPOSE 4200

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]
